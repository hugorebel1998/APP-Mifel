<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import postAPI from '@/services/bin/bin.api'

const route = useRouter();
const form = reactive({
  nombre: '',
  paterno: '',
  materno: '',
  curp: '',
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
  let validate_string = ['nombre', 'paterno', 'estado', 'delegacion', 'colonia'];
  let validate_integer = ['cp', 'exterior'];
  let validate_alfanumerico = ['interior'];

  if (validate_required.includes(field) && form[field] === '') {
    error[`${field}Valid`] = `El campo ${field} es requerido.`

  } else if (validate_string.includes(field) && !/^[A-Za-z]+$/i.test(form[field])) {
    error[`${field}Valid`] = `El campo ${field} solo puede contener letras.`;

  } else if (validate_integer.includes(field) && !/^[0-9]+$/.test(form[field])) {
    error[`${field}Valid`] = `El campo ${field} solo puede contener numeros.`;

  } else if (validate_alfanumerico.includes(field) && !/^[a-zA-Z0-9]+$/.test(form[field])) {
    error[`${field}Valid`] = `El campo ${field} solo puede contener números y letras.`;

  } else if (form['materno'] === '') {
    error[`${field}Valid`] = ``;
  } else if (!/^[A-Za-z]+$/i.test(form['materno'])) {
    error[`${field}Valid`] = `El campo ${field} solo puede contener letras.`;
  }
  else {
    error[`${field}Valid`] = ''
  }
};

const validateCurp = (curp) => {

  curp = curp.trim().toUpperCase();

  const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z\d]{3}(\d{2})$/;

  if (!regex.test(curp))
    return swal("Error", "El CURP que estas ingresando parece estar mal por favor verificarlo", "error");

  return curp
}

const validateRFC = (rfc) => {
  rfc = rfc.trim().toUpperCase();

  if (rfc.length == 13) {
    const regex = /^[A-Z]{4}[0-9]{6}([A-Z0-9]){3}$/
    if (!regex.test(rfc))
      return swal("Error", "El RFC de Persona Física que estas ingresando parece estar mal por favor verificarlo", "error");
  } else {
    const regex = /^[A-Z]{3}[0-9]{6}([A-Z0-9]){3}$/
    if (!regex.test(rfc))
      return swal("Error", "El RFC de Persona moral que estas ingresando parece estar mal por favor verificarlo", "error");
  }

  return rfc
}

const capitalizaUpperCase = (field) => {
  if (field === 'curp') {
    form.curp = form.curp.toLocaleUpperCase();
  } else if (field === 'rfc') {
    form.rfc = form.rfc.toLocaleUpperCase();
  }
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

const onSubmit = async () => {

  if (!validateForm() || !validateCurp(form.curp) || !validateRFC(form.rfc))
    return;

  const payload = {
    'infoUsuari': {
      'nombre': form.nombre,
      'paterno': form.paterno,
      'materno': form.materno,
      'curp': form.curp,
      'curp': form.rfc
    },
    'Domicilio': {
      'calle': form.calle,
      'exterior': form.exterior,
      'interior': form.interior,
      'cp': form.cp,
      'estado': form.estado,
      'delegacion': form.delegacion,
      'colonia': form.colonia
    }
  };

  swal({
    title: "Estas seguro de esta acción?",
    text: "Crearas un nuevo registro antes de continuar valida tu información!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#142DFE",
    confirmButtonText: "Si, continuar!",
    cancelButtonText: "No, cancelar!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
    async function (isConfirm) {
      if (isConfirm) {
        const response = await postAPI.crear_post(payload)
        if (!response.data)
          swal("Ops", "Algo salio mal...", "warning");

        swal("Nuevo registro", "Se realizo una captura de un nuevo registro.", "success");
        route.push({ name: 'usuarios' })
        await route.push({ path: '/usuarios' });
      } else {
        swal("Cancelado", "Cancelaste esta acción", "error");
      }
    });

};

for (const field in form) {
  watch(() => form[field], () => validateField(field));
}
</script>


<template>
  <div class="row justify-content-center animate__animated animate__backInLeft">
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
                }" @input="capitalizaUpperCase('curp')" maxlength="18" />
                <small v-if="error.curpValid" class="text-danger mx-2">{{ error.curpValid }}</small>
              </div>

              <div class="col-md-6">
                <label for="rfc" class="text-success">RFC (con homoclave) *
                </label>
                <input type="text" v-model="form.rfc" class="form-control" :class="{
                  'is-invalid': error.rfcValid,
                  'is-valid': !error.rfcValid && form.rfc,
                }" @input="capitalizaUpperCase('rfc')" maxlength="13" />
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
              <router-link :to="{ name: 'usuarios' }" class="btn btn-outline-secondary mx-2">
                <i class="fas fa-arrow-left"></i> Atras
              </router-link>
              <button type="submit" class="btn btn-outline-primary"><i class="fas fa-plus"></i> Guardar</button>
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