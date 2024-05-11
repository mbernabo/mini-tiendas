import { useEffect, useCallback } from 'react';
import Tienda from './Tienda';
import TablaDeItems from './TablaDeItems';
import { Navbar, NavbarLoggedIn } from './Navbars';
import { obtenerUnaTienda, obtenerTiendasUser, getFetch } from '../../api';
import TiendaInfo from './TiendaInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setTiendas, toggleTodasLasTiendas, setTiendaInfo } from '../redux/tiendasSlice';
import { login, makeAdmin, setUserId, setUserName } from '../redux/userSlice';
import instance from '../../authAxios';
import NavbarUserInfo from './NavbarUserInfo';
import { SearchForm } from './Forms';
import ResultadosBusqueda from './ResultadosBusqueda';

export default function Tiendas() {
    const dispatch = useDispatch();
    const tiendas = useSelector((state) => state.tiendas.tiendas);
    const tiendaInfo = useSelector((state) => state.tiendas.tiendaInfo);
    const todasLasTiendas = useSelector((state) => state.tiendas.todasLasTiendas);
    const isAuthenticated = useSelector((state) => state.user.loggedIn);
    const busquedaUser = useSelector((state) => state.tiendas.displaySearch);

    const handleMisTiendas = useCallback(async () => {
        const tiendasUser = await obtenerTiendasUser();
        console.log(tiendasUser);
        dispatch(setTiendas(tiendasUser));
    }, [dispatch]);

    const fetchTiendas = useCallback(async () => {
        const tiendas = await getFetch('stores');
        console.log(tiendas);
        dispatch(setTiendas(tiendas));
    }, [dispatch]);

    useEffect(() => {
        const checkLogin = async () => {
            const response = await instance.get('api/users/check-login');
            if (response.status === 200) {
                dispatch(login());
                const userId = response.data.user_id;
                const userName = response.data.email;
                dispatch(setUserId(userId));
                dispatch(setUserName(userName));
            }
        };

        const setAdminStatus = async () => {
            try {
                const response = await instance.get('/api/user/check-admin');
                console.log(response.data.is_admin);
                if (response.data.is_admin) {
                    dispatch(makeAdmin());
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (!isAuthenticated) {
            checkLogin();
            setAdminStatus();
        }

        if (todasLasTiendas) {
            fetchTiendas();
        } else {
            handleMisTiendas();
        }
    }, [dispatch, todasLasTiendas, fetchTiendas, handleMisTiendas, isAuthenticated]);

    async function handleClickTienda(tiendaId) {
        try {
            const data = await obtenerUnaTienda(tiendaId);
            dispatch(setTiendaInfo(data));
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
                {isAuthenticated ? (
                    <h1 style={{ cursor: 'pointer' }} onClick={toogleTiendas}>
                        {todasLasTiendas ? 'Todas las Tiendas' : 'Mis Tiendas'}
                    </h1>
                ) : (
                    <h1>Todas las Tiendas</h1>
                )}

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {isAuthenticated ? (
                        <NavbarLoggedIn
                            toogleTiendas={toogleTiendas}
                            todasLasTiendas={todasLasTiendas}
                            fetchTiendas={fetchTiendas}
                        />
                    ) : (
                        <Navbar />
                    )}
                    <SearchForm />
                    {isAuthenticated && <NavbarUserInfo />}
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tiendas ? (
                    tiendas.map((tienda) => (
                        <Tienda key={tienda.id} tienda={tienda} handleClickTienda={handleClickTienda} />
                    ))
                ) : (
                    <p>Cargando tiendas..</p>
                )}
            </div>

            {tiendaInfo && (
                <div style={{ marginTop: '3rem' }}>
                    <TiendaInfo tiendaInfo={tiendaInfo} />
                    <h3>{tiendaInfo.description}</h3>
                    <TablaDeItems tiendaInfo={tiendaInfo} />
                </div>
            )}
            {busquedaUser && <ResultadosBusqueda />}
        </>
    );
}
