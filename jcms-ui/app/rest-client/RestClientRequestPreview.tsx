import { Button, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { CodeBlock } from "~/components/CodeBlock";
import { RestClientState } from "~/types/restClientState";

interface RestClientRequestPreviewProps {
    show: boolean;
    showOption: string;
    onClose: () => void;
    restClientState: RestClientState;
}

export default function RestClientRequestPreview({ show, showOption, onClose, restClientState }: RestClientRequestPreviewProps) {
    const [rawRequest, setRawRequest] = useState('');
    const [curlRequest, setCurlRequest] = useState('');
    const [springRequest, setSpringRequest] = useState('');

    useEffect(() => {
        generateRawRequest();
        generateCurlRequest();
        generateSpringRequest();
    }, [restClientState]);
    
    const generateRawRequest = () => {
        const { method, endpoint, mediaType, requestBody, headers } = restClientState;
        let request = `${method.toUpperCase()} ${endpoint} HTTP/1.1\n`;

        request += `Content-Type: ${mediaType}\n`;
        headers.forEach(header => {
            if (header.header && header.value && (header.header != '' || header.value != '')) {
                request += `${header.header}: ${header.value}\n`;
            }
        });

        request += `\n${requestBody}`;
        setRawRequest(request);
    };

    const generateCurlRequest = () => {
        const { method, endpoint, mediaType, requestBody, authType, bearerToken, basicAuthUsername, basicAuthPassword, headers } = restClientState;
        let request = `curl -X ${method.toUpperCase()} '${endpoint}' \\\n`;
        request += `-H 'Content-Type: ${mediaType}' \\\n`;

        if (authType === 'bearer') {
            request += `-H 'Authorization: Bearer ${bearerToken}' \\\n`;
        } else if (authType === 'basic') {
            const auth = btoa(`${basicAuthUsername}:${basicAuthPassword}`);
            request += `-H 'Authorization: Basic ${auth}' \\\n`;
        }

        headers.forEach(header => {
            if (header.header && header.value && (header.header != '' || header.value != '')) {
                request += `-H '${header.header}: ${header.value}' \\\n`;
            }
        });

        if (requestBody) {
            request += `-d '${requestBody}'`;
        }

        setCurlRequest(request);
    };

    const generateSpringRequest = () => {
        const { method, endpoint, mediaType, requestBody, authType, bearerToken, basicAuthUsername, basicAuthPassword, headers } = restClientState;
        let request = `RestTemplate restTemplate = new RestTemplate();\n\n`;
        request += `HttpHeaders headers = new HttpHeaders();\n`;

        request += `headers.setContentType(MediaType.APPLICATION_JSON});\n`;

        if (authType === 'bearer') {
            request += `headers.set("Authorization", "Bearer ${bearerToken}");\n`;
        } else if (authType === 'basic') {
            const auth = btoa(`${basicAuthUsername}:${basicAuthPassword}`);
            request += `headers.set("Authorization", "Basic ${auth}");\n`;
        }

        headers.forEach(header => {
            if (header.header && header.value && (header.header != '' || header.value != '')) {
                request += `headers.set("${header.header}", "${header.value}");\n`;
            }
        });

        request += `\n`;

        request += `HttpEntity<String> entity = new HttpEntity<>(${requestBody ? `"${requestBody}"` : "null"}, headers);\n`;

        request += `\n`;

        request += `ResponseEntity<String> response = restTemplate.exchange("${endpoint}", HttpMethod.${method.toUpperCase()}, entity, String.class);`;

        setSpringRequest(request);
    };

    return (
        <>
            <Modal 
                opened={show}
                onClose={onClose}
                title={"Request Preview"} 
                centered
                styles={{
                    title: {
                        fontWeight: "bold",
                        fontSize: 22,
                    }
                }}
                // scrollAreaComponent={ScrollArea.Autosize}
            >
                <>
                    {show && (
                        <>
                            {(showOption === 'all' || showOption === 'raw') && (
                                <>
                                    <Text fw={700}>Raw HTTP</Text>
                                    <CodeBlock code={rawRequest} />
                                </>
                            )}
                            
                            {(showOption === 'all' || showOption === 'curl') && (
                                <>
                                    <Text fw={700}>cURL</Text>
                                    <CodeBlock code={curlRequest} />
                                </>
                            )}

                            {(showOption === 'all' || showOption === 'spring') && (
                                <>
                                    <Text fw={700}>Spring RestTemplate</Text>
                                    <CodeBlock code={springRequest} />
                                </>
                            )}
                        </>
                    )}
                    <Button onClick={onClose} mt={"20"}>
                        Close
                    </Button>
                </>
            </Modal>
        </>
    );
}
