import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button type="button" onClick={() => changeLanguage('en')}>
        English
      </button>
      <button type="button" onClick={() => changeLanguage('ua')}>
        Українська
      </button>
    </div>
  );
};

export default LanguageSwitcher;
