 <script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || DefaultLayout;
});

watch(route, (to) => {
  document.title = [to.meta.title, import.meta.env.VITE_APP_TITLE]
    .filter(Boolean)
    .join(" | ");
});
</script>


<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
