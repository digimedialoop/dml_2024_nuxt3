export default defineNuxtConfig({
  pages: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
    '@/plugins/pinia',
    '@/plugins/apollo',
    '@/plugins/bootstrap.client.js'
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ],
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
  ssr: true,
  runtimeConfig: {
    public: {
      STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql',
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'http://localhost:1337',
      VUE_APP_TOKEN: process.env.VUE_APP_TOKEN || '',
    }
  }
});
