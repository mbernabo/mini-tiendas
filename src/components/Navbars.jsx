import { Dialog, Button } from '@radix-ui/themes';
import { LoginForm, RegisterForm, CrearTiendaForm, CrearProductoForm } from './Forms';
import Modal from './Modal';
import { obtenerTiendasUser, logOutUser } from '../../api';
import { Link } from 'react-router-dom';

function Navbar({
    openLoginModal,
    setOpenLoginModal,
    openRegisterModal,
    setOpenRegisterModal,
    userLoggedIn,
    setUserLoggedIn,
    setIsAdmin,
}) {
    return (
        <div>
            <Dialog.Root open={openLoginModal} onOpenChange={setOpenLoginModal}>
                <Modal setOpenModal={setOpenLoginModal} title="Log In" description="Procedé a Loguearte">
                    <LoginForm setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} setIsAdmin={setIsAdmin} />
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
function NavbarLoggedIn({
    openCrearTiendaModal,
    setOpenCrearTiendaModal,
    openCrearProductoModal,
    setOpenCrearProductoModal,
    setTiendas,
    setMisTiendas,
    setUserLoggedIn,
    items,
    setItems,
    isAdmin,
    auditData,
}) {
    async function handleMisTiendas() {
        const tiendasUser = await obtenerTiendasUser();
        console.log(tiendasUser);
        setMisTiendas(tiendasUser);
        setTiendas(tiendasUser);
    }

    function handleLogOut() {
        try {
            logOutUser();
            setUserLoggedIn(false);
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
                    <CrearTiendaForm setTiendas={setTiendas} />
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
            <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={handleMisTiendas}>
                Mis Tiendas
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
                    {auditData ? (
                        <Link to="auditoria" state={{ auditData: auditData }}>
                            <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }}>
                                Auditoría
                            </Button>
                        </Link>
                    ) : <div>Cargando..</div>
                    }
                </>
            )}
            <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleLogOut}>
                Log Out
            </Button>
        </div>
    );
}

export { Navbar, NavbarLoggedIn };
