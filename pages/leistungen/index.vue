<template>
  <div>
    <section>
      <div class="container">
        <img class="imgRight" :src="cmsUrl + '/uploads/Wireframe_Coding_badd645adb.png'" alt="Ammersee" />
      <h1>Digitale Lösungen mit Wirkung</h1>
      <h2>Damit Ihr Online-Auftritt überzeugt, gefunden wird und Kunden gewinnt, braucht es mehr als nur ein schönes Design.</h2>
      <p>Mit unserer Expertise in <b>Webdesign</b>, <b>Webentwicklung</b>, <b>technischer Optimierung</b> und <b>Suchmaschinen-Optimierung</b>
         schaffen wir Webseiten, die nicht nur professionell aussehen, sondern auch messbare Erfolge liefern – für mehr <u>Reichweite</u>, 
         bessere <u>Performance</u> und nachhaltiges <u>Wachstum</u>.</p>
         <p><b>Mit unserer Expertise bringen wir Ihr digitales Business auf das nächste Level.</b></p>
      </div>      
    </section>    

    <div class="serviceBorder">
        <div class="serviceBox" v-for="(service, index) in services" :key="index">
          <img :src="cmsUrl + service.image" alt="icon" />
          <h3>{{ service.headline }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
      <div class="container mb-4">
        <button class="my-4 pinkBtn" @click.prevent="toggleContactBubble" role="button">Kostenloses Beratungsgespräch vereinbaren</button>
      </div>
    <MarqueeBanner :items="projects" :logoHeight="180" title="Unsere Referenzprojekte für Sie" link="projekt" />
    <section v-if="false">
      <div class="container">
      <h2>Puzzeln Sie gerne?</h2>
      <h3>Gestalten Sie Ihre <b>individuelle Lösung</b> mit unserem komponentenbasierten Baukastensystem!</h3>
        <p>Stellen Sie sich aus <b>verschiedenen Modulen</b>, wie z. B. Suchmaschinenoptimierung (SEO), Ihre maßgeschneiderte Lösung zusammen. </p>
        <p>Wir unterstützen Sie gerne mit einer <b>kostenlosen und unverbindlichen Anforderungsanalyse</b>, um Ihre Bedürfnisse genau zu verstehen und die optimale Lösung für Ihr Projekt zu finden.</p> 
        <p>Starten Sie jetzt und lassen Sie uns gemeinsam Ihre Vision realisieren!</p>
        <button @click.prevent="openPuzzle" role="button">Interaktives Puzzle starten</button>
      <ServicePuzzle />
    </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();
import { defineAsyncComponent } from 'vue';

// Asynchrones Laden der Komponenten
const MarqueeBanner = defineAsyncComponent(() => import('@/sections/MarqueeBanner.vue'));
const ServicePuzzle = defineAsyncComponent(() => import('@/sections/ServicePuzzle.vue'));

const { cmsUrl, projects } = storeToRefs(mainStore);

const toggleContactBubble = () => mainStore.toggleContactBubble();
const openPuzzle = () => mainStore.openPuzzle();

const services = [
{
    headline: 'UI/UX Konzeption',
    description: 'Eine gute Webseite überzeugt nicht nur optisch, sondern vor allem durch eine intuitive Nutzerführung. Wir analysieren die Bedürfnisse Ihrer Zielgruppe und entwickeln durchdachte UI/UX-Konzepte, die für ein nahtloses und begeisterndes Nutzungserlebnis sorgen – von der ersten Idee bis zum finalen Design.',
    image: "/uploads/DML_Icon_Konzeption_95ad4fa0d9.svg"
  },
  {
    headline: 'Webdesign',
    description: 'Wir gestalten Webseiten, die nicht nur visuell beeindrucken, sondern auch durch Funktionalität und Benutzerfreundlichkeit zu Ihrem Erfolg beitragen – maßgeschneidert für Ihre Zielgruppe und Ihre Marke.',
    image: "/uploads/DML_Icon_Webdesign_fd3340f441.svg"
  },
  {
    headline: 'Webprogrammierung',
    description: 'Von der technischen Umsetzung bis zur Optimierung Ihrer Webseite – wir programmieren individuelle Lösungen unter Verwendung der neuesten Technologien, die Ihre digitale Präsenz auf das nächste Level heben.',
    image: "/uploads/DML_Icon_Coding_8d9baaa669.svg"
  },
  
  {
    headline: 'Suchmaschinen-Optimierung',
    description: 'Mit gezielter Suchmaschinen-Optimierung sorgen wir dafür, dass Ihre Webseite gefunden wird. So erreichen Sie genau die Kunden, die nach Ihren Lösungen suchen.',
    image: "/uploads/DML_Icon_SEO_63597a2d9a.svg"
  },
  {
    headline: 'Corporate Design',
    description: 'Von uns bekommen Sie ein Design, das Ihre Online-Präsenz in Farbe und Form prägt – vom Logo über die Gestaltung Ihrer Webseite bis hin zu weiteren Medien wie Briefpapier und Visitenkarten. So entsteht ein einheitlicher Look, der sowohl digital als auch im Print überzeugt.',
    image: "/uploads/DML_Icon_Corporate_Design_9d96420517.svg"
  },
  {
    headline: 'Texterstellung und -pflege',
    description: 'Wir gestalten ansprechende Inhalte, die Ihre Zielgruppe erreichen und Ihre Botschaft klar und überzeugend transportieren. Im Anschluss übernehmen wir gerne das Content-Management, damit Ihre Inhalte immer aktuell und wirkungsvoll bleiben.',
    image: "/uploads/DML_Icon_Texterstellung_2e7738bc92.svg"
  },
  {
    headline: 'Illustrationen und Animationen',
    description: 'Mit kreativen Illustrationen und Animationen erwecken wir Ihre Ideen zum Leben und machen Ihre Botschaften visuell unvergesslich.',
    image: "/uploads/DML_Icon_Illustration_aa3ef997f6.svg"
  }
];


</script>

<style lang="sass">
.serviceBorder
  width: 70%
  margin: .5rem auto .5rem auto
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  gap: 1rem 5rem // vertikaler und horizontaler Abstand zwischen den Boxen
  justify-content: start // sorgt dafür, dass die Boxen linksbündig bleiben, wenn weniger da sind

  .serviceBox
    width: 100% // Die Boxen nehmen die volle Breite innerhalb ihrer Grid-Zelle ein
    text-align: center

    img
      width: 60%
      max-width: 180px
      margin: .5rem 20% 0 20%

    h3
      padding: .5rem 0 .5rem .5rem
      font-size: 1rem
      line-height: 1.4rem
      text-transform: uppercase
      letter-spacing: .05rem
      position: relative
      text-align: left
      margin-bottom: .2rem
      color: darken($primaryColor, 10%)
      margin-top: .2rem
      z-index: 2
      /* &::after
        content: ''
        display: block
        position: absolute
        z-index: 1
        background-color: rgba($beige, .8)
        border-radius: $loopShape
        width: 8rem
        height: 4rem
        top: -1rem
        left: -1.5rem */


    p
      font-size: .85rem
      text-align: left
      hyphens: auto
      text-align: justify

</style>