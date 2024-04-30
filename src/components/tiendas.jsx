import { useState, useEffect } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { getFetch, obtenerUnaTienda } from '../../api';
import TiendaInfo from './TiendaInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTiendas } from '../redux/tiendasSlice';

export default function Tiendas() {
    const dispatch = useDispatch();
    const tiendas = useSelector((state) => state.tiendas.tiendas);
    const status = useSelector((state) => state.tiendas.status);
    const error = useSelector((state) => state.tiendas.error);

    const isAuthenticated = useSelector((state) => state.user.loggedIn);

    const [todasLasTiendas, setTodasLasTiendas] = useState(false);
    const [misTiendas, setMisTiendas] = useState(null);
    // const [tiendas, setTiendas] = useState([]);
    const [tiendaInfo, setTiendaInfo] = useState({});
    const [items, setItems] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTiendas());
        }
    }, [dispatch, status]);

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
                {status === 'loading' && <p>Cargando tiendas...</p>}
                {status === 'succeeded' &&
                    tiendas.map((tienda) => (
                        <Tienda key={tienda.id} tienda={tienda} handleClickTienda={handleClickTienda} />
                    ))}
                {status === 'failed' && <p>Ocurrió un error al cargar las tiendas: {error}</p>}
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
