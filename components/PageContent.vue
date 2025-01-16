<template>
    <section v-if="currentPage">
      <div v-if="firstStandardSection">
        <div class="container content" v-html="htmlContent(firstStandardSection.sectionText)"></div>
      </div>
    </section>
    <section v-else>
      <h1>Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht.</p>
    </section>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '@/stores/main';
  import { computed } from 'vue';
  
  // Props definieren
  const props = defineProps({
    pageName: {
      type: String,
      default: 'privacy', // Standardwert
    },
  });
  
  // Pinia-Store
  const mainStore = useMainStore();
  const { pages, dynamicStyle } = storeToRefs(mainStore);
  
  // Aktuelle Seite basierend auf dem pageName
  const currentPage = computed(() =>
    pages.value.find((page) => page.pageName === props.pageName)
  );
  
  // Erste Standard-Sektion auswählen
  const firstStandardSection = computed(() =>
    currentPage.value?.pageSections?.find(
      (section) => section.__typename === 'ComponentSectionsStandardSection'
    )
  );
  
  // HTML-Konvertierung
  import { useHtmlConverter } from '@/composables/useHTMLConverter';
  const { convertToHTML } = useHtmlConverter();
  const htmlContent = (data) => {
    return convertToHTML(data); // Nutze die convertToHTML Funktion der Composable
  };
  </script>

<style lang="sass">
section:first-of-Type::before
  top: 0
  left: 0
  width: 10vw
.content
  h2
    font-size: 1.1rem
    font-family: 'Mainfont-Bold'
    margin: 1rem 0
  h3
    font-size: 1rem
    font-family: 'Mainfont-Bold'
    margin: .6rem 0
  p
    font-size: 1rem
    margin: .5rem auto
</style>
  