import { Button, Flex, Group, Text } from "@mantine/core";
import { IconRefresh, IconSend2 } from "@tabler/icons-react";
import { ChangeEventHandler, useState } from "react";
import { RestClientState } from "~/types/restClientState";
import RestClientRequestPreview from "./RestClientRequestPreview";
import RestClientSelect from "./RestClientSelect";
import { RestClientSplitButton } from "./RestClientSplitButton";
import RestClientTextInput from "./RestClientTextInput";

interface RestClientEndpointProps {
    restClientState: RestClientState;
    method: string;
    endpoint: string;
    onMethodChange: (value: string | null) => void;
    onEndpointChange: ChangeEventHandler<HTMLInputElement>;
    onFormReset: () => void;
    onSend: () => void;
}

const previewOptions: { option: string, label: string; }[] = [
    { option: "all", label: "All"},
    { option: "raw", label: "Raw HTTP"},
    { option: "curl", label: "cURL"},
    { option: "spring", label: "Spring RestTemplate"},
];

export default function RestClientEndpoint({ restClientState, method, endpoint, onMethodChange, onEndpointChange, onFormReset, onSend }: RestClientEndpointProps) {
    const [showPreview, setShowPreview] = useState(false);
    const [previewSelection, setPreviewSelection] = useState('all');
    
    const handlePreviewChange = (selection: string) => {
        setPreviewSelection(selection);
        setShowPreview(true);
    }; 

    const methodOpts = [
        { value: 'get', label: 'GET' },
        { value: 'post', label: 'POST' },
        { value: 'put', label: 'PUT' },
        { value: 'delete', label: 'DELETE' },
        { value: 'head', label: 'HEAD' },
        { value: 'options', label: 'OPTIONS' },
        { value: 'trace', label: 'TRACE' },
        { value: 'patch', label: 'PATCH' },
        { value: 'connect', label: 'CONNECT' },
    ]; 

    return (
        <>
            <Text size="xl" fw={700}>Request Endpoint</Text>

            <Flex gap="md" justify={'center'} align={'center'}>
                <RestClientSelect
                    label="Method"
                    data={methodOpts}
                    value={method}
                    onSelectionChange={onMethodChange}
                />
                <RestClientTextInput
                    textValue={endpoint}
                    label={"Endpoint"}
                    placeholder={"https://api.example.com/"}
                    onChange={onEndpointChange}
                />
            </Flex>

            <br />

            <Group gap={"sm"}>
                <RestClientSplitButton 
                        label="Preview"
                        data={previewOptions}
                        defaultOption="all"
                        onClick={handlePreviewChange}
                />
                <Button onClick={onFormReset}>
                    <Group gap="xs">
                        <Text>Reset</Text>
                        <IconRefresh size={18}></IconRefresh>
                    </Group>
                </Button>
                <Button onClick={onSend}>
                    <Group gap="xs">
                        <Text>Send</Text>
                        <IconSend2 size={18}></IconSend2>
                    </Group>
                </Button>
            </Group>

            <RestClientRequestPreview
                show={showPreview}
                showOption={previewSelection}
                restClientState={restClientState}
                onClose={() => setShowPreview(false)}
            />
            
            <br />
        </>
    );
}
