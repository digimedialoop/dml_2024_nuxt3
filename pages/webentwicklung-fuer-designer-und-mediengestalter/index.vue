<template>
    <div class="landing">
        <section class="heroBox">
            <div class="container">
                <div class="contentBox">
                    <p class="supheadlinePink">Webentwicklung für Grafikdesigner und Mediengestalter</p>
                    <h1>Gemeinsam setzen wir deine kreativen Ideen pixelgenau, performant und individuell um!</h1>
                    <h2>Du hast ein geniales Design im Kopf &ndash; doch fühlst dich von deinem System oder deinem Entwickler immer wieder ausgebremst?</h2>
                    <h3>Jou! Das kann richtig frustrierend sein - muss es aber nicht!</h3>
                </div>        
                
                <div class="speechBox d-flex align-items-start">
                    <img class="profileImage" src="https://strapi.digimedialoop.de/uploads/sabrinahennrich_0f07d46857.jpg" alt="Sabrina Hennrich">
                    <div class="bubble">
                        <p><b><span>Servus!</span> <br>Ich bin Sabrina – eine Webentwicklerin am Ammersee, südwestlich von München, die richtig programmieren kann!</b></p>
                        <p>Somit bin ich nicht auf starre Templates oder eingeschränkte Tools angewiesen – egal wie kreativ, individuell 
                            oder ausgefallen deine Idee ist, ich finde einen Weg, sie genau so umzusetzen. </p>
                            <p>Gemeinsam erschaffen wir Webseiten, die dich und deinen Kunden begeistern werden!</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="cooperation">
            <div class="container">
                <h2>Mehr Freiheit für dein Design</h2>
                <ul>
                    <li><b>Pixelgenaue Umsetzung</b> <br>Ich setze dein Design so nah wie möglich am Original um und achte dabei auf jedes Detail.</li>
                    <li><b>Individuelle Lösungen & komplexe Funktionen</b> <br>Egal ob API-Anbindung, dynamische Inhalte oder interaktive Features – ich finde eine Lösung für fast alles.</li>
                    <li><b>Performance & Ladegeschwindigkeit</b> <br>Schnelle & schlanke Webseiten, die auf jedem Gerät reibungslos laufen.</li>
                    <li><b>Tool-übergreifende Kompetenz</b> <br>Kein WordPress-Zwang – ich nutze die beste Lösung für dein Projekt, unabhängig vom System.</li>
                </ul>
                <p><b>Du bleibst der kreative Kopf!</b><br>
                Ich sorge dafür, dass dein Design genauso im Web erscheint, wie du es geplant hast – mit Top-Performance & perfekter technischer Umsetzung.</p>
                <button class="pinkBtn" @click.prevent="toggleContactBubble" role="button">Lass uns kennenlernen</button>
            </div>
            
        </section>
        <section class="deviceCheck" v-if="false">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <p class="supheadlinePink">Responsive Check</p>
                        <h2>Wie sieht deine Webseite auf den verschiedenen Bildschirmbreiten aus?</h2>
                        <h3>Probiers einfach aus!</h3>
                        <input type="text" placeholder="https://www.deinewebseite.de" v-model="weblink" @keyup.enter="updateIframe">
                    </div>
                    <div class="col-md-6">
                        <svg v-if="desk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 450">
                            <defs>
                                <clipPath id="_clipPath_mz11Urxh3q4HMztuYrKSFIZi2059ENKc">
                                    <rect width="500" height="450"/>
                                </clipPath>
                            </defs>
                            <g clip-path="url(#_clipPath_mz11Urxh3q4HMztuYrKSFIZi2059ENKc)" style="z-index: 10">
                                <linearGradient id="_lgradient_0" x1="0.49993063593634346" y1="1.0075692569857018" x2="0.5082382316706063" y2="0.6847598402209258" gradientTransform="matrix(175.952,0,0,65.207,161.506,313.536)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.8699999999999999%" stop-opacity="1" style="stop-color:rgb(209,209,209)"/>
                                    <stop offset="47.83%" stop-opacity="1" style="stop-color:rgb(232,232,232)"/>
                                    <stop offset="100%" stop-opacity="1" style="stop-color:rgb(209,209,209)"/>
                                </linearGradient>
                                <path d=" M 305.374 354.758 L 305.374 313.536 L 193.592 313.536 L 193.592 353.951 L 161.506 378.743 L 249.483 377.869 L 337.458 378.743 L 305.374 354.758 Z " fill="url(#_lgradient_0)" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(217,215,215)" stroke-opacity="100" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
                                <linearGradient id="_lgradient_1" x1="0.0000010284238562002779" y1="0.499981826442526" x2="0.9999991252331814" y2="0.499981826442526" gradientTransform="matrix(443,0,0,43.47,28.5,275.242)" gradientUnits="userSpaceOnUse">
                                    <stop offset="1.7399999999999998%" stop-opacity="1" style="stop-color:rgb(209,209,209)"/>
                                    <stop offset="100%" stop-opacity="1" style="stop-color:rgb(235,235,235)"/>
                                </linearGradient>
                                <path d=" M 34.273 275.242 L 465.964 275.242 C 469.02 275.242 471.5 277.728 471.5 280.79 L 471.5 297.862 C 471.5 309.369 462.177 318.712 450.697 318.712 L 49.302 318.712 C 37.822 318.712 28.5 309.369 28.5 297.862 L 28.5 281.027 C 28.5 277.834 31.087 275.242 34.273 275.242 Z " fill="url(#_lgradient_1)" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(217,215,215)" stroke-opacity="100" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
                                <path d=" M 472.012 254.78 L 472.012 51.832 C 472.012 40.335 462.945 31 451.776 31 L 48.223 31 C 37.055 31 27.988 40.335 27.988 51.832 L 27.988 254.78 L 27.988 255.259 L 27.988 282.486 L 472.012 282.486 L 472.012 255.259 L 472.012 254.78 Z  M 45.583 46.984 L 454.416 46.984 L 454.416 268.633 L 45.583 268.633 L 45.583 46.984 Z " fill-rule="evenodd" fill="rgb(55,55,55)"/>
                                <path d="M 73.451 74.227 L 133.299 74.227 L 133.299 134.075 L 73.451 134.075 L 73.451 74.227 Z" style="stroke:none;fill:#F0F0F0;stroke-miterlimit:10;"/>
                                <linearGradient id="_lgradient_2" x1="-0.0000019194307706443814" y1="0.5000543177381012" x2="0.9999980747113533" y2="0.5000543177381012" gradientTransform="matrix(306.503,0,0,9.583,96.179,370.194)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.8699999999999999%" stop-opacity="1" style="stop-color:rgb(162,162,162)"/>
                                    <stop offset="97.83%" stop-opacity="1" style="stop-color:rgb(232,232,232)"/>
                                </linearGradient>
                                <path d=" M 98.371 370.463 C 102.752 369.979 396.421 370.256 400.595 370.463 C 403.378 370.6 403.378 373.706 400.595 379.777 L 98.371 379.777 C 95.449 373.89 95.449 370.785 98.371 370.463 Z " fill="url(#_lgradient_2)" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(185,185,185)" stroke-opacity="100" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
                                <rect x="45.583" y="46.984" width="408.832" height="222.047" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/>
                                <path d=" M 243.844 302.371 C 242.175 299.831 245.066 297.867 247.098 297.222 C 251.729 295.751 255.722 297.863 254.907 301.23 C 253.327 307.756 245.055 304.215 243.844 302.371 Z " fill="rgb(55,55,55)"/>
                                <rect id="deskScreenBlank" x="46" y="47.5" width="409.5" height="221.5" transform="matrix(1,0,0,1,0,0)" fill="rgb(0,0,0)"/>
                                <g>
                                    <foreignObject v-if="isValidUrl(weblink)" id="deskScreen" x="46" y="47.5" width="409.5" height="221.5">
                                        <iframe ref="iframeRef" :src="weblink" frameborder="0"></iframe>
                                    </foreignObject>   
                                </g>     
                            </g>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                            <defs>
                                <clipPath id="_clipPath_J5sSadUalMgzHmiGMPTuwCKeG9KghIf7">
                                    <rect width="500" height="500"/>
                                </clipPath>
                            </defs>
                            <g clip-path="url(#_clipPath_J5sSadUalMgzHmiGMPTuwCKeG9KghIf7)">
                                <path d=" M 152.048 12.143 L 352.475 12.143 C 368.401 12.143 381.331 25.073 381.331 40.999 L 381.331 451.861 C 381.331 467.787 368.401 480.716 352.475 480.716 L 152.048 480.716 C 136.122 480.716 123.192 467.787 123.192 451.861 L 123.192 40.999 C 123.192 25.073 136.122 12.143 152.048 12.143 Z " fill="rgb(55,55,55)"/>
                                <path d="M 155.466 25.45 L 347.174 25.45 C 355.373 25.45 362.03 32.107 362.03 40.306 L 362.03 438.864 C 362.03 447.063 355.373 453.72 347.174 453.72 L 155.466 453.72 C 147.267 453.72 140.61 447.063 140.61 438.864 L 140.61 40.306 C 140.61 32.107 147.267 25.45 155.466 25.45 Z" style="stroke:none;fill:#000000;stroke-miterlimit:10;"/>
                                <mask id="_mask_kRhtIUM0vsIJwCru8KMEeoX7mwdCHdLR">
                                    <path d=" M 241.815 465.584 C 241.815 461.174 245.395 457.594 249.804 457.594 C 254.214 457.594 257.794 461.174 257.794 465.584 C 257.794 469.993 254.214 473.573 249.804 473.573 C 245.395 473.573 241.815 469.993 241.815 465.584 Z " fill="white" stroke="none"/>
                                </mask>
                                <path d=" M 241.815 465.584 C 241.815 461.174 245.395 457.594 249.804 457.594 C 254.214 457.594 257.794 461.174 257.794 465.584 C 257.794 469.993 254.214 473.573 249.804 473.573 C 245.395 473.573 241.815 469.993 241.815 465.584 Z " fill="rgb(49,49,49)"/>
                                <path d=" M 241.815 465.584 C 241.815 461.174 245.395 457.594 249.804 457.594 C 254.214 457.594 257.794 461.174 257.794 465.584 C 257.794 469.993 254.214 473.573 249.804 473.573 C 245.395 473.573 241.815 469.993 241.815 465.584 Z " fill="rgb(49,49,49)" mask="url(#_mask_kRhtIUM0vsIJwCru8KMEeoX7mwdCHdLR)" vector-effect="non-scaling-stroke" stroke-width="4" stroke="rgb(119,119,119)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
                                <path d=" M 210.188 13.882 L 294.187 13.882 C 298.869 13.882 302.669 17.683 302.669 22.364 L 302.669 22.739 C 302.669 27.42 298.869 31.221 294.187 31.221 L 210.188 31.221 C 205.506 31.221 201.706 27.42 201.706 22.739 L 201.706 22.364 C 201.706 17.683 205.506 13.882 210.188 13.882 Z " fill="rgb(55,55,55)"/>
                                <clipPath id="_clipPath_yG0PUG5xuGwoBQdYIaTfyJw0eBJTI7af">
                                    <path d=" M 210.188 13.882 L 294.187 13.882 C 298.869 13.882 302.669 17.683 302.669 22.364 L 302.669 22.739 C 302.669 27.42 298.869 31.221 294.187 31.221 L 210.188 31.221 C 205.506 31.221 201.706 27.42 201.706 22.739 L 201.706 22.364 C 201.706 17.683 205.506 13.882 210.188 13.882 Z " fill="rgb(55,55,55)"/>
                                </clipPath>
                                <g clip-path="url(#_clipPath_yG0PUG5xuGwoBQdYIaTfyJw0eBJTI7af)">
                                    <mask id="_mask_toYsxxmj7yA1tlh5Xolo04GF3EKtC9b5">
                                        <path d=" M 248.906 23.145 C 248.906 21.069 250.591 19.384 252.667 19.384 C 254.743 19.384 256.429 21.069 256.429 23.145 C 256.429 25.221 254.743 26.907 252.667 26.907 C 250.591 26.907 248.906 25.221 248.906 23.145 Z " fill="white" stroke="none"/>
                                    </mask>
                                    <path d=" M 248.906 23.145 C 248.906 21.069 250.591 19.384 252.667 19.384 C 254.743 19.384 256.429 21.069 256.429 23.145 C 256.429 25.221 254.743 26.907 252.667 26.907 C 250.591 26.907 248.906 25.221 248.906 23.145 Z " fill="rgb(157,157,157)"/>
                                    <path d=" M 248.906 23.145 C 248.906 21.069 250.591 19.384 252.667 19.384 C 254.743 19.384 256.429 21.069 256.429 23.145 C 256.429 25.221 254.743 26.907 252.667 26.907 C 250.591 26.907 248.906 25.221 248.906 23.145 Z " fill="rgb(157,157,157)" mask="url(#_mask_toYsxxmj7yA1tlh5Xolo04GF3EKtC9b5)" vector-effect="non-scaling-stroke" stroke-width="2" stroke="rgb(181,181,181)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    
                </div>
            </div>
        </section>
        <FAQArea 
            pageLink="/webentwicklung-fuer-designer-und-mediengestalter" 
            headline="Wichtige Antworten zur Zusammenarbeit im Überblick für Dich" 
            button="Dann lass uns quatschen!"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useMainStore } from '@/stores/main';
// Lade diese Komponente synchron wegen SEO
import FAQArea from '@/sections/FAQArea.vue';

const mainStore = useMainStore();

const toggleContactBubble = () => mainStore.toggleContactBubble();


const weblink = ref("https://digimedialoop.de");
const iframeRef = ref(null);
const observer = ref(null);
const desk = ref(true)

// Berechnet die exakte Größe des `foreignObject` basierend auf `#deskScreenBlank`
const updateIframeSize = () => {
    nextTick(() => {
        const blankRect = document.getElementById("deskScreenBlank");
        const foreignObject = document.getElementById("deskScreen");

        if (blankRect && foreignObject && iframeRef.value) {
            // Exakte Werte auslesen und Float-Werte setzen (verhindert Subpixel-Rundungen)
            const currentWidth = parseFloat(blankRect.getAttribute("width"));
            const currentHeight = parseFloat(blankRect.getAttribute("height"));

            // Setze `foreignObject` exakt auf `#deskScreenBlank`
            foreignObject.setAttribute("width", currentWidth.toFixed(2));
            foreignObject.setAttribute("height", currentHeight.toFixed(2));

            // Berechne den Skalierungsfaktor für 1400px Breite
            const zoomFactor = currentWidth / 1400;

            // Setze das `iframe` korrekt
            iframeRef.value.style.width = "1400px"; // Fixierte Breite
            iframeRef.value.style.height = "755px"; // Höhe für Scrollbarkeit
            iframeRef.value.style.zoom = zoomFactor; // Zoom-Faktor
            iframeRef.value.style.overflowY = "scroll"; // Scrollen aktivieren
        }
    });
};

// Startet `ResizeObserver`, um live Änderungen zu tracken
const startObserver = () => {
    const blankRect = document.getElementById("deskScreenBlank");
    if (blankRect) {
        observer.value = new ResizeObserver(updateIframeSize);
        observer.value.observe(blankRect);
    }
};

// URL aktualisieren & Größe anpassen
const updateIframe = () => {
    if (!weblink.value.trim()) return;

    weblink.value = ensureValidUrl(weblink.value);

    if (!isValidUrl(weblink.value)) {
        alert("Bitte eine gültige URL eingeben.");
        return;
    }

    updateIframeSize();
};

// Automatisch "https://" hinzufügen, falls nötig
const ensureValidUrl = (url) => {
    if (!url.match(/^https?:\/\//)) {
        return "https://" + url;
    }
    return url;
};

// Prüft, ob die URL gültig ist
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

// Initialisiere `ResizeObserver` beim Mounten
onMounted(() => {
    startObserver();
    updateIframeSize();
});

// Entferne Observer, wenn die Komponente zerstört wird
onUnmounted(() => {
    if (observer.value) observer.value.disconnect();
});
</script>




<style lang="sass">
.landing
    section
        margin: 5vh auto
    h3
        line-height: 150%
        font-size: 1.4rem
    .heroBox
        position: relative
        overflow-x: hidden
        overflow-y: visible
        &::after
            content: ''
            position: absolute
            top: 2vh
            right: -50vw
            width: 80vw
            height: 90%
            min-height: 500px
            max-height: 800px
            background-image: url('https://strapi.digimedialoop.de/uploads/Screen_Shot_Tool_20250225214638_2209c9c92e.png')
            background-repeat: no-repeat
            background-position: center right
            background-size: cover
            border-radius: 42% 49% 52% 48% / 53% 38% 62% 47%
            animation: bubble-wobble 25s infinite ease alternate, gradient-animation 70s infinite alternate ease-in-out
            box-shadow: $innerShadow
            opacity: 1
            @media(max-width: $breakPointXL)
                right: -60vw
            @media(max-width: $breakPointLG)
                right: -60vw
                min-height: 300px
                max-height: 500px
            @media(max-width: $breakPointLG)
                min-height: 200px
                max-height: 400px
                right: -65vw
            @media(max-width: $breakPointLG)
                min-height: 200px
                max-height: 400px
                right: -70vw
        h2
            margin-bottom: 1rem
            font-size: 1.4rem
        h3
            font-size: 1.1rem
            font-family: 'Mainfont-Bold'
            margin-bottom: 1rem
        .contentBox
            width: 55vw
            @media(max-width: $breakPointMD)
                width: 68vw
        .speechBox
            display: flex
            align-items: center
            max-width: 100%
            margin: 0 auto
            padding: 1rem 0
            gap: 1.5rem

            .profileImage
                width: 20vw
                max-width: 150px
                border-radius: $loopShape
                margin: 0
                flex-shrink: 0
            
            .bubble
                position: relative
                background-image: linear-gradient(to right, lighten($beige, 5%), white)
                border: 1px solid darken($beige, 5%)
                border-radius: 1rem
                padding: 1.5rem
                width: 100%
                max-width: 450px
                line-height: 1.4
                span
                    color: darken($pink, 5%)
                    font-size: 1.2rem
                    text-transform: uppercase
                    padding: 1rem 0
                p
                    font-size: .9rem
                &:before
                    content: ''
                    position: absolute
                    top: 40px
                    left: -12px
                    width: 20px
                    height: 20px
                    background: lighten($beige, 5%)
                    border-left: 1px solid darken($beige, 5%)
                    border-top: 1px solid darken($beige, 5%)
                    transform: rotate(-45deg)
            
    .cooperation    
        ul
            list-style: none
            padding: 0 0 1rem 1rem
        
            li
                position: relative
                padding-left: 2rem
                font-size: 1rem
                margin-bottom: 1rem
        
                &::before
                    content: "✔"
                    color: $primaryColor
                    font-weight: bold
                    position: absolute
                    font-size: 1.4rem
                    left: 0
        
    
    .deviceCheck
        h2
            margin-bottom: .5rem
        input
            width: 100%
            padding: .5rem 1rem
            border: 1px solid lightgrey
            border-radius: 5px
            font-size: 1.2rem
            color: $darkgrey
        #deskScreen
            width: 100%
            height: 100%
            position: relative
            overflow: hidden
    
            iframe
                width: 1400px // Fixierte virtuelle Breite
                height: auto // Automatische Höhe für Scrollen
                border: none
                display: block
                overflow-y: auto // Scrollen aktivieren

</style>