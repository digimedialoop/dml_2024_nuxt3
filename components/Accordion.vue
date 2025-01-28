<template>
  <div class="myAccordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <div
        class="accordion-header"
        :ref="el => setHeaderRef(el, index)"
        @click="toggleSection(index)"
      >
        <div class="accordion-title">{{ item.title }}</div>
        <div class="accordion-toggle" :class="{ open: openIndex === index }">
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        class="accordion-content"
        :ref="el => setContentRef(el, index)"
        :style="{ maxHeight: openIndex === index ? `${contentHeights[index]}px` : '0px' }"
      >
        <p><span v-html="htmlContent(item.content)"></span></p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useHtmlConverter } from '@/composables/useHTMLConverter'; 

const { convertToHTML } = useHtmlConverter();
const htmlContent = (data) => {
  return convertToHTML(data); // Nutze die convertToHTML Funktion der Composable
};

// Props für die Items
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Zustand für das geöffnete Element
const openIndex = ref(null);
// Referenzen für die Inhalte
const contentRefs = ref([]);
// Höhen der Inhalte
const contentHeights = ref([]);
// Referenzen für die Header-Elemente
const headerRefs = ref([]);

// Funktion zum Umschalten des geöffneten Abschnitts
const toggleSection = async (index) => {
  // Umschalten des offenen Indexes
  openIndex.value = openIndex.value === index ? null : index;

  // Wenn ein neuer Abschnitt geöffnet wurde
  if (openIndex.value !== null) {
    await nextTick(); // Warten, bis das DOM aktualisiert wurde

    setTimeout(() => {
      const header = headerRefs.value[openIndex.value]; // Header des offenen Elements
      const fixedHeaderHeight = document.querySelector('.fixed-header')?.offsetHeight || 0;

      if (header) {
        const topPosition = header.getBoundingClientRect().top + window.scrollY - fixedHeaderHeight - 20; // 20px Puffer

        // Scrollen zur berechneten Position
        window.scrollTo({
          top: topPosition > 0 ? topPosition : 0, // Verhindert negatives Scrollen
          behavior: 'smooth',
        });
      }
    }, 100); // Kleiner Timeout für das reibungslose Scrollen
  }
};




// Setze die Referenzen dynamisch
const setContentRef = (el, index) => {
  if (el) {
    contentRefs.value[index] = el;
  }
};

const setHeaderRef = (el, index) => {
  if (el) {
    headerRefs.value[index] = el;
  }
};

// Berechne die Höhen der Inhalte
const calculateHeights = () => {
  contentHeights.value = contentRefs.value.map((el) => {
    if (!el) return 0;
    const additionalHeight = 50; // Fester Wert für oben und unten
    return el.scrollHeight + additionalHeight; // Dynamische Höhe + fester Wert
  });
};

// Initialisiere die Berechnung nach dem Mounten
onMounted(async () => {
  contentRefs.value = Array.from({ length: props.items.length });
  headerRefs.value = Array.from({ length: props.items.length });
  await nextTick();
  calculateHeights();
});

// Aktualisiere die Höhen, wenn sich die Items ändern
watch(
  () => props.items,
  async () => {
    contentRefs.value = Array.from({ length: props.items.length });
    headerRefs.value = Array.from({ length: props.items.length });
    await nextTick();
    calculateHeights();
  }
);
</script>

<style lang="scss">
.myAccordion {

  .accordion-item {
    border-bottom: 1px solid #ccc;

    &:last-of-type {
        border-bottom: none;
    }

    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 1rem;
      font-family: 'Mainfont-Bold';
      background-color: white;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: lighten(#EEEBE5, 6%);
      }

      .accordion-title {
        flex: 1; // Nimmt den freien Platz ein
        text-align: left; // Links ausgerichtet
        font-weight: bold;
        font-size: 1rem;
        margin-right: 1rem;
      }

      .accordion-toggle {
        position: relative;
        flex-shrink: 0; // Verhindert, dass das Icon skaliert wird
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          position: absolute;
          width: 15px; // Kürzere Linien für saubere Spitzen
          height: 2px;
          background-color: #333;
          transition: transform 0.3s ease, left 0.3s ease, top 0.3s ease;
          top: 8px;

          &:first-child {
            transform: rotate(135deg); // Linie 1: Oben links zur Mitte
            left: 5px; // Leicht nach links verschoben
          }

          &:last-child {
            transform: rotate(-135deg); // Linie 2: Oben rechts zur Mitte
            left: -5px; // Leicht nach rechts verschoben
          }
        }

        &.open {
          span:first-child {
            transform: rotate(45deg); // Linie 1: Teil des "X"
            left: 0; // Zentriert
          }

          span:last-child {
            transform: rotate(-45deg); // Linie 2: Teil des "X"
            left: 0; // Zentriert
          }
        }
      }
    }

    .accordion-content {
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      padding: 0 1rem;
      background-color: white;

      p {
        margin: 1rem 0.5rem;
        font-size: 1rem;
      }
    }
  }
}
</style>



  