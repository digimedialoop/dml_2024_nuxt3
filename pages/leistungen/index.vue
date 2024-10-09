<template>
    <section class="container" :style="dynamicStyle">
      <img class="imgRight" :src="cmsUrl + '/uploads/Wireframe_Coding_badd645adb.png'" alt="Ammersee">
      <h1>Unsere Leistungen für Ihren starken Auftritt im Web</h1>
      <h2>Wir bieten Ihnen umfassende Lösungen für eine professionelle und überzeugende Webseite.</h2>
      <p>Egal ob Sie eine <b>Neugestaltung Ihrer Webseite</b>, ein <b>Redesign</b> oder <b>einzelne Ergänzungen</b> benötigen. <br>Wir unterstützen Sie <u>gezielt und individuell</u> unter Einsatz <u>neuester Technologien</u>. </p>
    </section>    
    <MarqueeBanner :items="projects" :logoHeight="'180'" title="Unsere letzten Projekte" link="projekt" />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import MarqueeBanner from '@/sections/MarqueeBanner.vue';
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const { cmsUrl, dynamicStyle, projects } = storeToRefs(mainStore);

</script>