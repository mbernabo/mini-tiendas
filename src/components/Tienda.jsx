import { Box, Flex, Card, Avatar, Text, Link } from '@radix-ui/themes';
import once from '../assets/once.jpeg';

export default function Tienda({ tienda, handleClickTienda }) {
    return (
        <Link style={{ cursor: 'pointer' }}>
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
    );
}
