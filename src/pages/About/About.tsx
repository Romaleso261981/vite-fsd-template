// import { useState } from 'react';
// import './About.css';

// // Об'єкт з початковими значеннями для кожного етапу логіну
// enum LoginSteps {
//   ValidatePhone = 'ValidatePhone',
//   CheckSms = 'CheckSms',
//   UserIsBlocked = 'UserIsBlocked',
//   UserNotFound = 'UserNotFound',
//   AccessBlocked = 'AccessBlocked',
// }

// // Функціональні компоненти для кожного етапу логіну
// const PrivateAreaLoginValidatePhone = () => <div>Компонент перевірки телефону</div>;
// const PrivateAreaLoginCheckSms = () => <div>Компонент перевірки SMS</div>;
// const PrivateAreaLoginUserIsBlocked = () => <div>Компонент блокованого користувача</div>;
// const PrivateAreaLoginUserNotFound = () => <div>Компонент користувача не знайдено</div>;
// const PrivateAreaLoginAccessBlocked = () => <div>Компонент заблокованого доступу</div>;

// export const AuthForm = () => {
//   console.log(LoginSteps.CheckSms);
//   const [currentStep, setCurrentStep] = useState(LoginSteps.AccessBlocked);

//   const getCurrentStep = (currentStep: keyof typeof LoginSteps) => {
//     switch (currentStep) {
//       case 'CheckSms':
//         return <PrivateAreaLoginCheckSms />;
//       case 'ValidatePhone':
//         return <PrivateAreaLoginValidatePhone />;
//       case 'UserIsBlocked':
//         return <PrivateAreaLoginUserIsBlocked />;
//       case 'UserNotFound':
//         return <PrivateAreaLoginUserNotFound />;
//       case 'AccessBlocked':
//         return <PrivateAreaLoginAccessBlocked />;
//       default:
//         return <PrivateAreaLoginUserIsBlocked />;
//     }
//   };

//   const currentStepComponent = getCurrentStep(currentStep);

//   return <section>{currentStepComponent}</section>;
// };
