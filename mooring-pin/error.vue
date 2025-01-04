<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

console.error(props.error);

const handleError = () => clearError({ redirect: '/' })

</script>

<template>
    <div class="min-h-screen flex flex-col bg-blue-700 text-white">
        <NavBar></NavBar>
        <div class="flex-1 flex flex-col items-center justify-center text-center mt-10">
            <h1 class="text-6xl font-bold text-yellow-500 mb-4">Oops! {{error?.statusCode}}</h1>
            <p class="text-xl mb-2 text-white">Sorry, {{error?.message ?? "something has gone wrong"}}.</p>
            <!-- <p class="text-xl mb-2 text-white" v-html="error?.stack"></p> -->
            <p class="text-lg text-white mb-4">But don't worry, you can always go back to a safe place.</p>
            <button @click="handleError" class="bg-yellow-500 text-blue-700 hover:bg-yellow-400 py-2 px-6 rounded-lg font-semibold transition">
                Go Back Home
            </button>
        </div>
        <Footer></Footer>
    </div>
</template>
