import { defineStore } from 'pinia';
import { useApolloClient } from '@vue/apollo-composable';
import { STRAPI_DATA } from '@/graphQL/main.gql';

export const useMainStore = defineStore('main', {
  state: () => {
    const runtimeConfig = useRuntimeConfig(); // Greife auf die Runtime Config zu
    return {
      scrollPosition: 0,
      contactBoxOpen: false,
      cmsUrl: runtimeConfig.public.VUE_APP_API_URL || '',  // Setze cmsUrl direkt aus der Config
      graphQLUrl: runtimeConfig.public.STRAPI_GRAPHQL_URL || '',
      companyinfo: {},  // Speicherort für die abgerufenen Firmendaten
      customers: [],  // Speicherort für die Kundenliste
    };
  },

  actions: {
    setScrollPosition(position: number) {
      this.scrollPosition = position;
    },

    // Fetch company info and customers from Apollo Client
    async fetchStrapiData() {
      const apolloClient = useApolloClient().client;  // Verwende den Apollo Client
    
      try {
        const { data } = await apolloClient.query({
          query: STRAPI_DATA,
        });

        // Speichere die Company Info
        if (data?.companyinfo?.data?.attributes) {
          this.companyinfo = data.companyinfo.data.attributes;
          console.log('Company Info erfolgreich gesetzt:', this.companyinfo);
        }

        // Speichere die Customer Daten
        if (data?.customers?.data) {
          this.customers = data.customers.data.map(customer => customer.attributes);
          console.log('Kunden erfolgreich gesetzt:', this.customers);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Firmendaten und Kunden:', error);
      }
    },

    // Action zur Überwachung der Scroll-Position
    monitorScroll() {
      const updateScrollPosition = () => {
        this.setScrollPosition(window.scrollY);  // Scroll-Position aktualisieren
      };

      // Scroll-Event-Listener hinzufügen
      window.addEventListener('scroll', updateScrollPosition);

      // Cleanup (optional): Event-Listener beim Entfernen der Komponente abmelden
      return () => {
        window.removeEventListener('scroll', updateScrollPosition);
      };
    }
  },
});
