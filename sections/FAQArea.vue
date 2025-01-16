<template>
    <section class="faq">
        <h3>Unsere FAQs können Ihnen vielleicht schon ein paar Fragen beantworten ...</h3>
        <Accordion v-if="accordionItems.length" :items="accordionItems" />
  <p v-else>Lade Daten...</p>
  <div class="row mt-4">
    <div class="col-md-6 mb-3"><h4> ... für alle weiteren Fragen </h4></div>
    <div class="col-md-6"><button>Sprechen Sie uns gerne an!</button></div>
  </div>
    
    </section>
    
  </template>
  
  <script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import Accordion from '@/components/Accordion.vue';


const mainStore = useMainStore();
const { faqs } = storeToRefs(mainStore);

// useFetch wird verwendet, um FAQs aus dem Store zu laden
const { data: strapiData, refresh } = await useFetch(async () => {
  await mainStore.fetchStrapiData(); 
  return mainStore;
});

// Beobachte, ob FAQs geladen sind
watchEffect(() => {
  console.log('FAQs aktualisiert');
});

// FAQs für Accordion-Items vorbereiten
const accordionItems = computed(() =>
  faqs.value.map(faq => ({
    title: faq.question,
    content: faq.answer,
  }))
);

// Debug-Logging der Accordion-Items
watchEffect(() => {
  console.log('Accordion-Items aktualisiert');
});
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
  