import { defineStore } from 'pinia';
import { STRAPI_DATA } from '@/graphQL/main.gql';
import { useNuxtApp, useRuntimeConfig, useRouter } from '#app';
import axios from 'axios';

// Typdefinition für Kontaktanfrage
interface ContactData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message: string;
  language: string;
}

export const useMainStore = defineStore('main', {
  state: () => ({
    scrollPosition: 0,
    screenWidth: 0,
    contactBoxOpen: false,
    menuOpen: false,
    cmsUrl: '', 
    token: '',
    graphQLUrl: '', 
    companyinfo: {
      contact: '',
      phone: '',
      email: '',
      web: ''
    },
    customers: [],
    projects: [],
    faqs: [],
    pages: [],
    dataFetched: false // Flag zur Vermeidung doppelter Abrufe
  }),

  actions: {
    initializeConfig() {
      const runtimeConfig = useRuntimeConfig();
      this.cmsUrl = runtimeConfig.public.VUE_APP_API_URL || 'https://strapi.digimedialoop.de';
      this.token = runtimeConfig.public.VUE_APP_TOKEN;
      this.graphQLUrl = runtimeConfig.public.STRAPI_GRAPHQL_URL || 'https://strapi.digimedialoop.de/graphql';
    },

    // Aktionen fü rdie Kontakt Bubble
    toggleContactBubble() {
      this.contactBoxOpen = !this.contactBoxOpen;
    },

    closeContactBubble() {
      this.contactBoxOpen = false;
    },

    // Aktionen für das Menü
    toggleMenu() {
      // Überprüfen, ob das Menü gerade geöffnet wird
      if (!this.menuOpen) {
        this.closeContactBubble();
      }
    
      // Toggle den Zustand von menuOpen
      this.menuOpen = !this.menuOpen;
    },
    
    closeMenu() {
      this.menuOpen = false;
    },
    openMenu() {
      this.menuOpen = true;
    },

    async sendContactRequestToCMS(contactData: ContactData): Promise<void> {
      const router = useRouter();
      try {
        const response = await axios.post(
          `${this.cmsUrl}/api/contacts`, // Korrekte URL
          {
            data: {
              name: contactData.name,
              email: contactData.email,
              phone: contactData.phone,
              company: contactData.company,
              text: contactData.message,
              page: router.currentRoute.value.fullPath,
              language: contactData.language,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`, // Token aus dem State
              'Content-Type': 'application/json',    // Richtiger Content-Type
            },
          }
        );
      } catch (error) {
        console.error('Fehler beim Senden der Kontaktanfrage:', error);
        throw error; // Weiterwerfen des Fehlers, falls erforderlich
      }
    },

    async fetchStrapiData() {
      if (this.dataFetched) return;
      this.initializeConfig();
      const { $apolloClient } = useNuxtApp();

      try {
        const { data } = await $apolloClient.query({
          query: STRAPI_DATA,
        });

        if (data?.companyinfo?.data?.attributes) {
          this.companyinfo = data.companyinfo.data.attributes;
        }

        if (data?.faqs?.data) {
          this.faqs = data.faqs.data.map(faq => ({
            id: faq.id,
            ...faq.attributes,
          }));
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
            return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
          });
        }

        if (data?.pages?.data) {
          this.pages = data.pages.data.map(page => ({
            id: page.id,
            ...page.attributes,
          }));
        }

        this.dataFetched = true;
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    },

    setScrollPosition(position: number) {
      this.scrollPosition = position;
    },

    setScreenWidth(width: number) {
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
    getCustomerById: (state) => (id: string) => state.customers.find(customer => customer.id === id),
    getProjectByLink: (state) => (link: string) => state.projects.find(project => project.link === link),
  },
});
