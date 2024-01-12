import 'react-phone-input-2/lib/style.css';

import { Navigate } from 'react-router-dom';

import { FeaturesCard } from '../../features/components/Card/FeaturesCard/FeaturesCard';

import classes from './Main.module.css';

import { useAppSelector } from '@/app/store';
import { useSelectUserData } from '@/features/auth/authSlice';

const Main = () => {
  const userData = useAppSelector(useSelectUserData);

  if (userData === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <section className={classes.container}>
      <div className={classes.cardWrapper}>
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
