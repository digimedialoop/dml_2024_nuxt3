<template>
  <div>
  <section>
    <div class="container">
      <img class="imgRight" :src="cmsUrl + '/uploads/2_Screens_Example_4fc41483_0cc79dc5da.webp'" alt="Neue Webseite" />
    <p class="subLine">OB HANDEL, DIENSTLEISTUNG, HANDWERK ODER INDUSTRIE</p>
    <h1>Ihre Agentur für professionelle Webentwicklung und funktionales Webdesign</h1>
    <h2>Sie benötigen Unterstützung bei der Erstellung ihrer Webseite? Dann sind Sie bei uns genau richtig!</h2>
    <p>Wir sind eine kundenorientierte Webagentur in Herrsching am Ammersee und unterstützen Sie individuell und zuverlässig bei Ihrem Auftritt im Web!</p>
    <button class="mt-3" @click.prevent="router.push('/leistungen')"
            role="button"
            aria-label="Zu den Leistungen navigieren">Zu unseren Leistungen</button>
    </div>
    
  </section>    
  <MarqueeBanner :items="customers" :logoHeight="60" title="Diese Unternehmen vertrauen uns" />
  <FAQArea />
</div>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

// Asynchrones Laden der Komponenten
const MarqueeBanner = defineAsyncComponent(() => import('@/sections/MarqueeBanner.vue'));

// Lade diese Komponente synchron wegen SEO
import FAQArea from '@/sections/FAQArea.vue';

const mainStore = useMainStore();
const { cmsUrl, customers } = storeToRefs(mainStore);

const toggleContactBubble = () => mainStore.toggleContactBubble();

import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="sass">
.subLine
  color: adjust-color($darkgrey, $lightness: 20%)
  font-size: 80%
.pinkFont
  color: darken($pink, 10%)
.imgRight
  float: right
  max-width: 50%
  margin-left: 20px
</style>
