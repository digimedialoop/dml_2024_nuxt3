<template>
    <div class="sideBarNaviSlider" 
         :class="{ 'slide-in': showSideBar }"
         @click="navigate">
      <slot></slot>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { navigateTo } from '#app'
  
  // Props für dynamischen Inhalt und Link
const props = defineProps({
    link: {
        type: String,
        required: true
    }
})
  
  // Animation für das Einfahren
  const showSideBar = ref(false)
  
  onMounted(() => {
    setTimeout(() => {
      showSideBar.value = true
    }, 100) // Verzögerung für weiche Animation
  })

  onUnmounted(() => {
    showSideBar.value = false
  })
  
  // Funktion zur Navigation in Nuxt 3
  const navigate = () => {
    if (props.link) {
      navigateTo(props.link)
    }
  }
</script>
  
<style lang="sass">
.sideBarNaviSlider
    position: fixed
    background-color: $yellow
    color: white
    text-transform: uppercase
    font-size: 1rem !important
    letter-spacing: .05rem
    top: 30vh
    right: -80px  // Startposition außerhalb des Bildschirms
    padding: 1.2rem .8rem 1.6rem .8rem
    writing-mode: vertical-lr
    transform: rotate(180deg)
    border-bottom-right-radius: 1rem
    border-top-right-radius: 1rem
    cursor: pointer
    transition: right 0.6s ease-out, transform .8s
    z-index: 20

    &.slide-in
        right: 0  // Fährt an die finale Position

    &:hover
      transform: rotate(180deg) scale(1.1)
</style>
  