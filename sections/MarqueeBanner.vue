<template>
  <div>
    <div class="banner-wrapper">
      <!-- Obere Welle als SVG -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 20"
        class="svgwavetop"
        style="transform: scaleY(-1)"
      >
        <g clip-path="url(#_clipPath_5kVoellZ93LI5Lc2i2b27JZsraaBm0XM)">
          <path
            id="wave"
            d=" M 0 0 L 500 0 L 500 14 Q 354.4 -2.8 250 11 Q 145.6 24.8 0 14 L 0 0 Z "
            fill="#EEEBE5"
          ></path>
        </g>
      </svg>

      <div class="box pb-5">
        <div class="container">
          <h2 class="pt-4 pb-3">{{ title }}</h2>

          <!-- Marquee mit doppeltem Inhalt für endloses Scrollen -->
          <div class="marquee marquee--hover-pause mt-5">
            <ul class="marquee__content">
              <li v-for="(item, index) in items" :key="index">
                <NuxtLink
                  v-if="item.link"
                  :to="`/${link}/${item.link}`"
                  class="custLogoLink"
                >
                  <img
                    :src="cmsUrl + getImageUrl(item)"
                    class="custLogo"
                    :style="{ height: logoHeight + 'px' }"
                    :alt="getAltText(item)"
                  />
                </NuxtLink>
                <img
                  v-else
                  :src="cmsUrl + getImageUrl(item)"
                  class="custLogo"
                  :style="{ height: logoHeight + 'px' }"
                  :alt="getAltText(item)"
                />
              </li>
            </ul>

            <ul aria-hidden="true" class="marquee__content">
              <li v-for="(item, index) in items" :key="'duplicate-' + index">
                <NuxtLink
                  v-if="item.link"
                  :to="`/${link}/${item.link}`"
                  class="custLogoLink"
                >
                  <img
                    :src="cmsUrl + getImageUrl(item)"
                    class="custLogo"
                    :style="{ height: logoHeight + 'px' }"
                    :alt="getAltText(item)"
                  />
                </NuxtLink>
                <img
                  v-else
                  :src="cmsUrl + getImageUrl(item)"
                  class="custLogo"
                  :style="{ height: logoHeight + 'px' }"
                  :alt="getAltText(item)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Wellen am unteren Rand -->
      <div class="waveBox">
        <div id="waver">
          <div class="waveWrapper waveAnimation">
            <div class="waveWrapperInner bgTop">
              <div
                class="wave waveTop"
                :style="{ backgroundImage: `url('${cmsUrl}/uploads/wave_top_8fe067e598.svg')` }"
              ></div>
            </div>
            <div class="waveWrapperInner bgMiddle">
              <div
                class="wave waveMiddle"
                :style="{ backgroundImage: `url('${cmsUrl}/uploads/wave_middle_24d8a84a35.svg')` }"
              ></div>
            </div>
            <div class="waveWrapperInner bgBottom">
              <div
                class="wave waveBottom"
                :style="{ backgroundImage: `url('${cmsUrl}/uploads/wave_bottom_6fc8184efb.svg')` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

// Pinia Store initialisieren
const mainStore = useMainStore();
const { cmsUrl } = storeToRefs(mainStore);

// Props: title, items, logoHeight, und link (optional)
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  logoHeight: {
    type: Number,
    default: 50, // Standardhöhe in Pixel
  },
  title: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: 'projekt', // Standardwert, wenn keine spezifische Seite angegeben wird
  },
});

// Funktion zur Bestimmung des Bild-URLs basierend auf Typ des Items
const getImageUrl = (item) => {
  if (item.logo) {
    // Für Customers: Verwende das logo-Feld
    return item.logo.data.attributes.url;
  } else if (item.projectImages && item.projectImages.data.length > 0) {
    // Für Projects: Verwende das erste Bild im projectImages-Feld
    return item.projectImages.data[0].attributes.url;
  }
  return '';
};

// Funktion zur Ermittlung des Alt-Texts für das Bild
const getAltText = (item) => {
  if (item.logo) {
    return item.logo.data.attributes.alternativeText || item.company || '';
  } else if (item.projectImages && item.projectImages.data.length > 0) {
    return item.projectImages.data[0].attributes.alternativeText || item.projectTitle || '';
  }
  return '';
};

</script>

<style lang="sass">
.banner-wrapper
  position: relative

.box
  background-color: $beige
  width: 100%
  min-height: 50px
  margin-top: -20px

  h2
    color: #333
    font-size: 1.2rem

.marquee
  --gap: 1rem
  position: relative
  display: flex
  overflow: hidden
  user-select: none
  gap: var(--gap)
  ul
    list-style-type: none
  &:hover .marquee__content
    animation-play-state: paused

.marquee__content
  flex-shrink: 0
  display: flex
  justify-content: space-around
  gap: var(--gap)
  min-width: 100%
  animation: scroll 30s linear infinite
  li
    &::before
      display: none

@keyframes scroll
  from
    transform: translateX(0)
  to
    transform: translateX(calc(-100% - var(--gap)))

.custLogo
  width: auto
  max-width: 250px
  height: 50px
  margin: 0 3rem
  filter: grayscale(100%)
  transition: filter 0.3s ease
  &:hover
    filter: grayscale(0)

.waveBox
  position: relative
  height: 120px
  #waver
    display: block
    position: absolute
    left: 0
    height: 120px
    width: 100%
    padding: 0
    margin: 0

  @keyframes move_wave
    0%
      transform: translateX(0) translateZ(0) scaleY(1)
    50%
      transform: translateX(-25%) translateZ(0) scaleY(0.55)
    100%
      transform: translateX(-50%) translateZ(0) scaleY(1)

  .waveWrapper
    overflow: hidden
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    margin: auto

  .waveWrapperInner
    position: absolute
    width: 100%
    overflow: hidden
    height: 120px
    top: 0
    background-image: linear-gradient(to top, $beige 20%, $beige 80%)

  @media (max-width: 1024px)
    .waveWrapperInner
      height: 50px

  .bgTop
    z-index: 15
    opacity: 0.5

  .bgMiddle
    z-index: 10
    opacity: 0.75

  .bgBottom
    z-index: 5

  .wave
    position: absolute
    left: 0
    width: 200%
    height: 100%
    background-repeat: repeat no-repeat
    background-position: 0 bottom
    transform-origin: center bottom

  .waveTop
    background-size: auto 100%
    animation: move_wave 18s linear infinite

  .waveMiddle
    background-size: auto 100%
    animation: move_wave 11s linear infinite

  .waveBottom
    background-size: auto 100%
    animation: move_wave 15s linear infinite
</style>
