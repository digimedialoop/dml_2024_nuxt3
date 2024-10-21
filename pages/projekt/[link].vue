<template>
  <section v-if="project" class="container project" :style="dynamicStyle">
    <div class="row">
      <div class="col-md-9">
        <h1>Kundenprojektvorstellung</h1>
        <h2>{{ project.projectTitle }}</h2>
      </div>
      <div class="col-md-3">
        <div class="customerBox">
          <img :src="cmsUrl + getCustomerById(project.customer.data.id)?.logo?.data?.attributes?.url" alt="customerLogo" />
          <h4>{{ project?.customer?.data?.attributes?.company }} | {{ project?.customer?.data?.attributes?.city }}</h4>
        </div>
      </div>
    </div>

    <div class="row detailBox">
      <div class="col-lg-4">
        <transition name="fade" mode="out-in">
          <img
            id="currentImage"
            :src="cmsUrl + currentImage.url"
            :alt="currentImage.alternativeText"
          />
        </transition>
        <div class="preview">
          <h3>Weitere Ansichten</h3>
          <div class="imageNavigation">
            <img
              v-for="(img, index) in project.projectImages.data"
              :key="index"
              :src="cmsUrl + img.attributes.url"
              :alt="img.attributes.alternativeText"
              @click="setCurrentImage(img.attributes)"
              :class="{ active: currentImage.url === img.attributes.url }"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-8 pt-4">
        <span v-html="htmlContent(project?.projectDescription)"></span>
        <h4>Verwendete Technologien</h4>
        <div class="techChipsBox">
          <span v-for="tech, index in project.Technologien.data" :key="index" class="techChip">{{ tech.attributes.titel }}</span>
        </div>
        <div class="row" v-if="project.webpage != null">
          <div class="col-12 text-end">
            <a class="webPageBtn" :href="project.webpage" target="_blank" rel="noopener noreferrer">
              <svg>
                <use xlink:href="/assets/icons/collection.svg#desktop"></use>
              </svg> 
              Projekt live erleben
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Navigation für vorheriges und nächstes Projekt -->
  <div class="navigationBox">
    <div class="row align-items-center" @click="navigateToPreviousProject">
      <!-- Vorheriges Projekt -->
      <div class="col-6 d-flex align-items-center justify-content-start navBtn">
        <div v-if="previousProject" class="col-3 text-center" id="btnPreProject">
          <svg>
            <use xlink:href="/assets/icons/collection.svg#nav_left"></use>
          </svg>
        </div>
        <div v-if="previousProject" class="col-9 text-start">
          <b>Projekt</b><br> {{ previousProject.projectTitle }}
        </div>
      </div>

      <!-- Nächstes Projekt -->
      <div class="col-6 d-flex align-items-center justify-content-end navBtn" @click="navigateToNextProject">
        <div v-if="nextProject" class="col-9 text-end">
          <b>Projekt</b><br> {{ nextProject.projectTitle }}
        </div>
        <div v-if="nextProject" class="col-3 text-center" id="btnPostProject">
          <svg>
            <use xlink:href="/assets/icons/collection.svg#nav_right"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Für die Navigation
import { useMainStore } from '@/stores/main'; // Pinia Store importieren
import { storeToRefs } from 'pinia';
import { useHtmlConverter } from '@/composables/useHTMLConverter'; 

// Zugriff auf den Routenparameter und den Store
const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();
const { cmsUrl, projects, dynamicStyle } = storeToRefs(mainStore);

// Finde das aktuelle Projekt basierend auf dem dynamischen 'link' Parameter
const project = computed(() => mainStore.getProjectByLink(route.params.link));

// Importiere die convertToHTML Methode aus der Composable
const { convertToHTML } = useHtmlConverter();

// Definiere die htmlContent Funktion, um den HTML-Inhalt zu generieren
const htmlContent = (data) => {
  return convertToHTML(data); // Nutze die convertToHTML Funktion der Composable
};

const getCustomerById = (id) => mainStore.getCustomerById(id);

// Zustand für das aktuell angezeigte Bild (startet mit dem ersten Bild)
const currentImage = ref(null);

// Setze das erste Bild, falls das Projekt Bilder hat
if (project.value && project.value.projectImages?.data?.length > 0) {
  currentImage.value = project.value.projectImages.data[0].attributes;
}

// Funktion, um das angeklickte Bild als aktuelles Bild zu setzen
const setCurrentImage = (image) => {
  currentImage.value = image;
};

// Berechnung des vorherigen Projekts
const previousProject = computed(() => {
  const currentIndex = projects.value.findIndex(p => p.link === route.params.link);
  return currentIndex > 0 ? projects.value[currentIndex - 1] : null;
});

// Berechnung des nächsten Projekts
const nextProject = computed(() => {
  const currentIndex = projects.value.findIndex(p => p.link === route.params.link);
  return currentIndex < projects.value.length - 1 ? projects.value[currentIndex + 1] : null;
});

// Funktion, um das vorherige Projekt zu finden und den Benutzer darauf zu verlinken
const navigateToPreviousProject = () => {
  if (previousProject.value) {
    router.push({ path: `/projekt/${previousProject.value.link}` });
  }
};

// Funktion, um das nächste Projekt zu finden und den Benutzer darauf zu verlinken
const navigateToNextProject = () => {
  if (nextProject.value) {
    router.push({ path: `/projekt/${nextProject.value.link}` });
  }
};
</script>

<style lang="sass">
.project
  h1
    color: adjust-color($darkgrey, $lightness: 40%)
    font-size: 1.1rem
    text-transform: uppercase
    margin-bottom: 0
    letter-spacing: .08rem
  h2
    margin-top: 0
  img
    width: 100%
  .preview
    h3
      font-size: 1rem
      color: adjust-color($darkgrey, $lightness: 40%)
    img
      width: 100px
      margin: 0
      cursor: pointer
      transition: .6s
      padding: 1.2rem
      border: 2px solid transparent
      &.active
        border: 2px solid $lightgrey
        padding: .5rem
        border-radius: .5rem
  .customerBox
    width: 100%
    text-align: center
    background-image: linear-gradient(to left bottom, rgba($lightgrey, .6), transparent, transparent)
    border-top-right-radius: 20px
    padding: 1rem
    border-top: 1px solid rgba($lightgrey, .3)
    border-right: 1px solid rgba($lightgrey, .3)
    margin: 1rem 0
    img
      min-height: 2rem
      width: 50%
      max-width: 200px
      margin: 1rem
    h4
      font-size: .8rem
    @media(max-width: $breakPointLG)
      background-image: linear-gradient(to left, rgba($lightgrey, .6), transparent, transparent)
      margin-top: 0
  .detailBox
    h4
      font-size: 1rem
      margin-top: 2.5rem
      color: adjust-color($darkgrey, $lightness: 20%)
  .webPageBtn
    font-size: .8rem
    margin-top: 2rem
    margin-right: 6%
    text-decoration: none
    border: 1px solid adjust-color($darkgrey, $lightness: 20%)
    padding: .5rem 1rem
    border-radius: 5px
    display: inline-block
    color: adjust-color($darkgrey, $lightness: 30%)
    transition: .6s
    &:hover
      transform: scale(1.1)
    svg
      height: .8rem
      width: .9rem
      margin-right: .3rem
      fill: adjust-color($darkgrey, $lightness: 20%)
.navigationBox
  margin-top: 2rem
  width: 100%
  color: adjust-color($darkgrey, $lightness: 35%)
  font-size: .85rem

  &:hover
    cursor: pointer
  .navBtn
    transition: .6s
    &:hover
      transform: scale(1.05)
  svg
    fill: adjust-color($lightgrey, $lightness: -10%)
    width: 80%
    max-width: 50px
.techChipsBox
  display: block
  width: 100%
  .techChip
    background-color: $lightgrey
    padding: .2rem 1rem
    margin: .3rem
    border-radius: .6rem
    font-size: .9rem
    display: inline-block
    color: adjust-color($darkgrey, $lightness: 25%)
</style>

