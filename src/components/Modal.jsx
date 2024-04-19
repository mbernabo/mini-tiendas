import { Dialog, Flex } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function Modal({ children, setOpenModal, title, description }) {
    return (
        <Dialog.Content maxWidth="450px">
            <Flex justify="between" align="stretch">
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Close>
                    <Cross1Icon onClick={() => setOpenModal(false)} style={{ cursor: 'pointer' }} />
                </Dialog.Close>
            </Flex>

            <Dialog.Description size="2" mb="4">
                {description}
            </Dialog.Description>
            {children}
        </Dialog.Content>
    );
}
