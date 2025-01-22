<template>
  <PageContent pageName="imprint" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

// Asynchrones Laden der Komponente
const PageContent = defineAsyncComponent(() => import('@/components/PageContent.vue'));
</script>