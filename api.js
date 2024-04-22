import authFetch from './authFetch';
// const BASE_URL = 'https://mini-tiendas-api-qq9a.onrender.com';
const BASE_URL = 'http://127.0.0.1:5000';

async function obtenerTiendas() {
    const url = `${BASE_URL}/api/stores`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error al procesar la solicitud GET', error);
        throw error;
    }
}

async function obtenerTiendasUser() {
    const url = `${BASE_URL}/api/store`;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const options = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        },
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error al obtener tiendas');
        throw error;
    }
}

async function obtenerUnaTienda(tiendaId) {
    const url = `${BASE_URL}/api/store/${tiendaId}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener tiendas por ID');
        throw error;
    }
}

async function logOutUser(accessToken) {
    const url = `${BASE_URL}/api/logout`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        await authFetch(url, options, accessToken);
    } catch (error) {
        console.log('Error al desloguear al usuario');
        throw error;
    }
}
export { obtenerTiendas, obtenerTiendasUser, obtenerUnaTienda, logOutUser };
