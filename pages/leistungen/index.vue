<template>
    <section class="container" :style="dynamicStyle">
      <img class="imgRight" :src="cmsUrl + '/uploads/Wireframe_Coding_badd645adb.png'" alt="Ammersee">
      <h1>Unsere Leistungen für Ihren starken Auftritt im Web</h1>
      <h2>Wir bieten Ihnen umfassende Lösungen für eine professionelle und überzeugende Webseite.</h2>
      <p>Egal ob Sie eine <b>Neugestaltung Ihrer Webseite</b>, ein <b>Redesign</b> oder <b>einzelne Ergänzungen</b> benötigen. <br>Wir unterstützen Sie <u>gezielt und individuell</u> unter Einsatz <u>neuester Technologien</u>. </p>
    </section>    
    <section class="beigeBG">
      <div class="container py-3">
        <h2>Unsere letzten Projekte</h2>
      </div>
      
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const cmsUrl = computed(() => mainStore.cmsUrl);

// Scroll-Position für Bubble First Section Left
const scrollPosition = computed(() => mainStore.scrollPosition);
const dynamicStyle = computed(() => {
  const leftPosition = -26 - (scrollPosition.value / 100); // Berechnung der Position basierend auf dem Scrollen
  return {
    '--dynamic-left': `${leftPosition}vw`
  };
});

</script>