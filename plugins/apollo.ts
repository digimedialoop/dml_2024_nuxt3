import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';  // Authentifizierungsmiddleware importieren
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  // Zugriff auf die RuntimeConfig
  const runtimeConfig = useRuntimeConfig();

  // Hole den JWT-Token aus der RuntimeConfig
  const token = runtimeConfig.public.VUE_APP_TOKEN;

  // HTTP-Link (für GraphQL-Endpunkt)
  const httpLink = new HttpLink({
    uri: runtimeConfig.public.STRAPI_GRAPHQL_URL,
  });

  // Authentifizierungs-Link (fügt den Authorization-Header zu allen Anfragen hinzu)
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',  // Füge den JWT-Token hinzu, falls vorhanden
      }
    };
  });

  // Apollo-Client mit authLink und httpLink erstellen
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),  // Verbinde authLink mit httpLink
    cache: new InMemoryCache(),
  });

  // Apollo-Client in der Nuxt-App bereitstellen, damit er überall verfügbar ist
  nuxtApp.provide('apolloClient', apolloClient);
});
