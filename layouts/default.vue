<template>
  <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description" />
      <Meta name="language" :content="language" />
      
      <!-- Open Graph Meta Tags -->
      <Meta property="og:title" :content="title" />
      <Meta property="og:description" :content="description" />
      <Meta property="og:image" content="https://strapi.digimedialoop.de/uploads/DML_Logo_mint_2024_37426ffd12.svg" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://your-website-url.com" />
      
      <!-- Twitter Card Meta Tags -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" :content="title" />
      <Meta name="twitter:description" :content="description" />
      <Meta name="twitter:image" content="https://strapi.digimedialoop.de/uploads/DML_Logo_mint_2024_37426ffd12.svg" />
      
      <!-- Robots -->
      <Meta name="robots" content="index,follow" />
      
      <!-- Viewport and Charset -->
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta charset="utf-8" />
  </Head>
  <header :class="[screenWidth < 1350 ? 'mobile' : 'desk']">
    <div class="headContent" :class="scrollPosition > 50 ? 'active' : ''">
      <div class="logoBox" @click="navigateTo('/')">
        <img :src="`${cmsUrl}/uploads/DML_Logo_grey_2024_c51210b70c.svg`" alt="digimedialoop Logo" />
      </div>
      <div class="navigationBox" @click="toggleMenu" :class="[menuActive ? 'menu-active' : '', screenWidth < 1350 ? 'mobile' : 'desk']">
        <nav v-if="menuActive || screenWidth > 1350">
          <NuxtLink to="/news">News</NuxtLink>
          <NuxtLink to="/leistungen">Leistungen</NuxtLink>
          <NuxtLink to="/referenzen">Referenzen</NuxtLink>
          <NuxtLink to="/kontakt">Kontakt</NuxtLink>
        </nav>
      </div>
    </div>
  </header>
  <CtaBar />
  <main :class="[screenWidth < 1350 ? 'mobile' : 'desk']">
    <NuxtPage />
  </main>

  <footer>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 500 20"
        class="svgwavetop"
        style="
          transform: scaleY(-1) scaleX(-1) translateY(99%);
          fill: rgba(38, 38, 38, 0.95);
        "
      >
        <g clip-path="url(#_clipPath_5kVoellZ93LI5Lc2i2b27JZsraaBm0XM)">
          <path
            id="wave"
            d=" M 0 0 L 500 0 L 500 14 Q 354.4 -2.8 250 11 Q 145.6 24.8 0 14 L 0 0 Z "
          ></path>
        </g>
      </svg>
    </div>
    <div class="container">
      <div class="row align-items-end">
        <div class="col-md-4 mb-4">
          <p>
            <img
              :src="cmsUrl + invertLogo"
              :alt="companyinfo?.company"
              class="logo mb-1"
            />
          </p>
          <p>{{ companyinfo?.contact }}</p>
          <p>{{ companyinfo?.street }}</p>
          <p>
            {{ companyinfo?.postalcode }}
            {{ companyinfo?.city }}
          </p>
          <p>{{ companyinfo?.district }}</p>
          <br />
          <p>
            <span>Impressum | Datenschutz | AGB </span>
          </p>

          <p class="mt-4">
            &copy; 2018-{{ currentYear }} by {{ companyinfo?.web }}
          </p>
        </div>
        <div class="col-md-4 pt-4 mb-4">
          <div class="text-left">
            <p class="mb-4">
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#location"></use>
                </svg>
              </span>{{ companyinfo?.latitude }} | {{ companyinfo?.longitute }}
            </p>
            <p>
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#phone"></use>
                </svg>
              </span>{{ companyinfo?.phone }}
            </p>
            <p>
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#envelope"></use>
                </svg>
              </span>{{ companyinfo?.email }}
            </p>
            <p>
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#desktop"></use>
                </svg>
              </span>www.{{ companyinfo?.web }}
            </p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="certificates">
            <img
              :src="`${cmsUrl}/uploads/exali_Siegel_5adfae16cb.jpg`"
              alt="exali-Versicherungssiegel"
            />
            <img
              :src="`${cmsUrl}/uploads/XDI_zertifikat_162b61f4ad.png`"
              alt="XDI-Zertifizierung"
            />
          </div>
          <p class="mb-3">
            Handcrafted webdesign with passion and
            <span class="bigIcon">
              <svg>
                <use xlink:href="/assets/icons/collection.svg#heart"></use>
              </svg>
            </span>
          </p>
          <p class="powered">
            Powered by
            <img
              :src="`${cmsUrl}/uploads/nuxt_Logo_white_1ad151de78.svg`"
              alt="vue logo"
            />
            <span class="bigIcon">
              <svg>
                <use xlink:href="/assets/icons/collection.svg#plus"></use>
              </svg>
            </span>
            <img
              :src="`${cmsUrl}/uploads/strapi_logo_071ec5df4d.png`"
              alt="strapi logo"
            />
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { ref, computed, onMounted, onServerPrefetch } from 'vue';
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const mainStore = useMainStore();

// Computed properties to access store data
const companyinfo = computed(() => mainStore.companyinfo ?? null);
const cmsUrl = computed(() => mainStore.cmsUrl || config.public.VUE_APP_API_URL);
const currentYear = computed(() => new Date().getFullYear());
const scrollPosition = computed(() => mainStore.scrollPosition);
const screenWidth = computed(() => mainStore.screenWidth);
const menuActive = ref(false);
const invertLogo = computed(() => {
  return mainStore.companyinfo && mainStore.companyinfo.invertlogo 
    ? mainStore.companyinfo.invertlogo.data?.attributes?.url 
    : '/uploads/dummy_Image_4abc3f04dd.webp';
});

// Toggle menu function
const toggleMenu = () => {
  menuActive.value = !menuActive.value;
};

// Lädt Daten auf dem Server vor
onServerPrefetch(async () => {
  await mainStore.fetchStrapiData();
});

// Lädt die Daten auf dem Client nach
onMounted(() => {
  if (!mainStore.dataFetched) {
    mainStore.fetchStrapiData();
  }
  mainStore.initializeListeners();
});

// META TAGS
const title = 'digimedialoop | Ihre Webagentur in Herrsching am Ammersee'
const description = 'Ihr Partner für Webdesign und Webentwicklung in Herrsching am Ammersee im Landkreis Starnberg'
const language = 'de'
</script>


<style lang="sass">

body
  background-color: white
  font-family: 'Mainfont'    

  
// *************
// HEADER - PART     
// *************    
header
  position: fixed
  top: 0
  left: 0
  margin: 0
  width: 100%
  background-image: linear-gradient(to bottom, rgba(white, 1), rgba(white, 1), rgba(white, 1), rgba(white, 0))
  box-sizing: border-box
  z-index: 5
  &::before, &::after
    content: ''
    position: absolute
    z-index: 90
    backdrop-filter: blur(10px) brightness(1.05) // Glaseffekt: Unschärfe + leicht erhöhte Helligkeit
    -webkit-backdrop-filter: blur(10px) brightness(1.05)
    border: 1px solid rgba(255, 255, 255, 0.2) // leichte Transparenz des Randes
    background: radial-gradient(circle, rgba(103, 202, 172, 0.8), rgba(103, 202, 172, 0.6), rgba(103, 202, 172, 0.4))
    background-size: 150% 150%
    opacity: 0.85 // Sichtbarkeit anpassen, aber noch leicht transparent
    z-index: 6
  &::before
    width: 60vw
    height: 18rem
    border-radius: $loopShape
    top: -12rem
    right: -5vw
    animation: bubble-wobble 8s infinite ease alternate, gradient-animation 20s infinite alternate ease-in-out
    z-index: 6
  &::after
    width: 28vw
    height: 12rem
    border-radius: $loopShape
    top: -2rem
    right: -6vw
    animation: bubble-wobble 7s infinite ease alternate, gradient-animation 12s infinite alternate ease-in-out

  // MOBILE NAVIGATION
  &.mobile
    top: 0
    .headContent
      padding: 0
      .logoBox
        width: 60%
        z-index: 101
        img
          margin-top: 5rem
      &.active
        .logoBox
          img
            margin-top: 3rem
      .navigationBox
        display: block
        position: relative
        background-color: $darkgrey
        width: 4rem
        height: 4rem
        z-index: 100
        border-radius: 50%
        margin-right: 5vw
        margin-top: 2rem
        &::before, &::after
          position: absolute
          content: ''
          width: 2rem
          z-index: 101
          height: 5px
          border-radius: 4px
          background-color: white
          right: 75%
          transform: translateX(100%)
          transition: .8s
        &::before          
          top: 35%
        &::after
          top: 55%
        nav
          display: none
          background-image: none
          border: none
          a
            display: block
            color: white
            text-align: left
            margin-bottom: .5rem
            padding: 1rem 2.8rem
            position: relative
            font-size: 1.6rem !important
            width: auto
            max-width: 18rem
            &::before
              content: ''
              width: 1rem
              height: .6rem
              background-color: rgba($primaryColor, .9)
              border-radius: $loopShape
              position: absolute
              top: 1.6rem
              left: 1rem
              border-radius: 20px
            &:hover
              transform: scale(1.06)
              background-image: radial-gradient(rgba($primaryColor, .1), transparent, transparent)
              box-shadow: 0 0 0 0 transparent
              border-radius: 20px

        &.menu-active
          width: 100vw
          height: 80vh
          border-radius: 5px
          margin: 0
          background-color: rgba($darkgrey, .9)
          &::before, &::after
            top: 2rem
            right: 1rem
          &::before    
            transform: rotate(45deg)
          &::after    
            transform: rotate(-45deg)
          nav
            display: block
            padding: 10vh 0
            margin: 0 5vw

  .headContent
    display: flex
    align-items: top
    justify-content: space-between
    width: 100%
    padding: 0 2rem
    box-sizing: border-box
    transition: .8s
    z-index: 7
    margin: 0
    height: 4rem
    .logoBox
      display: flex
      align-self: center
      justify-content: left
      width: 33%
      transition: .8s
      background-color: transparent
      img
        width: 90%
        max-width: 250px
        margin: 4rem 5vw 0 5vw
        transition: .8s
    .navigationBox
      position: relative
      display: flex
      align-items: center
      justify-content: flex-end
      width: 67%
      transition: .8s
      nav
        display: block
        z-index: 100
        background: linear-gradient(to right top, rgba(adjust-color($beige, $lightness: 5%), 0.8), rgba(white, 0.9), rgba(white, 0.9))
        border: 1px solid adjust-color($beige, $lightness: 5%)
        padding: 1rem 2.5rem
        text-align: center
        border-radius: 1rem
        margin: 6rem 2vw 0 8vh
        transition: .8s
        a
          margin: 0 1.5rem
          text-decoration: none
          color: $darkgrey
          text-transform: uppercase
          font-family: 'Comfortaa-Bold'
          font-size: 1.2rem
          letter-spacing: .1rem
          transition: .6s
          display: inline-block
          &:hover
            transform: scale(1.15)
            background-image: radial-gradient(rgba(white, .5), rgba(white, .1))
            box-shadow: 0 0 10px 10px rgba(white, 0.2)
            border-radius: 10px
    &.active
      padding: 0 0 2.5rem 0
      .navigationBox
        nav
          display: flex
          margin: 4rem 0 0 0
          padding: 1rem 1rem
          border-top-right-radius: 0
          border-top-left-radius: 0
          border-bottom-left-radius: 50px
          border-bottom-right-radius: 0
          background: transparent
          border: 1px solid transparent
          a
            font-size: 1.15rem
            font-weight: bold
      .logoBox
        align-items: left
        img
          margin-bottom: .5rem          
          width: 70%
          max-width: 200px
    


// *************
// MAIN - PART     
// *************     

main
  margin-top: 15vw
  font-family: 'Mainfont'
  min-height: 45vh
  z-index: 3
  h1
    font-family: 'Comfortaa'
    font-size: $fontSizeLarge //calc(1.2rem + 1.2vw)
    margin-top: calc(.6rem + .6vw)
    margin-bottom: calc(1.2rem + 1.2vw)
    line-height: calc(1.2rem + 1.2vw + 40%)
    font-weight: normal

  h2
    font-family: 'Comfortaa'
    font-size: $fontSizeMedium //calc(.9rem + 1vw)
    margin-top: calc(.6rem + .6vw)
    margin-bottom: calc(1.2rem + 1.2vw)
    line-height: calc(1.2rem + 1.2vw + 40%)
    font-weight: normal
    
  h3
    font-family: 'Comfortaa'
    font-size: calc(#{$fontSizeMedium} * 0.7) //calc(.9rem + 1vw)
    margin-top: calc(.2rem + .6vw)
    margin-bottom: calc(1.2rem + 1.2vw)
    line-height: calc(1.2rem + 1.2vw + 40%)
    font-weight: normal
  p
    font-size: $fontSizeNormal //1.4rem
  
  b
    font-family: 'Mainfont-Bold'  

  u
    text-decoration: none
    position: relative
    &::before
      content: ""
      transform: rotate(-3deg)
      border-bottom: 4px solid rgba(103,202,172,.25)
      position: absolute
      bottom: 5px
      left: 0
      width: 100%
      box-shadow: 4px 4px 2px 1px rgba(103,202,172,.25)

  .imgRight, .imgLeft
    width: 45%
    @media(max-width: $breakPointLG)
      float: none
      width: 80%
      margin: 1rem 10%

  .imgRight
    float: right
    margin: 2rem 0 2rem 2rem    
    @media(max-width: $breakPointLG)
      float: none

  .imgLeft
    float: left
    margin: 2rem 2rem 2rem 0
    @media(max-width: $breakPointLG)
      float: none

  .loopShape
    border-radius: $loopShape

  button
    background-color: white
    border: 1px solid $darkgrey
    border-radius: 5px
    padding: 0.5rem 1rem
    font-size: 1.2rem
    text-transform: uppercase
    position: relative
    overflow: hidden
    transition: all 0.4s ease-in-out 
    z-index: 1 
  
    &::before
      content: ''
      position: absolute
      top: 50%
      left: 50%
      width: 300%
      height: 300%
      background-color: rgba($primaryColor, 0.4) 
      transition: transform 0.4s ease-in-out 
      border-radius: 50%
      transform: translate(-50%, -50%) scale(0) 
      z-index: 1 
  
    span, a 
      position: relative
      z-index: 2   

    &:hover
      box-shadow: 0 0 15px rgba($primaryColor, 0.2), 0 0 25px rgba($primaryColor, 0.2)
      border: 1px solid rgba($primaryColor, 0.8)
      letter-spacing: .05rem
      transform: scale(1.05)
      /*&::before
        transform: translate(-50%, -50%) scale(1) */
        
  section
    margin-bottom: 10vh
    position: relative
    &:first-of-type
      &::before
        content: ''
        width: 25vw
        max-width: 300px
        height: 90%
        min-height: 350px
        background-color: rgba($primaryColor, .7)
        border-radius: $loopShape
        position: absolute
        top: 5%
        left: var(--dynamic-left)
        z-index: 90
        animation: bubble-wobble 5s infinite ease alternate
        transition: left 0.3s
    &.beigeBG
      background-color: $beige
      min-height: 200px
  &.mobile
    margin-top: 20vh
// *************
// FOOTER - PART     
// *************   

footer
  background: rgba(38,38,38,.95)
  position: relative
  width: 100vw
  color: white
  z-index: 90
  height: auto
  min-height: 120px
  margin-top: 100px
  .topshape
      fill: white
      transform: translateY(-1px)
  p
      font-size: calc($fontSizeNormal - 20%)
      line-height: 0.9rem
      margin-bottom: 0.4rem
      a
        cursor: pointer
        color: white
        font-weight: bold
        border-bottom: 0
        &:hover
          box-shadow: 0 0 20px 0 rgba($primaryColor, .3)
          background-color: rgba($primaryColor, .2)
          border-radius: 4px
  .logo
      width: 38% !important
  .icon
      margin-right: 1rem
      width: 1.2rem
      display: inline-block
      text-align: center
      svg
        width: 100%
        fill: white
        max-height: 1.5rem
  .bigIcon
    margin-right: .2rem
    margin-left: .2rem
    width: 1.2rem
    display: inline-block
    text-align: center
    svg
      width: 100%
      fill: white
      max-height: 1.5rem
  .certificates
      img
          height: 10vw
          max-height: 80px
          filter: grayscale(100%)
          margin: 1rem 1rem 1rem 1rem
  .powered
      img
          height: 20px
          margin: auto 15px

</style>
