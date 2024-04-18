import { Dialog, Button, Flex, Text, TextField } from '@radix-ui/themes';

export default function Modal({ setOpen }) {
    return (
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Log in</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                Logueate para acceder
            </Dialog.Description>

            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Email
                    </Text>
                    <TextField.Root defaultValue="Freja Johnsen" placeholder="Enter your full name" />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Contraseña
                    </Text>
                    <TextField.Root defaultValue="freja@example.com" placeholder="Enter your email" />
                </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray" style={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button style={{ cursor: 'pointer' }}>Save</Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    );
}
