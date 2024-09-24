import { Select } from '@mantine/core';
import '@mantine/tiptap/styles.css';
import classes from './RestClientSelect.module.css';

interface RestClientSelectProps {
    data: Array<{ value: string; label: string }> | string[];
    label: string;
    onSelectionChange: (value: string | null) => void;
    value: string;
}

export default function RestClientSelect({
    data,
    label,
    onSelectionChange,
    value,
}: RestClientSelectProps) {
    return (
        <>
            <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={data}
                label={label}
                classNames={classes}
                onChange={onSelectionChange}
                value={value}
                checkIconPosition="right"
            />
        </>
    );
}