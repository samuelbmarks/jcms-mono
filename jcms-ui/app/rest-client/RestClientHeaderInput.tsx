import { Autocomplete } from "@mantine/core";

interface RestClientHeaderInputProps {
    // label: string;
    // textValue: string;
    // placeholder: string;
    onHeaderChange: (value: string) => void;
}

export default function RestClientHeaderInput({ onHeaderChange }: RestClientHeaderInputProps) {
    return (
        <>
            <Autocomplete
                // label="Header"
                placeholder="Header"
                data={[
                    'Authorization',
                    'Content-Type',
                    'Accept',
                    'User-Agent',
                    'Accept-Language',
                    'Cache-Control',
                    'If-None-Match',
                    'If-Modified-Since',
                    'Origin',
                    'Content-Length',
                    'Referer',
                    'Cookie',
                    'Connection',
                    'Expect',
                    'DNT',                
                ]}
                // classNames={classes}
                onChange={onHeaderChange}
            />
        </>
    );
}
