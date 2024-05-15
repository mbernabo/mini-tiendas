import { Table, Heading } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import instance from '../../authAxios';
import ValoresPistaAuditoria from './ValoresPistaAuditoria';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../redux/modalsSlice';
import { LoginForm } from './Forms';

export default function AuditTrail({ setAccesoHabilitado }) {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});
    const openLoginModal = useSelector((state) => state.modals.openLoginModal);

    const [data, setAuditData] = useState(null);
    const dispatch = useDispatch();

    const handleToggleLoginModal = () => {
        dispatch(toggleLoginModal());
    };

    const [valoresPista, setValoresPista] = useState(null);

    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                const response = await instance.get('/api/auditoria');
                setAuditData(response.data);
            } catch (error) {
                console.log(error);
                if (error.status === 401) {
                    dispatch(toggleLoginModal());
                    // Pruebo así para volver a pedir la información
                    // fetchAuditData();

                    // setAccesoHabilitado(false);
                    // console.log('No está autorizado a ingresar a esta ruta!');
                }
            }
        };
        fetchAuditData();
    }, [setAccesoHabilitado, dispatch]);

    function handleMostrarPista(item) {
        const valoresOriginalesParseados = item.valores_originales ? JSON.parse(item.valores_originales) : null;
        const valoresNuevosParseados = item.valores_nuevos ? JSON.parse(item.valores_nuevos) : null;

        setValoresPista({ valoresOriginalesParseados, valoresNuevosParseados });
        setItem(item);
        setOpen(true);
    }

    return (
        <>
            <Dialog.Root open={openLoginModal} onOpenChange={handleToggleLoginModal}>
                <Modal
                    handleToggleLoginModal={handleToggleLoginModal}
                    title="Log In"
                    description="Necesita volver a loguearse"
                >
                    <LoginForm />
                </Modal>
            </Dialog.Root>
            <Heading as="h3">Audit Trail completo</Heading>
            {data ? (
                <div style={{ marginTop: '30px' }}>
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>User ID</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Tabla Origen</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Registro ID</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Tabla Asociada</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Registro Asociado</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Operación</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Versión</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Fecha</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Comentarios</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Valores Auditados</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.RowHeaderCell>{item.user_id}</Table.RowHeaderCell>
                                    <Table.Cell>{item.tabla_origen}</Table.Cell>
                                    <Table.Cell>{item.registro_id}</Table.Cell>
                                    <Table.Cell>{item.tabla_asociada}</Table.Cell>
                                    <Table.Cell>{item.registro_asociado}</Table.Cell>
                                    <Table.Cell>{item.operacion}</Table.Cell>
                                    <Table.Cell>{item.version}</Table.Cell>
                                    <Table.Cell>{item.fecha_tz}</Table.Cell>
                                    <Table.Cell>{item.comentarios}</Table.Cell>
                                    <Table.Cell
                                        onClick={() => handleMostrarPista(item)}
                                        style={{ cursor: 'pointer', marginRight: '0.5rem' }}
                                    >
                                        Mostrar
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>

                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Modal
                            setOpenModal={setOpen}
                            title={`Tabla: ${item.tabla_origen} Operación: ${item.operacion}`}
                            description={`Registro: ${item.registro_id} Versión: ${item.version}`}
                        >
                            <ValoresPistaAuditoria valoresPista={valoresPista} item={item} />
                        </Modal>
                    </Dialog.Root>
                </div>
            ) : (
                <p>Cargando..</p>
            )}
        </>
    );
}
