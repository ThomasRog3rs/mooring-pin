<template>
  <div class="container mx-auto px-4 py-8 mb-6">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm mb-6">
      <div class="container mx-auto py-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-800 truncate">{{ marina.name }}</h1>
        <div class="flex space-x-2">
          <button @click="shareMarina" class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full">
            <font-awesome-icon v-show="!hasCopiedUrlToClip" :icon="['fas', 'fa-share-alt']" />
            <span class="ml-2" v-show="!hasCopiedUrlToClip">Share</span>

            <font-awesome-icon v-show="hasCopiedUrlToClip" :icon="['fas', 'check']" />
            <span class="ml-2" v-show="hasCopiedUrlToClip">Link Copied</span>
          </button>
          <button 
                @click="saveBtnEvent"
                class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 w-full"
            >
                <span class="mr-2" v-show="isMarinaSaved">
                  <font-awesome-icon :icon="['fas', 'bookmark']" />
                </span>
                <span class="mr-2" v-show="!isMarinaSaved"> 
                  <font-awesome-icon :icon="['far', 'bookmark']" />
                </span>
                <span class="ml-2">{{isMarinaSaved ? "Remove" : "Bookmark"}}</span>
            </button>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
        <span v-show="mapLoaded" class="h-full min-h-[40vh]">
          <MapboxMap
            :map-id="marina?.id!"
            class="h-full min-h-[40vh] w-full rounded-lg shadow-md"
            :options="{
              style: 'mapbox://styles/mapbox/streets-v12',
              center: coords as LngLatLike,
              zoom: 14.2
            }"
            @load="addMarker"
          />
        </span>
        <div v-show="!mapLoaded" class="h-full w-full min-h-[40vh] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          Loading map...
        </div>
      </div>

      <div>
        <div class="bg-white rounded-lg shadow-md p-4 border mb-4">
          <div class="flex flex-row justify-between">
            <h2 class="text-xl font-semibold flex items-center mb-2">
              Marina Details
            </h2>
              
            <span class="hover:cursor-pointer" @click="saveBtnEvent">
              <span v-show="isMarinaSaved" class="text-yellow-500">
                <font-awesome-icon :icon="['fas', 'bookmark']" size="xl" />
              </span>
              <span v-show="!isMarinaSaved"> 
                <font-awesome-icon :icon="['far', 'bookmark']" size="xl"/>
              </span>
            </span>
          </div>

          <hr />

          <div v-if="marina.address" class="my-4">
              <h2 class="text-lg font-semibold flex items-center mb-2">
              Address
              </h2>
              <p class="text-gray-600 mb-2">{{ marina.address }}</p>
              <a
                :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(marina.address)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="mr-2"> 
                  <font-awesome-icon :icon="['fas', 'diamond-turn-right']" size="lg" />
                </span>
                Get Directions
              </a>
          </div>
          <div v-if="marina.website || marina.phoneNumber" class="my-2">
            <h2 class="text-lg font-semibold flex items-center mb-2">
              Contact details
            </h2>
            <div v-if="marina.website" class="my-4">
              <a
                :href="marina.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="mr-2">
                  <font-awesome-icon :icon="['fas', 'link']" size="lg"/>
                </span>
                Visit Website
              </a>
            </div>
            <div v-if="marina.phoneNumber">
              <a
                :href="`tel:${marina.phoneNumber}`"
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="mr-2">
                  <font-awesome-icon :icon="['fas', 'phone']" size="lg"/>            
                </span>
                {{ marina.phoneNumber }}
              </a>
            </div>
        </div>
      </div>
      <div v-if="marina.services && marina.services.length > 0" class="bg-white rounded-lg shadow-md p-4 border my-4">
        <h2 class="text-lg font-semibold mb-2">Services</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="service in marina.services"
            :key="service.id"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {{ service.serviceType?.value}}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- <ClaimMarinaSection class="!p-0"></ClaimMarinaSection> -->
</div>
</template>

<script setup lang="ts">
    import mapboxgl, {Map, type LngLatLike} from 'mapbox-gl';
    import { type MarinaModel } from '~/api-client';
    import { useSavedMarinasStore } from '~/stores/savedMarinas.store';

    const { marina, theMarinaCoords } = defineProps<{
        marina: MarinaModel;
        theMarinaCoords?: number[];
    }>();

    const {navigateBack} = useNavigateBack();
    const {copyUrlToClipBoard} = useCopyUrlToClipBoard();

    const savedMarinasStore = useSavedMarinasStore();
    const {savedMarinas} = storeToRefs(savedMarinasStore);

    const coords = ref<number[]>(theMarinaCoords ?? useState(`theMarinaCoords:${marina.id}`).value as number[]);

    const hasCopiedUrlToClip = ref<boolean>(false);
    const shareMarina = async () => {
        hasCopiedUrlToClip.value = await copyUrlToClipBoard();

        setTimeout(() => {
            hasCopiedUrlToClip.value = false;
        }, 3000)
    }

    const isMarinaSaved = computed<boolean>(() => {
      return (savedMarinas.value ?? []).some(x => x.id === marina.id)
    });

    const saveBtnEvent = () => {
      if(marina == undefined) return; 

      if(isMarinaSaved.value){
        savedMarinasStore.unSaveMarina(marina?.id!);
        return;
      }

      savedMarinasStore.saveMarina(marina);
    }

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