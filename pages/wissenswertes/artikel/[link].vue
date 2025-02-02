<template>
    <div class="article" v-if="article">
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
            <p class="teaser">{{ article.teaser }}</p>
        </div>
        
      </section>
      <section class="articleBox container">
        <span v-html="htmlContent(article?.content)"></span>
        <button @click.prevent="toggleContactBubble" role="button"
            aria-label="Kontakt aufnehmen">Lassen Sie uns darüber sprechen!</button>
      </section>
      
      
      
    </div>
    <div v-else class="container">
      <p>Artikel nicht gefunden.</p>
    </div>
  </template>
  
  <script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { useHtmlConverter } from '@/composables/useHTMLConverter'
import { useHead } from '#imports'

const route = useRoute()
const slug = route.params.link  // Hier wird der URL-Parameter (slug) ausgelesen

const mainStore = useMainStore()
const { cmsUrl, news } = storeToRefs(mainStore)

const toggleContactBubble = () => mainStore.toggleContactBubble();

// Suche den Artikel anhand des slugs
const article = computed(() => news.value.find(item => item.slug === slug))

const { convertToHTML, convertToText } = useHtmlConverter();
const htmlContent = (data) => convertToHTML(data)

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

</script>


  
<style lang="sass">  
.article
    .teaserBox
        margin-bottom: 1.5rem !important
        .teaser
            font-family: 'Mainfont-Bold'
    .articleInfo
        font-size: .8rem
        color: lighten($darkgrey, 25%)
    h1
        font-size: 1.6rem
        font-family: 'Mainfont-Bold'
        margin-bottom: 0.5rem
    h2
        font-size: 1.2rem
        margin-bottom: .5rem
        font-family: 'Mainfont-Bold'
    h3
        font-size: 1rem
        margin-bottom: 0rem
        font-family: 'Mainfont-Bold'
    p
        font-size: 1rem
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
</style>
  