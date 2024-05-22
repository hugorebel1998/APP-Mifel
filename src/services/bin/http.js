import axios from "axios";

const baseURL = import.meta.env.VITE_URL_MIFEL_BIN

const http = axios.create({ baseURL });

http.interceptors.response.use(({ data }) => data)

export default http