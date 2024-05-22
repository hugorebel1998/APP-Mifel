import http from "./http"

export default {
    crear_post() {
        return http.post('post');
    }
}