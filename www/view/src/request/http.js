import Vue from "vue";
import axios from "axios";

const Url = "http://192.168.58.111:3333/api/v1";

axios.defaults.baseURL = Url;

// window.axios = axios.create({
//     baseURL: '/api',
// });

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${window.sessionStorage.getItem(
        "token"
    )}`;
    return config;
});

Vue.prototype.$http = axios;

export { Url };
