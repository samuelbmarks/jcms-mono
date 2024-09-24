import { Title } from '@mantine/core';
import { IconCarSuv } from '@tabler/icons-react';
import Link from 'next/link';
import { PRODUCT_NAME } from '~/app/config';
import classes from './HeaderTitle.module.css';

export function HeaderTitle() {
  return (
    <Link className={classes.root} href="/">
      <IconCarSuv className={classes.icon} />
      <Title className={classes.text} order={1}>
        {PRODUCT_NAME}
      </Title>
    </Link>
  );
}
