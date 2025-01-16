<template>
    <section class="webagentur">
    <div class="container">
        <div class="contentBox">
            <h1>Ihre Webagentur in Herrsching am Ammersee</h1>
            <h2>Wir entwickeln Webseiten, die aus Besuchern Kunden machen!</h2>
            <p>Unser erfahrenes Team ist für Sie da, um maßgeschneiderte Lösungen für Ihre Online-Präsenz zu entwickeln. 
                Wir haben uns darauf spezialisiert, Webseiten zu erstellen, die nicht nur Besucher anziehen, sondern diese 
                auch zu treuen Kunden machen. Von der Konzeption bis zur Umsetzung stehen wir Ihnen mit unserem <b>Fachwissen</b> 
                und unserer <b>Kreativität</b> zur Seite, um <u>Ihre Visionen zu verwirklichen</u> und Ihren <b>Online-Erfolg</b> zu maximieren.</p> 
            <p>Lassen Sie uns gemeinsam Ihre digitale Präsenz optimieren und Ihr Unternehmen auf die nächste Stufe bringen!</p>
            <button class="mt-3">Zu unseren Leistungen</button>
        </div>        
    </div>
</section>
<section class="team">
    <div class="container">
        <h2 class="teamHeadline">Der Kopf von digimedialoop...</h2>
    <div class="teamContainer">      
        <h3>Sabrina Hennrich</h3>
        <p class="smallFont">Beratung | Konzeption | Design | Entwicklung</p>
        <p>Mit über 20 Jahren Erfahrung im Webdesign ist sie noch immer Webentwicklerin aus purer Leidenschaft!</p>
        <p class="quotation">Offenheit, Transparenz und Fairness sind mir bei der Zusammenarbeit mit meinen Kunden enorm wichtig. Ich empfehle nur, was mir sinnvoll erscheint und zu meinen Kunden passt. Dafür nehme ich mir gerne die Zeit für eine gründliche Analyse der Bedürfnisse meiner Kunden bzw. die deren Zielgruppe.</p>
        <button class="mt-3">Sprechen Sie mich gerne an!</button>
    </div>
    </div>
    
</section>
</template>

<script setup>

</script>

<style lang="sass">
.webagentur
    &::after
        content: ''
        position: absolute
        top: 2vh
        right: -35vw
        width: 65vw
        height: 50vw
        min-height: 550px
        background-image: url('https://strapi.digimedialoop.de/uploads/photo1717674388_9910623c8e.jpeg')
        background-repeat: no-repeat
        background-position: center right
        background-size: cover
        border-radius: 42% 49% 52% 48% / 53% 38% 62% 47%
        animation: bubble-wobble 25s infinite ease alternate, gradient-animation 70s infinite alternate ease-in-out
    .contentBox
        width: 55vw
        
.team
    margin-top: 5vh
    margin-bottom: 25vh
    &::before
        content: ''
        position: absolute
        top: 2vh
        left: -24vw
        width: 50vw
        height: 30vw
        min-height: 550px
        background-image: url('https://strapi.digimedialoop.de/uploads/sabrinahennrich_0f07d46857.jpg')
        background-repeat: no-repeat
        background-position: center center
        background-size: cover
        border-radius: 42% 49% 52% 48% / 53% 38% 62% 47%
        animation: bubble-wobble 35s infinite ease alternate, gradient-animation 70s infinite alternate ease-in-out
    .teamHeadline
        margin-left: 15vw
    .teamContainer    
        margin-left: 22vw    
        width: 70%
        h3
            font-size: 2rem
            margin-bottom: .1rem
            margin-top: 3rem
        .smallFont
            font-size: 1.1rem
            font-family: 'Mainfont-Bold'
        .quotation
            background-color: $lightgrey
            padding: 2.5rem 4rem 2rem 6rem
            border-radius: 1rem
            font-size: 1rem
            position: relative
            margin-top: 2rem
            &::before
                position: absolute
                top: -.5rem
                left: 1rem
                content: '\275E'
                font-size: 5rem
                margin: 0 .5rem 0 0
                color: white
    </style>