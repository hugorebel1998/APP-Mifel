<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-mifel">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="nav-link active text-white" aria-current="page">
        Mifel
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'dasboard' }" class="nav-link active text-white" aria-current="page">
              <i class="fas fa-home"></i> Inicio
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>