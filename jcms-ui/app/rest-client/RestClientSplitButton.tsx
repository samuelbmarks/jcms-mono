import { ActionIcon, Button, Group, Menu, rem, useMantineTheme } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './RestClientSplitButton.module.css';

interface RestClientSplitButtonProps {
    label: string;
    data: { option: string, label: string; }[];
    defaultOption: string;
    onClick: (value: string) => void;
}

export function RestClientSplitButton({ label, data, defaultOption, onClick }: RestClientSplitButtonProps) {
  const theme = useMantineTheme();

  return (
    <Group wrap="nowrap" gap={0}>
      <Button className={classes.button} onClick={() => onClick(defaultOption)}>{label}</Button>
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
        <Menu.Target>
            <ActionIcon
                variant="filled"
                color={theme.primaryColor}
                size={36}
                className={classes.menuControl}
            >
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            {data.map((item) => (
              <Menu.Item key={item.option} onClick={() => onClick(item.option)}>{item.label}</Menu.Item>
            ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}