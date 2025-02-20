<template>
  <div class="knowledgeBox">
      <section class="teaserBox">
          <div class="container">
              <h1>Wissenswertes rund ums Thema Webseite</h1>
              <p>In unserem Wissensbereich zeigen wir, worauf es bei <b>Suchmaschinen-Optimierung</b>, <b>Barrierefreiheit</b>, <b>Webdesign</b>, <b>Webperformance</b> und <b>Online-Marketing</b> ankommt.</p>
              <p>Entdecken Sie aktuelle Trends und praxisnahe Tipps, um Ihre Online-Präsenz gezielt zu stärken.</p>
              
          </div>
      </section>

      <!-- Grid mit dynamischem Layout -->
      <section class="articleBox container">
          <div class="grid">
              <div 
                  class="article"
                  v-for="(article, index) in news"
                  :key="article.id"
              >
                  <NuxtLink :to="`/wissenswertes/artikel/${article.slug}`">
                      <img 
                          v-if="article.image?.data?.attributes?.url"
                          :src="cmsUrl + article.image.data.attributes.url" 
                          :alt="article.image.data.attributes.alternativeText"
                      >
                      <div class="content">
                          <h2>{{ article.header }}</h2>
                          <p>{{ truncateText(article.teaser, 200) }}</p>
                          <button class="mintBtn">Artikel lesen</button>
                      </div>
                  </NuxtLink>
              </div>
          </div>
      </section>
  </div>
</template>




<script setup>
import { watch } from 'vue'
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { cmsUrl, news } = storeToRefs(mainStore);

// Ermittle die aktuelle Domain (origin) im Browser
const currentDomain = typeof window !== 'undefined'
  ? window.location.origin
  : 'https://www.digimedialoop.de'  // Fallback, falls window nicht verfügbar ist

const truncateText = (text, length = 200) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "…" : text;
};
// Beobachte "news" und aktualisiere das JSON-LD Markup, sobald Daten vorliegen
watch(news, (newVal) => {
  if (newVal && newVal.length > 0) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": newVal.map((article, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `${currentDomain}/wissenswertes/artikel/${article.slug}`,
              "name": article.header
            }))
          })
        }
      ]
    })
  }
})
</script>

<style lang="sass">
.articleBox
    display: flex
    justify-content: center
    width: 100%

    .grid
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
        gap: 2rem
        justify-content: start
        width: 100%
        max-width: 100%
        margin: 0 auto

    .article
        width: 300px
        border: 1px solid $beige
        background: linear-gradient(to bottom right, white, $lightgrey)
        border-radius: 1rem
        transition: .8s
        position: relative
        display: flex
        flex-direction: column
        align-items: flex-start
        overflow: hidden

        a
            text-decoration: none
            color: $darkgrey
            display: flex
            flex-direction: column
            height: 100%

        img
            width: 100%
            height: 220px // Gleichmäßige Bildhöhe für alle Artikel
            object-fit: cover
            border-top-left-radius: 1rem
            border-top-right-radius: 1rem
            border-bottom-left-radius: 0
            border-bottom-right-radius: 0
            margin: 0
            filter: grayscale(100%)

        .content
            padding: 1rem
            display: flex
            flex-direction: column
            flex-grow: 1
            h2
              font-size: 1rem
            .mintBtn
              background-color: $primaryColor
              color: white
              font-size: .9rem
              font-family: 'Mainfont-Bold'
              border: $primaryColor

        &:hover
            background: linear-gradient(to bottom right, white, $beige)
            transform: scale(1.05)
            cursor: pointer

        h2
            font-size: 1.2rem
            font-family: 'Mainfont-Bold'
            line-height: 1.6rem
            margin-bottom: .5rem

        p
            font-size: 1rem

</style>