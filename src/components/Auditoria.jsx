import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Button, Heading, Text } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from './Modal';
import ValoresPistaAuditoria from './ValoresPistaAuditoria';

export default function Auditoria() {
    const location = useLocation();
    const data = location.state ? location.state.auditData : null;
    const [open, setOpen] = useState(false);
    const [valoresPista, setValoresPista] = useState(null);

    function handleMostrarPista(valoresOriginales, valoresNuevos) {
        const valoresOriginalesParseados = valoresOriginales ? JSON.parse(valoresOriginales) : valoresOriginales;
        const valoresNuevosParseados = valoresNuevos ? JSON.parse(valoresNuevos) : valoresNuevos;
        
        setValoresPista({ valoresOriginalesParseados, valoresNuevosParseados });
        setOpen(true);
    }
    return (
        <>
            <h1>Auditoría - Mini Tiendas</h1>
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
                                onClick={() => handleMostrarPista(item.valores_originales, item.valores_nuevos)}
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
                    title="Valores de la pista de Auditoría"
                    description="Valores nuevos y anteriores"
                >
                    <ValoresPistaAuditoria valoresPista={valoresPista} />
                </Modal>
            </Dialog.Root>
        </>
    );
}
