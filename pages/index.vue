<template>
  <section class="container" :style="dynamicStyle" >
    <img class="imgRight" :src="cmsUrl + '/uploads/2_Screens_Example_4fc41483_0cc79dc5da.webp'" alt="Neue Webseite" />
    <p class="subLine">OB HANDEL, DIENSTLEISTUNG, HANDWERK ODER INDUSTRIE</p>
    <h1>Ihr Partner für professionelle Webentwicklung und funktionales Webdesign</h1>
    <h2>Sie benötigen Unterstützung bei der Erstellung ihrer Webseite? Dann sind Sie bei uns genau richtig!</h2>
    <p>Wir sind eine kundenorientierte Webagentur in Herrsching am Ammersee und unterstützen Sie individuell und zuverlässig bei Ihrem Auftritt im Web!</p>
    <button class="mt-4"><span>Kostenlose Erstberatung</span></button>
  </section>    
  <MarqueeBanner :items="customers" :logoHeight="60" title="Diese Unternehmen vertrauen uns" />
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import MarqueeBanner from '@/sections/MarqueeBanner.vue';

const mainStore = useMainStore();
const { cmsUrl, dynamicStyle, customers } = storeToRefs(mainStore);

</script>

<style lang="sass">
.subLine
  color: adjust-color($darkgrey, $lightness: 20%)
  font-size: 80%

.imgRight
  float: right
  max-width: 50%
  margin-left: 20px
</style>
