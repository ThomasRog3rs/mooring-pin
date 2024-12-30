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
    

    <section class="marina-map-conatiner mb-4">
      <MapboxMap
          :map-id="marina?.id"
          style="width: 100%;  height: 25vh; border-radius: 10px;"
          :options="{
            style: 'mapbox://styles/mapbox/streets-v12',
            center: theMarinaCoords,
            zoom: 14.2
          }"
          @load="addMarker"
        />
    </section>

    <section>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.address != undefined || marina?.website != undefined">
              <template v-if="marina?.address != undefined"> 
                <h4 class="mr-2 font-medium">Address:</h4>
                <p v-if="marina?.address != undefined">{{ marina?.address }}</p>
                  <!-- Link to open Google Maps with directions -->
  <a 
    :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(marina?.address)}`" 
    target="_blank" 
    class="text-blue-600 underline"
  >
  <svg class="w-6 h-6 underline" style="display: inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>

    Get Directions
  </a>
              </template>

              <template v-if="marina?.website != undefined">
                <h4 class="mt-2 mr-2 font-medium">Website:</h4>
                <a v-if="marina?.website != undefined" :href="marina?.website" target="_blank" class="underline text-blue-600">
                  <svg class="w-6 h-6 underline" style="display: inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
</svg>Website 

                </a>
              </template>
            </div>
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.phoneNumber != undefined">
    <h4 class="mr-2 font-medium">Phone Number:</h4>
    <p style="display: inline-block;" class="text-base">
        <a :href="`tel:${marina.phoneNumber}`" class="text-blue-600 underline">
          <svg class="w-6 h-6 underline" style="display: inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
</svg>

            {{ marina.phoneNumber }}
        </a>
    </p>
</div>

            <!-- <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.notes != undefined">
                <h4 class="mr-2 font-medium">Notes:</h4>
                <p style="display: inline-block;" class="text-base">{{ marina?.notes }}</p>
            </div> -->
            <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.services?.length! > 0">
                <h4 class="mr-2 font-medium">Services:</h4>
                <ul style="list-style: inside; margin-bottom: 15px;">
                    <li v-for="service in marina?.services" :key="service.id">{{ service.serviceType?.value }}</li>
                </ul>
              </div>
        </section>

    <!-- <h1>Hello, World!</h1>
    <h2>{{ marinaId }}</h2>
    <h3>{{ marina?.name }}</h3>
    <h4>{{ marina?.geoJsonId }}</h4> -->
  </main>
</template>

<script setup lang="ts">
  import mapboxgl, {Map} from 'mapbox-gl';

  import { type GeoJsonModel, type MarinaModel } from '~/api-client';
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

  const theMarinaCoords = marinaGeoJson?.value?.features![0].geometry?.coordinates!;

  const addMarker = (map: Map) => {
      new mapboxgl.Marker({ color: '#1d4ed8' })
        //@ts-ignore
        .setLngLat(theMarinaCoords)
        .addTo(map);
    }

</script>

<style>
  div.marina-map-conatiner{
    height: 100%;
  }
</style>