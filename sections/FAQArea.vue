<template>
    <section class="faq" id="faq">
      <h3>Hier finden Sie Antworten auf häufig gestellte Fragen (FAQs) rund ums Thema Website-Erstellung</h3>
        <Accordion v-if="accordionItems.length" :items="accordionItems" />
  <p v-else>Lade Daten...</p>
  <div class="row mt-4">
    <div class="col-md-6 mb-3"><h4> Noch Fragen? </h4></div>
    <div class="col-md-6">
      <button @click.prevent="toggleContactBubble" role="button" class="pinkBtn">Sprechen Sie uns gerne an!</button></div>
  </div>
    
    </section>
    
  </template>
  
  <script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const Accordion = defineAsyncComponent(() => import('@/components/Accordion.vue'));


const mainStore = useMainStore();
const { faqs } = storeToRefs(mainStore);

const toggleContactBubble = () => mainStore.toggleContactBubble();

// useFetch wird verwendet, um FAQs aus dem Store zu laden
const { data: strapiData, refresh } = await useFetch(async () => {
  await mainStore.fetchStrapiData(); 
  return mainStore;
});

// FAQs für Accordion-Items vorbereiten
const accordionItems = computed(() =>
  faqs.value.map(faq => ({
    title: faq.question,
    content: faq.answer,
  }))
);

</script>

<style lang="sass">
.faq
    width: 80%
    margin: 2rem auto
    h3
        font-size: 1.4rem
        font-family: 'Mainfont-Bold'
    h4
        font-size: 1.4rem
        font-family: 'Mainfont-Bold'
        margin-top: .6rem
 </style>
  