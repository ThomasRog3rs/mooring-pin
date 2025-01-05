<template>
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
               <span class="flex flex-row justify-between mt-2 mb-2" v-show="searchStore.serviceFilterOptions.length > 0">
                 <h3 class="text-lg font-semibold mb-2">Filters</h3>
                  <button class="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" @click="searchStore.resetServiceFilterOptions()">Clear filters</button>
               </span>
              <div class="flex-1 overflow-y-auto mb-4">
                <div class="space-y-2">
                  <label class="flex items-center" v-for="filterOption in searchStore.serviceFilterOptions" :key="filterOption.serviceType.key!">
                    <input type="checkbox" :checked="filterOption.active" @click="searchStore.toggleServiceFilterOption(filterOption.serviceType?.key!)" class="form-checkbox !mt-0" />
                    <span class="ml-2">{{ filterOption.serviceType.value }}</span>
                  </label>
                </div>
              </div>

              <!-- Switch Button at the Bottom -->
              <div class="mt-auto">
                <button
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                    @click="toggleView"
                    :disabled="searchResultsUnset"
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
                <template v-if="!isGridView && !searchResultsUnset">
                  <MapboxMap
                      map-id="1"
                      class="h-[100%] rounded-lg w-[100%]"
                      :options="{
                        style: 'mapbox://styles/mapbox/streets-v12',
                        center: calculateCenterCoords() as LngLatLike,
                        zoom: calculateZoomLevel(searchStore.mapRadius)
                      }"
                      @load="handleMapLoaded"
                    />
                </template>
                <div class="p-8" v-if="isGridView && !searchResultsUnset">
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
                <div v-if="searchResultsUnset" class="grid grid-cols-2 gap-4 w-full min-h-[30rem]">
                  <div class="col-span-2 flex items-center justify-center h-full">
                    <SimpleCard class="text-center p-4 !bg-gray-100 border">
                        <h1 class="text-2xl font-semibold text-gray-700">
                          Welcome to the 
                          <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
                            Marina
                          </span> 
                          Search
                        </h1>
                        <p class="mt-2 text-gray-500">
                          Enter a location, adjust the radius, or search directly by marina or canal name.
                        </p>
                      </SimpleCard>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { GeoJsonApi, type GeoJsonGeoJsonByIdsGetRequest, type GeoJsonModel, type DataMarinasSearchGetRequest } from '~/api-client';
  import { SearchType } from '~/types/search';
  import mapboxgl, {Map, type LngLatLike} from 'mapbox-gl';
  import { useMapControls } from '~/composables/useMapControls';
  import * as turf from '@turf/turf';

  const {calculateCenterCoords, calculateZoomLevel} = useMapControls();


  const searchStore = useSearchStore();
  const savedMarinaStore = useSavedMarinasStore();
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
  
  const isGridView = ref<boolean>(false);

  const toggleView = () => {
    isGridView.value = !isGridView.value
  };

  const searchResultsUnset = ref<boolean>(false);

  const mapInstance = ref<mapboxgl.Map | null>(null as mapboxgl.Map | null);
  const geoJsonIds = ref<number[]>(marinaSearchResults.value?.map(x => x.geoJsonId!) ?? []);
  const geoJsonData = ref<GeoJsonModel | null>();

  const handleMapLoaded = (map: Map) =>{
    mapInstance.value = map;
    addPins(map);

    if(searchStore.currentSearchType === SearchType.Coordinates){
      addRadiusRing(map, calculateCenterCoords(), searchStore.mapRadius!);
    }
  }
  
  watch(marinaSearchResults,
    async (newMarinaSearchResults) => {
      if(newMarinaSearchResults === undefined){
        searchResultsUnset.value = true;
        return;
      }

      searchResultsUnset.value = false;

      if(searchStore.currentSearchType === SearchType.Coordinates && mapInstance.value !== null){
        addRadiusRing(mapInstance.value as mapboxgl.Map, calculateCenterCoords(), searchStore.mapRadius!);
      }

      geoJsonIds.value = newMarinaSearchResults?.map(x => x.geoJsonId!) ?? [];

      if(geoJsonIds.value.length === 0){
        removeExistingMarkers();
        geoJsonData.value = null;
        return
      }

      const geoParams: GeoJsonGeoJsonByIdsGetRequest = {
        ids: geoJsonIds.value!,
      }

      geoJsonData.value = await geoJsonApi.geoJsonGeoJsonByIdsGet(geoParams);

      if(mapInstance.value === null) return;

      removeExistingMarkers();
      addPins(mapInstance.value as mapboxgl.Map);
    },
    {
      immediate: true
    }
  );

  const existingMarkers = ref<mapboxgl.Marker[]>([] as mapboxgl.Marker[]);

  const removeExistingMarkers = () => {
    for (const marker of existingMarkers.value) {
      marker.remove();
    }

    existingMarkers.value.length = 0;
  };

  const addPins = (map: mapboxgl.Map) => {
    if(map?.getSource('marinas')){
      map?.removeSource('marinas');
    }

    map?.addSource('marinas', {
      type: 'geojson',
      //@ts-ignore
      data: geoJsonData.value,
    });

    removeExistingMarkers();

    for (const feature of geoJsonData.value?.features!) {
      const isMarinaSaved : boolean = savedMarinaStore.isMarinaSavedByGeoJsonId(feature.id!);
      const markerColour : string = isMarinaSaved ? '#e5b700' : '#1d4ed8';

      const marker: mapboxgl.Marker = new mapboxgl.Marker({color: markerColour, scale: 1.2})
        .setLngLat(feature.geometry!.coordinates! as mapboxgl.LngLatLike)
        .addTo(map);

      const popup = new mapboxgl.Popup({ offset: 30 })
        .setHTML(`
          <h3>Marina: ${feature.properties?.title}</h3>
          <p>ID: ${feature.id}</p>
          <p style="margin-bottom: 10px">Location: ${feature.geometry?.coordinates?.join(', ')}</p>
          <a href="/marina/name/${feature.properties?.title}" style="padding: 10px; background-color: ${markerColour}; color: white;border-radius: 5px; display: block; text-align: center; font-weight: bolder; font-size: 15px">View Details</a>
        `);
        

      marker.setPopup(popup);

      marker.getElement().addEventListener('click', () => {
        map.flyTo({
          center: feature.geometry!.coordinates! as mapboxgl.LngLatLike,
          zoom: 14,
          essential: true,
        });
      });

      //Typescript is having a hardtime with the size of deeply nested types from mapboxgl.Marker
      //@ts-ignore
      existingMarkers.value.push(marker as mapboxgl.Marker);
    }
  };

  const addRadiusRing = (map: mapboxgl.Map, center: number[], radiusInKm: number) => {
  // Remove existing radius layer if needed
  if (map.getLayer('radius-ring')) {
    map.removeLayer('radius-ring');
  }
  if (map.getSource('radius-ring-source')) {
    map.removeSource('radius-ring-source');
  }

  // Generate the circle using Turf.js
  const circle = turf.circle(center, radiusInKm, {
    steps: 64, // The higher the steps, the smoother the circle
    units: 'miles'
  });

  // Add the circle as a GeoJSON source
  map.addSource('radius-ring-source', {
    type: 'geojson',
    data: circle
  });

  // Add a layer to style the circle
  map.addLayer({
    id: 'radius-ring',
    type: 'fill',
    source: 'radius-ring-source',
    paint: {
      'fill-color': 'rgba(0, 123, 255, 0.3)', // Semi-transparent blue color
      'fill-opacity': 1,
    }
  });
};


</script>
