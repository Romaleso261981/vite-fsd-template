import { Button, ButtonProps } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';

// import { useAppDispatch } from '../../../../../app/store';
// import { githubLogIn } from '../../../../../features/auth/authSlice';

import classes from './GithubButton.module.css';

export const GithubButton = (props: ButtonProps) => {
  // const dispatch = useAppDispatch();

  const githubAuth = () => {
    const { VITE_REDIRECT_URI, VITE_GITHUB_AUTH_BASE_URI, VITE_GITHUB_CLIENT_ID } =
      import.meta.env;

    window.location.assign(
      `${VITE_GITHUB_AUTH_BASE_URI}?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${VITE_REDIRECT_URI}&scope=user`,
    );
    // dispatch(githubLogIn());
  };

  return (
    <Button
      onClick={githubAuth}
      {...props}
      leftSection={<GithubIcon style={{ width: '1rem', height: '1rem' }} />}
      className={classes.githubButton}
    />
  );
};
