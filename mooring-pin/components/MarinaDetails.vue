<template>
    <nav class="bg-blue-700 p-[25px] h-[80px]">
      <div class="flex justify-between text-white mx-auto w-full max-w-screen-xl px-8">
        <span @click="navigateBack" class="hover:cursor-pointer">
          <span>
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </span>
        </span>
      
        <span class="text-xl w-full text-center">
          {{marina?.type?.toLowerCase().charAt(0).toUpperCase() + marina?.type?.toLowerCase().slice(1)!}}
        </span>
  
        <span class="hover:cursor-pointer">
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
        <span v-show="mapLoaded">
          <MapboxMap
            :map-id="marina?.id!"
            class="h-[25vh] rounded-lg w-[100%] shadow-md"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: coords as LngLatLike,
              zoom: 14.2
            }"
            @load="addMarker"
          />
        </span>
  
        <div class="loading-placeholder h-[25vh] w-full bg-gray-200 rounded-lg shadow-md animate-pulse" v-show="!mapLoaded">
          <div class="loading mr-5">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="shine"></div>
        </div>
      </section>
  
      <section id="marina-details">
        <span class="flex space-x-4 w-full mb-4">
            <!-- Share Button -->
            <button 
                @click="shareMarina" 
                class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"
            >
                <font-awesome-icon v-show="!hasCopiedUrlToClip" :icon="['fas', 'fa-share-alt']" />
                <span class="ml-2" v-show="!hasCopiedUrlToClip">Share</span>

                <font-awesome-icon v-show="hasCopiedUrlToClip" :icon="['fas', 'check']" />
                <span class="ml-2" v-show="hasCopiedUrlToClip">Copied to clipboard</span>

            </button>

            <!-- Save Button -->
            <button 
                class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 w-full"
            >
                <font-awesome-icon :icon="['fas', 'fa-bookmark']" />
                <i class="fas  mr-2"></i>
                <span class="ml-2">Save</span>
            </button>
        </span>

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
    import mapboxgl, {Map, type LngLatLike} from 'mapbox-gl';
    import { type MarinaModel } from '~/api-client';

    const {navigateBack} = useNavigateBack();
    const {copyUrlToClipBoard} = useCopyUrlToClipBoard();

    const hasCopiedUrlToClip = ref<boolean>(false);

    const shareMarina = async () => {
        hasCopiedUrlToClip.value = await copyUrlToClipBoard();

        setTimeout(() => {
            hasCopiedUrlToClip.value = false;
        }, 3000)
    }

    const { marina, theMarinaCoords } = defineProps<{
        marina: MarinaModel;
        theMarinaCoords?: number[];
    }>();

    const coords = ref<number[]>(theMarinaCoords ?? useState('theMarinaCoords').value as number[]);

    const mapLoaded = ref<boolean>(false);

    const addMarker = (map: Map) => {
        new mapboxgl.Marker({ color: '#1d4ed8' })
        //@ts-ignore
        .setLngLat(theMarinaCoords)
        .addTo(map);
        
        mapLoaded.value = true;
    }
</script>

<style scoped>
.loading-placeholder {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.612) 50%, rgba(255, 255, 255, 0) 100%);
  animation: shine 1.5s ease-in-out infinite alternate;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.loading {
  position: relative;
  width: 10px;
  display: flex;
  align-items: center;
  margin-top: 20px; /* Adjust margin-top to create space between h1 and loading */
}

.loading span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #1d4ed8;
    border-radius: 10px;
    position: absolute;
}

.loading span:first-child {
    animation: loading-span1 1.3s infinite;
    left: 0;
}

.loading span:nth-child(2) {
    animation: loading-span2 1.3s infinite;
    left: 15px;
}

.loading span:nth-child(3){
    animation: loading-span3 1.3s infinite;
    left: 30px;
}

@keyframes loading-span1 {
    0% {
        height: 10px;
    }
    25% {
        height: 20px;
    }
    50% {
        height: 10px;
    }
    100% {
        height: 10px;
    }
}

@keyframes loading-span2 {
    0% {
        height: 10px;
    }
    25% {
        height: 10px;
    }
    50% {
        height: 20px;
    }
    75% {
        height: 10px;
    }
    100% {
        height: 10px;
    }
}

@keyframes loading-span3 {
    0% {
        height: 10px;
    }
    25% {
        height: 10px;
    }
    50% {
        height: 10px;
    }
    75% {
        height: 20px;
    }
    100% {
        height: 10px;
    }
}
</style>