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
  },
  app: {
    head: {
      title: 'Mooring Pin - search for the marinas you need',
      meta: [
        { name: 'description', content: 'Mooring Pin allows you to search for marinas, in the area you need with the services you want' },
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'apple-mobile-web-app-title', content: 'Mooring Pin' },
        { name: 'application-name', content: 'Mooring Pin' },
        { name: 'msapplication-TileColor', content: '#1d4ed8' },
        { name: 'theme-color', content: '#1d4ed8' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/_nuxt/assets/favi/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/_nuxt/assets/favi/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/_nuxt/assets/favi/favicon-16x16.png' },
        { rel: 'manifest', href: '/_nuxt/assets/favi/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1d4ed8' },
      ]
    },
  }
})
