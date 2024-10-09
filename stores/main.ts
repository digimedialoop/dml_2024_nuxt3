import { defineStore } from 'pinia';
import { STRAPI_DATA } from '@/graphQL/main.gql';
import { useNuxtApp } from '#app'; // Zugriff auf den Apollo Client

export const useMainStore = defineStore('main', {
  state: () => {
    const runtimeConfig = useRuntimeConfig(); // Zugriff auf RuntimeConfig für Umgebungsvariablen
    return {
      scrollPosition: 0,
      screenWidth: 0,
      contactBoxOpen: false,
      cmsUrl: runtimeConfig.public.VUE_APP_API_URL || '',
      graphQLUrl: runtimeConfig.public.STRAPI_GRAPHQL_URL || '',
      companyinfo: {},
      customers: [],
      projects: [],
    };
  },

  actions: {
    // Funktion zum Abrufen der Daten von Strapi
    async fetchStrapiData() {
      const { $apolloClient } = useNuxtApp(); // Greift auf den bereitgestellten Apollo Client zu

      try {
        const { data } = await $apolloClient.query({
          query: STRAPI_DATA,
        });

        // Verarbeite die zurückgegebenen Daten
        if (data?.companyinfo?.data?.attributes) {
          this.companyinfo = data.companyinfo.data.attributes;
        }

        if (data?.customers?.data) {
          let allProjects = [];

          // Mapping der Kunden und ihrer Projekte
          this.customers = data.customers.data.map(customer => {
            const customerAttributes = {
              id: customer.id,
              ...customer.attributes,
            };

            const customerProjects = customerAttributes.projects?.data.map(project => ({
              id: project.id,
              ...project.attributes,
            })) || [];

            // Projekte zur Gesamtprojektliste hinzufügen
            allProjects = [...allProjects, ...customerProjects];

            return customerAttributes;
          });

          // Sortiere die Projekte nach Launch-Datum
          this.projects = allProjects.sort((a, b) => {
            return new Date(b.launchDate) - new Date(a.launchDate);
          });
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Firmendaten, Kunden und Projekte:', error);
      }
    },

    setScrollPosition(position) {
      this.scrollPosition = position;
    },

    setScreenWidth(width) {
      this.screenWidth = width;
    },

    monitorScroll() {
      const updateScrollPosition = () => {
        this.setScrollPosition(window.scrollY);
      };

      window.addEventListener('scroll', updateScrollPosition);
      return () => {
        window.removeEventListener('scroll', updateScrollPosition);
      };
    },

    monitorScreenWidth() {
      const updateScreenWidth = () => {
        this.setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', updateScreenWidth);
      this.setScreenWidth(window.innerWidth);

      return () => {
        window.removeEventListener('resize', updateScreenWidth);
      };
    },

    initializeListeners() {
      this.monitorScroll();
      this.monitorScreenWidth();
    }
  },

  getters: {
    dynamicStyle: (state) => {
      return {
        '--dynamic-left': `${-26 - (state.scrollPosition / 100)}vw`,
      };
    },

    getCustomerById: (state) => (id) => {
      return state.customers.find(customer => customer.id === id);
    },

    getProjectByLink: (state) => (link) => {
      return state.projects.find(project => project.link === link);
    }
  },
});
