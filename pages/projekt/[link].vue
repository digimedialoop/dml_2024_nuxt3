<template>
  <section v-if="project" class="project">
    <div class="container">
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
    </div>
    <div class="container ctaBox">
        <h2>Na? - Lust auf eine neue Webseite bekommen?</h2>
        <h3>Ihre Wünsche, unsere Erfahrung! Gemeinsam heben wir Sie auf das nächste Level!</h3>
        <button class="pinkBtn mt-1" @click.prevent="toggleContactBubble" role="button">Sprechen Sie mit uns!</button>
      </div>
  </section>
  <!-- Navigation für vorheriges und nächstes Projekt -->
  <div class="navigationBox container">
    <div class="row align-items-center">
      <!-- Vorheriges Projekt -->
      <div class="col-6 d-flex align-items-center justify-content-start navBtn">
        <div class="row" @click="navigateToPreviousProject">
          <div v-if="previousProject" class="col-3 text-center" id="btnPreProject">
          <svg>
            <use xlink:href="/assets/icons/collection.svg#nav_left"></use>
          </svg>
        </div>
        <div v-if="previousProject" class="col-8 text-start">
          <b>Vorheriges Projekt</b><br> {{ previousProject.projectTitle }}
        </div>
      </div>
        
      </div>

      <!-- Nächstes Projekt -->
      <div class="col-6 d-flex align-items-center justify-content-end navBtn" >
        <div class="row" @click="navigateToNextProject">
          <div v-if="nextProject" class="col-8 text-end" >
          <b>Nächstes Projekt</b><br> {{ nextProject.projectTitle }}
        </div>
        <div v-if="nextProject" class="col-3 text-center" id="btnPostProject">
          <svg>
            <use xlink:href="/assets/icons/collection.svg#nav_right"></use>
          </svg>
        </div>
      </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { useHtmlConverter } from '@/composables/useHTMLConverter';

const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();
const { cmsUrl, projects, dataFetched } = storeToRefs(mainStore);

const project = computed(() => mainStore.getProjectByLink(route.params.link));

const { convertToHTML } = useHtmlConverter();

const htmlContent = (data) => {
  return convertToHTML(data);
};

const toggleContactBubble = () => mainStore.toggleContactBubble();

const getCustomerById = (id) => mainStore.getCustomerById(id);

const currentImage = ref(null);

const previousProject = ref(null);
const nextProject = ref(null);

// Funktion zur Initialisierung des aktuellen Bildes
const setInitialImage = () => {
  if (project.value?.projectImages?.data?.length > 0) {
    currentImage.value = project.value.projectImages.data[0].attributes;
  }
};

// Funktion zur Aktualisierung der Navigation
const updateNavigation = () => {
  if (!projects.value || projects.value.length === 0) {
    console.warn('Keine Projekte verfügbar.');
    return;
  }

  const currentIndex = projects.value.findIndex(
    (p) => p.link === route.params.link
  );

  if (currentIndex === -1) {
    console.warn('Projekt nicht gefunden:', route.params.link);
    previousProject.value = null;
    nextProject.value = null;
    return;
  }

  previousProject.value =
    currentIndex > 0 ? projects.value[currentIndex - 1] : null;

  nextProject.value =
    currentIndex < projects.value.length - 1
      ? projects.value[currentIndex + 1]
      : null;
};

// Überprüfe und lade Projektdaten
const initializeProjectData = async () => {
  if (!dataFetched.value) {
    await mainStore.fetchStrapiData(); // Sicherstellen, dass alle Daten geladen sind
  }

  setInitialImage();
  updateNavigation();
};

// Beobachte Änderungen an `route.params.link`
watch(
  () => route.params.link,
  () => {
    initializeProjectData();
  },
  { immediate: true }
);

// Initialisierung beim Laden der Seite
onMounted(() => {
  initializeProjectData();
});

const setCurrentImage = (image) => {
  currentImage.value = image;
};

// Navigation für das vorherige Projekt
const navigateToPreviousProject = () => {
  if (previousProject.value) {
    router.push({ path: `/projekt/${previousProject.value.link}` });
  }
};

// Navigation für das nächste Projekt
const navigateToNextProject = () => {
  if (nextProject.value) {
    router.push({ path: `/projekt/${nextProject.value.link}` });
  }
};
</script>





<style lang="sass">
.project
  h1
    color: $pink //adjust-color($darkgrey, $lightness: 40%)
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
    max-width: 50vw
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
      font-family: 'Mainfont-Bold'
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
.ctaBox
  padding: 3rem 0
  h2
    margin-bottom: .5rem
  h3
    margin-bottom: .5rem
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
    span
      display: inline-block
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

