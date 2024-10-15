import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { defineNuxtPlugin } from '#app';

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
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  if (process.client) {
    // Stelle sicher, dass der Apollo-Client den Cache vom SSR übernimmt (nicht mehr notwendig für CSR)
    const cacheData = window.__APOLLO_STATE__;
    if (cacheData) {
      apolloClient.cache.restore(cacheData);
    }
  }

  nuxtApp.provide('apolloClient', apolloClient);
});
