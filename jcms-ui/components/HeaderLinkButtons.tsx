import { Button } from '@mantine/core';
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import { INSTAGRAM_LINK, LINKEDIN_LINK, REPO_LINK } from '~/app/config';
import classes from './HeaderLinkButtons.module.css';

export function HeaderLinkButtons() {
  return (
    <div className={classes.root}>
      <Button
        size="xs"
        variant="default"
        leftSection={<IconBrandGithub size={16} />}
        component="a"
        aria-label={`Github`}
        href={REPO_LINK}
        target="_blank"
      >Github
      </Button>
      <Button
        size="xs"
        variant="default"
        leftSection={<IconBrandLinkedin size={16} />}
        component="a"
        aria-label={`LinkedIn`}
        href={LINKEDIN_LINK}
        target="_blank"
      >LinkedIn
      </Button>
      <Button
        size="xs"
        variant="default"
        leftSection={<IconBrandInstagram size={16} />}
        component="a"
        aria-label={`Instagram`}
        href={INSTAGRAM_LINK}
        target="_blank"
      >Instagram
      </Button>
    </div>
  );
}
