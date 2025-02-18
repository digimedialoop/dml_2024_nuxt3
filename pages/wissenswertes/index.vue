<template>
    <div class="knowledgeBox">
        <section class="teaserBox">
            <div class="container">
                <h1>Wissenswertes rund ums Thema Webseite</h1>
                <p>In unserem Wissensbereich zeigen wir, worauf es bei <b>Suchmaschinen-Optimierung</b>, <b>Barrierefreiheit</b>, <b>Webdesign</b>, <b>Webperformance</b> und <b>Online-Marketing</b> ankommt.</p>
                <p>Entdecken Sie aktuelle Trends und praxisnahe Tipps, um Ihre Online-Präsenz gezielt zu stärken.</p>
            </div>
        </section>
        <section class="articleBox container">
            <div class="article" v-for="(article, index) in news" :key="article.id">
                <NuxtLink :to="`/wissenswertes/artikel/${article.slug}`">
                    <img 
                    v-if="article.image?.data?.attributes?.url"
                    :class="index % 2 === 0 ? 'img_right' : 'img_left'"
                    :src="cmsUrl + article.image.data.attributes.url" 
                    :alt="article.image.data.attributes.alternativeText">
                    <h2>{{ article.header }}</h2>
                    <p>{{ article.teaser }}</p>
                </NuxtLink>
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
    .article
        border: 1px solid $beige
        background: linear-gradient(to bottom right, white, $lightgrey)
        margin: 0 0 3rem 0
        padding: 0.5rem 5vw .5rem 5vw
        border-radius: 1rem
        transition: .8s
        position: relative
        a
            text-decoration: none
            color: $darkgrey
        &:hover
            background: linear-gradient(to bottom right, white, $beige)
            transform: scale(1.05)
            cursor: pointer
        img
            width: 30%
            max-width: 250px
            border-radius: .5rem
        .img_right
            float: right
            margin: 1rem .5rem .8rem 2rem
        .img_left
            float: left
            margin: 1rem 2rem .8rem .5rem

        h2
            font-size: 1.2rem
            font-family: 'Mainfont-Bold'
            line-height: 1.6rem
            margin-bottom: .5rem
        p
            font-size: 1rem
</style>