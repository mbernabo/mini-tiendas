import { useState, useEffect } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { getFetch, obtenerUnaTienda } from '../../api';
import TiendaInfo from './TiendaInfo';
import { useSelector } from 'react-redux';

export default function Tiendas() {
    const isAuthenticated = useSelector((state) => state.user.loggedIn);

    const [todasLasTiendas, setTodasLasTiendas] = useState(false);
    const [misTiendas, setMisTiendas] = useState(null);
    const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, setTiendaInfo] = useState({});
    const [items, setItems] = useState(null);

    useEffect(() => {
        async function fetchStores() {
            try {
                const data = await getFetch('stores');
                // setTodasLasTiendas(data);
                setTiendas(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchStores();
    }, [todasLasTiendas]);

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

    function handleClickTodasLasTiendas() {
        setTodasLasTiendas((prevState) => !prevState);
        setMisTiendas(null);
    }

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
                <h1 style={{ cursor: 'pointer' }} onClick={handleClickTodasLasTiendas}>
                    {misTiendas ? 'Mis Tiendas' : 'Todas las Tiendas'}
                </h1>
                {isAuthenticated ? (
                    <NavbarLoggedIn
                        setTiendas={setTiendas}
                        setMisTiendas={setMisTiendas}
                        setItems={setItems}
                        misTiendas={misTiendas}
                        handleClickTodasLasTiendas={handleClickTodasLasTiendas}
                    />
                ) : (
                    <Navbar />
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
