import { Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';

import classes from './AuthenticationTitle.module.css';

export const AuthenticationTitle = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {t('VerifyNumber')}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?
        <Anchor size="sm" component="button">
          {t('CreateAccount')}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <PhoneInput placeholder="066 666 66 66" />
        <Group justify="space-between" mt="lg" />
        <Button fullWidth mt="xl">
          {t('SendSMS')}
        </Button>
      </Paper>
    </Container>
  );
};
