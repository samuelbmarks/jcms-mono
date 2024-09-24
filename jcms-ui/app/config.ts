import { MantineColor } from '@mantine/core';
import {
  Icon,
  IconHome,
  IconHttpGet,
  IconProps
} from '@tabler/icons-react';
import type { Route } from 'next';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export const PRODUCT_NAME = 'Sam\'s Auto Body';
export const PRODUCT_DESCRIPTION =
  'Landing page for https://justcallmesam.com/ built with NextJS and Mantine';

export const WEB_ROOT = 'https://justcallmesam.com';
export const WEBSITE_LINK = `${WEB_ROOT}/${process.env.PACKAGE_NAME}`;
export const V6_WEBSITE_LINK = `${WEB_ROOT}/${process.env.PACKAGE_NAME}-v6`;
export const MANTINE_DATATABLE_PRODUCT_NAME = 'Mantine DataTable';
export const MANTINE_DATATABLE_LINK = `${WEB_ROOT}/mantine-datatable/`;

export const AUTHOR_NAME = 'Samuel Marks';
export const AUTHOR_LINK = 'https://github.com/samuelbmarks';
export const REPO_LINK = `${AUTHOR_LINK}/${process.env.PACKAGE_NAME}`;
export const LICENSE_LINK = `${REPO_LINK}/blob/main/LICENSE`;
export const NPM_LINK = `https://www.npmjs.com/package/${process.env.PACKAGE_NAME}`;
export const SPONSORS_LINK = 'https://github.com/';
export const MANTINE_LINK = 'https://mantine.dev';
export const NEXTJS_LINK = 'https://nextjs.org';
export const VITE_LINK = 'https://vitejs.dev';
export const REMIX_LINK = 'https://remix.run';
export const CRA_LINK = 'https://create-react-app.dev';
export const GATSBY_LINK = 'https://www.gatsbyjs.com';
export const INSTAGRAM_LINK = `https://instagram.com/thesammarks`;
export const LINKEDIN_LINK = `https://linkedin.com/in/samuelbmarks`;

export const DOWNLOADS_REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 1 day

export type RouteInfo = {
  href: Route;
  title: string;
  description: string;
  itemGroup: string;
  color: MantineColor;
  icon?: ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<Icon>>;
} 

export const EXAMPLES_ROUTE_COLOR: MantineColor = 'green';

export const ROUTES: RouteInfo[] = [
  {
    href: '/',
    title: 'Home',
    description: PRODUCT_DESCRIPTION,
    icon: IconHome,
    color: 'gray',
    itemGroup: 'Home',
  },
  {
    href: '/rest-client',
    title: 'Rest Client',
    description: ``,
    icon: IconHttpGet,
    color: 'gray',
    itemGroup: 'Rest Client',
  },
  {
    href: '/examples/basic-usage',
    title: 'Base64 Encoder',
    description: ``,
    color: 'gray',
    itemGroup: 'Codec',
  },
  {
    href: '/examples/basic-configuration',
    title: 'Base64 Decoder',
    description: ``,
    color: 'gray',
    itemGroup: 'Codec',
  },
];
