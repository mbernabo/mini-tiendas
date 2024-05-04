import { Badge } from '@radix-ui/themes';
import instance from '../../authAxios';
import { Dialog } from '@radix-ui/themes';
import { EditarTiendaForm } from './Forms';
import { useState } from 'react';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarTienda, setTiendaInfo } from '../redux/tiendasSlice';

export default function TiendaInfo({ tiendaInfo }) {
    const [openEditarTiendaModal, setOpenEditarTiendaModal] = useState(false);
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    async function handleDeleteStore(tiendaId) {
        await instance.delete(`/api/store/${tiendaId}`);
        dispatch(eliminarTienda({ id: tiendaId }));
        dispatch(setTiendaInfo(null));
    }

    console.log(tiendaInfo);

    return (
        <>
            <div>
                <h2>Productos de {tiendaInfo.name}</h2>
                {tiendaInfo.user_id === userId && (
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
                    <EditarTiendaForm tiendaId={tiendaInfo.id} />
                </Modal>
            </Dialog.Root>
        </>
    );
}
