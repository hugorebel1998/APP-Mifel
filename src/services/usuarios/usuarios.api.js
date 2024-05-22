import http from './http'

export default {
    listar() {
        return http.get('users');
    },
    mostrar(usuario_id) {
        return http.get(`users/${usuario_id}`);
    }
}