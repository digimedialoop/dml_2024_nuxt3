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

  modules: [
    'nuxt-simple-sitemap',
  ],

  sitemap: {
    siteUrl: 'https://test.digimedialoop.de', // Ersetze dies durch deine eigene URL
  },

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
    },
    server: {
      hmr: {
        protocol: "wss",  // WebSocket-Protokoll
        clientPort: 443,  // SSL-Port für den Client
        path: "hmr/",     // Pfad für HMR
      },
    }
  },

  // Server-Side Rendering deaktivieren (für CSR)
  ssr: true,

  // Runtime-Konfiguration für Umgebungsvariablen
  runtimeConfig: {
    public: {
      STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL || 'https://strapi.digimedialoop.de/graphql',
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'https://strapi.digimedialoop.de',
      VUE_APP_TOKEN: process.env.VUE_APP_TOKEN || '',
    }
  },

  // Nitro-Konfiguration für ISR
  nitro: {
    prerender: {
      crawlLinks: true, // Automatisches Crawling von Links für Prerendering
      routes: [
        "/", 
        "/referenzen",
        "/kontakt",
        "/leistungen",
        "/news"
      ],
    },
  },

  // ISR für dynamische Routen
  routeRules: {
    "/referenzen": { isr: { revalidate: 600 } }, // Revalidation alle 10 Minuten
    "/kontakt": { isr: { revalidate: 3600 } }, // Revalidation alle 1 Stunde
    "/leistungen": { isr: { revalidate: 1800 } }, // Revalidation alle 30 Minuten
    "/news": { isr: { revalidate: 300 } }, // Revalidation alle 5 Minuten
    "/projekt/**": { isr: { revalidate: 600 } }, // Revalidation alle 10 Minuten für alle Projekte
    "/**": { isr: true }, // ISR für alle anderen Seiten
  },

  // Optimierung des Builds
  build: {
    publicPath: '/_nuxt/', // Statische Dateien unter /_nuxt/
    extractCSS: true, // Extrahiere CSS in separate Dateien
  }
});
