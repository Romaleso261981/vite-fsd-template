type ExtendedWindow = Window &
  typeof globalThis & {
    recaptchaVerifier?: any;
    confirmationResult?: any
  };