<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-4xl font-bold mb-4">Counter: {{ counter.count }}</h1>
      <button
        @click="counter.increment"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
      <p class="mt-2 text-lg">Double: {{ counter.doubleCount }}</p>
    </div>
  </template>
  
  <script setup>
  import { useCounterStore } from '@/stores/counterStore';
  
  const counter = useCounterStore();
  </script>
  