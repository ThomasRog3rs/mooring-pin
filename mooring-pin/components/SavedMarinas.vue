<template>
  <template v-if="savedMarinasStore?.savedMarinas?.length! > 0"> 
    <section id="saved" >
        <div style="padding: 20px; padding-bottom: 0px;">
          <h1 class="text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">
            Your Saved
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">
              Marinas
            </span>
          </h1>
        </div>

        <div class="p-5" v-if="savedMarinasStore.savedMarinas">
            <div v-if="savedMarinasStore.savedMarinas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SimpleCard v-for="marina in savedMarinasStore.savedMarinas" :key="marina.id!" class="w-full">
                    <NuxtLink :to="`/marina/name/${getMarinaSlug(marina.name!)}`">
                        <h2 class="mb-2 text-2xl font-bold text-gray-700 md:text-2xl lg:text-3xl">{{ marina.name }}</h2>
                    </NuxtLink>
                </SimpleCard>
            </div>
        </div>
        <span v-else>We can not show saved Marinas</span>
    </section>
  </template>
</template>

<script setup lang="ts">
import {useSavedMarinasStore} from '~/stores/savedMarinas.store';
const {getMarinaSlug} = useGetMarinaSlug();
const savedMarinasStore = useSavedMarinasStore();
</script>
