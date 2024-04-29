import { useState, useEffect } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { getFetch, obtenerUnaTienda } from '../../api';
import TiendaInfo from './TiendaInfo';
import { useSelector } from 'react-redux';

export default function Tiendas() {
    const isAuthenticated = useSelector((state) => state.user.loggedIn);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openCrearTiendaModal, setOpenCrearTiendaModal] = useState(false);
    const [openCrearProductoModal, setOpenCrearProductoModal] = useState(false);
    const [todasLasTiendas, setTodasLasTiendas] = useState([]);
    const [misTiendas, setMisTiendas] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, setTiendaInfo] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        getFetch('stores')
            .then((data) => {
                setTodasLasTiendas(data);
                setTiendas((prevState) => [...prevState, ...data]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleClickTienda(tiendaId) {
        obtenerUnaTienda(tiendaId)
            .then((data) => {
                setTiendaInfo(data);
                setItems(data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
                <h1 style={{ cursor: 'pointer' }} onClick={() => setTiendas(todasLasTiendas)}>
                    Todas las Tiendas
                </h1>
                {isAuthenticated ? (
                    <NavbarLoggedIn
                        openCrearTiendaModal={openCrearTiendaModal}
                        setOpenCrearTiendaModal={setOpenCrearTiendaModal}
                        openCrearProductoModal={openCrearProductoModal}
                        setOpenCrearProductoModal={setOpenCrearProductoModal}
                        setTiendas={setTiendas}
                        setMisTiendas={setMisTiendas}
                        setItems={setItems}
                    />
                ) : (
                    <Navbar
                        openLoginModal={openLoginModal}
                        setOpenLoginModal={setOpenLoginModal}
                        openRegisterModal={openRegisterModal}
                        setOpenRegisterModal={setOpenRegisterModal}
                    />
                )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tiendas.map((tienda) => (
                    <Tienda key={tienda.id} tienda={tienda} handleClickTienda={handleClickTienda} />
                ))}
            </div>
            {items && (
                <div style={{ marginTop: '3rem' }}>
                    <TiendaInfo
                        tiendaInfo={tiendaInfo}
                        misTiendas={misTiendas}
                        setMisTiendas={setMisTiendas}
                        setTiendas={setTiendas}
                        setItems={setItems}
                    />
                    <h3>{tiendaInfo.description}</h3>
                    <TablaDeItems items={items} setItems={setItems} misTiendas={misTiendas} />
                </div>
            )}
        </>
    );
}
