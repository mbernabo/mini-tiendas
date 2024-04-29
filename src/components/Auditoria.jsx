import { Table, Button } from '@radix-ui/themes';
import { useState } from 'react';
export default function Auditoria({ data }) {
    const [mostrarPista, setMostrarPista] = useState(false);
    const [valoresPista, setValoresPista] = useState(null);
    function handleMostrarPista(valoresOriginales, valoresNuevos) {
        const valoresOriginalesParseados = valoresOriginales ? JSON.parse(valoresOriginales) : valoresOriginales;
        const valoresNuevosParseados = valoresNuevos ? JSON.parse(valoresNuevos) : valoresNuevos;
        console.log(valoresOriginales);
        console.log(valoresNuevosParseados);
        console.log(valoresOriginalesParseados);
        console.log(valoresNuevosParseados);
        setValoresPista({ valoresOriginalesParseados, valoresNuevosParseados });
        setMostrarPista(true);
    }
    return (
        <>
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
                        <Table.ColumnHeaderCell>Pista de Auditoría</Table.ColumnHeaderCell>
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
            {mostrarPista && (
                <>
                    <h2>Pista de Auditoría</h2>
                    <h3>Valores originales</h3>
                    {valoresPista.valoresOriginalesParseados ? (
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    {Object.keys(valoresPista.valoresOriginalesParseados).map((key, index) => (
                                        <Table.ColumnHeaderCell key={index}>{key}</Table.ColumnHeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    {Object.values(valoresPista.valoresOriginalesParseados).map((value, index) => (
                                        <Table.Cell key={index}>{value}</Table.Cell>
                                    ))}
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    ) : (
                        <p>No existen valores</p>
                    )}
                    <h3>Valores nuevos</h3>

                    {valoresPista.valoresNuevosParseados ? (
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    {Object.keys(valoresPista.valoresNuevosParseados).map((key, index) => (
                                        <Table.ColumnHeaderCell key={index}>{key}</Table.ColumnHeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    {Object.values(valoresPista.valoresNuevosParseados).map((value, index) => (
                                        <Table.Cell key={index}>{value}</Table.Cell>
                                    ))}
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    ) : (
                        <p>No existen valores</p>
                    )}
                </>
            )}
        </>
    );
}
