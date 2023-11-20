import 'react-phone-input-2/lib/style.css';
// import { useState } from 'react';

import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header/Header';
import { Hero } from '../../features/components/Hero/Hero';
import { AuthenticationForm } from '../Auth/AuthenticationForm/AuthenticationForm';

import classes from './Main.module.css';

const Main = () => {
  // const [isShow, setIsShow] = useState(false);

  return (
    <section className={classes.container}>
      <Header />
      <Hero />
      <Footer />
      {false && <AuthenticationForm />}
    </section>
  );
};

export default Main;
