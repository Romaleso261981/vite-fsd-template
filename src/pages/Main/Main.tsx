import 'react-phone-input-2/lib/style.css';

import { FeaturesCard } from '../../features/components/Card/FeaturesCard/FeaturesCard';
import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header';

import classes from './Main.module.css';

const Main = () => {
  return (
    <section className={classes.container}>
      <Header />
      <div className={classes.cardWrapper}>
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
      </div>
      <section className={classes.commentWrapper}>{/* <CommentHtml /> */}</section>
      <Footer />
    </section>
  );
};

export default Main;
