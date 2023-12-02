import { useState } from 'react';

import { Container, MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../../app/store';
import { logIn, setUserNickName } from '../../../../../features/auth/authSlice';
import { setAppUser } from '../../../../../features/user/userSlice';
import { extendedWindow } from '../../../../../shared/extendedWindow';
import { auth } from '../../../../../shared/firebase';
import { NotFound } from '../../../../NoFound/NoFound';

import EnterNickName from './components/EnterNickName/EnterNickName';
import EnterOTP from './components/EnterOTP/EnterOTP';
import EnterPhone from './components/EnterPhone/EnterPhone';

// Об'єкт з початковими значеннями для кожного етапу логіну
enum LoginSteps {
  EnterPhone = 'EnterPhone',
  EnterNickName = 'EnterNickName',
  EnterOTP = 'EnterOTP',
}

export const AuthenticationTitle = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [inputLoading, setInputLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(LoginSteps.EnterPhone);

  const dispach: AppDispatch = useDispatch();

  function handleSubmit(value: string) {
    dispach(setUserNickName(value));
    dispach(logIn({ nickName: value }));
    setValue('');
    setInputLoading(false);
  }
  const handleChange = (val: string) => {
    setValue(val);
    setInputLoading(true);
    if (val.trim().length === 0 || val.includes('@')) {
      setInputLoading(false);
    } else {
      setInputLoading(true);
    }
  };

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
        setCurrentStep(LoginSteps.EnterOTP);
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
      .then(async () => {
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

  const getCurrentStep = (currentStep: keyof typeof LoginSteps) => {
    switch (currentStep) {
      case 'EnterPhone':
        return (
          <EnterNickName
            handleChange={handleChange}
            value={value}
            inputLoading={inputLoading}
            handleSubmit={handleSubmit}
          />
        );
      case 'EnterOTP':
        return <EnterOTP setOtp={setOtp} onOTPVerify={onOTPVerify} otp={otp} />;
      case 'EnterNickName':
        return <EnterPhone loading={loading} setPh={setPh} ph={ph} onSignup={onSignup} />;
      default:
        return <NotFound />;
    }
  };

  const CurrentStepComponent = getCurrentStep(currentStep);

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Open Sans',
        fontSizes: { md: '60' },
      }}
    >
      <Container size={820} my={40}>
        <div id="recaptcha-container" />
        <CurrentStepComponent />
      </Container>
    </MantineProvider>
  );
};
