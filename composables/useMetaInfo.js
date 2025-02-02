// composables/useMetaInfo.js

export function useMetaInfo({ title, description, canonicalUrl, additionalMeta = [] }) {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: 'de_DE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      ...additionalMeta,
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  })
}
