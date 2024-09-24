import { Button, Modal, Text } from "@mantine/core";

interface RestClientAlertProps {
    isError: boolean;
    title: string;
    message: string;
    opened: boolean;
    onClose: () => void;
}

export default function RestClientAlert({
    isError,
    title,
    message,
    opened,
    onClose,
}: RestClientAlertProps) {
    var textColor = 'dark';

    if (isError) {
        textColor = 'red.7';
    }

    const formattedTitle = (
        <Text c={textColor} fw={700}>{title}</Text>
    )

    return (
        <Modal 
            opened={opened} 
            onClose={onClose} 
            title={formattedTitle} 
            centered
            styles={{
                title: {
                    fontWeight: "bold",
                    fontSize: 22,
                }
            }}
        >
            <Text c={textColor} fw={500}>{message}</Text>
            <Button onClick={onClose} style={{ marginTop: 20 }}>
                Close
            </Button>
        </Modal>
    );
}
