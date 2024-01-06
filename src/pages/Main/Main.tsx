import 'react-phone-input-2/lib/style.css';

import { FeaturesCard } from '../../features/components/Card/FeaturesCard/FeaturesCard';

import classes from './Main.module.css';

const Main = () => {
  return (
    <section className={classes.container}>
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
    </section>
  );
};

export default Main;
