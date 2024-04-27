import { Table } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import instance from '../../authAxios';

export default function TablaDeItems({ items, setItems, misTiendas }) {
    async function handleDeleteItem(itemId) {
        try {
            await instance.delete(`/api/item/${itemId}`);
            console.log('Item borrado exitosamente');
            const nuevosItems = items.filter((item) => item.id !== itemId);
            setItems(nuevosItems);
        } catch (error) {
            console.log('error');
        }
    }
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Descripción</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Precio</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Borrar</Table.ColumnHeaderCell>
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
                                <TrashIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteItem(item.id)} />
                            </Table.Cell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
