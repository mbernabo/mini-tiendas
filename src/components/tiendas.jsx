import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Tiendas() {
    const [tiendas, setTiendas] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/api/store')
            .then((response) => {
                setTiendas(response.data);
            })
            .catch((error) => {
                console.log('Error al procesar la solicitud GET', error);
            });
    }, []);

    return (
        <>
            <h1>Todas las Tiendas</h1>
            <ul>
                {tiendas.map((tienda) => (
                    <li key={tienda.id}>{tienda.name}</li>
                ))}
            </ul>
        </>
    );
}
