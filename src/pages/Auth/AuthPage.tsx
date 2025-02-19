import { FC } from 'react';

import { Box, Group, Paper, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { googleLogIn, useSelectUserData } from '../../features/auth/authSlice';

import classes from './AuthPage.module.css';
import { GithubButton } from './ui/components/GithubButton/GithubButton';
import { GoogleButton } from './ui/components/GoogleButton';

type Props = {};

const AuthPage: FC<Props> = () => {
  const dispach = useAppDispatch();
  const userData = useAppSelector(useSelectUserData);
  const { t } = useTranslation();

  if (userData !== null) {
    return <Navigate to="/" />;
  }

  const googleAuth = () => {
    dispach(googleLogIn());
  };

  return (
    <Box className={classes.nickNameWrapper} maw={450} mx="auto">
      <Title ta="center" className={classes.title}>
        {t('authForm.VerifyNumber')}
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group grow mb="md" mt="xl">
          <GoogleButton radius="sm" onClick={googleAuth}>
            Google
          </GoogleButton>
          <GithubButton radius="sm">Github</GithubButton>
        </Group>
      </Paper>
    </Box>
  );
};

export default AuthPage;
