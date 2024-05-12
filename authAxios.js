import axios from 'axios';
import ls from './secureLS';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});

// const dispatch = useDispatch();

// Interceptores para manejar el token de acceso
instance.interceptors.request.use(
    (config) => {
        const accessToken = ls.get('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptores para manejar los errores de autenticación
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 (no autorizado) y es una solicitud de acceso protegido
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = ls.get('refresh_token');
            if (refreshToken) {
                // Intentar obtener un nuevo token de acceso
                try {
                    const response = await axios.post(
                        'http://127.0.0.1:5000/api/refresh',
                        {}, // No se envía ningún cuerpo en la solicitud
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        }
                    );

                    const newAccessToken = response.data.access_token;

                    // Actualizar el token de acceso en LS Secure
                    ls.set('access_token', newAccessToken);

                    // Reintentar la solicitud original con el nuevo token de acceso
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error('Error al refrescar el token:', refreshError);
                    // Manejar el error de refresco de token aquí
                }
            }
        }

        // Si vuelve a recibir un 401 después de intentar actualizar el token, muestra un mensaje de error
        if (error.response.status === 401) {
            console.log('Debe volver a loguearse');
            // dispatch(toggleLoginModal());
        }

        return Promise.reject(error);
    }
);

export default instance;
