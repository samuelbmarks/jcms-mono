import { Flex, SegmentedControl } from '@mantine/core';
import classes from './RestClientSegmentControl.module.css';

interface RestClientSegmentControlProps {
    segment: string;
    onSegmentChange: (value: string) => void;
}

export default function RestClientSegmentControl({ segment, onSegmentChange }: RestClientSegmentControlProps) {
    return (
        <Flex>
            <SegmentedControl
                value={segment}
                radius="xl"
                size="md"
                data={['Content', 'Authorization', 'Headers', 'Response']}
                onChange={onSegmentChange}
                classNames={classes}
            />
        </Flex>
    );
}