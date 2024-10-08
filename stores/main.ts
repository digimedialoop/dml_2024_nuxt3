import { defineStore } from 'pinia';
import { useApolloClient } from '@vue/apollo-composable';
import { STRAPI_DATA } from '@/graphQL/main.gql';

export const useMainStore = defineStore('main', {
  state: () => {
    const runtimeConfig = useRuntimeConfig();
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
    async fetchStrapiData() {
      const apolloClient = useApolloClient().client;

      try {
        const { data } = await apolloClient.query({
          query: STRAPI_DATA,
        });

        if (data?.companyinfo?.data?.attributes) {
          this.companyinfo = data.companyinfo.data.attributes;
        }

        if (data?.customers?.data) {
          let allProjects = [];

          this.customers = data.customers.data.map(customer => {
            const customerAttributes = {
              id: customer.id,
              ...customer.attributes,
            };

            const customerProjects = customerAttributes.projects?.data.map(project => ({
              id: project.id,
              ...project.attributes,
            })) || [];

            allProjects = [...allProjects, ...customerProjects];

            return customerAttributes;
          });

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
