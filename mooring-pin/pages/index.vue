<template>
    <NavBar></NavBar>
    <main class="mx-auto w-full max-w-screen-xl py-6 lg:py-8">
        <section id="search" class="p-[20px]">
            <div class="mb-4">
                <h1 class="mb-2 text-2xl font-extrabold text-gray-700 md:text-5xl lg:text-6xl">Find <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-blue-700">Marinas</span></h1>
                <p class="text-md font-normal text-gray-500 lg:text-xl dark:text-gray-600">Looking for nearby marinas? Enter a location, adjust the radius, or search directly by marina or canal name.</p>
            </div>
            <SearchForm @searched=""></SearchForm>
        </section>

        <SavedMarinas v-show="savedMarinasStore.savedMarinas?.length! > 0"></SavedMarinas>

        <ClosestMarinas v-show="searchStore.userLocation"></ClosestMarinas>

        <ClaimMarinaSection></ClaimMarinaSection>
    </main>
    <Footer></Footer>
</template>
  
<script setup lang="ts">
import Footer from '~/components/Footer.vue';
import { useSearchStore } from '~/stores/search.store';
import { useSavedMarinasStore } from '~/stores/savedMarinas.store';
const searchStore = useSearchStore();
const savedMarinasStore = useSavedMarinasStore();
</script>
  