import { Button, CopyButton, Flex, rem, Textarea, Tooltip } from "@mantine/core";
import { IconCheck, IconCircleFilled, IconCopy } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import RestClientAlert from "./RestClientAlert";
import './RestClientRequestBody.module.css';
import { RestClientSplitButton } from "./RestClientSplitButton";

interface RestClientRequestBodyProps {
    body: string;
    onBodyChange: (value: string | null) => void;
}

const jsonOptions: { option: string, label: string; }[] = [
    { option: "tabs", label: "Tabs"},
    { option: "4spaces", label: "4 Spaces"},
    { option: "2spaces", label: "2 Spaces"},
];

const jsonFormats = {
    'tabs': '\t',
    '2spaces': 2,
    '4spaces': 4,
};

export default function RestClientRequestBody({ body, onBodyChange }: RestClientRequestBodyProps) {
    const [alertIsError, setAlertIsError] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [indicatorColor, setIndicatorColor] = useState('green');
    const [indicatorMessage, setIndicatorMessage] = useState('Validating request conent...');
      
    const setAlertStates = (isError: boolean, title: string, msg: string) => {
        setAlertIsError(isError);
        setAlertTitle(title);
        setAlertMessage(msg);
        setShowAlert(true);
    };

    const setIndicatorStates = (color: string, msg: string) => {
        setIndicatorColor(color);
        setIndicatorMessage(msg);
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setIndicatorColor('orange');
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => { 
            validateJsonPassively();    
        }, 1000);
    }, [body]);

    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBody = event.currentTarget.value;
        onBodyChange(newBody);
        localStorage.setItem('requestBody', newBody);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const { selectionStart, selectionEnd } = event.currentTarget;
        
            if (event.shiftKey) {
                // Handle Shift + Tab: Remove a tab at the start of the current line
                const lines = body.split('\n');
                let currentLineIndex = 0;
                let currentPosition = 0;
        
                // Find the current line based on the cursor position
                for (const line of lines) {
                    if (currentPosition + line.length >= selectionStart) {
                        break;
                    }
                    currentPosition += line.length + 1; // +1 for the newline character
                    currentLineIndex++;
                }
        
                const currentLine = lines[currentLineIndex];
        
                // Check if the current line starts with a tab or spaces and remove it
                if (currentLine.startsWith('\t')) {
                    lines[currentLineIndex] = currentLine.substring(1); // Remove one tab
                    const newValue = lines.join('\n');
                    onBodyChange(newValue);
                    localStorage.setItem('requestBody', newValue);
            
                    // Update caret position after the shift+tab operation
                    requestAnimationFrame(() => {
                        if (textareaRef.current) {
                        textareaRef.current.selectionStart = selectionStart - 1;
                        textareaRef.current.selectionEnd = selectionStart - 1;
                        }
                    });
                }
            } else {
                // Handle regular Tab: Insert a tab character
                const newValue = body.substring(0, selectionStart) + '\t' + body.substring(selectionEnd);
                onBodyChange(newValue);
                localStorage.setItem('requestBody', newValue);
        
                // Set caret position after inserting the tab
                requestAnimationFrame(() => {
                    if (textareaRef.current) {
                        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + 1;
                    }
                });
            }
        }
    };

    const validateJsonPassively = () => {        
        if (body == '') {
            setIndicatorStates('green', 'Request body is empty');
            return;
        }

        try { 
            JSON.parse(body); 
            setIndicatorStates('green', 'Request body is valid');
            return;
        } catch (error) { 
            setIndicatorStates('red', 'Request body is invalid');
            return;
        }
    };

    const doJson = (applyFormat: boolean = false, format: 'tabs' | '2spaces' | '4spaces' = 'tabs') => {
        setAlertMessage('');

        if (body == '') {
            const title = 'Request body is empty'
            const msg = 'No JSON body to validate. Please enter a value.';
            setAlertStates(false, title, msg);
            return;
        }

        try {
            const parsedJson = JSON.parse(body);

            if (applyFormat) {
                try {
                    const formattedJson = JSON.stringify(parsedJson, null, jsonFormats[format]);
                    onBodyChange(formattedJson);
                }
                catch (error) {
                    const title = 'Could not format JSON';
                    const msg = `${(error instanceof Error ? error.message : error)}`;
                    setAlertStates(true, title, msg);
                    return;
                }
            }
            else {
                const title = 'Success'
                const msg = 'Successfully validated JSON';
                setAlertStates(false, title, msg);
                return;
            }
        } catch (error) {
            const title = 'Invalid JSON';
            const msg = `${(error instanceof Error ? error.message : error)}`;
            setAlertStates(true, title, msg);
            return;
        }        
    };

    const validateJson = () => {
        doJson();
    };

    const formatJson = (format: string) => {
        doJson(true, format as 'tabs' | '2spaces' | '4spaces');
    };
    
    return (
        <>
            <Flex direction={{ base: 'column'}} gap="15">
                <Textarea
                    label="Request Body"
                    value={body}
                    onChange={handleBodyChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`{\n\t\"example\": \"Enter your request body\"\n}`}
                    autosize
                    minRows={4}
                    ref={textareaRef} 
                    styles={{
                        input: {
                            fontFamily: "Menlo, monospace, Monaco",
                            letterSpacing: '0px',
                            tabSize: '4',
                            MozTabSize: '4',
                            OTabSize: '4',
                            height: rem(60),
                            paddingTop: rem(30),
                            fontSize: 'var(--mantine-font-size-md)',
                        },
                        label: {
                            position: 'absolute',
                            pointerEvents: 'none',
                            fontSize: 'var(--mantine-font-size-sm)',
                            fontWeight: 'bold',
                            paddingLeft: 'var(--mantine-spacing-sm)',
                            paddingTop: 'calc(var(--mantine-spacing-sm) / 2)',
                            zIndex: 1,
                          },
                    }} 
                />

                <Flex align="center" gap="sm">
                    <Button onClick={validateJson}>Validate JSON</Button>
                    
                    <RestClientSplitButton 
                        label="Format JSON"
                        data={jsonOptions}
                        defaultOption="tabs"
                        onClick={formatJson}
                    />

                    <CopyButton value={body} timeout={2000}>
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                                <Button onClick={copy}>
                                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                </Button>
                            </Tooltip>
                        )}
                    </CopyButton>

                    <div style={{flex: 1}}></div>

                    <Tooltip label={indicatorMessage} withArrow position="bottom">
                        <IconCircleFilled size="12" color={indicatorColor} />
                    </Tooltip>
                </Flex>
            </Flex>
            <RestClientAlert
                isError={alertIsError}
                title={alertTitle}
                message={alertMessage}
                opened={showAlert}
                onClose={() => setShowAlert(false)}
            />
        </>
    );
}