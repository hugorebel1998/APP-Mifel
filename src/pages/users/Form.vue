<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  nombre: "Hugo",
  apellido_paterno: "Guillermo",
  apellido_materno: "Segundo",
  curp: "GVFCSDXCVGDFRTEDGV",
  rfc: "FDCRSWEDFADW",
  codigo_postal: "56337",
  calle: "zapote ,z2 lt1",
  numero_experior: 1,
  numero_interior: 1,
  estado: "Mexico",
  delegacion: "chimalhuacan",
  colonia: "copalera",
});

const onSubmit = () => {
  console.log(form);
};
</script>


<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="h3 text-center mb-4">Identificación</div>
      <div class="card shadow">
        <div class="card-body my-5 mx-4">
          <form @submit.prevent="onSubmit">
            <div class="row gy-4">
              <div class="col-md-4">
                <label for="nombre" class="text-success">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  v-bind="field"
                  v-model="form.nombre"
                  class="form-control"
                />
              </div>

              <div class="col-md-4">
                <label for="apellido_paterno" class="text-success"
                  >Apellido paterno *</label
                >
                <input
                  type="text"
                  v-model="form.apellido_paterno"
                  class="form-control"
                />
              </div>

              <div class="col-md-4">
                <label for="apellido_materno" class="text-success"
                  >Segundo apellido</label
                >
                <input
                  type="text"
                  v-model="form.apellido_materno"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label for="curp" class="text-success">CURP *</label>
                <input type="text" v-model="form.curp" class="form-control" />
              </div>

              <div class="col-md-6">
                <label for="rfc" class="text-success"
                  >RFC (con homoclave) *
                </label>
                <input type="text" v-model="form.rfc" class="form-control" />
              </div>

              <div class="col-md-2">
                <label for="codigo_postal" class="text-success"
                  >Código postal *
                </label>
                <input
                  type="text"
                  v-model="form.codigo_postal"
                  class="form-control"
                />
              </div>

              <div class="col-md-10">
                <label for="calle" class="text-success">Calle * </label>
                <input type="text" v-model="form.calle" class="form-control" />
              </div>

              <div class="col-md-3">
                <label for="numero_experior" class="text-success"
                  >Número experior *
                </label>
                <input
                  type="text"
                  v-model="form.numero_experior"
                  class="form-control"
                />
              </div>

              <div class="col-md-3">
                <label for="numero_interior" class="text-success"
                  >Número interior *
                </label>
                <input
                  type="text"
                  v-model="form.numero_interior"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label for="estado" class="text-success">Estado * </label>
                <input type="text" v-model="form.estado" class="form-control" />
              </div>

              <div class="col-md-6">
                <label for="delegacion" class="text-success"
                  >Delegación / Municipio *
                </label>
                <input
                  type="text"
                  v-model="form.delegacion"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label for="colonia" class="text-success">Colonia * </label>
                <input
                  type="text"
                  v-model="form.colonia"
                  class="form-control"
                />
              </div>
            </div>
            <div class="text-center mt-5">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-invalid {
  border-color: red;
}
</style>