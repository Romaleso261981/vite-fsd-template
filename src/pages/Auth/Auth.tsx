import { useState } from 'react';

import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// @ts-ignore
import OtpInput from 'otp-input-react';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import { extendedWindow } from '../../shared/extendedWindow';
import { auth } from '../../shared/firebase';

const Auth = () => {
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
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Group justify="center">
          <Button
            variant="outline"
            onClick={() =>
              notifications.show({
                title: 'Перевірка чи працює повідомлення',
                message: 'Hey there, your code is awesome! 🤥',
              })
            }
          >
            Show notification
          </Button>
        </Group>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container" />
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            {t('LoginSuccess')}
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              {t('WelcomeTo')} <br /> {t('CodeAProgram')}
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="font-bold text-xl text-white text-center">
                  {t('OTP')}
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                />
                <button
                  type="submit"
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                  <span>{t('VOTP')}</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="domId"
                  className="font-bold text-xl text-white text-center"
                >
                  {t('VerifyNumber')}
                </label>
                <PhoneInput country="in" value={ph} onChange={setPh} />
                <button
                  type="submit"
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                  <span>{t('SendSMS')}</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Auth;
