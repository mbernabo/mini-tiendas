import { useState, useEffect } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { getFetch, obtenerTiendasUser, obtenerUnaTienda } from '../../api';
import TiendaInfo from './TiendaInfo';
import Auditoria from './Auditoria';

export default function Tiendas() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    // const [userId, setUserId] = useState(null);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openCrearTiendaModal, setOpenCrearTiendaModal] = useState(false);
    const [openCrearProductoModal, setOpenCrearProductoModal] = useState(false);
    const [todasLasTiendas, setTodasLasTiendas] = useState([]);
    const [misTiendas, setMisTiendas] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, setTiendaInfo] = useState({});
    const [items, setItems] = useState([]);
    const [auditData, setAuditData] = useState(null);

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

    useEffect(() => {
        getFetch('auditoria')
            .then((data) => {
                console.log(data, 'auditoriaData');
                data.map((item) => {
                    const json = item.valores_nuevos;
                    const nuevo = JSON.parse(json);
                    console.log(nuevo);
                });
                setAuditData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [tiendas, items]);

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
                {userLoggedIn ? (
                    <NavbarLoggedIn
                        openCrearTiendaModal={openCrearTiendaModal}
                        setOpenCrearTiendaModal={setOpenCrearTiendaModal}
                        openCrearProductoModal={openCrearProductoModal}
                        setOpenCrearProductoModal={setOpenCrearProductoModal}
                        setTiendas={setTiendas}
                        setMisTiendas={setMisTiendas}
                        setUserLoggedIn={setUserLoggedIn}
                        setItems={setItems}
                        isAdmin={isAdmin}
                        auditData={auditData}
                    />
                ) : (
                    <Navbar
                        openLoginModal={openLoginModal}
                        setOpenLoginModal={setOpenLoginModal}
                        openRegisterModal={openRegisterModal}
                        setOpenRegisterModal={setOpenRegisterModal}
                        userLoggedIn={userLoggedIn}
                        setUserLoggedIn={setUserLoggedIn}
                        setIsAdmin={setIsAdmin}
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
            {/* <div>{auditData ? <Auditoria data={auditData} /> : <p>Cargando...</p>}</div> */}
        </>
    );
}
