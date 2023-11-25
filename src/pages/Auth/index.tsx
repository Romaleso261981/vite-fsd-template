import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header';

import classes from './AuthPage.module.css';
import { AuthenticationTitle } from './ui/components/AuthenticationTitle';

const AuthPage = () => {
  return (
    <section className={classes.container}>
      <Header />
      <AuthenticationTitle />
      <Footer />
    </section>
  );
};

export default AuthPage;
