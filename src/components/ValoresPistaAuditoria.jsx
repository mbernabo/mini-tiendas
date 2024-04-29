import { Table, Button, Heading, Text } from '@radix-ui/themes';

export default function ValoresPistaAuditoria({ valoresPista }) {
    return (
        <>
            <Text>Valores originales:</Text>
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
            <Text>Valores nuevos:</Text>
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
    );
}
