<template>
    <div class="min-h-screen flex flex-col">
        <main class="flex-grow">
            <div class="relative h-[calc(60vh-4rem)] md:h-[calc(80vh-4rem)] flex items-center justify-center">
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

            <ClosestMarinas></ClosestMarinas>
            
            <!-- <OurFavoriteMarinas></OurFavoriteMarinas> -->

            <div class="container mx-auto ">
                <!-- <SavedMarinas class="mt-[25px] text-center"></SavedMarinas> -->
                <ClaimMarinaSection></ClaimMarinaSection>
            </div>
        </main>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  