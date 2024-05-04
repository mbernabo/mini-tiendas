import { Dialog, Button } from '@radix-ui/themes';
import { LoginForm, RegisterForm, CrearTiendaForm, CrearProductoForm } from './Forms';
import Modal from './Modal';
import { logOutUser } from '../../api';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, removeAdmin } from '../redux/userSlice';
import { toggleLoginModal } from '../redux/modalsSlice';
import { useState } from 'react';

function Navbar() {
    // const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const openLoginModal = useSelector((state) => state.modals.openLoginModal);
    const dispatch = useDispatch();

    const handleToggleLoginModal = () => {
        dispatch(toggleLoginModal());
    };

    return (
        <div>
            <Dialog.Root open={openLoginModal} onOpenChange={handleToggleLoginModal}>
                <Modal handleToggleLoginModal={handleToggleLoginModal} title="Log In" description="Procedé a Loguearte">
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
                onClick={handleToggleLoginModal}
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
function NavbarLoggedIn({ toogleTiendas, todasLasTiendas, fetchTiendas }) {
    const [openCrearTiendaModal, setOpenCrearTiendaModal] = useState(false);
    const [openCrearProductoModal, setOpenCrearProductoModal] = useState(false);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const userName = useSelector((state) => state.user.userName);

    const dispatch = useDispatch();

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
                    <CrearTiendaForm fetchTiendas={fetchTiendas} />
                </Modal>
            </Dialog.Root>

            <Dialog.Root open={openCrearProductoModal} onOpenChange={setOpenCrearProductoModal}>
                <Modal
                    setOpenModal={setOpenCrearProductoModal}
                    title="Crear Producto"
                    description="Registrate un nuevo producto"
                >
                    <CrearProductoForm  />
                </Modal>
            </Dialog.Root>
            <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={toogleTiendas}>
                {todasLasTiendas ? 'Mis Tiendas' : 'Todas las Tiendas'}
            </Button>

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
                    <Link to="/auditoria">
                        <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }}>
                            Auditoría
                        </Button>
                    </Link>
                </>
            )}
            <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={handleLogOut}>
                Log Out
            </Button>
            <Button variant="ghost" style={{ cursor: 'pointer' }}>
                {userName}
            </Button>
        </div>
    );
}

export { Navbar, NavbarLoggedIn };
