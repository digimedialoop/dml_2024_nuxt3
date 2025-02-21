<template>
    <transition name="fade">
      <button class="back-to-top" v-show="isVisible" @click="scrollToTop" aria-label="Zurück nach oben">
        <span class="arrow-up"></span>
      </button>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const isVisible = ref(false)
  
  const toggleVisibility = () => {
    isVisible.value = window.scrollY > 100
  }
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', toggleVisibility)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', toggleVisibility)
  })
  </script>
  
<style lang="sass">
.back-to-top
    position: fixed
    bottom: 2rem
    left: 2rem
    background-color: rgba($darkgrey, .95)
    border: 1px solid white
    z-index: 100
    border-radius: 50%
    width: 3rem
    height: 3rem
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    transition: opacity 0.4s ease-in-out
    opacity: 0.8

    &:hover
        opacity: 1

.arrow-up
    width: 0
    height: 0
    border-left: 8px solid transparent
    border-right: 8px solid transparent
    border-bottom: 12px solid white

// Transition für den Button
.fade-enter-active, .fade-leave-active
    transition: opacity 0.4s ease-in-out

.fade-enter-from, .fade-leave-to
    opacity: 0
</style>
  