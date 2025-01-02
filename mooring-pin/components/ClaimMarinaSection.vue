<template>
    <section id="claim-marina-cta" class="p-[20px]">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-2xl my-12">
          <div class="max-w-7xl mx-auto">
            <div class="lg:flex lg:items-center lg:justify-between">
              <div class="mb-8 lg:mb-0 lg:pr-8">
                <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                  Own a Marina? Claim Your Listing for Free!
                </h2>
                <p class="text-xl text-blue-100 leading-relaxed max-w-3xl">
                  Get your marina listed on Mooring Pin today—absolutely free! Claiming your marina helps boaters find you easily and unlocks several great benefits for your business.
                </p>
              </div>
              <div class="lg:flex lg:flex-col lg:items-start">
                <ul class="text-lg text-blue-100 space-y-2 mb-6 lg:mb-8">
                  <li class="flex items-center">
                    <FontAwesomeIcon :icon="faCheck" class="h-5 w-5 mr-2 text-yellow-400" />
                    Increase visibility, attract more customers
                  </li>
                  <li class="flex items-center">
                    <FontAwesomeIcon :icon="faCheck" class="h-5 w-5 mr-2 text-yellow-400" />
                    Highlight essential amenities and services
                  </li>
                  <li class="flex items-center">
                    <FontAwesomeIcon :icon="faCheck" class="h-5 w-5 mr-2 text-yellow-400" />
                    Manage your marina's details in real time
                  </li>
                </ul>
                <NuxtLink
                  to="/claim-marina"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-blue-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                >
                  Claim Your Marina Now
                  <FontAwesomeIcon :icon="faArrowRight" class="ml-2 -mr-1 h-5 w-5" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
  </script>
  
  <style scoped>
  /* Additional custom styles can be added here if needed */
  </style>
  
  