'use client'

import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { RestClientState } from "~/types/restClientState";
import RestClientAuthorizationSegment from "./RestClientAuthorizationSegment";
import RestClientContentSegment from "./RestClientContentSegment";
import RestClientEndpoint from "./RestClientEndpoint";
import RestClientHeadersSegment from "./RestClientHeadersSegment";
import RestClientSegmentControl from "./RestClientSegmentControl";
import { CodeBlock } from "~/components/CodeBlock";

export default function RestClient() {
    const defaultRestClientState: RestClientState = {
        method: 'get',
        endpoint: '',
        segment: 'Content',
        mediaType: 'application/json',
        requestBody: '',
        authType: 'none',
        bearerToken: '',
        basicAuthUsername: '',
        basicAuthPassword: '',
        headers: [{ header: '', value: '' }],
        response: 'string',
    };

    const [restClientState, setRestClientState] = useState(defaultRestClientState);

    const setDefaultState = () => {
        setRestClientState(defaultRestClientState);
        localStorage.setItem('restClientState', JSON.stringify(defaultRestClientState));
    };

    useEffect(() => {    
        const savedRequestState = localStorage.getItem('restClientState');
        if (savedRequestState != null) { 
            console.log(`found locally stored restClientState: ${savedRequestState}`);

            try {
                const paresedState = JSON.parse(savedRequestState);
                setRestClientState(paresedState as RestClientState);
                return;
            }
            catch (e) {
                setRestClientState(defaultRestClientState);
                localStorage.setItem('restClientState', JSON.stringify(defaultRestClientState));
                return;
            }
        } else {
            console.info(`didn't find locally stored restClientState, setting defaultRestClientState`);
            setRestClientState(defaultRestClientState);
            localStorage.setItem('restClientState', JSON.stringify(defaultRestClientState));
        }
    }, []);

    const updateRequestClientState = (key: keyof RestClientState, value: any) => {
        setRestClientState(prevState => {
            const newState = {
                ...prevState,
                [key]: value,
            };
            localStorage.setItem('restClientState', JSON.stringify(newState));
            return newState;
        });
    };

    const sendRequest = async () => {
        updateRequestClientState('segment', 'Response');

        try {
            const headers: Record<string, string> = {
                'Content-Type': restClientState.mediaType,
                ...restClientState.headers.reduce((acc, header) => {
                    if (header.header && header.value) {
                        acc[header.header] = header.value;
                    }
                    return acc;
                }, {} as Record<string, string>),
            };
    
            // Handle authentication
            if (restClientState.authType === 'bearer') {
                headers['Authorization'] = `Bearer ${restClientState.bearerToken}`;
            } else if (restClientState.authType === 'basic') {
                const credentials = btoa(`${restClientState.basicAuthUsername}:${restClientState.basicAuthPassword}`);
                headers['Authorization'] = `Basic ${credentials}`;
            }
    
            const options: RequestInit = {
                method: restClientState.method.toUpperCase(),
                headers: headers,
                body: restClientState.requestBody || undefined,
            };
    
            const response = await fetch(restClientState.endpoint, options);
            const responseData = await response.text();
            updateRequestClientState('response', responseData);
        } catch (error) {
            if (error instanceof Error) { 
                updateRequestClientState('response', `Error: ${error.message}`);
            } else {
                updateRequestClientState('response', `Error: ${error}`);
            }
        }
    };

    return (
      <>
        <RestClientEndpoint 
            restClientState={restClientState}
            method={restClientState.method}
            endpoint={restClientState.endpoint}
            onMethodChange={(value) => updateRequestClientState('method', value)}
            onEndpointChange={(e) => updateRequestClientState('endpoint', e.target.value)}
            onFormReset={setDefaultState}
            onSend={sendRequest}
        />

        <RestClientSegmentControl
            segment={restClientState.segment}
            onSegmentChange={(value) => updateRequestClientState('segment', value)}
        />

        <br />

        {restClientState.segment == "Content" && (
            <RestClientContentSegment 
                mediaType={restClientState.mediaType}
                requestBody={restClientState.requestBody}
                onMediaTypeChange={(value) => updateRequestClientState('mediaType', value)}
                onRequestBodyChange={(value) => updateRequestClientState('requestBody', value)}
            />
        )}

        {restClientState.segment == "Authorization" && (
            <RestClientAuthorizationSegment 
                authType={restClientState.authType}
                bearerToken={restClientState.bearerToken}
                basicAuthUsername={restClientState.basicAuthUsername}
                basicAuthPassword={restClientState.basicAuthPassword}
                onAuthTypeChange={(value) => updateRequestClientState('authType', value)}
                onBearerTokenChange={(e) => updateRequestClientState('bearerToken', e.target.value)}
                onBasicAuthUsernameChange={(e) => updateRequestClientState('basicAuthUsername', e.target.value)}
                onBasicAuthPasswordChange={(e) => updateRequestClientState('basicAuthPassword', e.target.value)}
            />
        )}
        
        {restClientState.segment == "Headers" && (
            <RestClientHeadersSegment 
                headers={restClientState.headers} 
                onHeadersChange={(value) => updateRequestClientState('headers', value)} 
            />
        )}

        {restClientState.segment == "Response" && (
            <>
                <CodeBlock code={restClientState.response} />
            </>
        )}
      </>
    );
  }
