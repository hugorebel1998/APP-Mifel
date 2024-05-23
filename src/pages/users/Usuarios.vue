<script setup>
import { ref, onMounted } from 'vue';
import usuariosAPI from '@/services/usuarios/usuarios.api'

const usuarios = ref([]);

onMounted(() => {
  loadUsuarios();

})

const loadUsuarios = async () => {
  usuarios.value = await usuariosAPI.listar();
}

const onDeleteUser = (usuario_id) => {
  swal({
    title: "Estas seguro de esta acción?",
    text: "No podrás recuperar este usuario!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FE1414",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "No, cancelar!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
    function (isConfirm) {
      if (isConfirm) {
        swal("Eliminar!", "Usuario eliminado con éxito.", "success");
        usuarios.value = usuarios.value.filter((u) => u.id !== usuario_id)
      } else {
        swal("Cancelado", "Cancelaste esta acción", "error");
      }
    });
}

</script>

<template>
  <div class="animate__animated animate__backInLeft">
    <div class="h3 mb-4">Gestión de usuarios</div>
    <div class="d-flex bd-highlight mb-3">
      <div>
        <router-link :to="{ name: 'usuarios-crear' }" class="btn btn-mifel-blue mx-2">
          <i class="fas fa-plus"></i> Nuevo usuario
        </router-link>
      </div>

      <div>
        <button @click="loadUsuarios()" class="btn btn-mifel mx-2">
          <i class="fas fa-sync-alt"></i> Actualizar
        </button>
      </div>
    </div>
    <div class="card shadow">
      <div class="card-body">
        <div class="table-responsive-sm">
          <table class="table table table-striped table-hover">
            <thead class="bg-mifel text-white">
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
                      <button id="btnGroupDrop1" type="button" class="btn btn-mifel-blue dropdown-toggle"
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
                          <button @click="onDeleteUser(usuario.id)" class="dropdown-item"><i
                              class="fas fa-trash-alt"></i> Eliminar usuario</button>
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
  </div>
</template>