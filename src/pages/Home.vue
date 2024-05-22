<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="alert alert-primary" role="alert">
        <div class="h1 text-center">Bienvenido</div>
        <i class="fas fa-comment-dots"></i>
        Que haremos el día de hoy.
      </div>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-md-4">
      <div class="card shadow">
        <div class="card-body">
          <div class="h4 card-title">
            <i class="fas fa-user-cog"></i> Gestión de usuarios
          </div>
          <ul class="text-body">
            <li>
              <em>
                "En esta sección puedes registrar nuevos usuarios y gestionar su
                información."
              </em>
            </li>
            <li>
              <em>
                "Aquí puedes añadir nuevos usuarios al sistema y actualizar sus
                datos personales."
              </em>
            </li>
          </ul>
        </div>
        <div class="card-footer text-end">
          <router-link
            :to="{ name: 'usuarios' }"
            class="btn btn-outline-primary mx-2"
          >
            Ver
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li em {
  font-size: 13px;
}

.card {
  transition: transform 0.5s;
}
.card:hover {
  transform: scale(1.1);
}
</style>