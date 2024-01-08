import { useEffect } from 'react';

import { Button, ButtonProps } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';

import classes from './GithubButton.module.css';

export const GithubButton = (
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>,
) => {
  // Конфігурація для вашого застосунку GitHub
  const clientId = import.meta.env.VITE_clientId;
  const redirectUri = import.meta.env.VITE_redirectUri;
  const clientSecret = import.meta.env.VITE_clientSecret;

  // Функція для переадресації користувача на сторінку авторизації GitHub
  function redirectToGitHubAuth() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl;
  }

  // Функція для обміну коду на токен після авторизації
  async function exchangeCodeForToken(code: string) {
    const tokenUrl = 'https://github.com/login/oauth/access_token';
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    return data.access_token;
  }

  function getCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get('code');
  }

  async function authenticateWithGitHub() {
    const code = getCodeFromUrl();

    if (code) {
      const accessToken = await exchangeCodeForToken(code);

      // eslint-disable-next-line no-console
      console.log(accessToken);
    }
  }

  useEffect(() => {
    authenticateWithGitHub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button
      onClick={() => {
        // Перевірка наявності коду перед перенаправленням на GitHub
        const codeInUrl = getCodeFromUrl();

        if (!codeInUrl) {
          redirectToGitHubAuth();
        }
      }}
      {...props}
      leftSection={<GithubIcon style={{ width: '1rem', height: '1rem' }} />}
      className={classes.githubButton}
    />
  );
};
