import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const token = runtimeConfig.public.VUE_APP_TOKEN;

  const httpLink = new HttpLink({
    uri: runtimeConfig.public.STRAPI_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // Apollo-Client im Nuxt-Plugin registrieren
  nuxtApp.provide('apolloClient', apolloClient);
});
