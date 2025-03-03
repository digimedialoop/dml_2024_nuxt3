<template>
  <div>
    <section>
      <div class="container firstTeaser">
        <img class="imgRight homeImageTop" :src="cmsUrl + '/uploads/DML_Home_Website_Image_8e34fac302.png'" alt="Neue Webseite" />
        <p class="supheadlinePink">Ihr Partner für Webdesign und Webentwicklung</p>
        <h1>Wussten Sie, dass Ihre Webseite mehr kann als nur gut aussehen?</h1>
        <h2>Professionell konzipiert ist sie ein <b>leistungsstarkes Marketing- und Vertriebsinstrument</b>, das Sie strategisch unterstützen kann!</h2>
        <p>Als <b>kundenorientierte Webagentur</b> in Herrsching am Ammersee erstellen wir maßgeschneiderte und zielgerichtete Webseiten, die Ihre Zielgruppe ansprechen und Ihre Online-Präsenz spürbar verbessern.</p>
      </div>
    </section>    

    <section class="canDo">
  <div class="container">
    <h2 class="text-center">Nutzen Sie schon das volle Potenzial Ihrer Webseite?</h2>
    <div class="row mb-5">
        <div class="col-xl-6">
          <div class="row">
            <div class="col-md-6 my-5">
              <div class="innerBox">
                <div class="canDoItem">
                  <div class="imageBox" style="background-image: url('https://strapi.digimedialoop.de/uploads/website_Erfolg_Marketing_3c36a43ba5.png');"></div>
                  <h3>Neukunden gewinnen und Umsatz steigern</h3>
                  <p>Machen Sie aus Besuchern zahlende Kunden! Mit einer klaren Strategie, überzeugendem Design und optimierter Nutzerführung wird Ihre Website zur Lead-Maschine.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 my-5">
              <div class="innerBox">
                <div class="canDoItem">
                  <div class="imageBox" style="background-image: url('https://strapi.digimedialoop.de/uploads/Kundenbindung_45d45ef3fc.png');"></div>
                  <h3>Kunden und Mitglieder binden</h3>
                  <p>Stärken Sie die Beziehung zu Ihren Kunden! Mit wertvollen Inhalten, exklusiven Angeboten und interaktiven Funktionen bleibt Ihre Zielgruppe aktiv und engagiert.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="row">
            <div class="col-md-6 my-5">
              <div class="innerBox">
                <div class="canDoItem">
                  <div class="imageBox" style="background-image: url('https://strapi.digimedialoop.de/uploads/Screen_Shot_Tool_20250228133408_beb2a11980.png');"></div>
                  <h3>Mitarbeiter finden und begeistern</h3>
                  <p>Gewinnen Sie die richtigen Talente! Eine authentische Karriereseite mit klaren Benefits macht Ihr Unternehmen für Bewerber unwiderstehlich.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 my-5">
              <div class="innerBox">
                <div class="canDoItem">
                  <div class="imageBox" style="background-image: url('https://strapi.digimedialoop.de/uploads/Screen_Shot_Tool_20250228133812_0a20d4320e.png');"></div>
                  <h3>Verwaltungsaufwand reduzieren</h3>
                  <p>Weniger Rückfragen – mehr Effizienz! Durch klare Informationen und digitale Prozesse auf Ihrer Website sparen Sie Zeit, Kosten und entlasten Ihr Team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <h4>Gemeinsam bringen wir ihr Business auf das nächste Level! </h4>
    <button class="pinkBtn mt-3" @click.prevent="toggleContactBubble"
                        role="button"
                        aria-label="Kontaktformular öffnen">Kontaktieren Sie uns!</button>
      </div>
    
  </div>
</section>
    <MarqueeBanner :items="customers" :logoHeight="60" title="Diese Unternehmen vertrauen uns" />
    <FAQArea pageLink="/" headline="Hier finden Sie Antworten auf häufig gestellte Fragen (FAQs) rund ums Thema Website-Erstellung mit digimedialoop" />
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

// Asynchrones Laden der Komponenten
const MarqueeBanner = defineAsyncComponent(() => import('@/sections/MarqueeBanner.vue'));
import FAQArea from '@/sections/FAQArea.vue';

const mainStore = useMainStore();
const { cmsUrl, customers } = storeToRefs(mainStore);
const toggleContactBubble = () => mainStore.toggleContactBubble();

import { useRouter } from 'vue-router';
const router = useRouter();


</script>


<style lang="sass">
.firstTeaser
  h2
    font-size: 1.6rem
    line-height: 2.4rem
.subLine
  color: adjust-color($darkgrey, $lightness: 20%)
  font-size: 80%
.pinkFont
  color: darken($pink, 10%)
.imgRight
  float: right
  max-width: 50%
.homeImageTop
  margin: 4.5rem 0 8vh 3rem !important
.canDo
  margin: 15vh 0
  h2
    margin-bottom: 3.5rem
  .row
    display: flex
    flex-wrap: wrap
    height: 100%
    align-items: stretch
  .innerBox
    width: 90%
    margin: 0 5% 0 5%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    background-image: linear-gradient(to bottom right, transparent , lighten($beige, 7%) )
    border-bottom-right-radius: 1rem
    padding: 0 2rem 1rem 2rem
    border-right: 1px solid lighten($beige, 0%)
    border-bottom: 1px solid lighten($beige, 0%)
    height: 100%

  .canDoItem
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    text-align: center
    color: black
    height: 100%
    margin-top: .5rem
    
    &:nth-child(1) .imageBox
      border-radius: $loopShape1
    &:nth-child(2) .imageBox
      border-radius: $loopShape2
    &:nth-child(3) .imageBox
      border-radius: $loopShape3
    &:nth-child(4) .imageBox
      border-radius: $loopShape4

    .imageBox
      width: 100%
      max-width: 280px
      padding-bottom: 75% /* 4:3 Verhältnis */
      background-size: cover
      background-position: center
      margin-bottom: 2rem

    h3
      font-size: 1rem
      line-height: 1.5rem
      text-align: center
      font-family: 'Mainfont-Bold'
      color: darken($pink, 10%)
      text-transform: uppercase
    
    h4
      font-size: 1.4rem
      line-height: 1.8rem
      margin: 2rem 0
      font-family: 'Mainfont-Bold'

    p
      font-size: .9rem
      text-align: left !important


</style>
