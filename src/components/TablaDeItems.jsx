import { Table } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

export default function TablaDeItems({ items, misTiendas }) {
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Precio</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>{item.price}</Table.Cell>
                        {misTiendas.some((tienda) => tienda.id === item.store_id) && (
                            <Table.Cell>
                                <TrashIcon />
                            </Table.Cell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
