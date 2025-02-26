// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mapbox', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/image'],
  mapbox: {
    accessToken: process.env.VITE_MapBox_API_KEY
  },
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  runtimeConfig: {
    apiBaseUrl: process.env.VITE_API_URL || 'http://localhost:5000',
    public: {
      apiBaseUrl: process.env.VITE_API_URL || 'http://localhost:5000', // Default to localhost if not set
      apiMapboxKey: process.env.NUXT_API_KEY
    },
  },
  routeRules: {
    '/privacy-policy': {redirect: '/privacy-policy.html'},
    '/cookie-policy': {redirect: '/cookie-policy.html'}
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
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      'pinia-plugin-persistedstate'
    ]
  },
  server: {
    host: '0.0.0.0', // Ensures the app listens on all available network interfaces
    port: process.env.PORT || 3000 // Default to port 3000 or use the environment variable PORT
  },
})
