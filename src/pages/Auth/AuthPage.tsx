import { FC, useEffect } from 'react';

import { Box, Group, Paper, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, useAppSelector } from '../../app/store';
import { logIn, useSelectUserData } from '../../features/auth/authSlice';

import classes from './AuthPage.module.css';
import { GithubButton } from './ui/components/GithubButton';
import { GoogleButton } from './ui/components/GoogleButton';

type Props = {};

const AuthPage: FC<Props> = () => {
  const navigate = useNavigate();
  const dispach: AppDispatch = useDispatch();
  const userData = useAppSelector(useSelectUserData);
  const { t } = useTranslation();

  useEffect(() => {
    if (userData !== null) {
      navigate('/');
    }
  }, [navigate, userData]);

  const googleAuth = () => {
    dispach(logIn());
  };

  const githubAuth = () => {};

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
          <GithubButton radius="sm" onClick={githubAuth}>
            Github
          </GithubButton>
        </Group>
      </Paper>
    </Box>
  );
};

export default AuthPage;
