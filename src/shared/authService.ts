// import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, AuthCredential, UserCredential } from 'firebase/auth';
// const auth = getAuth();

// // Відправка SMS-повідомлення для підтвердження номеру телефону
// export async function sendSmsCode(phoneNumber: string): Promise<string | null> {
//   try {
//     const appVerifier = new PhoneAuthProvider(auth).verifyPhoneNumber(phoneNumber, new RecaptchaVerifier('your-recaptcha-container'), auth);
//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//     return confirmationResult.verificationId;
//   } catch (error) {
//     console.error('Error sending SMS code:', error);
//     return null;
//   }
// }

// // Підтвердження SMS-коду
// export async function verifySmsCode(verificationId: string, code: string): Promise<UserCredential | null> {
//   try {
//     const credential: AuthCredential = PhoneAuthProvider.credential(verificationId, code);
//     const userCredential = await signInWithPhoneNumber(auth, credential);
//     return userCredential;
//   } catch (error) {
//     console.error('Error verifying SMS code:', error);
//     return null;
//   }
// }

// // Вихід користувача
// export function signOut(): Promise<void> {
//   return auth.signOut();
// }

export {};
