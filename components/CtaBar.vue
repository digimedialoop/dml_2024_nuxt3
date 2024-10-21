<template>
    <nav class="ctaBar">
        <!-- Anrufen Section -->
        <div :class="{ active: visibleSection === 'call' }" title="Anrufen" @click="toggleVisible('call')">
            <span v-if="visibleSection !== 'call'">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#phone"></use>
                </svg>                
            </span>
            <span v-if="visibleSection === 'call'">Sie erreichen uns unter <b> 
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#phone"></use>
                </svg>0177 83 88 553</b><br><span class="smallText">Oder nutzen Sie unseren kostenlosen <button>Rückrufservice</button></span></span>
        </div>

        <!-- Kontakt Section -->
        <div :class="{ active: visibleSection === 'contact' }" title="Kontakt" @click="toggleVisible('contact')">
            <span v-if="visibleSection !== 'contact'">
                <svg>
                  <use xlink:href="/assets/icons/collection.svg#talk"></use>
                </svg>
            </span>
            <span v-if="visibleSection === 'contact'">Schreiben Sie uns eine Nachricht!</span>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

// State für den aktiven Abschnitt (nur einer gleichzeitig)
const visibleSection = ref(null);

// Funktion zum Umschalten der Sichtbarkeit
const toggleVisible = (section) => {
  visibleSection.value = visibleSection.value === section ? null : section;
};
</script>

<style lang="sass">
.ctaBar
    position: fixed
    top: 24vh
    right: 0
    z-index: 10
    display: flex
    flex-direction: column
    align-items: flex-end // Elemente rechts ausrichten
    div
        background-color: rgba(adjust-color($beige, $lightness: -10%), .9)
        cursor: pointer
        padding: .7rem
        transition: all 0.5s ease-in-out
        white-space: normal
        word-break: break-word
        overflow: hidden
        display: flex
        align-items: center
        justify-content: flex-start // Inhalt nach links schieben
        width: 3.5rem  // Standardbreite für nicht aktive Divs
        border: 1px solid white
        &:hover
            background-color: rgba(adjust-color($beige, $lightness: -10%), 1)
            span
                svg
                    transform: scale(1.4)
        span
            display: block
            align-items: center
            b
                font-family: 'Mainfont-Bold'  
                padding: 0 .5rem
                font-size: 120%
                letter-spacing: 0.1rem
            svg
                fill: $darkgrey
                height: 2.5rem
                width: 2.5rem
                padding: .5rem
                transition: .5s
          
        &:first-of-type
            border-top-left-radius: 10px
        &:last-of-type
            border-bottom-left-radius: 10px

    // Wenn das Div aktiv ist, verbreitere es nach links
    .active
        width: auto 
        right: 0
        border-top-left-radius: 10px
        border-bottom-left-radius: 10px
        padding: 1.1rem 2rem
        font-size: 120%
        background-color: rgba($beige, 1)
        svg
            padding: 0
            width: 1.2rem
            margin-right: 0.5rem
            margin-top: -.2rem
        .smallText
            font-size: 80%
            margin-top: 0.5rem
            color: adjust-color($darkgrey, $lightness: 10%)
            button
                border-radius: 5px
                border: 1px solid $darkgrey
                margin: 0 0.5rem
                padding: .2rem .5rem
                color: adjust-color($darkgrey, $lightness: 10%)
</style>
