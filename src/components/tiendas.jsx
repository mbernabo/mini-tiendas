import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Flex, Card, Avatar, Text, Table, Link, Button } from '@radix-ui/themes';
import once from '../assets/once.jpeg';
import TiendaForm from './TiendaForm';
import ProductoForm from './ProductoForm';

export default function Tiendas() {
    const [tiendas, setTiendas] = useState([]);
    const [items, setItems] = useState(null);
    const [crearTiendaForm, setCrearTiendaForm] = useState(null);
    const [crearProductoForm, setCrearProductoForm] = useState(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/api/store')
            .then((response) => {
                setTiendas(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Error al procesar la solicitud GET', error);
            });
    }, []);

    const handleClickTienda = async (tiendaId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/store/${tiendaId}/items`);
            setCrearTiendaForm(null);
            setCrearProductoForm(null);
            setItems(response.data);
        } catch (error) {
            console.log('Error al obtener los items de la tienda', error);
        }
    };

    const handleCrearTienda = () => {
        setItems(null);
        setCrearTiendaForm(true);
    };

    const handleCrearProducto = () => {
        setItems(null);
        setCrearTiendaForm(null);
        setCrearProductoForm(true);
    };

    return (
        <>
            <Flex align="center" direction="column" gap="3">
                <h1>Todas las Tiendas</h1>
                <Flex gap="3">
                    <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleCrearTienda}>
                        Crear Tienda
                    </Button>
                    <Button variant="ghost" style={{ cursor: 'pointer' }} onClick={handleCrearProducto}>
                        Crear Producto
                    </Button>
                </Flex>
            </Flex>
            <Flex gap="3" align="start" direction="column">
                {tiendas.map((tienda) => (
                    <Link key={tienda.id} style={{ cursor: 'pointer' }}>
                        <Box maxWidth="240px" onClick={() => handleClickTienda(tienda.id)}>
                            <Card>
                                <Flex gap="3" align="center">
                                    <Avatar size="3" src={once} radius="full" fallback="T" />
                                    <Box>
                                        <Text as="div" size="2" weight="bold">
                                            {tienda.name}
                                        </Text>
                                        <Text as="div" size="2" color="gray">
                                            {tienda.description}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Card>
                        </Box>
                    </Link>
                ))}
            </Flex>
            {items && (
                <Flex gap="3" align="center" direction="column">
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
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Flex>
            )}
            {crearTiendaForm && <TiendaForm />}
            {crearProductoForm && <ProductoForm />}
        </>
    );
}
