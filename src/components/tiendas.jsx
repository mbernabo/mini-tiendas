import { useState, useEffect } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { obtenerUnaTienda, obtenerTiendasUser } from '../../api';
import TiendaInfo from './TiendaInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTiendas, setTiendasUser, setUserTiendas, setTodasLasTiendas } from '../redux/tiendasSlice';

export default function Tiendas() {
    const dispatch = useDispatch();
    const tiendas = useSelector((state) => state.tiendas.tiendas);
    const status = useSelector((state) => state.tiendas.status);
    const error = useSelector((state) => state.tiendas.error);
    const todasLasTiendas = useSelector((state) => state.tiendas.todasLasTiendas);

    const isAuthenticated = useSelector((state) => state.user.loggedIn);

    const [misTiendas, setMisTiendas] = useState(null);
    // const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, setTiendaInfo] = useState({});
    const [items, setItems] = useState(null);

    useEffect(() => {
        async function makeTiendasUser() {
            const tiendasUser = await obtenerTiendasUser();
            dispatch(setUserTiendas(tiendasUser));
            dispatch(setTiendasUser());
        }
        if (status === 'idle' && todasLasTiendas) {
            dispatch(fetchTiendas());
        } else if (!todasLasTiendas) {
            makeTiendasUser();
        }
    }, [dispatch, status, todasLasTiendas]);

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
        dispatch(setTodasLasTiendas());
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
                        setItems={setItems}
                        misTiendas={misTiendas}
                        handleClickTodasLasTiendas={handleClickTodasLasTiendas}
                    />
                ) : (
                    <Navbar />
                )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {status === 'loading' && <p>Cargando tiendas...</p>}
                {status === 'succeeded' &&
                    tiendas.map((tienda) => (
                        <Tienda key={tienda.id} tienda={tienda} handleClickTienda={handleClickTienda} />
                    ))}
                {status === 'failed' && <p>Ocurrió un error al cargar las tiendas: {error}</p>}
            </div>

            {items && (
                <div style={{ marginTop: '3rem' }}>
                    <TiendaInfo tiendaInfo={tiendaInfo} setItems={setItems} />
                    <h3>{tiendaInfo.description}</h3>
                    <TablaDeItems items={items} setItems={setItems} misTiendas={misTiendas} />
                </div>
            )}
        </>
    );
}
