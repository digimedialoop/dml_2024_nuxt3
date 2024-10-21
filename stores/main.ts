import { defineStore } from 'pinia';
import { STRAPI_DATA } from '@/graphQL/main.gql';
import { useNuxtApp, useRuntimeConfig } from '#app';

export const useMainStore = defineStore('main', {
  state: () => ({
    scrollPosition: 0,
    screenWidth: 0,
    contactBoxOpen: false,
    cmsUrl: '', 
    graphQLUrl: '', 
    companyinfo: {
      contact: '',
      phone: '',
      email: '',
      web: ''
    },
    customers: [],
    projects: [],
    dataFetched: false // Flag zur Vermeidung doppelter Abrufe
  }),

  actions: {
    initializeConfig() {
      const runtimeConfig = useRuntimeConfig();
      this.cmsUrl = runtimeConfig.public.VUE_APP_API_URL || 'https://strapi.digimedialoop.de';
      this.graphQLUrl = runtimeConfig.public.STRAPI_GRAPHQL_URL || 'https://strapi.digimedialoop.de/graphql';
    },

    async fetchStrapiData() {
      if (this.dataFetched) return;

      this.initializeConfig();
      const { $apolloClient } = useNuxtApp();

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
          this.dataFetched = true
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
      if (typeof window !== 'undefined') { 
        const updateScrollPosition = () => {
          this.setScrollPosition(window.scrollY);
        };
        window.addEventListener('scroll', updateScrollPosition);
        return () => {
          window.removeEventListener('scroll', updateScrollPosition);
        };
      }
    },

    monitorScreenWidth() {
      if (typeof window !== 'undefined') { 
        const updateScreenWidth = () => {
          this.setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateScreenWidth);
        this.setScreenWidth(window.innerWidth);
        return () => {
          window.removeEventListener('resize', updateScreenWidth);
        };
      }
    },

    initializeListeners() {
      this.monitorScroll();
      this.monitorScreenWidth();
    }
  },

  getters: {
    dynamicStyle: (state) => ({
      '--dynamic-left': `${-26 - (state.scrollPosition / 100)}vw`,
    }),
    getCustomerById: (state) => (id) => state.customers.find(customer => customer.id === id),
    getProjectByLink: (state) => (link) => state.projects.find(project => project.link === link),
  },
});
