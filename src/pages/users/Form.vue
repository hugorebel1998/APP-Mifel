<script setup>
import { reactive, ref, watch } from "vue";

const form = reactive({
  nombre: '',
  paterno: '',
  materno: '',
  curp: 'gush960803hdflgg03',
  rfc: '',
  cp: '',
  calle: '',
  exterior: '',
  interior: '',
  estado: '',
  delegacion: '',
  colonia: '',
});

const error = reactive({});

const inicializarErrores = () => {
  for (const field in form) {
    error[`${field}Valid`] = "";
  }
};


inicializarErrores();

const validateField = (field) => {
  let validate_required = ['nombre', 'paterno', 'curp', 'rfc', 'cp', 'calle', 'exterior', 'estado', 'delegacion', 'colonia'];
  let validate_string = ['nombre', 'paterno', 'materno', 'estado', 'delegacion', 'colonia'];
  let validate_integer = ['cp', 'exterior'];
  let validate_alfanumerico = ['interior'];

  if (validate_required.includes(field) && form[field] === '') {
    error[`${field}Valid`] = `El campo ${field} es requerido.`

  } else if (validate_string.includes(field) && !/^[A-Za-z]+$/i.test(form[field])) {
    error[`${field}Valid`] = `El campo ${field} solo puede contener letras.`;

  } else if (validate_integer.includes(field) && !/^[0-9]+$/.test(form[field])) {
    error[`${field}Valid`] = `El campo ${field} solo aceptar numeros.`;

  } else if (validate_alfanumerico.includes(field) && !/^[a-zA-Z0-9]+$/.test(form[field])) {
    error[`${field}Valid`] = `El campo ${field} solo puede contener números y letras.`;

  } else {
    error[`${field}Valid`] = ''
  }
};

const validateCurp = (curp) => {

  curp = curp.trim().toUpperCase();
  console.log(curp);


  if (curp.length !== 18)
    return;

  let regex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z\d]{3}$/;

  if (regex.test(curp)) return;

  let diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let suma = 0;
  for (var i = 0; i < curp.length - 1; i++) {
    suma += diccionario.indexOf(curp.charAt(i)) * (18 - i);
  }
  let residuo = suma % 10;
  let verificadorCalculado = residuo === 0 ? "0" : diccionario.charAt(residuo);
  return verificadorCalculado === curp.charAt(17);

}


const validateForm = () => {
  let isValid = true;

  for (const field in form) {
    validateField(field);
    if (error[`${field}Valid`]) {
      isValid = false;
    }
  }

  return isValid;
};

const onSubmit = () => {


  if (!validateCurp(form.curp)) {
    console.log("CURP valido", form.curp)
  } else {
    console.log("CURP invalido", form.curp)

  }

  console.log("Formulario enviado:", form);
};

for (const field in form) {
  watch(() => form[field], () => validateField(field));
}
</script>


<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="h3 text-center mb-4">Identificación</div>
      <div class="card shadow">
        <div class="card-body my-5 mx-4">
          <form @submit.prevent="onSubmit">
            <div class="row gy-4">
              <div class="col-md-4">
                <label for="nombre" class="text-success">Nombre *</label>
                <input type="text" name="nombre" v-model="form.nombre" class="form-control" :class="{
                  'is-invalid': error.nombreValid,
                  'is-valid': !error.nombreValid && form.nombre,
                }" />
                <small v-if="error.nombreValid" class="text-danger mx-2"> {{ error.nombreValid }}</small>
              </div>

              <div class="col-md-4">
                <label for="apellido_paterno" class="text-success">Apellido paterno *</label>
                <input type="text" v-model="form.paterno" class="form-control" :class="{
                  'is-invalid': error.paternoValid,
                  'is-valid': !error.paternoValid && form.paterno,
                }" />
                <small v-if="error.paternoValid" class="text-danger mx-2">{{ error.paternoValid }}</small>
              </div>

              <div class="col-md-4">
                <label for="apellido_materno" class="text-success">Segundo apellido</label>
                <input type="text" v-model="form.materno" class="form-control" :class="{
                  'is-invalid': error.maternoValid,
                  'is-valid': !error.maternoValid && form.materno,
                }" />

                <small v-if="error.maternoValid" class="text-danger mx-2">{{ error.maternoValid }}</small>
              </div>

              <div class="col-md-6">
                <label for="curp" class="text-success">CURP *</label>
                <input type="text" v-model="form.curp" class="form-control" :class="{
                  'is-invalid': error.curpValid,
                  'is-valid': !error.curpValid && form.curp,
                }" />
                <small v-if="error.curpValid" class="text-danger mx-2">{{ error.curpValid }}</small>
              </div>

              <div class="col-md-6">
                <label for="rfc" class="text-success">RFC (con homoclave) *
                </label>
                <input type="text" v-model="form.rfc" class="form-control" :class="{
                  'is-invalid': error.rfcValid,
                  'is-valid': !error.rfcValid && form.rfc,
                }" />
                <small v-if="error.rfcValid" class="text-danger mx-2">{{ error.rfcValid }}</small>

              </div>

              <div class="col-md-8">
                <label for="calle" class="text-success">Calle * </label>
                <input type="text" v-model="form.calle" class="form-control" :class="{
                  'is-invalid': error.calleValid,
                  'is-valid': !error.calleValid && form.calle,
                }" />
                <small v-if="error.calleValid" class="text-danger mx-2">{{ error.calleValid }}</small>
              </div>

              <div class="col-md-4">
                <label for="numer_experior" class="text-success">Número exterior *
                </label>
                <input type="text" v-model="form.exterior" class="form-control" :class="{
                  'is-invalid': error.exteriorValid,
                  'is-valid': !error.exteriorValid && form.exterior,
                }" maxlength="5" />
                <small v-if="error.exteriorValid" class="text-danger mx-2">{{ error.exteriorValid }}</small>
              </div>

              <div class="col-md-4">
                <label for="numero_interior" class="text-success">Número interior
                </label>
                <input type="text" v-model="form.interior" class="form-control" :class="{
                  'is-invalid': error.interiorValid,
                  'is-valid': !error.interiorValid && form.interior,
                }" maxlength="10" />
                <small v-if="error.interiorValid" class="text-danger mx-2">{{ error.interiorValid }}</small>
              </div>

              <div class="col-md-4">
                <label for="codigo_postal" class="text-success">Código postal *
                </label>
                <input type="text" v-model="form.cp" class="form-control" :class="{
                  'is-invalid': error.cpValid,
                  'is-valid': !error.cpValid && form.cp,
                }" maxlength="5" />
                <small v-if="error.cpValid" class="text-danger mx-2">{{ error.cpValid }}</small>

              </div>

              <div class="col-md-4">
                <label for="estado" class="text-success">Estado * </label>
                <input type="text" v-model="form.estado" class="form-control" :class="{
                  'is-invalid': error.estadoValid,
                  'is-valid': !error.estadoValid && form.estado,
                }" />
                <small v-if="error.estadoValid" class="text-danger mx-2">{{ error.estadoValid }}</small>

              </div>

              <div class="col-md-6">
                <label for="delegacion" class="text-success">Delegación / Municipio *
                </label>
                <input type="text" v-model="form.delegacion" class="form-control" :class="{
                  'is-invalid': error.delegacionValid,
                  'is-valid': !error.delegacionValid && form.delegacion,
                }" />
                <small v-if="error.delegacionValid" class="text-danger mx-2">{{ error.delegacionValid }}</small>

              </div>

              <div class="col-md-6">
                <label for="colonia" class="text-success">Colonia * </label>
                <input type="text" v-model="form.colonia" class="form-control" :class="{
                  'is-invalid': error.coloniaValid,
                  'is-valid': !error.coloniaValid && form.delegacion,
                }" />
                <small v-if="error.coloniaValid" class="text-danger mx-2">{{ error.coloniaValid }}</small>

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

.is-valid {
  border-color: green;
}
</style>