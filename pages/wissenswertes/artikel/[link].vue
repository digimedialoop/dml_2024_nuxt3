<template>
    <div class="article" v-if="article">
      <!-- Integration SideBarNaviSlider -->
      <SideBarNaviSlider link="/wissenswertes">
        Artikelübersicht
      </SideBarNaviSlider>
      <!-- Optional: Artikelbild anzeigen -->
      <section class="teaserBox">
        <div class="container">
            <p class="articleInfo"><b>Autor</b> Sabrina Hennrich | <b>Akualisiert</b> 02.02.2025</p>
            <img 
                v-if="article.image?.data?.attributes?.url"
                :src="cmsUrl + article.image.data.attributes.url" 
                :alt="article.image.data.attributes.alternativeText"
                class="img_detail">
            <h1>{{ article.header }}</h1>
            <!-- Vorlese-Button mit dynamischem Label -->
            <button v-if="false" class="readBtn" @click="toggleSpeech">
              {{ isPaused ? "Vorlesen fortsetzen" : isSpeaking ? "Vorlesen pausieren" : "Artikel vorlesen" }}
            </button>
            <p class="teaser">{{ article.teaser }}</p>
        </div>
        
      </section>
      <section class="articleBox container">
        <div v-html="htmlContent(article?.content)"></div>
        <button @click.prevent="toggleContactBubble" class="pinkBtn" role="button"
            aria-label="Kontakt aufnehmen">Kontaktieren Sie uns!</button>
      </section>
      
      
      
    </div>
    <div v-else class="container">
      <p>Artikel läd oder wird nicht gefunden.</p>
    </div>
  </template>
  
  <script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { useHtmlConverter } from '@/composables/useHTMLConverter'
import { useHead } from '#imports'
import { useSpeech } from '@/composables/useSpeech';
import SideBarNaviSlider from '@/components/SideBarNaviSlider.vue'

const { speak, stop, isSpeaking, isPaused } = useSpeech();

const route = useRoute()
const slug = route.params.link  // Hier wird der URL-Parameter (slug) ausgelesen

const mainStore = useMainStore()
const { cmsUrl, news } = storeToRefs(mainStore)

const toggleContactBubble = () => mainStore.toggleContactBubble();

// Suche den Artikel anhand des slugs
const article = computed(() => news.value.find(item => item.slug === slug))

const { convertToHTML, convertToText } = useHtmlConverter();
const htmlContent = (data) => convertToHTML(data)
const textContent = (data) => convertToText(data)

// Maximale Zeichenanzahl für Title und Description
const MAX_TITLE_LENGTH = 60
const MAX_DESCRIPTION_LENGTH = 160

// Funktion zum Trunkieren eines Strings
const truncate = (text, maxLength) => {
  if (!text) return ""
  return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text
}

// Definiere canonicalUrl als computed (hier aus window.location.origin + route.fullPath)
const canonicalUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.origin + route.fullPath
  }
  return 'https://www.digimedialoop.de' + route.fullPath
})

// Beobachte "article" und aktualisiere Head, sobald der Artikel geladen ist
watchEffect(() => {
  if (article.value) {
    const truncatedTitle = truncate(article.value.header, MAX_TITLE_LENGTH) || 'Artikel von digimedialoop';
    const truncatedDescription = truncate(article.value.teaser, MAX_DESCRIPTION_LENGTH) || 'Artikel über Webdesign von digimedialoop';
    
    useHead({
      key: 'articleMeta',
      title: truncatedTitle,
      meta: [
        { name: 'description', content: truncatedDescription },
        { property: 'og:title', content: truncatedTitle },
        { property: 'og:description', content: truncatedDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonicalUrl.value },
        { property: 'og:locale', content: 'de_DE' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: truncatedTitle },
        { name: 'twitter:description', content: truncatedDescription },
      ],
      link: [
        { rel: 'canonical', href: canonicalUrl.value },
        { rel: 'icon', href: '/favicon.ico' },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.value.header,
            "image": article.value.image?.data?.attributes?.url
              ? [ cmsUrl + article.value.image.data.attributes.url ]
              : [],
            "datePublished": article.value.datePublished || "2025-02-02T00:00:00+00:00",
            "dateModified": article.value.dateModified || "2025-02-02T00:00:00+00:00",
            "author": {
              "@type": "Person",
              "name": "Sabrina Hennrich"
            },
            "publisher": {
              "@type": "Organization",
              "name": "digimedialoop",
              "logo": {
                "@type": "ImageObject",
                "url": cmsUrl + "/uploads/DML_Logo_grey_2024_c51210b70c.svg"
              }
            },
            "description": article.value.teaser,
            "articleBody": convertToText(article.value.content)
          })
        }
      ]
    });
  }
});


// Funktion für den Vorlese-Button
const toggleSpeech = () => {
  if (article.value) {
    speak( article.value.teaser + " " + convertToText(article.value.content));
  }
};

// **Beobachte die Route und stoppe die Sprachausgabe bei Wechsel**
watch(() => route.fullPath, () => {
  reset(); // Stoppe die laufende Sprachausgabe beim Artikelwechsel
});
</script>


  
<style lang="sass">  
.overviewBtn
    position: fixed
    background-color: $yellow
    color: white
    text-transform: uppercase
    font-size: 1.1rem
    top: 30vh
    right: -80px  // Startposition außerhalb des Viewports
    padding: 1.4rem .8rem
    writing-mode: vertical-lr
    transform: rotate(180deg)
    border-bottom-right-radius: 1rem
    border-top-right-radius: 1rem
    cursor: pointer
    transition: right 1s ease-out, transform .8s  // Animation für das Einfahren
    z-index: 20

    &.slide-in
        right: 0  // Fährt an die finale Position

    &:hover
      transform: rotate(180deg) scale(1.1)
.article    
    .teaserBox
        margin-bottom: 1.5rem !important
        .teaser
            font-family: 'Mainfont-Bold'
    .articleInfo
        font-size: .8rem
        color: lighten($darkgrey, 25%)
        b
          color: $pink
    h1
        font-size: 1.6rem
        font-family: 'Mainfont-Bold'
        margin-bottom: 1.5rem
        line-height: 2.2rem
    h2
        font-size: 1.2rem
        margin-bottom: .5rem
        font-family: 'Mainfont-Bold'
        color: darken($pink, 10%)
    h3
        font-size: 1rem
        margin-bottom: 0rem
        font-family: 'Mainfont-Bold'
        color: darken($primaryColor, 10%)
    p
        font-size: 1.1rem
    ul
        font-size: 1.1rem
    .teaser
        font-size: 1rem
        margin-bottom: 1rem
    .content
        font-size: 1rem
        line-height: 1.6rem
    img
        width: 100%
        max-width: 350px
        float: right
        margin: 0 0 2rem 2rem
        border-radius: 1rem
        filter: grayscale(100%)
    .articleBox
        display: flex
        flex-direction: column
        align-items: flex-start
    
        .pinkBtn
            clear: both
            display: block
            width: max-content
</style>
  