import { useState } from 'react';

import { Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// @ts-ignore
import OtpInput from 'otp-input-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';

import { extendedWindow } from '../../../../../shared/extendedWindow';
import { auth } from '../../../../../shared/firebase';

import classes from './AuthenticationTitle.module.css';

export const AuthenticationTitle = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  // Translation
  const { t } = useTranslation();

  function onCaptchVerify() {
    if (!extendedWindow.recaptchaVerifier) {
      extendedWindow.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            onSignup();
          },
          'expired-callback': () => {},
        },
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = extendedWindow.recaptchaVerifier;

    const formatPh = `+${ph}`;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        extendedWindow.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sended successfully!');
      })
      .catch((err) => {
        notifications.show({
          title: '',
          message: `${err.message}`,
        });
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    extendedWindow.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        setUser(res.user);
        notifications.show({
          title: 'Вітаю',
          message: 'Ви успішно увійшли',
        });
        setLoading(false);
      })
      .catch((err: any) => {
        notifications.show({
          title: 'Помилка верифікації номеру',
          message: `${err.message}`,
        });
        setLoading(false);
      });
  }

  return (
    <Container size={420} my={40}>
      <div id="recaptcha-container" />
      {user ? (
        <h2 className="text-center text-white font-medium text-2xl">
          {t('LoginSuccess')}
        </h2>
      ) : (
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          {showOTP ? (
            <>
              <Paper p={5} mb={10} radius="md">
                {t('OTP')}
              </Paper>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container "
              />
              {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
              <Button type="submit" onClick={() => onOTPVerify()} fullWidth mt="xl">
                {t('VOTP')}
              </Button>
            </>
          ) : (
            <>
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
                <PhoneInput placeholder="066 666 66 66" value={ph} onChange={setPh} />
                <Group justify="space-between" mt="lg" />
                <Button type="submit" onClick={() => onSignup()} fullWidth mt="xl">
                  {t('SendSMS')}
                </Button>
              </Paper>
              {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
            </>
          )}
        </div>
      )}
    </Container>
  );
};
