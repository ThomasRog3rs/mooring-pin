<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { useHead } from '#app';
  import { type LocationResult } from '~/types/userLocation';
  import { useSearchStore } from '~/stores/search.store';

  const searchStore = useSearchStore();

  useHead({
    title: 'Mooring Pin - search for the marinas you need',
    meta: [
      { name: 'description', content: 'Mooring Pin allows you to search for marinas, in the area you need with the services you want' },
      { property: 'og:title', content: 'Mooring Pin' },
      { property: 'og:description', content: 'Mooring Pin - search for marinas, in the area you need with the services you want' },
      { property: 'og:image', content: '/_nuxt/assets/images/og-image.png' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
    ]
  });

  const { requestUserLocation } = useRequestUserLocation();

  onMounted(async () => {
    const locationResult: LocationResult =  await requestUserLocation();

    if(locationResult.error.value){
      alert("We have a location error: " + locationResult.error.value);
      return;
    }
    
    const userLocation = locationResult.userLocation.value;
    searchStore.userLocation = `${userLocation?.longitude}, ${userLocation?.latitude}`;
  });
</script>