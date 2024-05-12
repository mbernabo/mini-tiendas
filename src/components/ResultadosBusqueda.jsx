import { Table, Heading, Text } from '@radix-ui/themes';
import { useSelector } from 'react-redux';

export default function ResultadosBusqueda() {
    const resultados = useSelector((state) => state.tiendas.resultadosSearch);

    return (
        <div style={{ marginTop: '50px' }}>
            <Heading style={{ marginBottom: '30px' }}>Resultados de búsqueda</Heading>

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
        </div>
    );
}
