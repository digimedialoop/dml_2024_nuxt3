import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { defineNuxtPlugin } from '#app';
import { onServerPrefetch } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const token = runtimeConfig.public.VUE_APP_TOKEN;

  const httpLink = new HttpLink({
    uri: runtimeConfig.public.STRAPI_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    ssrMode: process.server, // WICHTIG für SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  if (process.server) {
    onServerPrefetch(() => {
      // Extrahiere den Apollo-Cache und füge ihn dem SSR-Context hinzu
      nuxtApp.hook('render:routeContext', (context) => {
        context.apolloState = apolloClient.extract();
      });
    });
  }

  if (process.client) {
    // Stelle sicher, dass der Apollo-Client den Cache vom SSR übernimmt
    const cacheData = window.__APOLLO_STATE__;
    if (cacheData) {
      apolloClient.cache.restore(cacheData);
    }
  }

  nuxtApp.provide('apolloClient', apolloClient);
});
