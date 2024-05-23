<template>
  <div class="container">
    <router-link :to="{ name: 'dasboard' }">
      <img src="https://grupoenconcreto.com/wp-content/uploads/2023/07/mifel.png" width="450" />
    </router-link>
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