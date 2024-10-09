<template>
  <section class="container" :style="dynamicStyle">
    <h1>Überzeugen Sie sich selbst! - Entdecken Sie unsere Referenzen</h1>
    <h2>Lassen Sie sich inspirieren und sehen Sie, was Qualität für uns bedeutet</h2>
    <p>Jedes unserer Projekte ist ein <b>maßgeschneidertes Unikat</b>, das sich ganz 
      nach den Wünschen und Anforderungen unserer Kunden richtet. So individuell wie 
      unsere Kunden, so einzigartig sind auch unsere Lösungen. Tauchen Sie ein und 
      überzeugen Sie sich selbst von der <u>Einzigartigkeit und Qualität</u> unserer Ergebnisse!</p>
  </section>
  
  <section>
      <div class="referenceBox">
          <slot v-if="projects">
              <NuxtLink class="reference" v-for="project in projects" :key="project.id" :to="`/projekt/${project.link}`">
                  <img :src="cmsUrl + project?.projectImages?.data[0]?.attributes?.url" :alt="project?.projectImages?.data[0]?.attributes?.alternativeText">
                  <div class="infoBox">
                      <div class="row">
                          <div class="col-8 d-flex align-items-center">
                              <h2>{{ project.projectTitle }}</h2>
                          </div>
                          <div class="col-4 d-flex align-items-center">
                              <img 
                                  :src="cmsUrl + getCustomerById(project.customer.data.id)?.logo?.data?.attributes?.url" 
                                  :alt="getCustomerById(project.customer.data.id)?.logo?.data?.attributes?.alternativeText">
                          </div>
                      </div>
                  </div>
              </NuxtLink>
          </slot>
      </div>
  </section>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { cmsUrl, dynamicStyle, projects } = storeToRefs(mainStore);

// Methode, um den Kunden anhand der ID zu finden
const getCustomerById = (id) => mainStore.getCustomerById(id);

// Nutze onBeforeMount oder useFetch, um die Daten vor dem Rendern zu laden
onBeforeMount(async () => {
if (!mainStore.customers.length || !mainStore.projects.length) {
  await mainStore.fetchStrapiData(); // Daten von Strapi laden
}
});
</script>

<style lang="sass">
.referenceBox
  display: flex
  justify-content: flex-start
  align-items: stretch
  flex-wrap: wrap
  gap: 4rem
  width: 80%
  margin: 0 10% 15vh 10%

  h2
    font-size: 1.4rem

  .reference
    flex: 1 1 calc(33.33% - 4rem)
    max-width: 300px
    min-width: 250px
    display: flex
    flex-direction: column
    position: relative
    margin-bottom: 2rem
    a
      text-decoration: none
      color: $darkgrey
    img
      width: 100%
      height: auto
      transition: .8s
      &:hover
        transform: scale(1.2)
        cursor: pointer
    @media (max-width: $breakPointMD)
      flex: 1 1 calc(50% - 3rem)  
    @media (max-width: $breakPointSM)
      flex: 1 1 100%             
    .infoBox
      background-image: linear-gradient(to right top, rgba($beige, .6), transparent, transparent)
      padding: 1rem 1.5rem
      border-bottom-left-radius: 15px
      position: absolute
      bottom: -3.5rem
      left: 0
      width: 100%
      height: 7rem
      border-bottom: 1px solid rgba($beige, .4)
      border-left: 1px solid rgba($beige, .4)
      h2
        font-size: .8rem
        margin: .5rem auto
        padding-right: 1rem
        line-height: 1.1rem
        hyphens: auto
        color: $darkgrey
      img
        width: 80%
        margin-left: 10%
</style>
