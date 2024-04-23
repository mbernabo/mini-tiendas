import instance from './authAxios';
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
    // const url = `${BASE_URL}/api/store`;

    // const options = {
    //     method: 'GET',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    try {
        const response = await instance.get('/api/store');
        const data = await response.data;
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

async function logOutUser() {
    try {
        await instance.delete('/api/logout');
        console.log('Usuario deslogueado exitosamente');
    } catch (error) {
        console.log('Error al desloguear al usuario');
        throw error;
    }
}
export { obtenerTiendas, obtenerTiendasUser, obtenerUnaTienda, logOutUser };
