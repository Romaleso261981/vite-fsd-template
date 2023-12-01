import { useState } from 'react';

import {
  Paper,
  Title,
  Container,
  Group,
  Button,
  rem,
  MantineProvider,
  Center,
  Box,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// @ts-ignore
import OtpInput from 'otp-input-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../../app/store';
import { setAppUser } from '../../../../../features/user/userSlice';
import { extendedWindow } from '../../../../../shared/extendedWindow';
import { auth } from '../../../../../shared/firebase';
import { GoogleButton } from '../GoogleButton';
import { TwitterButton } from '../TwitterButton';

import classes from './AuthenticationTitle.module.css';

export const AuthenticationTitle = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  // Translation
  const { t } = useTranslation();

  const dispach: AppDispatch = useDispatch();

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
        // eslint-disable-next-line no-console
        console.log(auth.currentUser?.phoneNumber);
        dispach(setAppUser('roma'));
        notifications.show({
          title: 'Вітаю',
          message: `Ви успішно увійшли за номером ${auth.currentUser?.phoneNumber}`,
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
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans',
        fontSizes: { md: '60' },
      }}
    >
      <Container size={820} my={40}>
        <div id="recaptcha-container" />
        {user ? (
          <div className={classes.nickNameWrapper}>
            <Paper className={classes.nickNameTitle}>{t('authForm.enterNikName')}</Paper>
            <input
              type="text"
              className={classes.nickNameInput}
              placeholder="Your nikeName"
            />
            <Button type="submit" className={classes.nickNameButton}>
              <IconArrowLeft size={rem(10)} stroke={2} color="currentColor" />
            </Button>
          </div>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <section className={classes.modalWrapper}>
                <Paper className={classes.OTPTitle}>{t('authForm.Enter')}</Paper>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className={classes.OTPWrapper}
                />
                <Center maw={400} h={50}>
                  <Button
                    type="submit"
                    size="sm"
                    radius="xl"
                    onClick={() => onOTPVerify()}
                    className={classes.buttonArow}
                  >
                    <IconArrowLeft size={rem(10)} stroke={2} color="currentColor" />
                  </Button>
                  <Box
                    className={classes.buttonText}
                    onClick={() => {
                      alert('SendSMSAgain');
                    }}
                  >
                    {t('authForm.SendSMSAgain')}
                  </Box>
                </Center>
              </section>
            ) : (
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
                  <Button
                    fullWidth
                    type="submit"
                    onClick={() => onSignup()}
                    mt="xl"
                    radius="sm"
                  >
                    {t('authForm.SendSMS')}
                  </Button>
                  <Group />
                  <Group grow mb="md" mt="xl">
                    <GoogleButton radius="sm">Google</GoogleButton>
                    <TwitterButton radius="sm">Twitter</TwitterButton>
                  </Group>
                </Paper>
                {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
              </>
            )}
          </div>
        )}
      </Container>
    </MantineProvider>
  );
};
