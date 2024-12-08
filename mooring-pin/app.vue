<template>
  <div>
    <nav class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-around">
        <NuxtLink to="/" class="hover:text-blue-400">Home</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-blue-400">Blog</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-blue-400">Contact</NuxtLink>
      </div>
    </nav>
    <NuxtPage />
  </div>
</template>
