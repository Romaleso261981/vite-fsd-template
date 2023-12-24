import { FC } from 'react';

import { Button, Group, Paper, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';

import { GoogleButton } from '../../../GoogleButton';

import classes from './EnterPhone.module.css';

interface EnterPhoneProps {
  loading: boolean;
  setPh: (value: string) => void;
  ph: string;
  onSignup: () => void;
}

const EnterPhone: FC<EnterPhoneProps> = ({ loading, setPh, ph, onSignup }) => {
  const { t } = useTranslation();

  return (
    <>
      <Title ta="center" className={classes.title}>
        {t('authForm.VerifyNumber')}
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <PhoneInput
          containerStyle={{ border: '' }}
          country="ua"
          placeholder="066 666 66 66"
          value={ph}
          onChange={setPh}
        />
        <Button fullWidth type="submit" onClick={() => onSignup()} mt="xl" radius="sm">
          {t('authForm.SendSMS')}
        </Button>
        <Group />
        <Group grow mb="md" mt="xl">
          <GoogleButton radius="sm">Google</GoogleButton>
          <GoogleButton radius="sm">Twiter</GoogleButton>
        </Group>
      </Paper>
      {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
    </>
  );
};

export default EnterPhone;
