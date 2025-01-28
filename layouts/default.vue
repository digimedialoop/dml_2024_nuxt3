<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="language" :content="language" />
    <Meta name="google-site-verification" content="wJJ_1ptqt3xz0TsEpWpDczyV4rY5mAh9_np9TFbVcL8" />
  </Head>
  <header
    :class="[{ mobile: screenWidth < 1350, desk: screenWidth >= 1350 }, { active: scrollPosition > 50 }]"
    role="banner"
  >
    <div class="headContent">
      <div class="logoBox" @click="navigateTo('/')" role="button" tabindex="0" aria-label="Startseite">
        <img :src="cmsUrl + '/uploads/DML_Logo_grey_2024_c51210b70c.svg'" alt="digimedialoop Logo" />
      </div>
      <div
        class="navigationBox"
        @click="toggleMenu"
        @keydown.enter="toggleMenu"
        :class="[
          isMenuOpen ? 'menu-active' : '',
          screenWidth < 1350 ? 'mobile' : 'desk'
        ]"
        role="navigation"
        aria-label="Hauptnavigation"
        tabindex="0"
      >
        <nav v-if="isMenuOpen || screenWidth > 1350" aria-expanded="true" autofocus>
          <NuxtLink to="/webagentur" aria-label="Zur Webagentur">Agentur</NuxtLink>
          <NuxtLink to="/leistungen" aria-label="Zu unseren Leistungen">Leistungen</NuxtLink>
          <NuxtLink to="/referenzen" aria-label="Unsere Referenzen">Referenzen</NuxtLink>
        <a class="menu_link" href="#"
            @click="toggleContactBubble" 
            role="button"
            aria-label="Kontaktformular öffnen"
          >
            Kontakt   
        </a>    
        </nav>
      </div>
    </div>
  </header>

  <main
    :class="[screenWidth < 1350 ? 'mobile' : 'desk']"
    tabindex="-1"
    id="main-content"
    role="main"
  >
    <NuxtPage :key="routeKey" />
  </main>

  <ContactForm />

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
        <div class="col-lg-4 mb-4">
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
            <span><NuxtLink to="/impressum">Impressum</NuxtLink> | <NuxtLink to="/datenschutz">Datenschutz</NuxtLink> <br> <NuxtLink to="/#faq">Häufige Fragen</NuxtLink> | <NuxtLink to="/agb">AGB</NuxtLink> </span>
          </p>

          <p class="mt-4">
            &copy; 2018-{{ currentYear }} by {{ companyinfo?.web }}
          </p>
        </div>
        <div class="col-lg-4 pt-4 mb-4">
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
        <div class="col-lg-4 mb-4">
          <div class="certificates">
            <img
              :src="cmsUrl + '/uploads/exali_Siegel_5adfae16cb.jpg'"
              alt="exali-Versicherungssiegel"
            />
            <img
              :src="cmsUrl + '/uploads/XDI_zertifikat_162b61f4ad.png'"
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
              :src="cmsUrl + '/uploads/nuxt_Logo_white_1ad151de78.svg'"
              alt="vue logo"
            />
            <span class="bigIcon">
              <svg>
                <use xlink:href="/assets/icons/collection.svg#plus"></use>
              </svg>
            </span>
            <img
              :src="cmsUrl + '/uploads/strapi_logo_071ec5df4d.png'"
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
import { ref, computed, onMounted, onServerPrefetch, watchEffect } from 'vue';
import { useRuntimeConfig } from '#app'
import { useHead } from '#app'

const config = useRuntimeConfig()
const mainStore = useMainStore();

import { useRoute } from 'vue-router';
const route = useRoute();
const routeKey = computed(() => route.fullPath);

// Computed properties from Pinia store
const isMenuOpen = computed(() => mainStore.menuOpen); // Menü-Status
const isContactBubbleOpen = computed(() => mainStore.contactBoxOpen);

// Toggle-Funktionen
const toggleMenu = () => mainStore.toggleMenu();
const closeMenu = () => mainStore.closeMenu();
const toggleContactBubble = () => mainStore.toggleContactBubble();

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
const pages = computed(() => mainStore.pages);
const page = ref(null);

// META TAGS
const title = ref('');
const description = ref('');
const defaultMeta = {
  title: 'digimedialoop | Ihre Webagentur in Herrsching am Ammersee',
  description: 'Ihr Partner für Webdesign und Webentwicklung in Herrsching am Ammersee im Landkreis Starnberg',
  canonicalBase: 'https://www.digimedialoop.de'
}

// Aktualisiere `page` dynamisch, wenn `route.path` oder `pages` sich ändern
watchEffect(() => {
  if (pages.value || route.path) {
    page.value = pages.value.find(p => p.pageLink == route.path) || null;
  }
});

watchEffect(() => {
  if (page.value) {
    title.value = page.value.SEO?.pageTitle || defaultMeta.title;
    description.value = page.value.SEO?.seoDesicription || defaultMeta.description;
  } else {
    title.value = defaultMeta.title;
    description.value = defaultMeta.description;
  }
});

const language = 'de'

// Aktualisiere `page` dynamisch, wenn `route.path` oder `pages` sich ändern
watchEffect(() => {
  const currentPath = route.path || '/'; // Aktueller Pfad
  const canonicalUrl = defaultMeta.canonicalBase + currentPath;

  const scriptTags = [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": ["Startseite", "Leistungen", "Agentur", "Referenzen"],
        "url": ["/", "/leistungen", "/webagentur", "/referenzen"],
      }),
    },
  ];

  // LocalBusiness- und FAQ-Markup nur auf der Startseite hinzufügen
  if (currentPath === '/') {
    scriptTags.push(
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "digimedialoop",
          "image": "https://strapi.digimedialoop.de/uploads/DML_Logo_mint_2024_37426ffd12.svg",
          "telephone": "+49-1778388553",
          "email": "info@digimedialoop.de",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rausch 10",
            "addressLocality": "Herrsching",
            "addressRegion": "Bayern",
            "postalCode": "82211",
            "addressCountry": "DE",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 8.01300,
            "longitude": 11.15774,
          },
          "url": "https://digimedialoop.de",
          "priceRange": "€€",
          "openingHours": ["Mo-Do 09:00-17:00", "Fr 09:00-12:00"],
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wieviel kostet es eine neue Webseite erstellen zu lassen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Der Einstiegspreis für eine einfache Online-Visitenkarte mit den wichtigsten Informationen liegt bei ca. 800 Euro.",
              },
            },
            {
              "@type": "Question",
              "name": "Wie lange dauert es, eine Website zu erstellen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kleinere Webseiten können bei uns oft schon innerhalb einer Woche online gehen.",
              },
            },
            {
              "@type": "Question",
              "name": "Welche Dienstleistungen bietet digimedialoop an?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir bieten Webdesign, Webprogrammierung, Suchmaschinenoptimierung (SEO), Content-Erstellung und Online-Marketing an.",
              },
            },
          ],
        }),
      }
    );
  }

  // Dienstleistung nur für Leistungsseite hinzufügen
  if (currentPath === '/leistungen') {
    scriptTags.push(
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Webdesign und Webentwicklung",
            "description": "Wir bieten maßgeschneiderte Webdesign und Webentwicklungsdienste für moderne, responsive Websites an.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Suchmaschinenoptimierung (SEO)",
            "description": "Optimierung Ihrer Website, um Ihre Sichtbarkeit in Suchmaschinen zu verbessern.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Corporate Design",
            "description": "Von uns bekommen Sie ein Design, das Ihre Online-Präsenz in Farbe und Form prägt – vom Logo über die Gestaltung Ihrer Webseite bis hin zu weiteren Medien wie Briefpapier und Visitenkarten. So entsteht ein einheitlicher Look, der sowohl digital als auch im Print überzeugt.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Texterstellung und -pflege",
            "description": "Wir gestalten ansprechende Inhalte, die Ihre Zielgruppe erreichen und Ihre Botschaft klar und überzeugend transportieren. Im Anschluss übernehmen wir gerne das Content-Management, damit Ihre Inhalte immer aktuell und wirkungsvoll bleiben.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Illustrationen und Animationen",
            "description": "Mit kreativen Illustrationen und Animationen erwecken wir Ihre Ideen zum Leben und machen Ihre Botschaften visuell unvergesslich.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          }
        ])
      }
    );
  }

  useHead({
    title: title.value,
    meta: [
      { name: 'description', content: description.value },
      { property: 'og:title', content: title.value },
      { property: 'og:description', content: description.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: 'de_DE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title.value },
      { name: 'twitter:description', content: description.value },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    script: scriptTags,
  });
});

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

  // Matomo Tracking einbinden, wenn die Domain "digimedialoop.de" enthält
  if (window.location.hostname.includes('digimedialoop.de')) {
    var _paq = window._paq = window._paq || [];
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.digimedialoop.de"]);
    _paq.push(["disableCookies"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u = "//analytics.digimedialoop.de/";
      _paq.push(['setTrackerUrl', u + 'matomo.php']);
      _paq.push(['setSiteId', '1']);
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
    })();
  }
});

// ANIME - Animations
// import { useAnimations } from '@/composables/useAnimations'
// Aktiviert die Animationen für alle Elemente mit "anime_"
// useAnimations()
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
  z-index: 20
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
    transition: .8s
    box-shadow: $innerShadow
    overflow: hidden
  &::before
    width: 60vw
    height: 18rem
    border-radius: $loopShape
    top: -12rem
    right: -5vw
    animation: bubble-wobble 8s infinite ease alternate, gradient-animation 20s infinite alternate ease-in-out
    z-index: 6
    @media(max-width: $breakPointMD)
      height: 15rem
  &::after
    width: 28vw
    height: 12rem
    border-radius: $loopShape
    top: -2rem
    right: -6vw
    animation: bubble-wobble 7s infinite ease alternate, gradient-animation 12s infinite alternate ease-in-out
    @media(max-width: $breakPointMD)
      height: 10rem
  // MOBILE NAVIGATION
  &.mobile
    top: 0
    .headContent
      padding: 0
      .logoBox
        width: 60%
        z-index: 102
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
        z-index: 102
        border-radius: 50%
        margin-right: 5vw
        margin-top: 2rem
        &::before, &::after
          position: absolute
          content: ''
          width: 2rem
          z-index: 103
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
          background: transparent
          border: none
          .menu_link
            margin-left: 1.5rem
            transition: .8s
            &:hover
              transform: scale(1.06)
              background-image: radial-gradient(rgba($primaryColor, .1), transparent, transparent)
              box-shadow: 0 0 0 0 transparent
              border-radius: 20px
          a, .menu_link
            display: block
            color: white
            text-align: left
            margin-bottom: .5rem
            padding: 1.6rem 2.8rem .4rem
            position: relative
            font-size: 1.6rem !important
            width: auto
            max-width: 18rem
            text-transform: uppercase
            font-family: 'Mainfont-Bold'
            &::before
              content: ''
              width: 1rem
              height: .6rem
              background-color: rgba($primaryColor, .9)
              border-radius: $loopShape
              position: absolute
              top: 2.4rem
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
      margin-top: -1rem
      nav
        display: block
        z-index: 102
        //background: linear-gradient(to right, rgba($lightgrey, 0.8), rgba(white, 0.9), rgba(white, 0.9))
        background: white
        border: 1px solid adjust-color($beige, $lightness: 5%)
        padding: 1rem 2.5rem
        text-align: center
        border-radius: 1rem
        margin: 5.5rem 2vw 0 8vh
        transition: .8s
        a
          margin: 0 1.5rem
          text-decoration: none
          color: $darkgrey
          text-transform: uppercase
          font-family: 'Comfortaa-Bold'
          font-size: 1.2rem
          letter-spacing: .05rem
          transition: .6s
          display: inline-block
          &:hover
            transform: scale(1.15)
            background-image: radial-gradient(rgba(white, .5), rgba(white, .1))
            box-shadow: 0 0 10px 10px rgba(white, 0.2)
            border-radius: 10px
  &.active
    &::before
      top: -13.5rem
    &::after
      top: -5rem
    .headContent
      padding: 0 0 2.5rem 0
      .navigationBox
        nav
          display: flex
          margin: 3.5rem 0 0 0
          padding: 1rem 1rem
          border-top-right-radius: 0
          border-top-left-radius: 0
          border-bottom-left-radius: 50px
          border-bottom-right-radius: 0
          background: transparent
          border: 1px solid transparent
          a
            font-size: 1.05rem
            font-weight: bold
            margin: 0 1rem
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
  margin-top: 11rem
  font-family: 'Mainfont'
  min-height: 45vh
  z-index: 3
  @media(max-width: $breakPointMD)
    margin-top: 8rem
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
  a
    color: $primaryColor 

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
      max-width: 100%

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
    color: $darkgrey
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
      border: 1px solid $primaryColor
      //letter-spacing: .05rem
      transform: scale(1.02)
      background-image: linear-gradient(to top left, $primaryColor, lighten($primaryColor, 30%))
      /*&::before
        transform: translate(-50%, -50%) scale(1) */
        
  section
    margin-bottom: 10vh
    position: relative
    &:first-of-type
      &::before
        content: ''
        width: 12vw
        height: 95%
        min-height: 400px
        max-height: 600px
        background-color: rgba($primaryColor, .7)
        border-radius: $loopShape
        position: absolute
        top: 3%
        left: -8vw
        z-index: 90
        animation: bubble-wobble 5s infinite ease alternate
        box-shadow: $innerShadow
        transition: left 0.3s
    &.beigeBG
      background-color: $beige
      min-height: 200px
  .container
    width: 80%
    margin: auto 10%
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
  z-index: 10
  height: auto
  min-height: 120px
  margin-top: 100px
  .topshape
      fill: white
      transform: translateY(-1px)
  p
      font-size: calc($fontSizeNormal - 20%)
      line-height: 1.3rem
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
      width: 10rem !important
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
          @media(max-width: $breakPointMD)
            height: 18vw
            margin-bottom: 2.5rem
  .powered
      img
          height: 20px
          margin: auto 15px

</style>
