<template>
    <NavBar></NavBar>
    <div class="min-h-screen flex flex-col bg-gray-100">
      <main class="flex-grow container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Left sidebar -->
          <div class="w-full h-full md:w-1/2 lg:w-1/3">
            <div class="bg-white rounded-lg shadow-md p-6 h-[calc(95vh-8rem)]">
              <h2 class="text-2xl font-bold mb-4">Search Results</h2>
              <SearchForm class="mb-4"></SearchForm>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
                <select
                  v-model="sortBy"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Alphabetically</option>
                  <option value="price_low_high">Number of services</option>
                  <option value="price_high_low">Distance</option>
                </select>
              </div>
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
                >
                Switch to List View
                </button>
              </div>
            </div>
            <!-- <div v-if="isListView" class="mt-6 space-y-4">
              <div v-for="marina in filteredMarinas" :key="marina.id" class="bg-white rounded-lg shadow-md p-4">
                <h3 class="text-lg font-semibold mb-2">{{ marina.name }}</h3>
                <p class="text-gray-600 mb-2">{{ marina.location }}</p>
                <div class="flex items-center mb-2">
                  <Star v-for="i in marina.rating" :key="i" class="w-4 h-4 text-yellow-400" />
                  <span class="ml-1 text-sm text-gray-600">({{ marina.reviewCount }} reviews)</span>
                </div>
                <p class="font-semibold">{{ marina.price }} per night</p>
              </div>
            </div> -->
          </div>
  
          <!-- Right map view -->
          <div class="w-full md:w-1/2 lg:w-2/3">
            <div class="bg-white rounded-lg shadow-md h-[calc(95vh-8rem)]">
              <!-- Placeholder for the map component -->
              <div class="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <MapboxMap
                    :map-id="2"
                    class="h-[100%] rounded-lg w-[100%]"
                    :options="{
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [-1.474008, 52.155133],
                    zoom: 6
                    }"
                />
                <!-- <MapIcon class="w-12 h-12 mr-2 text-gray-400" />
                <span class="text-lg font-semibold text-gray-500">Marina Map View</span> -->
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer></Footer>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Anchor, MapIcon, Star } from 'lucide-vue-next'
  
  const searchQuery = ref('')
  const sortBy = ref('relevance')
  const filters = ref({
    hasElectricity: false,
    hasWater: false,
    hasFuel: false,
    hasShowers: false,
  })
  const isListView = ref(true)
  
  const marinas = [
    { id: 1, name: 'Sunset Harbor Marina', location: 'Miami, FL', rating: 4, reviewCount: 120, price: '$50', hasElectricity: true, hasWater: true, hasFuel: true, hasShowers: true },
    { id: 2, name: 'Blue Lagoon Yacht Club', location: 'San Diego, CA', rating: 5, reviewCount: 85, price: '$75', hasElectricity: true, hasWater: true, hasFuel: false, hasShowers: true },
    { id: 3, name: 'Harbor Springs Marina', location: 'Harbor Springs, MI', rating: 3, reviewCount: 45, price: '$40', hasElectricity: true, hasWater: true, hasFuel: true, hasShowers: false },
    { id: 4, name: 'Emerald Bay Marina', location: 'Lake Tahoe, CA', rating: 4, reviewCount: 60, price: '$60', hasElectricity: true, hasWater: true, hasFuel: false, hasShowers: true },
    { id: 5, name: 'Coastal Haven Marina', location: 'Charleston, SC', rating: 5, reviewCount: 95, price: '$70', hasElectricity: true, hasWater: true, hasFuel: true, hasShowers: true },
  ]
  
  const filteredMarinas = computed(() => {
    return marinas.filter(marina => {
      const matchesSearch = marina.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            marina.location.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesFilters = (!filters.value.hasElectricity || marina.hasElectricity) &&
                             (!filters.value.hasWater || marina.hasWater) &&
                             (!filters.value.hasFuel || marina.hasFuel) &&
                             (!filters.value.hasShowers || marina.hasShowers)
      return matchesSearch && matchesFilters
    }).sort((a, b) => {
      if (sortBy.value === 'price_low_high') return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1))
      if (sortBy.value === 'price_high_low') return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1))
      if (sortBy.value === 'rating') return b.rating - a.rating
      return 0 // Default to relevance (original order)
    })
  })
  
  const toggleView = () => {
    isListView.value = !isListView.value
  }
  </script>
  
  <style scoped>
  /* Any component-specific styles can go here */
  </style>