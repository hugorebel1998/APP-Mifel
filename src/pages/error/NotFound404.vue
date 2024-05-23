<template>
  <div class="container">
    <div class="h2 text-center">
      Lo sentimos, la página que buscas no ha sido encontrada. Te sugerimos
      regresar al incio de nuestro sitio web.
      <div class="text-center mt-4">
        <router-link :to="{ name: 'dasboard' }" class="btn btn-mifel"> Inicio </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>