<template>
  <MarinaDetails :marina="marina!" :theMarinaCoords="theMarinaCoords"></MarinaDetails>
</template>

<script setup lang="ts">
  import { type GeoJsonModel, type MarinaModel } from '~/api-client';  

  const route = useRoute();
  const marinaId = route.params.id as string;

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
      { property: 'og:title', content: `Mooring Pin - ${marina.value.name} details` },
      { property: 'og:description', content: `View the details for the '${marina.value.name}' to help you decide if its the marina for you.` },
      { property: 'og:image', content: '/_nuxt/assets/images/og-image.png' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
    ]
  });


  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const { data: marinaGeoJson, error : geoJsonError} = await useFetch<GeoJsonModel>(`/GeoJson/geoJsonById?id=${marina?.value?.geoJsonId}`, {
    server: true,
    baseURL: apiBaseUrl
  });

  if (geoJsonError.value || !marinaGeoJson.value) {
    console.warn('Marina location data not found:', geoJsonError.value || 'No data returned');
    // To Do: add some logging for this
    marinaGeoJson.value = null;
  }

  const theMarinaCoords = useState('theMarinaCoords', () => marinaGeoJson?.value?.features![0].geometry?.coordinates!);
</script>