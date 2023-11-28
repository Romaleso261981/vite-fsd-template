import s from './Loader.module.css';

interface Props {}

// eslint-disable-next-line no-empty-pattern
export const Loader = ({}: Props) => {
  return (
    <div className={s.ldsRipple}>
      <div />
      <div />
    </div>
  );
};
