<template>
  <div>
  <section>
    <div class="container">
      <h1>Individuelle Webseiten, die überzeugen</h1>
    <h2>Lassen Sie sich von unseren erfolgreichen Webprojekten inspirieren! </h2> 
    <p>Jede Website, die wir entwickeln, ist einzigartig – maßgeschneidert, funktional und wirkungsvoll. Unsere Referenzen zeigen, wie wir <b>modernes Webdesign</b>, <b>durchdachte Entwicklung</b> und <b>gute Performance</b> verbinden, um digitale Lösungen zu schaffen, die nicht nur gut aussehen, sondern auch Ergebnisse liefern.</p>

    </div>
    
  </section>
  
  <section style="margin-bottom: 1rem !important">
      <div class="referenceBox">
          <slot v-if="projects">
              <NuxtLink class="reference" v-for="project in projects" :key="project.id" :to="`/projekt/${project.link}`">
                  <img :src="cmsUrl + project?.projectImages?.data[0]?.attributes?.url" :alt="project?.projectImages?.data[0]?.attributes?.alternativeText" />
                  <div class="infoBox">
                      <div class="row">
                          <div class="col-8 d-flex align-items-center">
                              <h2>{{ project.projectTitle }}</h2>
                          </div>
                          <div class="col-4 d-flex align-items-center">
                              <img 
                                  :src="cmsUrl + getCustomerById(project.customer.data.id)?.logo?.data?.attributes?.url" 
                                  :alt="getCustomerById(project.customer.data.id)?.logo?.data?.attributes?.alternativeText" />
                          </div>
                      </div>
                  </div>
              </NuxtLink>
          </slot>
      </div>
  </section>
  <div class="container ctaBox">
    <h3>Bereit für Ihr eigenes Webprojekt?</h3>
    <p>Lassen Sie uns gemeinsam Ihre individuelle Website gestalten – perfekt abgestimmt auf Ihre Bedürfnisse und Ziele.</p>
    <button class="pinkBtn mt-1" @click.prevent="toggleContactBubble" role="button">Jetzt unverbindliches Angebot anfordern!</button>
  </div>
  
</div>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { cmsUrl, projects } = storeToRefs(mainStore);

// Methode, um den Kunden anhand der ID zu finden
const getCustomerById = (id) => mainStore.getCustomerById(id);

// useFetch wird sowohl im SSR als auch im Client verwendet
const { data: strapiData, refresh } = await useFetch(async () => {
  if (!mainStore.customers.length || !mainStore.projects.length) {
    await mainStore.fetchStrapiData(); // Strapi-Daten laden
  }
  return mainStore;
});
</script>


<style lang="sass">
.referenceBox
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: 4rem
  width: 80%
  margin: 0 10% 0 auto

  h2
    font-size: 1.4rem

  .reference
    display: flex
    flex-direction: column
    position: relative
    text-decoration: none
    color: $darkgrey
    background: white
    border-radius: 10px
    overflow: hidden
    transition: transform 0.3s ease, box-shadow 0.3s ease
    &:hover
      transform: scale(1.02)
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1)

    img
      width: 90%
      height: auto
      object-fit: cover
      margin: 1rem 5% 0 5%
      transition: transform 0.6s ease
      &:hover
        transform: scale(1.05)

    .infoBox
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        padding: 1rem 1.5rem
        border-bottom-left-radius: 10px
        border-bottom-right-radius: 10px
        background: linear-gradient(to top, rgba($beige, 0.6), rgba($beige, 0.3))
        min-height: 8rem
        h2
          font-size: 1rem
          margin: 0.5rem 0
          line-height: 1.2
          hyphens: auto
          color: $darkgrey
        img
          max-width: 80px
          margin: 0 auto
.ctaBox
  h3
    font-size: 1.6rem      

</style>
