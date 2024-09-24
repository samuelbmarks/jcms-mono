import { Text } from '@mantine/core';
import RestClientRequestBody from './RestClientRequestBody';
import RestClientSelect from './RestClientSelect';

interface RestClientContentSegmentProps {
    mediaType: string;
    requestBody: string;
    onMediaTypeChange: (value: string | null) => void;
    onRequestBodyChange: (value: string | null) => void;
}

const mediaTypeOptions = [
    { value: 'application/json', label: 'application/json' },
    // { value: 'text/plain', label: 'text/plain' },
    // { value: 'application/xml', label: 'application/xml' },
    // { value: 'text/html', label: 'text/html' },
];

export default function RestClientContentSegment({ mediaType, requestBody, onMediaTypeChange, onRequestBodyChange }: RestClientContentSegmentProps) {
    return (
        <>
            <Text size="xl" fw={700}>Content</Text>

            <RestClientSelect
                label="Content Type"
                data={mediaTypeOptions}
                value={mediaType}
                onSelectionChange={onMediaTypeChange}
            />

            <br />
            
            <RestClientRequestBody 
                body={requestBody}
                onBodyChange={onRequestBodyChange} 
            />
        </>
    );
}