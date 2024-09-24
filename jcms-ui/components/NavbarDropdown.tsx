import { Box, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavbarButton, type NavbarButtonProps } from './NavbarButton';
import classes from './NavbarDropdown.module.css';

const EXPANSION_STATE_STORAGE_KEY = `${process.env.PACKAGE_NAME}-examples-expanded`;

export type NavbarDropdownProps = {
  itemGroup: string;
  color: string;
  items: NavbarButtonProps[];
};

export function NavbarDropdown({ itemGroup, items, color }: NavbarDropdownProps) {
  const [expanded, { toggle, open }] = useDisclosure(false, {
    onOpen: () => localStorage.setItem(EXPANSION_STATE_STORAGE_KEY, 'true'),
    onClose: () => localStorage.removeItem(EXPANSION_STATE_STORAGE_KEY),
  });

  const pathname = usePathname();

  useEffect(() => {
    const itemGroupRoute = itemGroup.trim().toLowerCase().replace(/\s+/g, '-');
    if (pathname.startsWith('/'+itemGroupRoute) || localStorage.getItem(EXPANSION_STATE_STORAGE_KEY)) {
      open();
    }
    // open should not be a dependency...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [didExpand, setDidExpand] = useState(false);

  return (
    <>
      <NavbarButton
        title={itemGroup}
        color={color}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        } }
        expanded={expanded}
        itemGroup={''}
      />
      <Collapse in={expanded} onTransitionEnd={() => setDidExpand(expanded)} pos="relative">
        <Box
          bg={color}
          className={clsx(classes.line, { [classes.lineVisible]: didExpand })}
          style={{ transitionDuration: `${30 * items.length}ms` }}
        />
        {items.map((item) => (
          <NavbarButton key={item.href} {...item} />
        ))}
      </Collapse>
    </>
  );
}
