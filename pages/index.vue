<template>
  <section>
    <div class="container">
      <img class="imgRight" :src="cmsUrl + '/uploads/2_Screens_Example_4fc41483_0cc79dc5da.webp'" alt="Neue Webseite" />
    <p class="subLine">OB HANDEL, DIENSTLEISTUNG, HANDWERK ODER INDUSTRIE</p>
    <h1>Ihre Agentur für professionelle Webentwicklung und funktionales Webdesign</h1>
    <h2>Sie benötigen Unterstützung bei der Erstellung ihrer Webseite? Dann sind Sie bei uns genau richtig!</h2>
    <p>Wir sind eine kundenorientierte Webagentur in Herrsching am Ammersee und unterstützen Sie individuell und zuverlässig bei Ihrem Auftritt im Web!</p>
    <button class="mt-4"><span>Kostenlose Erstberatung</span></button>
    </div>
    
  </section>    
  <MarqueeBanner :items="customers" :logoHeight="60" title="Diese Unternehmen vertrauen uns" />
  <FAQArea />
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import MarqueeBanner from '@/sections/MarqueeBanner.vue';
import FAQArea from '@/sections/FAQArea.vue';

const mainStore = useMainStore();
const { cmsUrl, customers } = storeToRefs(mainStore);

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
