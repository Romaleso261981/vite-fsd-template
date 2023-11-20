import { ActionsGrid } from '../../features/components/Card/Card';
import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header/Header';

// import Auth from './Auth';
// import { AuthenticationForm } from './AuthenticationForm/AuthenticationForm';
import classes from './AuthPage.module.css';

const AuthPage = () => {
  return (
    <section className={classes.container}>
      <Header />
      <ActionsGrid />
      {/* <AuthenticationForm /> */}
      <Footer />
    </section>
  );
};

export default AuthPage;
