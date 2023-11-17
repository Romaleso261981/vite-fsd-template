import React from 'react';

import i18n from '../../../i18n';
import './header.css';

const locales = {
  en: { title: 'english' },
  ua: { title: 'ukraine' },
};

const Header: React.FC = () => {
  return (
    <section className="locale">
      {Object.keys(locales).map((locale) => (
        <li className="localeList" key={locale}>
          <span>{i18n.resolvedLanguage === locale ? locale : ''}</span>
          <button
            className="button"
            style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}
            onClick={() => i18n.changeLanguage(locale)}
            type="submit"
            aria-label="Save"
          />
        </li>
      ))}
    </section>
  );
};

export default Header;
