import { Button, ButtonProps } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';

import { useAppDispatch } from '../../../../../app/store';
import { githubLogIn } from '../../../../../features/auth/authSlice';

import classes from './GithubButton.module.css';

export const GithubButton = (
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>,
) => {
  const dispach = useAppDispatch();
  // const clientId = import.meta.env.VITE_clientId;
  // const githubAuthBaseUrl = import.meta.env.VITE_githubAuthBaseUrl;

  // const scope = 'user';
  // const githubAuthUrl = `${githubAuthBaseUrl}?client_id=${clientId}&scope=${scope}`;

  async function redirectToGitHubAuth() {
    // window.location.href = githubAuthUrl;
    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get('code');

    // if (!code) {
    //   dispach(githubLogIn());
    // }
    dispach(githubLogIn());
  }

  return (
    <Button
      onClick={() => redirectToGitHubAuth()}
      {...props}
      leftSection={<GithubIcon style={{ width: '1rem', height: '1rem' }} />}
      className={classes.githubButton}
    />
  );
};
