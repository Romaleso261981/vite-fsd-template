import 'react-phone-input-2/lib/style.css';
// import { useState } from 'react';

import { FeaturesCard } from '../../features/components/Card/FeaturesCard/FeaturesCard';
import { CommentHtml } from '../../features/components/CommentHtml/CommentHtml';
import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header/Header';
// import { Hero } from '../../features/components/Hero/Hero';
import { AuthenticationForm } from '../Auth/AuthenticationForm/AuthenticationForm';

import classes from './Main.module.css';

const Main = () => {
  // const [isShow, setIsShow] = useState(false);

  return (
    <section className={classes.container}>
      <Header />
      <div className={classes.cardWrapper}>
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
      </div>
      <section className={classes.commentWrapper}>
        <CommentHtml />
      </section>
      <Footer />
      {false && <AuthenticationForm />}
    </section>
  );
};

export default Main;
