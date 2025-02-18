<template>
    <div 
        class="contactBubble" 
        :class="{ active: isContactBubbleOpen }"
        aria-hidden="false" 
        :aria-expanded="isContactBubbleOpen"
        aria-labelledby="controlIcon"
        role="dialog"
    >
        <svg 
            @click="toggleContactBubble" 
            id="controlIcon" 
            tabindex="0" 
            role="button" 
            aria-label="Toggle contact form"
        >
            <use :xlink:href="`/assets/icons/collection.svg#${isContactBubbleOpen ? 'times' : 'talk'}`"></use>
        </svg>
        <div 
            class="contactContainer" 
            v-show="isContactBubbleOpen"
            role="form" 
            aria-labelledby="contactTitle"
        >
            <div class="row left m-2">
                <div class="col-md-6" id="hintBox">
                    <h2 id="contactTitle">{{ $t('yourcontact2us') }}</h2>
                    <p class="my-4">
                        <svg aria-hidden="true">
                            <use xlink:href="/assets/icons/collection.svg#phone"></use>
                        </svg>
                        <span>{{ companyinfo.phone }}</span>
                    </p>
                    <div class="pt-3" v-if="screenWidth > 768">
                    <h3>Unsere Büroadresse</h3>
                    <p class="address">
                        {{ companyinfo.company }}<br>{{ companyinfo.street }} <br>{{ companyinfo.postalcode }} {{ companyinfo.city }}
                    </p>
                    <p class="aspProf">Sabrina Hennrich freut sich auf Sie!</p>
                    <div class="aspBox"><img :src="cmsUrl + companyinfo?.profileImage?.data?.attributes?.url" alt="Ansprechpartner Sabrina Hennrich"></div>
                    
                </div>
                </div>
                <div class="col-md-6">

                    <div v-if="!formSent">
                        <div class="form-group">
                        <label for="name">{{ $t('name') }}</label>
                        <input 
                            id="name" 
                            type="text" 
                            name="name" 
                            v-model="form.name"
                            @blur="validateName"
                            aria-required="true"
                            autocomplete="name"
                        >
                        <span v-if="errors.name" class="error">{{ errors.name }}</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">{{ $t('email') }}</label>
                        <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            v-model="form.email"
                            @blur="validateEmail"
                            autocomplete="email"
                        >
                        <span v-if="errors.email" class="error">{{ errors.email }}</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">{{ $t('phone') }}</label>
                        <input 
                            id="phone" 
                            type="tel" 
                            name="phone" 
                            v-model="form.phone"
                            @blur="validatePhone"
                            autocomplete="tel"
                        >
                        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">{{ $t('message') }}</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            class="mt-4" 
                            v-model="form.message"
                        ></textarea>
                    </div>
                    
                    <p class="smallText">
                        <span class="check">✔</span>Mit Absenden des Formulars, stimmen Sie der Speicherung Ihrer Daten zwecks Kontaktaufnahme auf unserem Server zu. 
                        <a href="/datenschutz" aria-label="Datenschutzhinweise">Informationen zum Datenschutz</a>
                    </p>
                    
                    <button 
                        type="submit" 
                        aria-label="Nachricht senden"
                        @click="submitForm"
                        class="pinkBtn"
                    >
                        Nachricht senden
                    </button>
                    </div>
                    <div v-else class="mt-5 thx">
                        <h3 class="pt-5">Vielen Dank für Ihre Nachricht!</h3> 
                        <p>Wir werden uns umgehend bei Ihnen melden...</p>
                        <p>Ihr digimedialoop Team</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { ref, reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';

// Zugriff auf den Pinia-Store
const mainStore = useMainStore();
const { companyinfo, cmsUrl } = storeToRefs(mainStore); // companyinfo aus Pinia-Store holen

const isContactBubbleOpen = computed(() => mainStore.contactBoxOpen);
const toggleContactBubble = () => mainStore.toggleContactBubble();

// Bildschirmbreite aus dem Store abrufen
const screenWidth = computed(() => mainStore.screenWidth);

const formSent = ref(false);

// Formular- und Fehlerzustand
const form = reactive({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    language: 'de' // Beispielhaft festgelegt
});

const errors = reactive({
    name: null as string | null,
    email: null as string | null,
    phone: null as string | null
});

// Validierungsfunktionen
const validateName = () => {
    errors.name = form.name ? null : 'Name ist ein Pflichtfeld.';
};

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email && !form.phone) {
        errors.email = 'Bitte geben Sie entweder eine E-Mail-Adresse oder eine Telefonnummer ein.';
    } else if (form.email && !emailRegex.test(form.email)) {
        errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    } else {
        errors.email = null;
    }
};

const validatePhone = () => {
    const phoneRegex = /^[+]?([0-9\- ]{6,15})$/;

    if (!form.email && !form.phone) {
        errors.phone = 'Bitte geben Sie entweder eine Telefonnummer oder eine E-Mail-Adresse ein.';
    } else if (form.phone && !phoneRegex.test(form.phone)) {
        errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein.';
    } else {
        errors.phone = null;
    }
};

const validateForm = () => {
    validateName();
    validateEmail();
    validatePhone();
};

const submitForm = async () => {
  validateForm();
  if (!errors.name && !errors.email && !errors.phone) {
    try {
      await mainStore.sendContactRequestToCMS({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        company: form.company,
        language: navigator.language,
        page: window.location.pathname,
      });

      // Aktionen nach erfolgreichem Senden
      formSent.value = true;
      setTimeout(() => {
        formSent.value = false;
      }, 5500);
      resetForm();

    } catch (error) {
      // Fehlerbehandlung
      console.error('Fehler beim Senden des Formulars:', error);
      alert('Leider gibt es momentan einen Fehler bei der Internetverbindung!');
    }
  }
};

const resetForm = () => {
    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
    form.company = '';
    errors.name = null;
    errors.email = null;
    errors.phone = null;
};

// Debugging: Prüfe, ob companyinfo korrekt geladen wird
console.log("Company Info:", companyinfo.value);
</script>




<style lang="sass">
@keyframes awarePulse
    0%
        box-shadow: 0 0 0 0 rgba(202, 103, 133, 0.25)

    50%
        box-shadow: 0 0 0 25px rgba(202, 103, 133, 0.15)

    100%
        box-shadow: 0 0 0 40px rgba(202, 103, 133, 0)

.contactBubble
    position: fixed
    bottom: 3rem
    right: 2rem
    width: 80px
    height: 80px
    background-color: $pink
    border-radius: $loopShape
    color: white
    font-size: 2rem
    text-align: center
    z-index: 100
    cursor: pointer
    transition: .8s
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    animation: awarePulse 1.8s infinite ease-out
    @media(max-width: $breakPointMD)
        bottom: 4vw
        right: 4vw
    .contactContainer
        .thx
            background-color: $lightgrey
            border-radius: $loopShape
            padding: 0 3rem 2rem
            text-align: center
            h3
                font-size: 1.2rem
            p
                font-size: 1rem
            
        #hintBox
            padding-top: 3rem
            @media(max-width: $breakPointMD)
                text-align: center
                padding-top: 1rem
                svg
                    max-height: 60px
        width: 80%
        margin: 6rem 10%
        h3
            font-size: 1.2rem
            font-family: 'Mainfont-Bold'
        p
            color: $darkgrey
            font-size: 1.2rem
            &.smallText
                font-size: .8rem
            &.address
                font-size: .9rem
            .check
                font-size: 1.4rem
                color: $pink
            svg
                width: 2rem
                height: 2rem
                fill: $darkgrey
                margin-right: 1rem
                max-height: 100px
        a
            color: $primaryColor 
    #controlIcon
        position: absolute
        bottom: 50%
        left: 50%
        transform: translate(-50%, 50%)
        fill: white
        height: auto
        width: 3rem
        height: 3rem
        z-index: 101
    
    &.active
        height: 90vh
        width: 90vw
        background-color: rgba(lighten($beige, 8%), .98)
        color: $darkgrey
        display: flex
        flex-direction: column
        text-align: left
        border: 1px solid $lightgrey
        animation: none
        box-shadow: 1px 1px 15px 2px $beige
        @media(max-width: $breakPointMD)
            border-radius: 0
            height: 100%
            width: 100%
            right: 0
            top: 0
            #controlIcon
                right: 5vw 
                left: auto
                bottom: 4rem !important
        #controlIcon
            bottom: 3rem
            fill: black
            width: 2rem
    input, textarea
        all: unset
        position: relative
        width: 100%
        padding: .2rem .5rem .2rem .5rem
        font-size: 1.2rem
        background-color: transparent
        border-top-right-radius: .3rem
        border-top-left-radius: .3rem
        border-bottom: 1px solid lighten($darkgrey, 40%)
        border-left: none
        border-right: none
        border-top: none
        margin-bottom: .5rem
        margin-top: 0
        &::placeholder
            color: darken($beige, 8%)
            font-size: 1.1rem
        &:focus
            outline: none // Entfernt den Standard-Fokusrahmen
            border-bottom-color: $primaryColor // Ändert die Farbe der unteren Begrenzung
            transition: border-color 0.3s ease-in-out // Smooth Transition beim Wechsel der Farbe
        &:-webkit-autofill
            background-color: transparent !important 
            color: inherit !important 
            -webkit-box-shadow: 0 0 0px 1000px transparent inset 
            box-shadow: 0 0 0px 1000px transparent inset 
            transition: background-color 5000s ease-in-out 0s 
    textarea
        height: 20%
        font-size: 1.1rem
    button
        font-size: 1.2rem
        border: none
        background-image: linear-gradient(to bottom right, lighten($pink, 10%), $pink)
        padding: .5rem 1rem
        border-radius: .8rem
        color: white
    .aspBox
        width: 100%
        img
            width: 50%
            max-width: 150px
            border-radius: $loopShape
    .aspProf
        font-size: .8rem !important
        margin-top: 1rem
        font-family: 'Mainfont-Bold'
        width: 80%
    // Form-group Anpassungen
    .form-group
        position: relative
        margin-bottom: .8rem
        label
            position: absolute
            top: -.2rem
            left: 0.5rem
            font-size: 0.9rem
            color: $primaryColor
            pointer-events: none
            transition: all 0.3s ease-in-out
        input, textarea
            padding-top: 1rem // Platz für das Label schaffen
        input:focus + label, textarea:focus + label
            top: -1rem
            font-size: 0.8rem
            color: $primaryColor
    .error
        color: #CC0000
        font-size: .8rem
        display: block
        line-height: 1rem
</style>

