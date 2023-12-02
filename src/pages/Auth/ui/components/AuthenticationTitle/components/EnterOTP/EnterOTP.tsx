import { FC } from 'react';

import { Box, Button, Center, Paper, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
// @ts-ignore
import OtpInput from 'otp-input-react';
import { useTranslation } from 'react-i18next';

import classes from './EnterOTP.module.css';

interface EnterOTPProps {
  onOTPVerify: () => void;
  setOtp: (value: string) => void;
  otp: string;
}

const EnterOTP: FC<EnterOTPProps> = ({ onOTPVerify, otp, setOtp }) => {
  // Translation
  const { t } = useTranslation();

  return (
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
  );
};

export default EnterOTP;
