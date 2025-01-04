<template>
    <NavBar></NavBar>
    <div class="min-h-screen flex flex-col bg-gray-100">
      <main class="flex-grow container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Left sidebar -->
          <div class="w-full h-full md:w-1/2 lg:w-1/3">
            <div class="bg-white rounded-lg shadow-md p-6 h-[50rem] flex flex-col">
              <!-- Search Bar at the Top -->
              <div class="mb-4">
                <span class="flex flex-row justify-between mb-4">
                  <h2 class="text-2xl font-bold">Search Results</h2>
                  <div v-if="marinaSearchResults && marinaSearchResults?.length > 0" class="text-center p-2 border rounded shadow-sm">
                    {{ marinaSearchResults?.length }} results
                  </div>
                  <div v-else class="text-center p-2 border-2 border-red-600 rounded shadow-sm">
                    {{ marinaSearchResults?.length ?? '0' }} results
                  </div>
                </span>
                <SearchForm></SearchForm>
              </div>

              <!-- Filters in the Middle -->
              <h3 class="text-lg font-semibold mb-2">Filters</h3>
              <div class="flex-1 overflow-y-auto mb-4">
                <div class="space-y-2">
                  <label class="flex items-center" v-for="filterOption in searchStore.serviceFilterOptions" :key="filterOption.serviceType.key!">
                    <input type="checkbox" :checked="filterOption.active" class="form-checkbox !mt-0" />
                    <span class="ml-2">{{ filterOption.serviceType.value }}</span>
                  </label>
                </div>
              </div>

              <!-- Switch Button at the Bottom -->
              <div class="mt-auto">
                <button
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @click="toggleView"
                >
                  <span class="mr-2" v-show="!isGridView">
                    <font-awesome-icon :icon="['fas', 'grip']" />
                  </span>
                  <span class="mr-2" v-show="isGridView">
                    <font-awesome-icon :icon="['fas', 'map-location-dot']" />
                  </span>
                  {{ isGridView ? 'Switch to Map View' : 'Switch to Grid View' }}
                </button>
              </div>
            </div>
          </div>

  
          <!-- Right map view -->
          <div class="w-full md:w-1/2 lg:w-2/3">
            <div class="bg-white rounded-lg shadow-md h-[50rem] overflow-y-auto">
              <div class="w-full h-full rounded-lg">
                <template v-if="!isGridView">
                  <MapboxMap
                    map-id="1"
                    class="h-[100%] rounded-lg w-[100%]"
                    :options="{
                      style: 'mapbox://styles/mapbox/streets-v12',
                      center: [-1.474008, 52.155133],
                      zoom: 6
                    }"
                    @load="addPins"
                  />
                </template>
                <div class="p-8" v-else>
                  <div class="mb-4 border-b">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
                    <select
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      @change="onSortChange"
                    >
                      <option v-for="sortOption in searchStore.sortOptions" :key="sortOption.id" :value="sortOption.id" :selected="sortOption.active" :disabled="isDisabled(sortOption.id)">{{ sortOption.name }}</option>

                    </select>
                  </div>
                  <div class="grid grid-cols-2 gap-4 w-full min-h-[30rem]">
                    <template v-for="marina in marinaSearchResults">
                      <MarinaDetailsCard :marina="marina"></MarinaDetailsCard>
                    </template>
                    <div v-if="marinaSearchResults === undefined || marinaSearchResults?.length <= 0" class="col-span-2 flex items-center justify-center h-full">
                      <SimpleCard class="text-center p-4 !bg-gray-100 border">
                        <h1 class="text-2xl font-semibold text-gray-700">
                          No             
                          <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
                            Marinas
                          </span>  
                          Found
                        </h1>
                        <p class="mt-2 text-gray-500">Try adjusting your search or filtering options.</p>
                      </SimpleCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer></Footer>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { type MarinaModel, GeoJsonApi, type GeoJsonGeoJsonByIdsGetRequest, type GeoJsonModel } from '~/api-client';
  import { useSearchStore } from '~/stores/search.store';
  import { SearchType } from '~/types/search';
  import mapboxgl, {Map, type LngLatLike} from 'mapbox-gl';


  const searchStore = useSearchStore();
  const {marinaSearchResults} = storeToRefs(searchStore);

  const geoJsonApi = new GeoJsonApi();

  const onSortChange = (event : Event) => {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptionId = Number(selectElement.value);
    searchStore.setSortOption(selectedOptionId);
  }

  const isDisabled = (sortId:number) => {
    if(sortId === 4 && !searchStore.userLocation) return true
    if(sortId === 3 && searchStore.currentSearchType !== SearchType.Coordinates) return true;
    return false;
  }
  
  const isGridView = ref<boolean>(true);

  const toggleView = () => {
    isGridView.value = !isGridView.value
  };

  const geoJsonIds = ref<number[]>(marinaSearchResults.value?.map(x => x.geoJsonId!) ?? []);
  const geoJsonData = ref<GeoJsonModel>();

  watch(marinaSearchResults,
    async (newResults) => {
      geoJsonIds.value = newResults?.map(x => x.geoJsonId!) ?? [];

      const geoParams: GeoJsonGeoJsonByIdsGetRequest = {
        ids: geoJsonIds.value!,
      }

      geoJsonData.value = await geoJsonApi.geoJsonGeoJsonByIdsGet(geoParams);
    },
    { immediate: true }
  );

  const addPins = (map: Map) => {
    map?.addSource('marinas', {
      type: 'geojson',
      //@ts-ignore
      data: geoJsonData.value
    });

    for (const marker of geoJsonData.value?.features!) {
      new mapboxgl.Marker({ color: '#1d4ed8' })
        //@ts-ignore
        .setLngLat(marker.geometry!.coordinates)
        .addTo(map);
    }
  }


  const filters = ref({
    hasElectricity: false,
    hasWater: false,
    hasFuel: false,
    hasShowers: false,
  })


  </script>
  
  <style scoped>
  /* Any component-specific styles can go here */
  </style>