// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
   '@vite-pwa/nuxt','@nuxt/ui','@pinia/nuxt', '@samk-dev/nuxt-vcalendar', '@formkit/auto-animate/nuxt','dayjs-nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
  
    manifest: {
      name: 'Timepassd',
      short_name: 'Timepassd',
      start_url: "/",
       description:"simple app to keep track of time",
      display: "standalone",
  orientation: "portrait",
      theme_color: '#00dc82',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
     workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  devtools: { enabled: true },
  devServer: {
    port:5000
  },
  dayjs: {
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
  }
})
