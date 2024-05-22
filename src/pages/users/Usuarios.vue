<script setup>
import { ref } from 'vue';
import usuariosAPI from '@/services/usuarios/usuarios.api'

const usuarios = ref([]);

const loadUsuarios = async () => {
  usuarios.value = await usuariosAPI.listar();
}

loadUsuarios();
</script>

<template>
  <div class="h3 mb-4">Gestión de usuarios</div>
  <div class="row justify-content-end">
    <div class="col-md-3 text-end mb-3">
      <router-link :to="{ name: 'usuarios-crear' }" class="btn btn-outline-success mx-2">
        <i class="fas fa-plus"></i> Nuevo usuario
      </router-link>
    </div>
  </div>
  <div class="card shadow">
    <div class="card-body">
      <div class="table-responsive-sm">
        <table class="table table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Identificador</th>
              <th scope="col">Nombre</th>
              <th scope="col">Usuario</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Website</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <th scope="row">{{ usuario.id }}</th>
              <td>{{ usuario.name }}</td>
              <td>{{ usuario.username }}</td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.website }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                  <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fas fa-cogs"></i> Aciones
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <li>
                        <router-link class="dropdown-item" :to="{ name: 'perfil', params: { id: usuario.id } }">
                          <i class="fas fa-edit"></i> Editar usuario
                        </router-link>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"><i class="fas fa-trash-alt"></i> Eliinar usuario</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>