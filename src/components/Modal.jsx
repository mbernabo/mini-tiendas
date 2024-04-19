import { Dialog, Flex, Button } from '@radix-ui/themes';

export default function Modal({ children, setOpenModal, title, description }) {
    return (
        <Dialog.Content maxWidth="450px">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description size="2" mb="4">
                {description}
            </Dialog.Description>
            {children}
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button
                        variant="soft"
                        color="gray"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setOpenModal(false)}
                    >
                        Cancelar
                    </Button>
                </Dialog.Close>
            </Flex>
        </Dialog.Content>
    );
}
