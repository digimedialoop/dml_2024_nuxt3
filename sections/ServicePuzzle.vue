<template>
    <section class="puzzleSection" v-if="isPuzzleOpen">
        <div class="closer" @click.prevent="closePuzzle" role="button">x</div>
        <div class="textArea">
            <h2>Welche Anforderungen haben Sie an ihre Website?</h2>
            <p>Mit einem Doppelklick auf das jeweilige Puzzleteil erhalten Sie <u>detaillierte Informationen</u> zu den einzelnen Komponenten. <b>Gerne beraten wir Sie auch persönlich!</b></p>
        
        </div>
        <div class="puzzleCanvas">
            <div class="row">
                <div class="col-md-6">
                    <div class="puzzleBox">
        
                        <!-- Andere Puzzles -->
                        <div
                            v-for="(puzzle, index) in puzzles"
                            :key="index"
                            class="puzzle"
                            :style="{ top: puzzle.top, left: puzzle.left, transform: `rotate(${puzzle.rotate}deg)`, 'animation-delay': `${puzzle.delay}s` }"
                            @mousedown="startDrag(index, $event)"
                            @touchstart="startDrag(index, $event)"
                        >
                            <div class="angle"></div>
                            <div class="angle"></div>
                            <div class="angle"></div>
                            <div class="angle"></div>
                            <div class="description">
                            {{ puzzle.description }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="puzzleGrid">
                        <div
                            v-for="i in 35"
                            :key="i"
                            class="cell"
                        >
                            <!-- Füge das zentrale Puzzle in Kästchen 18 ein -->
                            <div
                                v-if="i === 18"
                                class="puzzle main-puzzle"
                                style="transform: rotate(0); animation-delay: 0;"
                                >
                                <div class="angle"></div>
                                <div class="angle"></div>
                                <div class="angle"></div>
                                <div class="angle"></div>
                                <div class="description main">
                                    Website
                                </div>
                            </div>
                            <!-- Zeige die Nummer für andere Zellen -->
                            <template v-else>
                            {{ i }}
                            </template>
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    </section>
    
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import { useMainStore } from '@/stores/main';
  const mainStore = useMainStore();
  const isPuzzleOpen = computed(() => mainStore.puzzleOpen);
  const closePuzzle = () => mainStore.closePuzzle();
  
  // Puzzle-Daten (ohne zentrales Puzzle, da es statisch ist)
  const puzzles = reactive([
    {
      top: "10%",
      left: "70%",
      rotate: 8,
      delay: .1,
      description: "Suchmaschinen-Optimierung (SEO)",
    },
    {
      top: "30%",
      left: "10%",
      rotate: -8,
      delay: .3,
      description: "Content-Management-System (CMS)",
    },
    {
      top: "75%",
      left: "10%",
      rotate: 6,
      delay: .5,
      description: "Corporate Design",
    },
    {
      top: "70%",
      left: "80%",
      rotate: -12,
      delay: .2,
      description: "Barrierefreiheit",
    },
    {
      top: "75%",
      left: "40%",
      rotate: -8,
      delay: .4,
      description: "Professionelle Texte",
    },
    {
      top: "15%",
      left: "38%",
      rotate: 15,
      delay: .5,
      description: "Shopsystem",
    },
    {
      top: "38%",
      left: "72%",
      rotate: -15,
      delay: 0,
      description: "Individual-Komponente",
    },
  ]);
  
  // Dragging-Variablen
  let currentIndex = ref(null);
  let offsetX = 0;
  let offsetY = 0;
  
 // Start Dragging
const startDrag = (index, event) => {
  currentIndex.value = index;

  const isTouchEvent = event.type === "touchstart";
  const startX = isTouchEvent ? event.touches[0].clientX : event.clientX;
  const startY = isTouchEvent ? event.touches[0].clientY : event.clientY;

  const puzzleElement = event.target.closest(".puzzle");
  const puzzleRect = puzzleElement.getBoundingClientRect();

  // Zentriere die Maus auf das Puzzle-Teil
  offsetX = puzzleRect.width / 2;
  offsetY = puzzleRect.height / 2;

  // Setze das Puzzle-Teil direkt unter die Maus
  puzzles[currentIndex.value].left = `${startX - offsetX}px`;
  puzzles[currentIndex.value].top = `${startY - offsetY}px`;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);

  document.addEventListener("touchmove", onDrag);
  document.addEventListener("touchend", stopDrag);
};

// Dragging in Progress
const onDrag = (event) => {
  if (currentIndex.value === null) return;

  const isTouchEvent = event.type === "touchmove";
  const moveX = isTouchEvent ? event.touches[0].clientX : event.clientX;
  const moveY = isTouchEvent ? event.touches[0].clientY : event.clientY;

  const canvas = document.querySelector(".puzzleCanvas").getBoundingClientRect();

  let newLeft = moveX - offsetX;
  let newTop = moveY - offsetY;

  const puzzleWidth = 160; // Breite des Puzzles (10rem)
  const puzzleHeight = 128; // Höhe des Puzzles (8rem)

  // Begrenze die Bewegung innerhalb der Canvas
  newLeft = Math.max(0, Math.min(newLeft, canvas.width - puzzleWidth));
  newTop = Math.max(0, Math.min(newTop, canvas.height - puzzleHeight));

  puzzles[currentIndex.value].left = `${newLeft}px`;
  puzzles[currentIndex.value].top = `${newTop}px`;
};

  
  // Stop Dragging
  const stopDrag = () => {
    currentIndex.value = null;
  
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
  };
  </script>
  
  
<style lang="sass">
.puzzleSection
    position: fixed
    top: 1rem
    left: 5vw
    height: 90vh
    width: 90vw
    z-index: 200
    margin-top: 3rem
    background-color: white
    border-radius: 1rem
    padding: .5rem
    border: 1px solid $lightgrey
    box-shadow: 2px 2px 5px 2px lightgrey
    &::before
        display: none
    .closer
        position: absolute
        right: 1.5rem 
        top: .5rem
        font-size: 2rem
    .textArea
        padding: 0 1rem
        h2
            margin-bottom: .5rem
        p
            font-size: 1rem
.puzzleGrid
    display: grid
    grid-template-columns: repeat(7, 1fr) // 7 Spalten mit gleicher Breite
    grid-template-rows: repeat(5, 1fr)   // 5 Reihen mit gleicher Höhe
    gap: 0                               // Kein Abstand zwischen Zellen
    width: 100%
    aspect-ratio: 1 / 1
    background-color: $beige
    border: 2px solid $lightgrey
    border-radius: 5px
    position: relative

    .cell
        background-color: white
        border: 1px solid $lightgrey
        display: flex
        justify-content: center
        align-items: center
        font-size: 1rem
        color: $darkgrey
        border-radius: 3px

    .main-puzzle
        grid-area: 3 / 5 / 4 / 6 // Positioniert in Kästchen 18 (3. Reihe, 5. Spalte)
        pointer-events: none // Nicht draggable
        background-color: $primaryColor
        display: flex
        justify-content: center
        align-items: center
        cursor: default
        .description
            font-size: 1rem
            text-transform: uppercase
            color: white
        .angle
            &:nth-of-type(1)
                background-color: $primaryColor
                z-index: 7
            &:nth-of-type(2)
                z-index: 6
            &:nth-of-type(3)
                background-color: $primaryColor
                z-index: 7
            &:nth-of-type(4)
                z-index: 6
        
        
.puzzleCanvas
    height: 60vw
    width: 100%
    margin: 0
    background-color: white
    border: 2px solid $beige
    border-radius: 1rem
    position: relative
    overflow: hidden

.puzzleBox
    position: relative
    width: 100%
    height: 100%
  
.puzzle
    width: 100%
    max-width: 100px
    height: 100%
    max-height: 80px
    background-color: $beige
    position: absolute
    text-align: center
    z-index: 4
    cursor: grab
    border-radius: 5px
    transform-origin: center
    animation: blobIn 0.8s ease-out forwards
    &:active
        cursor: grabbing
    .description
        position: absolute
        top: 35%
        left: 40%
        transform: translate(-50%, -50%)
        z-index: 6
        font-family: 'Mainfont-Bold'
        font-size: .7rem
        color: lighten($darkgrey, 25%)
        &.main
            font-size: 1rem
            text-transform: uppercase

    .angle
        width: 40%
        aspect-ratio: 1 / 1
        background-color: transparent
        position: absolute
        -webkit-mask: url('~/assets/images/DML_Puzzle.svg') no-repeat center
        mask: url('~/assets/images/DML_Puzzle.svg') no-repeat center
        -webkit-mask-size: 100% auto
        mask-size: 100% auto
        z-index: 5
        &:nth-of-type(1)
            top: -25%
            left: 50%
            transform: translateX(-50%)
            background-color: $beige
            z-index: 7
        &:nth-of-type(2)
            bottom: -5%
            left: 50%
            transform: translateX(-50%) rotate(0)
            background-color: white
            z-index: 6
        &:nth-of-type(3)
            top: 50%
            left: -30%
            transform: translateY(-50%) rotate(-90deg)
            background-color: $beige
            z-index: 7
        &:nth-of-type(4)
            top: 50%
            right: -6%
            transform: translateY(-50%) rotate(-90deg)
            background-color: white
            z-index: 6    

</style>
  