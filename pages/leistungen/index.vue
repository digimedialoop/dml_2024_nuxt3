<template>
  <div>
    <section>
      <div class="container">
        <img class="imgRight" :src="cmsUrl + '/uploads/Wireframe_Coding_badd645adb.png'" alt="Ammersee" />
      <h1>Unsere Leistungen für Ihren starken Auftritt im Web</h1>
      <h2>Wir bieten Ihnen umfassende Lösungen für eine professionelle und überzeugende Webseite.</h2>
      <p>Egal ob Sie eine <b>Neugestaltung Ihrer Webseite</b>, ein <b>Redesign</b> oder <b>einzelne Ergänzungen</b> benötigen: Wir unterstützen Sie gezielt und individuell unter <u>Einsatz neuester Technologien</u>. </p>
      <button class="mt-4" @click.prevent="toggleContactBubble" role="button">Kostenloses Angebot anfordern</button>
      </div>
      
    </section>    
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
      <div class="serviceBorder">
        <div class="serviceBox" v-for="(service, index) in services" :key="index">
          <img :src="cmsUrl + service.image" alt="" />
          <h3>{{ service.headline }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
      <div class="container">
        <button class="mt-4" @click.prevent="toggleContactBubble" role="button">Kostenloses Beratungsgespräch vereinbaren</button>
      </div>
      
    </section>
    <MarqueeBanner :items="projects" :logoHeight="180" title="Unsere Referenzprojekte für Sie" link="projekt" />
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
    headline: 'Webdesign',
    description: 'Wir gestalten Webseiten, die nicht nur visuell beeindrucken, sondern auch durch Funktionalität und Benutzerfreundlichkeit zu Ihrem Erfolg beitragen – maßgeschneidert für Ihre Zielgruppe und Ihre Marke.',
    image: "/uploads/Webdesign_Pad_1b06b420a4.png"
  },
  {
    headline: 'Webprogrammierung',
    description: 'Von der technischen Umsetzung bis zur Optimierung Ihrer Webseite – wir programmieren individuelle Lösungen unter Verwendung der neuesten Technologien, die Ihre digitale Präsenz auf das nächste Level heben.',
    image: "/uploads/Webprogrammierung_Illu_dbe304399b.png"
  },
  {
    headline: 'Suchmaschinen-Optimierung',
    description: 'Mit gezielter Suchmaschinen-Optimierung sorgen wir dafür, dass Ihre Webseite gefunden wird. So erreichen Sie genau die Kunden, die nach Ihren Lösungen suchen.',
    image: "/uploads/SEO_Illustration_4b988a8740.png"
  },
  {
    headline: 'Corporate Design',
    description: 'Von uns bekommen Sie ein Design, das Ihre Online-Präsenz in Farbe und Form prägt – vom Logo über die Gestaltung Ihrer Webseite bis hin zu weiteren Medien wie Briefpapier und Visitenkarten. So entsteht ein einheitlicher Look, der sowohl digital als auch im Print überzeugt.',
    image: "/uploads/Design_Illustration_f24584a45b.png"
  },
  {
    headline: 'Texterstellung und -pflege',
    description: 'Wir gestalten ansprechende Inhalte, die Ihre Zielgruppe erreichen und Ihre Botschaft klar und überzeugend transportieren. Im Anschluss übernehmen wir gerne das Content-Management, damit Ihre Inhalte immer aktuell und wirkungsvoll bleiben.',
    image: "/uploads/Texte_Illustration_86bd6505d5.png"
  },
  {
    headline: 'Illustrationen und Animationen',
    description: 'Mit kreativen Illustrationen und Animationen erwecken wir Ihre Ideen zum Leben und machen Ihre Botschaften visuell unvergesslich.',
    image: "/uploads/Illustration_1bc4f48ab6.png"
  }
];


</script>

<style lang="sass">
.serviceBorder
  width: 70%
  margin: 4rem auto 0 auto
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
  gap: 3rem 6rem // vertikaler und horizontaler Abstand zwischen den Boxen
  justify-content: start // sorgt dafür, dass die Boxen linksbündig bleiben, wenn weniger da sind

  .serviceBox
    width: 100% // Die Boxen nehmen die volle Breite innerhalb ihrer Grid-Zelle ein
    text-align: center

    img
      width: 60%
      margin: 0 20% 1rem 20%

    h3
      padding: .5rem 0 .5rem .5rem
      font-size: 1.2rem
      position: relative
      text-align: left
      margin-bottom: .2rem
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