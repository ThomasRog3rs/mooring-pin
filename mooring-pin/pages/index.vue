<template>
    <nav class="bg-blue-700" style="padding: 0px; padding-top: 10px; padding-bottom: 10px">
        <NuxtLink to="/" class="logo" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/images/logo.png" width="70"  alt="Logo" style="margin-right: -4px;">
            <h1 style="color: white; font-size: 25px; margin: 0;" class="font-bold">Mooring Pin</h1>
        </NuxtLink>
    </nav>

    <main class="mx-auto w-full max-w-screen-xl py-6 lg:py-8">
        <section id="search" class="p-[20px]">
            <div class="mb-4">
                <h1 class="mb-2 text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">Find <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">Marinas</span></h1>
                <p class="text-md font-normal text-gray-500 lg:text-xl dark:text-gray-600">Looking for nearby marinas? Enter a location, adjust the radius, or search directly by marina or canal name.</p>
            </div>
            <SearchForm></SearchForm>
        </section>
    </main>
</template>
  
  <script setup>
  import { useCounterStore } from '@/stores/counterStore';
  
  const counter = useCounterStore();
  </script>
  