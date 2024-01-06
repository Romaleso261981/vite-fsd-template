import classes from './AuthPage.module.css';
import { AuthenticationTitle } from './ui/components/AuthenticationTitle/Auth';

const AuthPage = () => {
  return (
    <section className={classes.container}>
      <AuthenticationTitle />
    </section>
  );
};

export default AuthPage;
