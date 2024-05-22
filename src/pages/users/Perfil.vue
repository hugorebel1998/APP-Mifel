<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import usuariosApi from '@/services/usuarios/usuarios.api';
import L from 'leaflet';


const usuario_id = ref('');
const usuario = ref('');
const route = useRoute();

onMounted(() => {
    usuario_id.value = route.params.id
    loadUsuario(usuario_id.value)
});

const loadUsuario = async (usuario_id) => {
    usuario.value = await usuariosApi.mostrar(usuario_id);

    const { address, name } = usuario.value

    // console.log(geo)
    const map = L.map('map').setView([address.geo.lng, address.geo.lat], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Asegúrate de redimensionar el mapa correctamente
    L.marker([address.geo.lng, address.geo.lat]).addTo(map)
        .bindPopup(`Hello ${name}`)
        .openPopup();


}

</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-body">
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                    aria-selected="true">Información</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile" type="button" role="tab"
                                    aria-controls="pills-profile" aria-selected="false">Dirección</button>
                            </li>
                            
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                                aria-labelledby="pills-home-tab" tabindex="0">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item">#: {{ usuario.id }}</li>
                                            <li class="list-group-item">Nombre: {{ usuario.name }}</li>
                                            <li class="list-group-item">Correo electronico:{{ usuario.email }}</li>
                                            <li class="list-group-item">Telefono: {{ usuario.phone }}</li>
                                            <li class="list-group-item">Website: {{ usuario.website }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-profile" role="tabpanel"
                                aria-labelledby="pills-profile-tab" tabindex="0">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item">Ciudad: {{ usuario.address?.city }}</li>
                                            <li class="list-group-item">Calle: {{ usuario.address?.street }}</li>
                                            <li class="list-group-item">Apartamento:{{ usuario.address?.suite }}</li>
                                            <li class="list-group-item">CP: {{ usuario.address?.zipcode }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="map" class="map-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.map-container {
    height: 500px;
    width: 100%;
    /* display: block; */
}
</style>

