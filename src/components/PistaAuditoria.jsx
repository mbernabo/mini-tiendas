import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../authAxios';
import { Heading, Table, Text, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
export default function PistaAuditoria() {
    const { idPista } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchPistaAuditoria() {
            const response = await instance.get(`/api/auditoria/pista/${idPista}`);
            const first_data = response.data;
            const parsed_data = first_data.map((item) => ({
                ...item,
                valores_originales: item.valores_originales ? JSON.parse(item.valores_originales) : null,
                valores_nuevos: item.valores_nuevos ? JSON.parse(item.valores_nuevos) : null,
            }));

            // Idea inicial para pasar todo el registro de auditoría como texto
            // Podría poner un botón con tooltip que diga "explicar" o mostrar detalle y mostrar esto
            // const data = parsed_data.map((item) => {
            //     const operación = item.operacion === 'CREATE' ? 'Creación' : item.operacion === 'UPDATE' ? 'Actualización' : 'Borrado'
            //     const tabla =
            //     {
            //         evento:
            //     }
            // })
            setData(parsed_data);
            console.log(parsed_data);
        }

        fetchPistaAuditoria();
    }, [idPista]);
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                <Heading as="h3" style={{ marginBottom: '20px' }}>
                    Auditoría de Tienda
                </Heading>
                <Link to="/auditoria">
                    <Button variant="ghost" style={{ cursor: 'pointer' }}>
                        Volver
                    </Button>
                </Link>
            </div>
            {data ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text size="4">{`Nombre Inicial: ${data[0].valores_nuevos.name}`}</Text>
                </div>
            ) : (
                <p>Cargando..</p>
            )}

            {data && (
                <Table.Root style={{ marginTop: '20px' }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Evento</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Tabla Origen</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Versión</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Valores Originales</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Valores Nuevos</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Fecha</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Usuario</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.RowHeaderCell>{item.operacion}</Table.RowHeaderCell>
                                <Table.Cell>{item.tabla_origen}</Table.Cell>
                                <Table.Cell>{item.version}</Table.Cell>
                                {item.valores_originales ? (
                                    <Table.Cell>
                                        <Table.Root>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Usuario</Table.ColumnHeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>{item.valores_originales.name}</Table.Cell>
                                                    <Table.Cell>{item.valores_originales.descripcion}</Table.Cell>
                                                    <Table.Cell>{item.valores_originales.user_id}</Table.Cell>
                                                </Table.Row>

                                                <Table.Row></Table.Row>
                                            </Table.Body>
                                        </Table.Root>
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell>Sin datos</Table.Cell>
                                )}
                                {item.valores_nuevos ? (
                                    <Table.Cell>
                                        <Table.Root>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                                                    <Table.ColumnHeaderCell>Usuario</Table.ColumnHeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>{item.valores_nuevos.name}</Table.Cell>
                                                    <Table.Cell>{item.valores_nuevos.descripcion}</Table.Cell>
                                                    <Table.Cell>{item.valores_nuevos.user_id}</Table.Cell>
                                                </Table.Row>

                                                <Table.Row></Table.Row>
                                            </Table.Body>
                                        </Table.Root>
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell>Sin datos</Table.Cell>
                                )}
                                <Table.Cell>
                                    {item.fecha
                                        ? new Date(item.fecha).toLocaleString('es-ES', {
                                              day: '2-digit',
                                              month: '2-digit',
                                              year: '2-digit',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          })
                                        : 'Sin Fecha'}
                                </Table.Cell>
                                <Table.Cell>{item.user_id}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </div>
    );
}
