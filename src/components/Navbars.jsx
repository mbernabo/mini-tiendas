import { Dialog, Button } from '@radix-ui/themes';
import { LoginForm, RegisterForm, CrearTiendaForm, CrearProductoForm } from './Forms';
import Modal from './Modal';
import { obtenerTiendasUser, logOutUser } from '../../api';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, removeAdmin } from '../redux/userSlice';
import { useState } from 'react';
import { setUserTiendas, setTiendasUser } from '../redux/tiendasSlice';

function Navbar() {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    return (
        <div>
            <Dialog.Root open={openLoginModal} onOpenChange={setOpenLoginModal}>
                <Modal setOpenModal={setOpenLoginModal} title="Log In" description="Procedé a Loguearte">
                    <LoginForm />
                </Modal>
            </Dialog.Root>

            <Dialog.Root open={openRegisterModal} onOpenChange={setOpenRegisterModal}>
                <Modal
                    setOpenModal={setOpenRegisterModal}
                    title="Registrate"
                    description="Registrate como nuevo usuario"
                >
                    <RegisterForm />
                </Modal>
            </Dialog.Root>

            <Button
                variant="soft"
                style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                onClick={() => setOpenLoginModal(true)}
            >
                Log In
            </Button>
            <Button
                variant="soft"
                style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                onClick={() => setOpenRegisterModal(true)}
            >
                Registrarse
            </Button>
        </div>
    );
}
function NavbarLoggedIn({ items, setItems, handleClickTodasLasTiendas, handleMisTiendas }) {
    const [openCrearTiendaModal, setOpenCrearTiendaModal] = useState(false);
    const [openCrearProductoModal, setOpenCrearProductoModal] = useState(false);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const dispatch = useDispatch();
    const todasLasTiendas = useSelector((state) => state.todasLasTiendas);

    async function handleLogOut() {
        try {
            await logOutUser();
            dispatch(logout());
            dispatch(removeAdmin());
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        } catch (error) {
            console.log('Error al desloguear', error);
        }
    }
    return (
        <div>
            <Dialog.Root open={openCrearTiendaModal} onOpenChange={setOpenCrearTiendaModal}>
                <Modal
                    setOpenModal={setOpenCrearTiendaModal}
                    title="Crear Tienda"
                    description="Ingrese la información de la tienda que quiere crear"
                >
                    <CrearTiendaForm />
                </Modal>
            </Dialog.Root>

            <Dialog.Root open={openCrearProductoModal} onOpenChange={setOpenCrearProductoModal}>
                <Modal
                    setOpenModal={setOpenCrearProductoModal}
                    title="Crear Producto"
                    description="Registrate un nuevo producto"
                >
                    <CrearProductoForm items={items} setItems={setItems} />
                </Modal>
            </Dialog.Root>
            {todasLasTiendas ? (
                <Button
                    variant="ghost"
                    style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                    onClick={handleClickTodasLasTiendas}
                >
                    Todas las Tiendas
                </Button>
            ) : (
                <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={handleMisTiendas}>
                    Mis Tiendas
                </Button>
            )}
            <Button
                variant="ghost"
                style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                onClick={() => setOpenCrearTiendaModal(true)}
            >
                Crear Tienda
            </Button>
            <Button
                variant="ghost"
                style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                onClick={() => setOpenCrearProductoModal(true)}
            >
                Crear Producto
            </Button>
            {isAdmin && (
                <>
                    <Link to="auditoria">
                        <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }}>
                            Auditoría
                        </Button>
                    </Link>
                </>
            )}
            <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleLogOut}>
                Log Out
            </Button>
        </div>
    );
}

export { Navbar, NavbarLoggedIn };
