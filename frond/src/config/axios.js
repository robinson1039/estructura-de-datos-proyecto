import axios from 'axios';

// Crear una instancia de axios con la configuración base
const clienteAxios = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true // Permite el envío de cookies con las solicitudes
});

// Función para obtener el token CSRF de la cookie
const getCsrfTokenFromCookie = () => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
};

// Configurar un interceptor para agregar el token CSRF a todas las solicitudes
clienteAxios.interceptors.request.use(config => {
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
});

export default clienteAxios;
    