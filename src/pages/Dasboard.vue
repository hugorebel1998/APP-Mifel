<template>
    <div class="row justify-content-center animate__animated animate__backInLeft">
        <div class="col-md-6">
            <div class="alert bg-mifel" role="alert">
                <div class="h1 text-center text-white">Bienvenido</div>
                <div class="text-white">
                    <i class="fas fa-comment-dots text-white" />
                    Que haremos el día de hoy.
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-5 animate__animated animate__backInLeft">
        <div class="col-md-4">
            <div class="card shadow">
                <div class="card-header bg-mifel" />
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

                    <div class="text-end">
                        <router-link :to="{ name: 'usuarios' }" class="btn btn-mifel-blue mx-2">
                            Ver <i class="fas fa-arrow-right"></i>
                        </router-link>
                    </div>
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