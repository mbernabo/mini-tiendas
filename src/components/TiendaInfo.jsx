import { Badge } from '@radix-ui/themes';
import instance from '../../authAxios';
import { Dialog } from '@radix-ui/themes';
import { EditarTiendaForm } from './Forms';
import { useState } from 'react';
import Modal from './Modal';

export default function TiendaInfo({ tiendaInfo, misTiendas, setMisTiendas, setTiendas, setItems }) {
    const [openEditarTiendaModal, setOpenEditarTiendaModal] = useState(false);

    async function handleDeleteStore(tiendaId) {
        await instance.delete(`/api/store/${tiendaId}`);
        const tiendasActuales = misTiendas.filter((tienda) => tienda.id !== tiendaId);
        setMisTiendas(tiendasActuales);
        setTiendas(tiendasActuales);
        setItems(null);
    }


    return (
        <>
            <div>
                <h2>Productos de {tiendaInfo.name}</h2>
                {misTiendas.some((tienda) => tienda.id === tiendaInfo.id) && (
                    <>
                        <Badge
                            color="blue"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setOpenEditarTiendaModal(true)}
                        >
                            Editar Tienda
                        </Badge>
                        <Badge
                            color="orange"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteStore(tiendaInfo.id)}
                        >
                            Borrar Tienda
                        </Badge>
                    </>
                )}
            </div>
            <Dialog.Root open={openEditarTiendaModal} onOpenChange={setOpenEditarTiendaModal}>
                <Modal
                    setOpenModal={setOpenEditarTiendaModal}
                    title="Edite su Tienda"
                    description="Modifique la información de su tienda"
                >
                    <EditarTiendaForm setTiendas={setTiendas} />
                </Modal>
            </Dialog.Root>
        </>
    );
}
