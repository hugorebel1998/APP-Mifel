import http from "./http"

export default {
    crear_post(payload) {
        return http.post('post', payload);
    }
}