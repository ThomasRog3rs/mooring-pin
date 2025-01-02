<template>
    <div class="min-h-screen flex flex-col">
        <NavBar></NavBar>
      <main class="flex-grow">
        <div class="relative h-[calc(80vh-4rem)] flex items-center justify-center">
          <img
            src="/assets/images/mooring-hero-2.jpeg"
            alt="Beautiful marina at sunset"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div class="relative z-10 text-center max-w-[40rem] p-4">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Perfect Marina
            </h2>
            <p class="text-xl text-white mb-8">
                Looking for nearby marinas? Enter a location, adjust the radius, or search directly by marina or canal name.
            </p>
            <SearchForm></SearchForm>
          </div>
        </div>
  
        <section class="py-16 bg-gray-100">
            <div class="container mx-auto px-4">
            <h3 class="text-3xl font-bold text-center mb-8">Closest Marinas</h3>
            <div class="text-center">
                <button
                @click="requestLocation"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <span class="text-yellow-400 mr-2">
                    <font-awesome-icon :icon="['fas', 'location-crosshairs']" />
                    <!-- <font-awesome-icon :icon="['fas', 'location-dot']" /> -->
                </span>
                Find Marinas Near Me
                </button>
            </div>
            </div>
        </section>

        <!-- <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h3 class="text-3xl font-bold text-center mb-8">Our Favorite Marinas</h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1619900136278-16f71e1425e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sunset Harbor Marina" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h4 class="text-xl font-semibold mb-2">Sunset Harbor Marina</h4>
                <p class="text-gray-600 mb-4">Experience breathtaking sunsets and world-class amenities.</p>
                <NuxtLink to="#" class="text-blue-600 hover:underline">Learn more</NuxtLink>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1619900136278-16f71e1425e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blue Lagoon Yacht Club" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h4 class="text-xl font-semibold mb-2">Blue Lagoon Yacht Club</h4>
                <p class="text-gray-600 mb-4">Luxury meets nature in this exclusive tropical paradise.</p>
                <NuxtLink to="#" class="text-blue-600 hover:underline">Learn more</NuxtLink>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1619900136278-16f71e1425e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Harbor Springs Marina" class="w-full h-48 object-cover" />
              <div class="p-6">
                <h4 class="text-xl font-semibold mb-2">Harbor Springs Marina</h4>
                <p class="text-gray-600 mb-4">Charming coastal town with excellent boating facilities.</p>
                <NuxtLink to="#" class="text-blue-600 hover:underline">Learn more</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section> -->

        <div class="container mx-auto ">
            <ClaimMarinaSection></ClaimMarinaSection>
        </div>
      </main>
  
        <Footer></Footer>
    </div>
  </template>
  
  <script setup>
//   import { Anchor } from 'lucide-vue-next'
  </script>
  
  <style scoped>
  /* Any component-specific styles can go here */
  </style>