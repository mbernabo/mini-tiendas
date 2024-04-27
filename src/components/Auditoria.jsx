import { Table } from '@radix-ui/themes';
export default function Auditoria({ data }) {
    return (
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
                    <Table.ColumnHeaderCell>Valores Originales</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Valores Nuevos</Table.ColumnHeaderCell>
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
                        <Table.Cell>{JSON.parse(item.valores_originales)}</Table.Cell>
                        <Table.Cell>{JSON.parse(item.valores_nuevos)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
