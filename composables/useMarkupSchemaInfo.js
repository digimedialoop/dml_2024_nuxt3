// composables/useMarkupSchemaInfo.js
import { useRoute } from 'vue-router'

export const useMarkupSchemaInfo = () => {
  const route = useRoute()
  const currentPath = route.path || '/'
  const canonicalBase = 'https://www.digimedialoop.de'
  const canonicalUrl = canonicalBase + currentPath

  // Basis-Script: SiteNavigationElement (für alle Seiten)
  const scriptTags = [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": ["Startseite", "Leistungen", "Agentur", "Referenzen", "Wissenswertes"],
        "url": ["/", "/leistungen", "/webagentur", "/referenzen", "/wissenswertes"],
      }),
    },
  ]

  // Auf der Startseite zusätzlich LocalBusiness- und FAQ-Markup einbinden
  if (currentPath === '/') {
    scriptTags.push(
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "digimedialoop",
          "image": "https://strapi.digimedialoop.de/uploads/DML_Logo_mint_2024_37426ffd12.svg",
          "telephone": "+49-1778388553",
          "email": "info@digimedialoop.de",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rausch 10",
            "addressLocality": "Herrsching",
            "addressRegion": "Bayern",
            "postalCode": "82211",
            "addressCountry": "DE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 8.01300,
            "longitude": 11.15774
          },
          "url": canonicalBase,
          "priceRange": "€€",
          "openingHours": ["Mo-Do 09:00-17:00", "Fr 09:00-12:00"],
        })
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wieviel kostet es eine neue Webseite erstellen zu lassen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Der Einstiegspreis für eine einfache Online-Visitenkarte liegt bei ca. 800 Euro."
              }
            },
            {
              "@type": "Question",
              "name": "Wie lange dauert es, eine Website zu erstellen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kleinere Webseiten können oft schon innerhalb einer Woche online gehen."
              }
            },
            {
              "@type": "Question",
              "name": "Welche Dienstleistungen bietet digimedialoop an?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir bieten Webdesign, Webprogrammierung, SEO, Content-Erstellung und Online-Marketing an."
              }
            }
          ]
        })
      }
    )
  }

  // Auf der Leistungsseite ein zusätzliches Service-Markup einbinden
  if (currentPath === '/leistungen') {
    scriptTags.push(
      {
        type: 'application/ld+json',
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Webdesign und Webentwicklung",
            "description": "Maßgeschneiderte Lösungen für moderne, responsive Websites.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Suchmaschinenoptimierung (SEO)",
            "description": "Optimierung Ihrer Website für bessere Sichtbarkeit in Suchmaschinen.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Corporate Design",
            "description": "Ein einheitlicher Look für Ihre Marke – von Logo bis zu weiteren Medien.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Texterstellung und -pflege",
            "description": "Ansprechende Inhalte, die Ihre Zielgruppe erreichen.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Illustrationen und Animationen",
            "description": "Visuelle Erlebnisse, die Ihre Botschaft unvergesslich machen.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "digimedialoop",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rausch 10",
                "addressLocality": "Herrsching",
                "addressRegion": "Bayern",
                "postalCode": "82211",
                "addressCountry": "DE"
              }
            }
          }
        ])
      }
    )
  }

  // Füge die Schema-Skripte via useHead ein
  useHead({
    script: scriptTags,
  })
}
