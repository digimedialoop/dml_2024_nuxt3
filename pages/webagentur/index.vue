<template>
    <div>
        <section class="webagentur">
        <div class="container">
            <div class="contentBox">
                <h1>Ihre Webagentur in Herrsching am Ammersee</h1>
                <h2>Wir entwickeln Webseiten, die aus Besuchern Kunden machen!</h2>
                <p>Unser erfahrenes Team ist für Sie da, um maßgeschneiderte Lösungen für Ihre Online-Präsenz zu entwickeln. 
                    Wir haben uns darauf spezialisiert, Webseiten zu erstellen, die nicht nur Besucher anziehen, sondern diese 
                    auch zu treuen Kunden machen. Von der Konzeption bis zur Umsetzung stehen wir Ihnen mit unserem <b>Fachwissen</b> 
                    und unserer <b>Kreativität</b> zur Seite, um <u>Ihre Visionen zu verwirklichen</u> und Ihren <b>Online-Erfolg</b> zu maximieren.</p> 
                <p>Lassen Sie uns gemeinsam Ihre digitale Präsenz optimieren und Ihr Unternehmen auf die nächste Stufe bringen!</p>
                <button class="mt-3" @click.prevent="router.push('/leistungen')"
                role="button"
                aria-label="Zu den Leistungen navigieren">Zu unseren Leistungen</button>
            </div>        
        </div>
    </section>
    <section class="team" :style="backgroundStyle">
        <div class="container">
            <h2 class="teamHeadline">Ihre Ansprechpartnerin bei digimedialoop</h2>
        <div class="teamContainer">      
            <h3>Sabrina Hennrich</h3>
            <p class="smallFont">Beratung | Konzeption | Design | Entwicklung</p>
            <div class="socialBox">
                <a class="socialIcon" href="https://www.xing.com/profile/Sabrina_Hennrich2" target="_blank">
                    <svg viewBox="0 0 384 512">
                        <path d="M162.7 210c-1.8 3.3-25.2 44.4-70.1 123.5-4.9 8.3-10.8 12.5-17.7 12.5H9.8c-7.7 0-12.1-7.5-8.5-14.4l69-121.3c.2 0 .2-.1 0-.3l-43.9-75.6c-4.3-7.8 .3-14.1 8.5-14.1H100c7.3 0 13.3 4.1 18 12.2l44.7 77.5zM382.6 46.1l-144 253v.3L330.2 466c3.9 7.1 .2 14.1-8.5 14.1h-65.2c-7.6 0-13.6-4-18-12.2l-92.4-168.5c3.3-5.8 51.5-90.8 144.8-255.2 4.6-8.1 10.4-12.2 17.5-12.2h65.7c8 0 12.3 6.7 8.5 14.1z"/>
                    </svg>
                </a>
                <a class="socialIcon" href="https://de.linkedin.com/in/sabrina-hennrich-3022133" target="_blank">
                    <svg viewBox="0 0 448 512">
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                    </svg>
                </a>
            </div>
            <p>Mit über 20 Jahren Erfahrung im Webdesign ist sie noch immer Webentwicklerin aus purer Leidenschaft!</p>
            <button class="miniBtn" v-if="false">Mehr Erfahren</button>
            <p class="smaller">Nach ihrem Abschluss als Betriebswirtin war sie viele Jahre im Marketing tätig, bevor sie ihr Wissen mit einem Psychologie-Studium vertiefte. </p>
            <p class="smaller">Diese Kombination aus betriebswirtschaftlichem Know-how, strategischer Marketingerfahrung und psychologischem Verständnis ermöglicht es ihr, digitale Lösungen zu entwickeln, die nicht nur ästhetisch ansprechend, sondern auch zielgruppenwirksam und wirtschaftlich durchdacht sind. </p>
                <p class="smaller">Ergänzend dazu ist sie seit 2019 auch "Certified Expert User Experience & Usability", was ihr fundierte Kenntnisse in nutzerzentriertem Design und optimaler Usability verleiht.</p>
            
            <div class="quotation">
                <p><b>Offenheit</b>, <b>Transparenz</b> und <b>Fairness</b> sind mir bei der Zusammenarbeit mit meinen Kunden enorm wichtig. Ich empfehle nur, was mir sinnvoll erscheint und zu meinen Kunden passt. Dafür nehme ich mir gerne die Zeit für eine gründliche Analyse der Bedürfnisse meiner Kunden bzw. die deren Zielgruppe.</p>
            </div>
            <button class="pinkBtn mt-4" @click.prevent="toggleContactBubble"
                role="button"
                aria-label="Kontaktformular öffnen">Sprechen Sie mich gerne an!</button>
        </div>
        </div>
        
    </section>
</div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const mainStore = useMainStore();
const { cmsUrl, companyinfo } = storeToRefs(mainStore); // 🛑 ACHTUNG: jetzt `companyinfo` statt `companyInfo`
const router = useRouter();

const toggleContactBubble = () => mainStore.toggleContactBubble();

// Definiere eine reaktive Variable für das Hintergrundbild
const backgroundImage = ref("");

// Warte auf Änderungen in `companyinfo` und setze das Bild erst, wenn die Daten verfügbar sind
watch(
  () => companyinfo.value, // Achtung: Jetzt `companyinfo`
  (newValue) => {
    console.log(newValue)
    if (newValue?.profileImage?.data?.attributes?.url) {
      backgroundImage.value = `url('${cmsUrl.value}${newValue.profileImage?.data.attributes.url}')`;
    } else {
      backgroundImage.value = "url('https://dummyimage.com/800x600/cccccc/ffffff&text=Kein+Bild')"; // Fallback-Bild
    }
  },
  { immediate: true } // Führt `watch` direkt aus, falls die Daten schon da sind
);

const backgroundStyle = computed(() => ({
  "--background-image": backgroundImage.value,
}));
</script>





<style lang="sass">
.webagentur
    position: relative
    overflow-x: hidden
    overflow-y: hidden

    &::after
        content: ''
        position: absolute
        top: 5%
        right: -36vw
        width: 65vw
        height: 90%
        min-height: 550px
        max-height: 800px
        background-image: url('https://strapi.digimedialoop.de/uploads/photo1717674388_9910623c8e.jpeg')
        background-repeat: no-repeat
        background-position: center right
        background-size: cover
        border-radius: 42% 49% 52% 48% / 53% 38% 62% 47%
        animation: bubble-wobble 25s infinite ease alternate, gradient-animation 70s infinite alternate ease-in-out
        box-shadow: $innerShadow
        @media(max-width: $breakPointMD)
            right: -50vw
    .contentBox
        width: 55vw
        @media(max-width: $breakPointMD)
            width: 68vw
        
.team
    margin-top: 5vh
    margin-bottom: 25vh
    &::before
        content: ''
        position: absolute
        top: 2vh
        left: -24vw
        width: 50vw
        height: 30vw
        min-height: 550px
        background-image: var(--background-image)
        background-repeat: no-repeat
        background-position: center right
        background-size: cover
        border-radius: 42% 49% 52% 48% / 53% 38% 62% 47%
        animation: bubble-wobble 35s infinite ease alternate, gradient-animation 70s infinite alternate ease-in-out
        box-shadow: $innerShadow

        @media(max-width: $breakPointMD)
            left: -28vw
    .miniBtn
        font-size: .9rem
        padding: .2rem .5rem
        background-color: $lightgrey
        border: none
        text-transform: none
    .socialBox
        display: flex
        justify-content: left
        align-items: center
        gap: 1rem
        margin: 1rem auto
        .socialIcon
            display: flex
            justify-content: center
            align-items: center
            width: 2.2rem
            height: 1.8rem
            background-color: $beige
            border-radius: $loopShape
            transition: .5s
            cursor: pointer
            &:hover
                background-color: $darkgrey
                transform: scale(1.1)
                svg
                    path
                        fill: white
            svg
                width: 1rem
                height: 1rem
                path
                    fill: $darkgrey
    .teamHeadline
        margin-left: 15vw
    .teamContainer    
        margin-left: 22vw    
        width: 70%
        h3
            font-size: 2rem
            margin-bottom: .1rem
            margin-top: 3rem
        .smallFont
            font-size: 1.1rem
            font-family: 'Mainfont-Bold'
        .smaller
            font-size: .9rem
        .quotation
            background-color: $lightgrey
            padding: 2.5rem 4rem 2rem 6rem
            border-radius: 1rem
            font-size: 1rem
            position: relative
            margin-top: 2rem
            p
                font-size: 1rem
            @media(max-width: $breakPointMD)
                padding: 5rem 2rem 2rem 2rem
                hyphens: auto
            &::before
                position: absolute
                top: -.5rem
                left: 1rem
                content: '\275E'
                font-size: 5rem
                margin: 0 .5rem 0 0
                color: white
    </style>