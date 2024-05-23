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
    console.log(usuario.value)

    const { address, name } = usuario.value

    const map = L.map('map').setView([address.geo.lng, address.geo.lat], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Asegúrate de redimensionar el mapa correctamente
    L.marker([address.geo.lng, address.geo.lat]).addTo(map)
        .bindPopup(`Hola ${name}  lng: ${address.geo.lng} - lat: ${address.geo.lat}`)
        .openPopup();


}

</script>

<template>
    <div class="container animate__animated animate__backInLeft">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-action active">Datos personal</li>
                            <li class="list-group-item">Nombre usurio: {{ usuario.username }}</li>
                            <li class="list-group-item">Nombre completo: {{ usuario.name }}</li>
                            <li class="list-group-item">Correo electrónico: {{ usuario.email }}</li>
                            <li class="list-group-item">Número telefónico: {{ usuario.phone }}</li>
                            <li class="list-group-item">Web site: {{ usuario.website }}</li>
                            <li class="list-group-item list-group-item-action active">Dirección</li>
                            <li class="list-group-item">Ciudad: {{ usuario.address?.city }}</li>
                            <li class="list-group-item">Calle: {{ usuario.address?.street }}</li>
                            <li class="list-group-item">Código postal: {{ usuario.address?.zipcode }}</li>
                        </ul>

                        <div id="map" class="map-container"></div>

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
}

.active {
    background-color: #00afaa;
    border: #00afaa;
}
</style>
