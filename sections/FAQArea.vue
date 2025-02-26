<template>
  <section class="faq" id="faq">
    <h3>{{ headline }}</h3>
    <Accordion v-if="accordionItems.length" :items="accordionItems" />
    <p v-else>Lade Daten...</p>

    <div class="row mt-4">
      <div class="col-md-6 mb-3">
        <h4> Noch Fragen? </h4>
      </div>
      <div class="col-md-6">
        <button @click.prevent="toggleContactBubble" role="button" class="pinkBtn">
          {{ button }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { computed, defineProps, defineAsyncComponent } from 'vue';

const Accordion = defineAsyncComponent(() => import('@/components/Accordion.vue'));

const props = defineProps({
  pageLink: { type: String, required: true },
  headline: { type: String, default: "Häufig gestellte Fragen (FAQs)" },
  button: { type: String, default: "Sprechen Sie uns gerne an!" },
});

const mainStore = useMainStore();
const { pages } = storeToRefs(mainStore); // Wir holen die `pages` aus dem Pinia-Store

const toggleContactBubble = () => mainStore.toggleContactBubble();

// 🔹 **FAQs für die aktuelle Seite aus `pages` filtern**
const accordionItems = computed(() => {
  const currentPage = pages.value?.find(page => page.pageLink === props.pageLink);
  const faqsArray = Array.isArray(currentPage?.faqs.data) ? currentPage.faqs.data : []; // Sicherstellen, dass es ein Array ist
  return faqsArray.map(faq => ({
    title: faq.attributes.question,
    content: faq.attributes.answer,
  }));
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
