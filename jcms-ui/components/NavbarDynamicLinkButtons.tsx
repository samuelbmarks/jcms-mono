import { Box } from '@mantine/core';
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import { INSTAGRAM_LINK, LINKEDIN_LINK, REPO_LINK } from '~/app/config';
import { NavbarButton } from './NavbarButton';

export function NavbarDynamicLinkButtons() {
  return (
    <Box hiddenFrom="sm">
      <NavbarButton
        icon={IconBrandGithub}
        title="Github"
        description={`GitHub`}
        color="gray"
        href={REPO_LINK}
        itemGroup={''}
      />
      <NavbarButton
        icon={IconBrandLinkedin}
        title="LinkedIn"
        description={`LinkedIn`}
        color="gray"
        href={LINKEDIN_LINK}
        itemGroup={''}
      />
      <NavbarButton
        icon={IconBrandInstagram}
        title="Instagram"
        description={`Instagram`}
        color="gray"
        href={INSTAGRAM_LINK}
        itemGroup={''}
      />
    </Box>
  );
}
