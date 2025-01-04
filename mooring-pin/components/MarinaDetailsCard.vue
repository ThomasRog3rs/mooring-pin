<template>
    <div class="bg-white border border-gray-500 rounded-lg shadow-md mb-4 mt-2">
        <div class="p-5">
            <NuxtLink  :to="{ path: `/marina/name/${marina.name}/` }" class="flex justify-between">
                <h2 class="mb-2 text-2xl font-bold text-gray-700 md:text-2xl lg:text-3xl"> {{ marina.name }}</h2>
                <span class="text-yellow-400 font-lg" v-if="savedMarinasStore.isMarinaSaved(marina.id!)">
                    <font-awesome-icon :icon="['fas', 'bookmark']" size="xl" />
                </span>
            </NuxtLink>

            <ul class="text-md font-normal text-gray-800 lg:text-xl list-inside mb-4">
                <li v-if="marina.canalName">Canal: {{ marina.canalName }}</li>
                <li>{{ marina.services?.length }} service(s)</li>
                <li v-if="marina.distanceFromUser! > 0">Distance from you: {{ (marina.distanceFromUser!).toFixed(2) }} miles</li>
                <li v-if="marina.distanceFromSearch! > 0">Distance from search: {{ (marina.distanceFromSearch!).toFixed(2) }} miles</li>
            </ul>

            <span class="flex">
                <NuxtLink :to="{ path: `/marina/name/${marina.name}/` }" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    View Details
                    <span class="ml-2" style="font-size: 15px">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </span>
                </NuxtLink>

                <div class="ml-auto">
                    <span v-if="marina.phoneNumber">
                    <span class="text-blue-600 mr-2">
                        <font-awesome-icon :icon="['fas', 'phone']" size="lg" />
                    </span>
                    </span>
                    <span v-if="marina.website">
                        <span class="text-blue-600 mr-2">
                            <font-awesome-icon :icon="['fas', 'link']" size="lg" />
                        </span>
                    </span>
                    <span v-if="marina.services?.length! > 0">
                        <span class="text-blue-600">
                            <font-awesome-icon :icon="['fas', 'life-ring']" size="lg" />   
                        </span>
                    </span>
                </div> 
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type MarinaModel } from '~/api-client';
import { useSavedMarinasStore } from "~/stores/savedMarinas.store";

const savedMarinasStore = useSavedMarinasStore();

const props = defineProps({
  marina: {
    type: Object as () => MarinaModel,
    required: true
  }
});

</script>