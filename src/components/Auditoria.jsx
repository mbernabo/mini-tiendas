import { useState, useEffect } from 'react';
import { Table, Button, Heading } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from './Modal';
import ValoresPistaAuditoria from './ValoresPistaAuditoria';
import { Link } from 'react-router-dom';
import instance from '../../authAxios';

export default function Auditoria() {
    // Quito el manejo de states de Router, importo la data acá directamente
    // const location = useLocation();
    // const data = location.state ? location.state.auditData : null;
    const [data, setAuditData] = useState(null);
    const [accesoHabilitado, setAccesoHabilitado] = useState(true);
    const [open, setOpen] = useState(false);
    const [valoresPista, setValoresPista] = useState(null);
    const [item, setItem] = useState({});

    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                const response = await instance.get('/api/auditoria');
                setAuditData(response.data);
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    setAccesoHabilitado(false);
                    console.log('No está autorizado a ingresar a esta ruta!');
                }
            }
        };
        fetchAuditData();
    }, []);

    function handleMostrarPista(item) {
        const valoresOriginalesParseados = item.valores_originales ? JSON.parse(item.valores_originales) : null;
        const valoresNuevosParseados = item.valores_nuevos ? JSON.parse(item.valores_nuevos) : null;

        setValoresPista({ valoresOriginalesParseados, valoresNuevosParseados });
        setItem(item);
        setOpen(true);
    }
    return (
        <>
            {data ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <Heading>Auditoría - Mini Tiendas</Heading>
                        <Link to="/tiendas">
                            <Button variant="ghost" style={{ cursor: 'pointer' }}>
                                Volver
                            </Button>
                        </Link>
                    </div>
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>User ID</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Tabla Origen</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Registro ID</Table.ColumnHeaderCell>
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
                                    <Table.Cell>{item.operacion}</Table.Cell>
                                    <Table.Cell>{item.version}</Table.Cell>
                                    <Table.Cell>{item.fecha}</Table.Cell>
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
                </>
            ) : accesoHabilitado ? (
                <p>Cargando..</p>
            ) : (
                <Heading>Acceso Restringido</Heading>
            )}
        </>
    );
}
