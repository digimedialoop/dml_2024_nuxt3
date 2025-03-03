<template>
    <section class="recommendations">
        <!-- Vor dem Container: Welle oben -->
        <svg class="sectionWave wave-top" :style="`height: ${waveHeight};top:-${waveHeight-2}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 20">
            <path d="M 0 0 L 500 0 L 500 14 Q 354.4 -2.8 250 11 Q 145.6 24.8 0 14 L 0 0 Z" fill="#EEEBE5"></path>
        </svg>
        <div class="container">
            <h2>Das sagen andere Designer und Kreative über digimedialoop</h2>
            <div class="personBox" v-for="person, index in persons" :key="index" :class="person.active ? 'active' : ''" @click="setActive(index)">
                <img :src="person.image" alt="">
                <div class="infoBox">
                    <h3>{{ person.name }}</h3>
                    <q>{{ person.quote }}</q>
                </div>
            </div>         
        </div>

        <!-- Nach dem Container: Spiegelwelle unten -->
        <svg class="sectionWave wave-bottom" :style="`height: ${waveHeight};bottom:-${waveHeight-2}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 20">
            <path d="M 0 0 L 500 0 L 500 14 Q 354.4 -2.8 250 11 Q 145.6 24.8 0 14 L 0 0 Z" fill="#EEEBE5"></path>
        </svg>    
    </section>
</template>


<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const screenWidth = computed(() => mainStore.screenWidth);
const waveHeight = computed(() => (screenWidth.value / 25).toFixed(0));

const persons = ref([
    {
        name: 'Nadine Mattern',
        quote: 'Fachlich wirklich kompetent, die Ruhe selbst (auch bei knappen Deadlines) und absolut angenehme und verlässliche Zusammenarbeit. Gerne jederzeit wieder für ein nächstes Projekt. Ich kann Sabrina wärmstens weiter empfehlen!',
        image: 'https://strapi.digimedialoop.de/uploads/Nadine_Matterns_2b5c0500a3.jpeg',
        active: true
    },
    {
        name: 'Anna Liebel',
        quote: 'Jeder Mediengestalter sollte einen guten Entwickler im Rücken haben. Sabrina ist meine Wahl, wenn es technisch knifflig wird.',
        image: 'https://strapi.digimedialoop.de/uploads/Anna_Liebel_8fb67e4a86.jpg',
        active: false
    },
])

// Methode zum Setzen der aktiven Person mit Verzögerung
const setActive = (index) => {
    // Alle Personen auf inactive setzen
    persons.value.forEach((person) => {
        person.active = false;
    });

    // Nach 0,5 Sekunden die gewählte Person aktiv setzen
    setTimeout(() => {
        persons.value[index].active = true;
    }, 200); // 500 Millisekunden warten
}

</script>

<style lang="sass">
.recommendations
    background-color: $beige
    padding: .5rem 0 6rem 0
    margin: 6rem auto !important
    position: relative

    /* Welle oben */
    .sectionWave.wave-top
        position: absolute
        left: 0
        width: 100%
        z-index:1
        transform: scaley(-1) /* Spiegeln der oberen Welle */

    /* Welle unten */
    .sectionWave.wave-bottom
        position: absolute
        left: 0
        width: 100%
        z-index: 1
        transform: scaleX(1) /* Die untere Welle wird nicht gespiegelt */

    h2
        font-size: 1.2rem
        font-family: 'Mainfont-Bold'
        color: darken($pink, 10%)

    .personBox
        display: inline-block
        margin: 0 3rem 2rem 0
        width: 100px
        transition: .3s
        position: relative
        cursor: pointer
        animation: bubble-wobble 12s infinite ease alternate, gradient-animation 15s infinite alternate ease-in-out
        z-index: 3

        .infoBox
            display: none

        img
            width: 100%
            border-radius: 50%
            border: 6px solid rgba(white, .4)
            z-index: 4
            box-shadow: $innerShadow

        &.active
            width: 55%
            max-width: 260px
            transition: .8s
            z-index: 5
            animation: bubble-wobble 15s infinite ease alternate, gradient-animation 10s infinite alternate ease-in-out

            .infoBox
                display: block
                position: absolute
                top: 70%
                left: 80%
                transform: translateX(-50%)
                background-color: rgba(white, .7)
                width: 120%
                max-width: 400px
                padding: .5rem 1rem 1rem 1rem
                border-radius: 1rem
                z-index: 5
                @media(max-width: $breakPointMD)
                    width: 150%
                    transform: translateX(-30%)

                h3
                    font-size: 1.2rem
                    font-family: 'Mainfont-Bold'
                    margin: 0
                    color: darken($primaryColor, 15%)
                    text-transform: uppercase

                q
                    font-size: .8rem
                    line-height: 1rem
                    font-family: 'Mainfont-Bold'

</style>