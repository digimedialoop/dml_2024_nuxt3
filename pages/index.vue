<template>
    <section class="container" :style="dynamicStyle">
      <img class="imgRight" :src="cmsUrl + '/uploads/2_Screens_Example_4fc41483_0cc79dc5da.webp'" alt="Neue Webseite">
      <p class="subLine">OB HANDEL, DIENSTLEISTUNG, HANDWERK ODER INDUSTRIE</p>
      <h1>Ihr Partner für professionelle Webentwicklung und funktionales Webdesign</h1>
      <h2>Sie benötigen Unterstützung bei der Erstellung ihrer Webseite? Dann sind Sie bei uns genau richtig!</h2>
      <p>Wir sind eine kundenorientierte Webagentur in Herrsching am Ammersee und unterstützen Sie individuell und zuverlässig bei Ihrem Auftritt im Web!</p>
      <button class="mt-4"><span>Unsere Leistungen</span></button>
    </section>    
    <CustomerBanner />
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const cmsUrl = computed(() => mainStore.cmsUrl);

import CustomerBanner from '@/sections/CustomerBanner.vue'

// Scroll-Position für Bubble First Section Left
const scrollPosition = computed(() => mainStore.scrollPosition);
const dynamicStyle = computed(() => {
  const leftPosition = -26 - (scrollPosition.value / 100); // Berechnung der Position basierend auf dem Scrollen
  return {
    '--dynamic-left': `${leftPosition}vw`
  };
});

</script>

<style lang="sass" scoped>
.imgRight
  float: right
  width: 45%
</style>