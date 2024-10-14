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

  // Vite-Konfiguration für Preprocessing
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
      STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql',
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'http://localhost:1337',
      VUE_APP_TOKEN: process.env.VUE_APP_TOKEN || '',
    }
  },

  // Caching und Public Path Einstellungen
  nitro: {
    output: {
      publicDir: '.output/public', // Sicherstellen, dass statische Ressourcen hier abgelegt werden
    }
  },

  // Konfiguration des Public Path
  build: {
    publicPath: '/_nuxt/', // Stellt sicher, dass statische Dateien unter /_nuxt/ ausgeliefert werden
  },

  // Deaktivieren von clientseitigem Cache für Entwicklungs- und Debugging-Zwecke
  app: {
    head: {
      meta: [
        { name: 'Cache-Control', content: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' }
      ]
    }
  }
});
