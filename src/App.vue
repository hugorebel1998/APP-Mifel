 <script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";

// Se obtiene la ruta actual
const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || MainLayout;
});

//Uso de Watch para detectar el cambio de title mediante la ruta
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
