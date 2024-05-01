import { Table } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import instance from '../../authAxios';
import { useSelector } from 'react-redux';

export default function TablaDeItems({ tiendaInfo, setTiendaInfo }) {
    const userId = useSelector((state) => state.user.userId);

    async function handleDeleteItem(itemId) {
        try {
            await instance.delete(`/api/item/${itemId}`);
            console.log('Item borrado exitosamente');
            tiendaInfo.items;
            const nuevosItems = tiendaInfo.items.filter((item) => item.id !== itemId);
            setTiendaInfo((prevTiendaInfo) => ({ ...prevTiendaInfo, items: nuevosItems }));
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
                    {tiendaInfo.user_id === userId && <Table.ColumnHeaderCell>Borrar</Table.ColumnHeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tiendaInfo.items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>{item.price}</Table.Cell>
                        {tiendaInfo.user_id === userId && (
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
