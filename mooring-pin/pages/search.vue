<template>
    <NavBar></NavBar>
    <div class="min-h-screen flex flex-col bg-gray-100">
      <main class="flex-grow container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Left sidebar -->
          <div class="w-full h-full md:w-1/2 lg:w-1/3">
            <div class="bg-white rounded-lg shadow-md p-6 h-[50rem]">
              <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-bold">Search Results</h2>
              <div v-if="marinas?.length > 0" class="text-center p-2 border rounded shadow-sm">
                {{ searchStore.marinaSearchResults?.length }} results
              </div>
            </div>

              <SearchForm class="mb-4" @searched="updateMarinas"></SearchForm>
              <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2">Filters</h3>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.hasElectricity" class="form-checkbox" />
                    <span class="ml-2">Electricity</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.hasWater" class="form-checkbox" />
                    <span class="ml-2">Water</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.hasFuel" class="form-checkbox" />
                    <span class="ml-2">Fuel</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.hasShowers" class="form-checkbox" />
                    <span class="ml-2">Showers</span>
                  </label>
                </div>
              </div>
              <div class="mb-4">
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
                {{isGridView ? 'Switch to Map View' : 'Switch to Grid View'}}
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
                  />
                </template>
                <div class="p-8" v-else>
                  <div class="mb-4 border-b">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
                    <select
                      v-model="sortBy"
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    >
                      <option value="relevance">Alphabetically</option>
                      <option value="price_low_high">Number of services</option>
                      <option value="price_high_low" :disabled="searchStore.userLocation == undefined">Distance from you</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-2 gap-4 w-full">
                    <template v-for="marina in marinas">
                      <MarinaDetailsCard :marina="marina"></MarinaDetailsCard>
                    </template>
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
  import { type MarinaModel } from '~/api-client';
  import { useSearchStore } from '~/stores/search.store';

  const searchStore = useSearchStore();

  const searchQuery = ref('')
  const sortBy = ref('relevance')
  const filters = ref({
    hasElectricity: false,
    hasWater: false,
    hasFuel: false,
    hasShowers: false,
  })
  const isGridView = ref<boolean>(true);

  const marinas = ref<MarinaModel[]>(searchStore.marinaSearchResults ?? []);

  const updateMarinas = () => {
    marinas.value = searchStore.marinaSearchResults ?? [];
  }

  const toggleView = () => {
    isGridView.value = !isGridView.value
  }
  </script>
  
  <style scoped>
  /* Any component-specific styles can go here */
  </style>