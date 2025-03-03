<template>
    <div class="contrastCheck">
        <section class="contrastChecker">
        <div class="container">
            <h1>Kontrast-Checker</h1>
                <h2>Nach WCAG-Kategorisierung für bessere Lesbarkeit und inklusive Gestaltung im Webdesign</h2>
            <div class="row calculator">
                <div class="col-md">                    
                   <div class="colorBox" :style="{ backgroundColor: color1, color: color2 }">
                       <p>Text</p>
                   </div>
                </div>
                <div class="col-md">
                    <div class="row">
                        <div class="col-6">
                            <h3>Hintergrundfarbe</h3>
                            <input type="color" v-model="color1" @input="calculateContrast">
                        </div>
                        <div class="col-6">
                            <h3>Schriftfarbe</h3>
                            <input type="color" v-model="color2" @input="calculateContrast">
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <h3>Kontrastverhältnis</h3>
                            <div class="row">
                                <div class="col-4"><p class="resultBox">{{ contrastRatio.toFixed(2) }}</p></div>
                                <div class="col-8 rating text-center" :class="ratingClass" v-html="ratingText"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div> 
        
    </section>
    <FAQArea pageLink="/toolbox/kontrastchecker" headline="Alles, was man noch so über digitale Barrierefreiheit wissen sollte..." /> 
    </div>
    
</template>

<script setup>
import { ref, computed } from 'vue'

import FAQArea from '@/sections/FAQArea.vue';
// Farben als reaktive Variablen
const color1 = ref("#ffffff") // Standard: Weiß
const color2 = ref("#000000") // Standard: Schwarz
const contrastRatio = ref(0.0) // Kontrastverhältnis

// Funktion zur Berechnung des relativen Luminanzwerts
const getLuminance = (hex) => {
    const rgb = hex.match(/\w\w/g).map(c => parseInt(c, 16) / 255)
    const gammaCorrect = (c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    return rgb.map(gammaCorrect).reduce((a, b, i) => a + b * [0.2126, 0.7152, 0.0722][i], 0)
}

// Funktion zur Berechnung des Kontrastverhältnisses nach WCAG
const calculateContrast = () => {
    const lum1 = getLuminance(color1.value)
    const lum2 = getLuminance(color2.value)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    contrastRatio.value = (brightest + 0.05) / (darkest + 0.05)
}

// Bewertung des Kontrasts nach WCAG-Richtlinien
const ratingText = computed(() => {
    if (contrastRatio.value >= 7) return "<p class='wcagValue'>AAA</p><p>Sehr guter Kontrast</p>"
    if (contrastRatio.value >= 4.5) return "<p class='wcagValue'>AA</p><p>Noch guter Kontrast</p>"
    return "<p class='wcagValue'>X</p><p>Nicht ausreichend</p>"
})

// Dynamische Klasse für die Bewertung (Farben ändern sich)
const ratingClass = computed(() => {
    if (contrastRatio.value >= 7) return "good"
    if (contrastRatio.value >= 4.5) return "medium"
    return "bad"
})

// Initiale Berechnung
calculateContrast()
</script>

<style lang="sass">
.contrastChecker
    margin-bottom: 10vh
    h1
        margin-bottom: .5rem
    .calculator
        h3
            font-family: 'Mainfont-Bold'
            font-size: .9rem
            margin-bottom: .5rem
            text-transform: uppercase
            

        .resultBox
            font-size: 1.8rem
            font-weight: bold
            padding: 0.5rem 1rem
            background: $lightgrey
            display: inline-block
            border-radius: 0.5rem
            margin-top: 1rem

        .rating
            font-size: 1.2rem
            font-weight: bold
            margin-top: 0.5rem

        .colorBox
            width: 80%
            margin-left: 10%
            height: 10rem
            display: flex
            align-items: center
            justify-content: center
            border-radius: 8px
            border: 2px solid #ccc
            transition: all 0.3s ease-in-out
            p
                font-size: 2rem

        .wcagValue
            font-size: 1.5rem
            font-family: 'Mainfont-Bold'
            margin-bottom: 0
        // Dynamische Farben für die Bewertung
        .good
            .wcagValue
                color: darken($primaryColor, 10%)
        .medium
            .wcagValue
                color: darken($yellow, 10%)
        .bad
            .wcagValue
                color: darken($pink, 10%)
</style>
