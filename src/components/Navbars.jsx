import { Dialog, Button } from '@radix-ui/themes';
import { LoginForm, RegisterForm } from './Forms';
import Modal from './Modal';

function Navbar({ openLoginModal, setOpenLoginModal, openRegisterModal, setOpenRegisterModal }) {
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
function NavbarLoggedIn({ handleMisTiendas, handleCrearTienda, handleCrearProducto }) {
    return (
        <div>
            <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={handleMisTiendas}>
                Mis Tiendas
            </Button>
            <Button variant="ghost" style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={handleCrearTienda}>
                Crear Tienda
            </Button>
            <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleCrearProducto}>
                Crear Producto
            </Button>
        </div>
    );
}

export { Navbar, NavbarLoggedIn };
