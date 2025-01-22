import { onMounted } from 'vue'

export function useAnimations() {
  const observeVisibility = () => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Füge die "visible"-Klasse hinzu
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // Stoppe die Beobachtung
          }
        })
      },
      { threshold: 0.6 } // Schwelle für Sichtbarkeit
    )

    // Finde alle Elemente mit der Klasse "anime"
    const elements = Array.from(document.querySelectorAll('.anime'))

    elements.forEach((el) => {
      // Wenn das Element bereits im Viewport ist, Klasse direkt hinzufügen
      if (isElementInViewport(el)) {
        el.classList.add('visible')
      } else {
        observer.observe(el)
      }
    })
  }

  // Helper-Funktion, um zu prüfen, ob ein Element bereits im Viewport ist
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Starte die Überwachung beim Mounten
  onMounted(() => {
    observeVisibility()
  })
}
