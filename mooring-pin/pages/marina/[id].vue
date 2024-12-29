<template>
  <nav class="bg-blue-700 p-[25px] h-[80px]">
    <div class="flex justify-between text-white mx-auto w-full max-w-screen-xl">
      <span class="back w-20" @click="navigateBack">
        <svg class="w-6 h-6 text-white-800 inline-block mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
        </svg>
      </span>
    
      <span class="text-xl w-full text-center">
        {{marina?.type?.toLowerCase().charAt(0).toUpperCase() + marina?.type?.toLowerCase().slice(1)!}}
      </span>

      <span class="save w-20">
        <!-- <template>
          <svg @click="" class="w-6 h-6 mt-2 ml-2 text-[#facc15]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
          </svg>
        </template> -->
          <span> 
            <svg @click="" class="w-6 h-6 mt-2 ml-2 text-[#facc15]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
            </svg>
        </span>
      </span>
    </div>
  </nav>

  <main id="marina-details" class="p-[25px] mx-auto w-full max-w-screen-xl lg:p-8">
    <section id="marina-heading" class="flex justify-between">
      <h1 class="mb-2 text-2xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl">
        {{ marina?.name }}
      </h1>
    </section>

    <hr/>
    <div class="h-[25vh]">
        <div ref="map" class="w-1/1 h-full" id="map-container"></div>
    </div>
    <hr/>

    <h1>Hello, World!</h1>
    <h2>{{ marinaId }}</h2>
    <h3>{{ marina?.name }}</h3>
  </main>
</template>

<script setup lang="ts">
import { type MarinaModel } from '~/api-client';
import { useNavigateBack } from '~/composables/useNavigateBack';

const route = useRoute();
const marinaId = route.params.id as string;
const {navigateBack} = useNavigateBack();

const { data: marina } = await useFetch<MarinaModel>(`/api/marinas/${marinaId}`, {
  server: true
});

if (!marina.value) {
  throw createError({
    statusCode: 404,
    message: 'Marina not found'
  });
}

useHead({
  title: `Mooring Pin - details for ${marina.value.name}`,
  meta: [
    { name: 'description', content: 'Mooring Pin allows you to search for marinas, in the area you need with the services you want' },
    { property: 'og:title', content: `Mooring Pin - details for ${marina.value.name}` },
    { property: 'og:description', content: `View the details for the '${marina.value.name}' to help you decide if its the marina for you.` },
    { property: 'og:image', content: '/_nuxt/assets/images/og-image.png' },
    { property: 'og:type', content: 'website' },
    { name: 'robots', content: 'index, follow' },
  ]
});
</script>