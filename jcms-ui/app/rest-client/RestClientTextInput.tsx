import { TextInput } from '@mantine/core';
import '@mantine/tiptap/styles.css';
import { ChangeEventHandler } from 'react';
import classes from './RestClientSelect.module.css';

interface RestClientTextInputProps {
    label: string;
    textValue: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function RestClientTextInput({ label, textValue, placeholder, onChange }: RestClientTextInputProps) {
    return (
        <>
            <TextInput
                flex="1"
                mt="md"
                value={textValue}
                label={label}
                placeholder={placeholder} 
                onChange={onChange}
                classNames={classes}
            />
        </>
    );
}