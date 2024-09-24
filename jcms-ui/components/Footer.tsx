import { Text } from '@mantine/core';
import { forwardRef } from 'react';
import {
  AUTHOR_LINK,
  AUTHOR_NAME
} from '~/app/config';
import { ExternalLink } from './ExternalLink';
import classes from './Footer.module.css';

// eslint-disable-next-line no-empty-pattern
export const Footer = forwardRef(function Footer({}, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <footer ref={ref} className={classes.root}>
      <Text size="sm" ta="center">
        Built by <ExternalLink to={AUTHOR_LINK}>{AUTHOR_NAME}</ExternalLink>
      </Text>
    </footer>
  );
});
