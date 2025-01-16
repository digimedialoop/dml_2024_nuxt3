export default defineNuxtConfig({
  pages: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'de' // Standard-Sprache auf Deutsch
      }
    },
    baseURL: '/',
  },

  // Plugins
  plugins: [
    '@/plugins/pinia',
    '@/plugins/bootstrap.client.js'
  ],

  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
  ],

  sitemap: {
    siteUrl: process.env.NODE_ENV === 'production' ? 'https://test.digimedialoop.de' : 'http://localhost:3000',
  },

  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch', iso: 'de-DE', file: 'de.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'es', name: 'Español', iso: 'es-ES', file: 'es.json' }
    ],
    defaultLocale: 'de',
    lazy: true,
    langDir: 'locales/',
    vueI18n: './i18n.config.js',
  },

  // CSS und Bootstrap
  css: ['bootstrap/dist/css/bootstrap.min.css'],

  // Apollo-Konfiguration
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.STRAPI_GRAPHQL_URL || 'https://strapi.digimedialoop.de/graphql',
        httpLinkOptions: {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
          },
        },
      },
    },
  },

  // Vite-Konfiguration
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@import "@/assets/styles/main.sass"\n`
        }
      }
    },
    server: {
      hmr: {
        protocol: process.env.NODE_ENV === 'development' ? 'ws' : 'wss',
        host: process.env.NODE_ENV === 'development' ? 'localhost' : 'test.digimedialoop.de',
        port: process.env.NODE_ENV === 'development' ? 3000 : 443,
      },
    },
    resolve: {
      alias: {
        assets: process.env.NODE_ENV === 'production' ? '/public/assets' : '/assets',
      },
    },
  },

  // Server-Side Rendering deaktivieren (für CSR)
  ssr: false,

  // Runtime-Konfiguration für Umgebungsvariablen
  runtimeConfig: {
    public: {
      STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL || 'https://strapi.digimedialoop.de/graphql',
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'https://strapi.digimedialoop.de',
      VUE_APP_TOKEN: process.env.VUE_APP_TOKEN || '',
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/", 
        "/referenzen",
        "/kontakt",
        "/leistungen",
        "/news"
      ],
    },
  },

  routeRules: {
    "/referenzen": { isr: { revalidate: 600 } },
    "/kontakt": { isr: { revalidate: 3600 } },
    "/leistungen": { isr: { revalidate: 1800 } },
    "/news": { isr: { revalidate: 300 } },
    "/projekt/**": { isr: { revalidate: 600 } },
    "/**": { isr: true },
  },

  build: {
    publicPath: '/_nuxt/',
    extractCSS: true,
    splitChunks: {
      layouts: true,
    },
    modern: true,
  }
});
