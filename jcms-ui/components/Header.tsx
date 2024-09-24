import { AppShellHeader, Burger, Group } from '@mantine/core';
import clsx from 'clsx';
import { useIsScrolled } from '~/lib/utils';
import { ColorSchemeActionIcon } from './ColorSchemeActionIcon';
import classes from './Header.module.css';
import { HeaderLinkButtons } from './HeaderLinkButtons';
import { HeaderTitle } from './HeaderTitle';

export type HeaderProps = {
  navbarExpanded: boolean;
  toggleNavbar(): void;
};

export function Header({ navbarExpanded, toggleNavbar }: HeaderProps) {
  const isScrolled = useIsScrolled();

  return (
    <AppShellHeader className={clsx(classes.root, { [classes.scrolled]: isScrolled })}>
      <Group h="100%" px="md" justify="space-between">
        <Group gap="xs">
          <Burger aria-label="Show menu" hiddenFrom="sm" opened={navbarExpanded} onClick={toggleNavbar} size="sm" />
          <HeaderTitle />
        </Group>
        <Group gap="xs">
          <HeaderLinkButtons />
          <ColorSchemeActionIcon />
        </Group>
      </Group>
    </AppShellHeader>
  );
}
