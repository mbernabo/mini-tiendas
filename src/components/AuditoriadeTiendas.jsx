import { useEffect, useState } from 'react';
import { Heading, Table } from '@radix-ui/themes';
import instance from '../../authAxios';
import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export default function AuditoriaDeTiendas({ setAccesoHabilitado }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await instance.get('/api/auditoria/tiendas');
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    setAccesoHabilitado(false);
                    console.log('No está autorizado a ingresar a esta ruta!');
                }
            }
        }
        fetchData();
    }, [setAccesoHabilitado]);
    return (
        <>
            <Heading as="h3">Auditoría Tiendas</Heading>
            {data ? (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Nombre de la Tienda</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Fecha creación</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Nombre del Creador</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Ver Pista</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((tienda) => (
                            <Table.Row key={tienda.pista_id}>
                                <Table.RowHeaderCell>{tienda.nombre_original_tienda}</Table.RowHeaderCell>
                                <Table.Cell>{new Date(tienda.fecha_creacion).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{tienda.nombre_usuario}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/auditoria/pista/${tienda.pista_id}`}>
                                        <ThickArrowRightIcon />
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            ) : (
                <p>Cargando..</p>
            )}
        </>
    );
}
