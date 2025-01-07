<template>
      <div class="min-h-screen flex flex-col bg-gray-100">
      <main class="flex-grow container mx-auto px-4 py-8">
        <div class="">
          <h2 class="text-3xl font-bold text-blue-700 mb-6">Mooring Pin Blog</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <span v-for="i in 9" :key="i" class="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col justify-between">
              <h3 class="text-2xl font-semibold mb-4">Blog #{{i}}</h3>
              <p class="mb-4">
                Mooring Pin was born from a passion for canal boat living and the need for a better way to find marinas. It all started when Matt, one of our co-founders, decided to embrace the boat life and move onto a canal boat. As he navigated the waterways, he quickly realized how challenging it could be to find marinas with the specific services he needed.
              </p>
              <button class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 self-end">Read More</button>
            </span>
          </div>
        </div>
        <div class="w-full text-center">
          <button class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 self-end mx-auto">Load More...</button>
        </div>
      </main>
    </div>
  </template>
  