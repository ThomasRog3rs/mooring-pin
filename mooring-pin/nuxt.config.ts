// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@pinia/nuxt'],
  css: ['@/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VITE_API_URL || 'http://localhost:5000', // Default to localhost if not set
    },
  }
})
