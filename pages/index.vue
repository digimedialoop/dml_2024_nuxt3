<template>
  <div>
  <section>
    <div class="container firstTeaser">
      <img class="imgRight" :src="cmsUrl + '/uploads/2_Screens_Example_4fc41483_0cc79dc5da.webp'" alt="Neue Webseite" />
    <p class="subLine">OB HANDEL, DIENSTLEISTUNG, HANDWERK ODER INDUSTRIE</p>
    <h1>Ihre Agentur für strategische Webentwicklung und funktionales Webdesign</h1>
    <h2>Sie benötigen eine <b>professionelle Website</b>, die nicht nur gut aussieht, sondern auch Kunden gewinnt und Ihr Unternehmen voranbringt? </h2>
    <p>Dann sind Sie bei uns genau richtig! Wir sind eine <b>kundenorientierte Webagentur</b> in Herrsching am Ammersee und erstellen maßgeschneiderte, zielgerichtete Webseiten, die Ihre Zielgruppe ansprechen und Ihre Online-Präsenz spürbar verbessern.</p>
    <button class="mt-3" @click.prevent="router.push('/leistungen')"
            role="button"
            aria-label="Zu den Leistungen navigieren">Unsere Kompetenzen</button>
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
.firstTeaser
  h2
    font-size: 1.6rem
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
