import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import RestClientHeaderInput from "./RestClientHeaderInput";

interface Header {
    header: string;
    value: string;
}

interface RestClientHeadersSegmentProps {
    headers: { header: string, value: string }[],
    onHeadersChange: (newHeaders: { header: string, value: string }[]) => void;
}

export default function RestClientHeadersSegment({ headers, onHeadersChange }: RestClientHeadersSegmentProps) {
    
    const handleHeaderChange = (index: number, header: keyof Header, value: string) => {
        const newHeaders = [...headers];
        newHeaders[index] = { ...newHeaders[index], [header]: value };
        onHeadersChange(newHeaders);
    };
            
    const addHeaderField = () => {
        onHeadersChange([...headers, { header: '', value: '' }]);
    };

    const removeHeaderField = () => {
        if (headers.length > 1) {
            onHeadersChange(headers.slice(0, headers.length - 1));
        }
    };    

    return (
        <Stack>
            <Text size="xl" fw={700}>Headers</Text>

            <Stack gap="lg">
                {headers.map((header, index) => (
                    <Group grow key={index}>
                        <RestClientHeaderInput
                            // textValue={header.key}
                            // label={"Header"}
                            // placeholder={"Header"}
                            onHeaderChange={(value) => handleHeaderChange(index, 'header', value)}
                        />
                        <TextInput
                            value={header.value}
                            placeholder={"Header value"}
                            onChange={(e) => handleHeaderChange(index, 'value', e.currentTarget.value)}
                        />
                    </Group>
                ))}
            </Stack>
           
            <Group gap="xs">
                <Button onClick={addHeaderField}>
                    <IconPlus size="18"></IconPlus>
                </Button>

                <Button onClick={removeHeaderField}>
                    <IconMinus size="18"></IconMinus>    
                </Button>
            </Group>        
        </Stack>
    );
}