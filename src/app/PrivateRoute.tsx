// import { PropsWithChildren } from 'react';

// import { useSelector } from 'react-redux';

// import { useSelectUser } from '../features/auth/authSlice';

// export const PrivateRoute = ({ children }: PropsWithChildren) => {
//   const user = useSelector(useSelectUser);

//   if (user !== null) {
//     try {
//       //     const { nickName, rule } = user;
//       //     console.log('!nickName', !nickName);
//       //     if (!nickName) {
//       //       return <Navigate to="/login" replace />;
//       //     }
//       //     console.log("rule !== 'admin'", rule !== 'admin');
//       //     if (rule !== 'admin') {
//       //       return <Navigate to="/" replace />;
//       //     }
//       return children;
//     } catch (ex) {
//       //     console.log('catch');
//       //     return <Navigate to="/login" replace />;
//     }

//     // return children;
//   } else {
//     return <Navigate to="/auth" replace />;
//   }
// };
