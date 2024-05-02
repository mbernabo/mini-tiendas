import { useState, useEffect, useCallback } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { obtenerUnaTienda, obtenerTiendasUser } from '../../api';
import TiendaInfo from './TiendaInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTiendas, setUserTiendas, toggleTodasLasTiendas } from '../redux/tiendasSlice';

export default function Tiendas() {
    const dispatch = useDispatch();
    const tiendas = useSelector((state) => state.tiendas.tiendas);
    const status = useSelector((state) => state.tiendas.status);
    const error = useSelector((state) => state.tiendas.error);
    const todasLasTiendas = useSelector((state) => state.tiendas.todasLasTiendas);

    const isAuthenticated = useSelector((state) => state.user.loggedIn);

    const [tiendaInfo, setTiendaInfo] = useState(null);

    const handleMisTiendas = useCallback(async () => {
        const tiendasUser = await obtenerTiendasUser();
        console.log(tiendasUser);
        dispatch(setUserTiendas(tiendasUser));
        dispatch(toggleTodasLasTiendas());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'idle' && todasLasTiendas) {
            dispatch(fetchTiendas());
        } else if (!todasLasTiendas) {
            handleMisTiendas();
        }
    }, [dispatch, status, todasLasTiendas, handleMisTiendas]);

    async function handleClickTienda(tiendaId) {
        try {
            const data = await obtenerUnaTienda(tiendaId);
            setTiendaInfo(data);
            // setItems(data.items);
        } catch (error) {
            console.log(error);
        }
    }

    function toogleTiendas() {
        dispatch(toggleTodasLasTiendas());
    }

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
                <h1 style={{ cursor: 'pointer' }} onClick={toogleTiendas}>
                    {todasLasTiendas ? 'Todas las Tiendas' : 'Mis Tiendas'}
                </h1>
                {isAuthenticated ? (
                    <NavbarLoggedIn setTiendaInfo={setTiendaInfo} toogleTiendas={toogleTiendas} />
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

            {tiendaInfo && (
                <div style={{ marginTop: '3rem' }}>
                    <TiendaInfo tiendaInfo={tiendaInfo} setTiendaInfo={setTiendaInfo} />
                    <h3>{tiendaInfo.description}</h3>
                    <TablaDeItems tiendaInfo={tiendaInfo} setTiendaInfo={setTiendaInfo} />
                </div>
            )}
        </>
    );
}
