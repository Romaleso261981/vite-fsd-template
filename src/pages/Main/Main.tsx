import 'react-phone-input-2/lib/style.css';

import { FeaturesCard } from '../../features/components/Card/FeaturesCard/FeaturesCard';
import { Footer } from '../../features/components/Footer/Footer';
import { Header } from '../../features/components/Header/Header';
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
      </div>
      <section className={classes.commentWrapper}>{/* <CommentHtml /> */}</section>
      <Footer />
      {false && (
        <div className={classes.AuthenticationFormWrapper}>
          <AuthenticationForm />
        </div>
      )}
    </section>
  );
};

export default Main;
