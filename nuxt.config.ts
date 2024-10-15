export default defineNuxtConfig({
  pages: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Plugins
  plugins: [
    '@/plugins/pinia',
    '@/plugins/apollo',
    '@/plugins/bootstrap.client.js'
  ],

  // CSS und Bootstrap
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ],

  // Vite-Konfiguration
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@import "@/assets/styles/main.sass"\n`
        }
      }
    },
    optimizeDeps: {
      include: ['bootstrap']
    }
  },

  // Server-Side Rendering aktivieren
  ssr: true,

  // Runtime-Konfiguration für Umgebungsvariablen
  runtimeConfig: {
    public: {
      STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL || 'https://strapi.digimedialoop.de/graphql',
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'https://strapi.digimedialoop.de',
      VUE_APP_TOKEN: process.env.VUE_APP_TOKEN || '',
    }
  },

  // Nitro-Konfiguration für ISR und Prerendering
  nitro: {
    prerender: {
      crawlLinks: true, // Crawlt automatisch alle Links auf der Seite und generiert sie statisch
    },
  },

  // ISR für dynamische Routen
  routeRules: {
    "/**": { isr: true }, // Stellt sicher, dass alle Routen ISR verwenden
  },

  // Optimierung des Builds
  build: {
    publicPath: '/_nuxt/', // Stellt sicher, dass statische Dateien unter /_nuxt/ ausgeliefert werden
    extractCSS: true, // Extrahiere CSS-Dateien separat
  }
});
