import axios from 'axios';
import { useState, useEffect } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import TiendaForm from './TiendaForm';
import ProductoForm from './ProductoForm';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { setHeaders } from '../../../utils';

export default function Tiendas() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    // const [userId, setUserId] = useState(null);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, SetTiendaInfo] = useState({});
    const [items, setItems] = useState(null);
    const [crearTiendaForm, setCrearTiendaForm] = useState(null);
    const [crearProductoForm, setCrearProductoForm] = useState(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/api/stores')
            .then((response) => {
                setTiendas(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Error al procesar la solicitud GET', error);
            });
    }, []);

    const handleClickTienda = async (tiendaId) => {
        setCrearTiendaForm(null);
        setCrearProductoForm(null);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/store/${tiendaId}`);
            SetTiendaInfo(response.data);
            setItems(response.data.items);
        } catch (error) {
            console.log('Error al obtener los datos de la tienda', error);
        }
    };

    const handleMisTiendas = () => {
        axios
            .get(`http://127.0.0.1:5000/api/store`, setHeaders())
            .then((response) => {
                setTiendas(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Error al procesar la solicitud GET', error);
            });
    };

    const handleCrearTienda = () => {
        setItems(null);
        setCrearTiendaForm(true);
    };

    const handleCrearProducto = () => {
        setItems(null);
        setCrearTiendaForm(null);
        setCrearProductoForm(true);
    };

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
                <h1>Todas las Tiendas</h1>
                {userLoggedIn ? (
                    <NavbarLoggedIn
                        handleMisTiendas={handleMisTiendas}
                        handleCrearTienda={handleCrearTienda}
                        handleCrearProducto={handleCrearProducto}
                    />
                ) : (
                    <Navbar
                        openLoginModal={openLoginModal}
                        setOpenLoginModal={setOpenLoginModal}
                        openRegisterModal={openRegisterModal}
                        setOpenRegisterModal={setOpenRegisterModal}
                        userLoggedIn={userLoggedIn}
                        setUserLoggedIn={setUserLoggedIn}
                    />
                )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tiendas.map((tienda) => (
                    <Tienda key={tienda.id} tienda={tienda} handleClickTienda={handleClickTienda} />
                ))}
            </div>
            {items && (
                <div style={{ marginTop: '1rem' }}>
                    <h2>Productos de {tiendaInfo.name}</h2>
                    <h3>{tiendaInfo.description}</h3>
                    <TablaDeItems items={items} />
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                {crearTiendaForm && (
                    <div style={{ marginBottom: '1rem' }}>
                        <h2>Crear Tienda</h2>
                        <TiendaForm />
                    </div>
                )}
                {crearProductoForm && (
                    <div>
                        <h2>Crear Producto</h2>
                        <ProductoForm />
                    </div>
                )}
            </div>
        </>
    );
}
