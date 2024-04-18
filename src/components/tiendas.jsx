import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Dialog } from '@radix-ui/themes';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import TiendaForm from './TiendaForm';
import ProductoForm from './ProductoForm';
import Modal from './Modal';

export default function Tiendas() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, SetTiendaInfo] = useState({});
    const [items, setItems] = useState(null);
    const [crearTiendaForm, setCrearTiendaForm] = useState(null);
    const [crearProductoForm, setCrearProductoForm] = useState(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/api/store')
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
        if (userLoggedIn) {
            axios
                .get(`http://127.0.0.1:5000/api/store/${userId}`)
                .then((response) => {
                    setTiendas(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log('Error al procesar la solicitud GET', error);
                });
        } else {
            setOpenModal(true);
        }
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
                <div>
                    <Button
                        variant="ghost"
                        style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                        onClick={handleMisTiendas}
                    >
                        Mis Tiendas
                    </Button>
                    <Button
                        variant="ghost"
                        style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                        onClick={handleCrearTienda}
                    >
                        Crear Tienda
                    </Button>
                    <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleCrearProducto}>
                        Crear Producto
                    </Button>
                </div>
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

            <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
                <Modal setOpen={setOpenModal} />
            </Dialog.Root>
        </>
    );
}
