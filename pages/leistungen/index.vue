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

    <div class="carousel3d" ref="carouselRef">
      <div 
        v-for="(service, index) in services" 
        :key="index" 
        class="carousel__item" 
        :style="getStyle(index)"
        @click="setActive(index)"
      >
        <img :src="cmsUrl + service.image" :alt="service.headline" />
        <h3>{{ service.headline }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>

    <div class="container mb-4">
      <button class="my-4 pinkBtn" @click.prevent="toggleContactBubble" role="button">Kostenloses Beratungsgespräch vereinbaren</button>
    </div>
    <MarqueeBanner :items="projects" :logoHeight="180" title="Unsere Kompetenz in Aktion: Erleben Sie unsere Projekte live!" link="projekt" />
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
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { useSwipe } from '@vueuse/core';

const mainStore = useMainStore();

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

const total = services.length;
const activeIndex = ref(0); //ref(Math.floor(total / 2));

const setActive = (index) => {
  activeIndex.value = index;
};

const getStyle = (index) => {
  const offset = (index - activeIndex.value + total) % total;
  const half = Math.floor(total / 2);
  const adjustedOffset = offset > half ? offset - total : offset;
  const zIndex = total - Math.abs(adjustedOffset);
  const scale = adjustedOffset === 0 ? 1 : 0.8;
  const translateX = adjustedOffset * 250;
  const rotateY = adjustedOffset * -30;

  return {
    transform: `perspective(1000px) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
    zIndex,
    opacity: adjustedOffset === 0 ? 1 : 0.6,
  };
};

const carouselRef = ref(null);

onMounted(() => {
  useSwipe(carouselRef.value, {
    onSwipeLeft: () => setActive((activeIndex.value + 1) % total),
    onSwipeRight: () => setActive((activeIndex.value - 1 + total) % total),
  });
});

</script>


<style lang="sass">
.carousel3d
  position: relative
  width: 100%
  height: 480px
  display: flex
  justify-content: center
  align-items: center
  overflow-x: hidden
  overflow-y: visible
  margin-bottom: 3rem

.carousel__item
  position: absolute
  width: 250px
  padding: 1rem
  background: white
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3)
  border-radius: 10px
  text-align: center
  transition: transform 0.5s ease, opacity 0.5s ease
  cursor: pointer

  img
    width: 60%
    max-width: 180px
    margin: .5rem 20% 0 20%

  h3
    padding: .5rem 0 .5rem 0
    font-size: 1rem
    line-height: 1.4rem
    text-transform: uppercase
    position: relative
    text-align: center
    margin-bottom: .2rem
    color: darken($primaryColor, 10%)
    margin-top: .2rem
    z-index: 2
    color: darken($primaryColor, 20%)
    font-family: 'Mainfont-Bold'
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

.serviceBox
  width: 100% // Die Boxen nehmen die volle Breite innerhalb ihrer Grid-Zelle ein
  text-align: center
  background-color: white

  

</style>