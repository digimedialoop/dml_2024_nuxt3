<template>
  <div>
    <div class="customerBanner">
      <!--<WaveEdge vertical="top" fill="#775770" />-->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
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
          <h2 class="pt-4 pb-3">Diese Unternehmen vertrauen uns</h2>
          <div class="marquee marquee--hover-pause mt-5">
            <ul class="marquee__content">
              <li v-for="(c, index) in customers" :key="index">
                <img
                  :src="cmsUrl + c.logo.data.attributes.url"
                  class="custLogo"
                  :alt="c.company"
                />
              </li>
            </ul>

            <ul aria-hidden="true" class="marquee__content">
              <li v-for="(c, index) in customers" :key="index">
                <img
                  :src="cmsUrl + c.logo.data.attributes.url"
                  class="custLogo"
                  :alt="c.company"
                />
              </li>
            </ul>
          </div>
          <!--<marquee
            behavior="scroll"
            direction="left"
            loop="infinite"
            scrollamount="15"
            Scrolldelay="10"
            style="width: 100%"
          >
            <img
              v-for="(c, index) in customers"
              :key="index"
              :src="cmsUrl + c.attributes.logo.data.attributes.url"
              class="custLogo"
              :alt="c.attributes.company"
            />
          </marquee>-->
        </div>
      </div>
      <div class="waveBox">
        <div id="waver">
          <div class="waveWrapper waveAnimation">
            <div class="waveWrapperInner bgTop">
              <div
                class="wave waveTop"
                :style="{
                  backgroundImage: `url('${cmsUrl}/uploads/wave_top_8fe067e598.svg')`,
                }"
              ></div>
            </div>
            <div class="waveWrapperInner bgMiddle">
              <div
                class="wave waveMiddle"
                :style="{
                  backgroundImage: `url('${cmsUrl}/uploads/wave_middle_24d8a84a35.svg')`,
                }"
              ></div>
            </div>
            <div class="waveWrapperInner bgBottom">
              <div
                class="wave waveBottom"
                :style="{
                  backgroundImage: `url('${cmsUrl}/uploads/wave_bottom_6fc8184efb.svg')`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useMainStore } from '@/stores/main' 
import { storeToRefs } from 'pinia'

// Pinia Store initialisieren
const mainStore = useMainStore()

// Zugriff auf den Zustand aus dem Store (state)
const { customers, cmsUrl } = storeToRefs(mainStore)
</script>
 
<style lang="sass">
.customerBanner
    position: relative
    .box
        background-color: #EEEBE5
        width: 100%
        min-height: 50px
        margin-top: -20px
        h1
            color: $darkgrey
            font-size: 1.2rem

        .marquee
            --gap: 1rem
            position: relative
            display: flex
            overflow: hidden
            user-select: none
            gap: var(--gap)
            ul
                 list-style-Type: none
            &:hover .marquee__content
                 animation-play-state: paused

        .marquee__content
            flex-shrink: 0
            display: flex
            justify-content: space-around
            gap: var(--gap)
            min-width: 100%
            animation: scroll 15s linear infinite
            li
              &::before
                display: none

@keyframes scroll
    from
          transform: translateX(0)
    to
          transform: translateX(calc(-100% - var(--gap)))

.waveLila
    fill: #EEEBE5

.custLogo
    width: auto
    max-width: 250px
    height: 50px
    margin: 0 3rem
    filter: grayscale(100%)
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
        background-image: linear-gradient(to top, #EEEBE5 20%, #EEEBE5 80%)

    @media(max-width: $breakPointLG)
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
        background-size: content

        .waveAnimation 
          .waveTop
            animation: move-wave 3s
            -webkit-animation: move-wave 3s
            -webkit-animation-delay: 1s
            animation-delay: 1s

    .waveMiddle
        background-size: content

    .waveAnimation 
      .waveMiddle
        animation: move_wave 10s linear infinite

    .waveBottom
        background-size: content

    .waveAnimation 
      .waveBottom
        animation: move_wave 15s linear infinite
</style>
