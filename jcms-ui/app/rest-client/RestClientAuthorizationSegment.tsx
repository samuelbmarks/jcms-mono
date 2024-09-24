import { Group, Text } from '@mantine/core';
import { ChangeEventHandler } from 'react';
import RestClientSelect from './RestClientSelect';
import RestClientTextInput from './RestClientTextInput';

interface RestClientAuthorizationSegmentProps {
    authType: string;
    bearerToken: string;
    basicAuthUsername: string;
    basicAuthPassword: string;
    onAuthTypeChange: (value: string | null) => void;
    onBearerTokenChange: ChangeEventHandler<HTMLInputElement>;
    onBasicAuthUsernameChange: ChangeEventHandler<HTMLInputElement>;
    onBasicAuthPasswordChange: ChangeEventHandler<HTMLInputElement>;
}

const authOptions = [
    { value: 'none', label: 'No Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'basic', label: 'Basic Auth' },
];

export default function RestClientAuthorizationSegment({ 
    authType,
    bearerToken,
    basicAuthUsername,
    basicAuthPassword,
    onAuthTypeChange,
    onBearerTokenChange,
    onBasicAuthUsernameChange,
    onBasicAuthPasswordChange,
}: RestClientAuthorizationSegmentProps) {
    return (
        <>
            <Text size="xl" fw={700}>Authorization</Text>
            
            <RestClientSelect
                label="Authorization Type"
                data={authOptions}
                value={authType}
                onSelectionChange={onAuthTypeChange}
            />

            {authType === 'bearer' && (
                <RestClientTextInput
                    textValue={bearerToken}
                    label={"Bearer Token"}
                    placeholder={"Enter Bearer Token"}
                    onChange={onBearerTokenChange}
                />
            )}

            {authType === 'basic' && (
                <Group grow>
                    <RestClientTextInput
                        textValue={basicAuthUsername}
                        label={"Username"}
                        placeholder={"Enter Username"}
                        onChange={onBasicAuthUsernameChange}
                    />
                    <RestClientTextInput
                        textValue={basicAuthPassword}
                        label={"Password"}
                        placeholder={"Enter Password"}
                        onChange={onBasicAuthPasswordChange}
                    />
                </Group>
            )}             
        </>
    );
}