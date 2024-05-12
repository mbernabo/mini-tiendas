import { Cross2Icon } from '@radix-ui/react-icons';
import { Table, Heading, Text, Card } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ocultarResultados } from '../redux/tiendasSlice';

export default function ResultadosBusqueda() {
    const resultados = useSelector((state) => state.tiendas.resultadosSearch);
    const dispatch = useDispatch();

    const handleCerrar = () => {
        dispatch(ocultarResultados());
    };

    return (
        <>
            <Card style={{ marginTop: '50px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Heading style={{ marginBottom: '30px' }}>Resultados de búsqueda</Heading>
                    <button onClick={handleCerrar} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Cross2Icon height="24" width="24" />
                    </button>
                </div>
                {resultados.length > 0 ? (
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Descripcion</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Precio</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Tienda</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {resultados.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
                                    <Table.Cell>{item.description}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    <Table.Cell>{item.store.name}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <Text>No existen resultados para su búsqueda</Text>
                )}
            </Card>
        </>
    );
}
