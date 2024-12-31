<template>
  <nav class="bg-blue-700 p-[25px] h-[80px]">
    <div class="flex justify-between text-white mx-auto w-full max-w-screen-xl px-8">
      <span @click="navigateBack">
        <span>
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </span>
      </span>
    
      <span class="text-xl w-full text-center">
        {{marina?.type?.toLowerCase().charAt(0).toUpperCase() + marina?.type?.toLowerCase().slice(1)!}}
      </span>

      <span>
        <!-- <span>
          <font-awesome-icon :icon="['fas', 'bookmark']" />
        </span> -->
        <span> 
          <font-awesome-icon :icon="['far', 'bookmark']" />
        </span>
      </span>
    </div>
  </nav>
  <main id="marina-overview" class="mx-auto w-full max-w-screen-xl py-8 px-8">
    <section id="marina-heading" class="flex justify-between">
      <h1 class="mb-2 text-2xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl">
        {{ marina?.name }}
      </h1>
    </section>
    

    <section id="marina-map-conatiner" class="mb-4">
      <MapboxMap
          :map-id="marina?.id"
          class="h-[25vh] rounded-lg w-[100%] shadow-md"
          :options="{
            style: 'mapbox://styles/mapbox/streets-v12',
            center: theMarinaCoords,
            zoom: 14.2
          }"
          @load="addMarker"
        />
    </section>

    <section id="marina-details">
      <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.address != undefined || marina?.website != undefined">
        <template v-if="marina?.address != undefined"> 
          <h4 class="mr-2 font-medium">Address:</h4>
          <p v-if="marina?.address != undefined">{{ marina?.address }}</p>
          <a 
            :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(marina?.address)}`" 
            target="_blank" 
            class="text-blue-600 underline"
          >
            <font-awesome-icon :icon="['fas', 'location-dot']" />
            Get Directions
          </a>
        </template>

        <template v-if="marina?.website != undefined">
          <h4 class="mt-2 mr-2 font-medium">Website:</h4>
          <a v-if="marina?.website != undefined" :href="marina?.website" target="_blank" class="underline text-blue-600">
            <font-awesome-icon :icon="['fas', 'link']" />
            Website 
          </a>
        </template>
      </div>
      
      <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.phoneNumber != undefined">
        <h4 class="mr-2 font-medium">Phone Number:</h4>
        <a :href="`tel:${marina.phoneNumber}`" class="text-blue-600 underline">
          <font-awesome-icon :icon="['fas', 'phone']" />
          {{ marina.phoneNumber }}
        </a>
      </div>

      <div id="marina-notes" class="mb-2 p-4 border-4 rounded-lg" v-if="marina?.services?.length! > 0">
        <h4 class="mr-2 font-medium">Services:</h4>
        <ul style="list-style: inside; margin-bottom: 15px;">
            <li v-for="service in marina?.services" :key="service.id">{{ service.serviceType?.value }}</li>
        </ul>
      </div>
    </section>
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