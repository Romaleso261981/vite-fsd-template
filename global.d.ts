type ExtendedWindow = Window &
  typeof globalThis & {
    chaport?: {
      q: (metodName: string) => void;
    };
    ym?: (id: number, hitType: string, url: string, option?: object) => void;
    isTestEnvironment: boolean;
    juicycoScoreApi?: any;
    juicyLabConfig?: { completeButton: string };
    jslabApi?: any;
    recaptchaVerifier?: any
    confirmationResult?: any
  };
