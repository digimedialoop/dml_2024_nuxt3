<template>
  <header>
    <div class="headContent" :class="scrollPosition > 50 ? 'active' : ''">
      <div class="logoBox">
        <img :src="cmsUrl + '/uploads/DML_Logo_grey_2024_c51210b70c.svg'" alt="digimedialoop Logo" />
      </div>
      <div class="navigationBox">
        <nav>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/agentur">Webagentur</NuxtLink>
          <NuxtLink to="/referenzen">Referenzen</NuxtLink>
          <NuxtLink to="/kontakt">Kontakt</NuxtLink>
        </nav>
      </div>
    </div>
  </header>

  <main>
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
        <div class="col-md-5 mb-4">
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
          <p>{{ companyinfo?.distirct }}</p>
          <br />
          <p>
            <span v-for="(n, index) in navigation" :key="navigation?.id">
              <span
                v-show="index > 0"
                class="mintFont"
                style="margin-left: 0.05em; margin-right: 0.05rem"
                >|</span
              >
              <a
                @click="
                  $router.push({
                    path: n?.attributes?.navLink,
                  })
                "
              >
                {{ n?.attributes?.navTitle }}
              </a>
            </span>
          </p>

          <p class="mt-4">
            &copy; 2018-{{ currentYear }} by {{ companyinfo?.web }}
          </p>
        </div>
        <div class="col-md-3 pt-4 mb-4">
          <div class="text-left">
            <p class="mb-4">
              <span class="icon"
                >
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#location"></use>
                </svg>
                </span
              >B {{ companyinfo?.latitude }} |
              {{ companyinfo?.longitute }}
            </p>
            <p>
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#phone"></use>
                </svg>
              </span
              >{{ companyinfo?.phone }}
            </p>
            <p>
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#envelope"></use>
                </svg>
                </span
              >{{ companyinfo?.email }}
            </p>
            <p>
              <span class="icon">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#desktop"></use>
                </svg>
              </span
              >www.{{ companyinfo?.web }}
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
              :src="`${cmsUrl}/uploads/Vuejs_Logo_2_e4eaf20ecb.png`"
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
// Import necessary features from Vue and Pinia
import { onMounted, computed } from 'vue'
import { useApolloClient } from '@vue/apollo-composable';
import { useMainStore } from '@/stores/main';

// Store und Apollo Client initialisieren
const mainStore = useMainStore();
const apolloClient = useApolloClient();

// Daten beim Mounten abrufen
onMounted(() => {
  mainStore.fetchStrapiData(apolloClient);
});

// Computed properties to access store data
const companyinfo = computed(() => mainStore.companyinfo ?? null);
const invertLogo = computed(() => {
  // Prüfe, ob die companyinfo und invertlogo vorhanden sind, bevor darauf zugegriffen wird
  return mainStore.companyinfo && mainStore.companyinfo.invertlogo 
    ? mainStore.companyinfo.invertlogo.data?.attributes?.url 
    : '/uploads/dummy_Image_4abc3f04dd.webp';
});

const cmsUrl = computed(() => mainStore.cmsUrl);
const navigation = computed(() => {
  return mainStore.navigation && Array.isArray(mainStore.navigation)
    ? mainStore.navigation.filter(n => n.attributes.footerMenu)
    : [];
});

const currentYear = computed(() => new Date().getFullYear());


// SCROLL POSITION
const scrollPosition = computed(() => mainStore.scrollPosition);
// Beim Mounten der Komponente Scroll-Überwachung starten
onMounted(() => {
  const stopMonitoringScroll = mainStore.monitorScroll();

  // Optional: Cleanup, wenn die Komponente entfernt wird
  onUnmounted(() => {
    stopMonitoringScroll();
  });
});
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
  height: auto
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

  .headContent
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 1rem 2rem
    box-sizing: border-box
    transition: .8s
    z-index: 7
    .logoBox
      display: flex
      align-items: center
      justify-content: center
      width: 33%
      transition: .8s
      background-color: transparent
      img
        width: 90%
        max-width: 250px
        margin: 3rem 0 0 0
        transition: .8s
    .navigationBox
      display: flex
      align-items: center
      justify-content: flex-end
      width: 67%
      transition: .8s
      nav
        display: block
        z-index: 100
        background: linear-gradient(to right top, rgba(adjust-color($lightgrey, $lightness: -2%), 0.6), rgba(white, 0.7), rgba(white, 0.7))
        border: 1px solid adjust-color($lightgrey, $lightness: -2%)
        padding: 1rem 2.5rem
        text-align: center
        border-radius: 1rem
        margin: 5vh 2vw 0 8vh
        transition: .8s
        a
          margin: 0 2rem
          text-decoration: none
          color: $darkgrey
          text-transform: uppercase
          font-family: 'Mainfont'
          font-size: 1.6rem
          transition: .8s
    &.active
      padding: 0 0 2.5rem 0
      .navigationBox
        nav
          margin: -.2rem
          padding: 1rem 1rem
          border-top-right-radius: 0
          border-top-left-radius: 0
          border-bottom-left-radius: 50px
          border-bottom-right-radius: 0
          background: transparent
          border: 1px solid transparent
          a
            font-size: 1.2rem
            font-weight: bold
      .logoBox
        align-items: left
        img
          margin-top: 1rem
          margin-bottom: .5rem          
          width: 70%
          max-width: 200px
          transform: translateX(-30%)

// *************
// MAIN - PART     
// *************     

main
  margin-top: 12vw
  font-family: 'Mainfont'
  min-height: 45vh
  z-index: 3
  h1
    font-family: 'Comfortaa'
    font-size: calc(1.2rem + 1.2vw)
    margin-top: calc(.6rem + .6vw)
    margin-bottom: calc(1.2rem + 1.2vw)
    line-height: calc(1.2rem + 1.2vw + 40%)
    font-weight: normal

  h2
    font-family: 'Comfortaa'
    font-size: calc(.9rem + 1vw)
    margin-top: calc(.6rem + .6vw)
    margin-bottom: calc(1.2rem + 1.2vw)
    line-height: calc(1.2rem + 1.2vw + 40%)
    font-weight: normal

  p
    font-size: 1.4rem

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
      transition: transform 0.6s ease-in-out 
      border-radius: 50%
      transform: translate(-50%, -50%) scale(0) 
      z-index: 1 
  
    span, a 
      position: relative
      z-index: 2   

    &:hover
      box-shadow: 0 0 15px rgba($primaryColor, 0.2), 0 0 25px rgba($primaryColor, 0.2)
      border: 1px solid rgba($primaryColor, 0.4)
      &::before
        transform: translate(-50%, -50%) scale(1) 
        
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
    margin-right: .5rem
    margin-left: .5rem
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
