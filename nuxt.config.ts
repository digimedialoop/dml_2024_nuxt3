import graphql from 'vite-plugin-graphql';

export default defineNuxtConfig({
  pages: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
    '@/plugins/pinia',  // Pinia Plugin hinzufügen
    '@/plugins/apollo',  // Apollo Plugin hinzufügen
    '@/plugins/bootstrap.client.js'  // Bootstrap JS Plugin hinzufügen (falls JS-Komponenten benötigt werden)
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',  // Bootstrap CSS einbinden
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
      include: ['bootstrap']  // Bootstrap als optimierte Abhängigkeit einfügen
    }
  },
  runtimeConfig: {
    public: {
      STRAPI_GRAPHQL_URL: process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql',
      VUE_APP_API_URL: process.env.VUE_APP_API_URL || 'http://localhost:1337',
      VUE_APP_TOKEN: process.env.VUE_APP_TOKEN || '', // JWT-Token aus .env hinzufügen
    }
  }
});
