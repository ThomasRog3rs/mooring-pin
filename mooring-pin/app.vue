<template>
  <NavBar></NavBar>
  <div>
    <NuxtPage />
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
  import { useHead } from '#app';
  
  useHead({
    title: 'Mooring Pin - search for the marinas you need',
    htmlAttrs: {
      lang: 'en-GB'
    },
    meta: [
      { name: 'description', content: 'Mooring Pin allows you to search for marinas, in the area you need with the services you want' },
      { property: 'og:title', content: 'Mooring Pin' },
      { property: 'og:description', content: 'Mooring Pin - search for marinas, in the area you need with the services you want' },
      { property: 'og:image', content: '/_nuxt/assets/images/og-image.png' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
    ]
  });
</script>