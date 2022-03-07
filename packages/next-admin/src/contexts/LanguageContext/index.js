import { createContext, useState, useContext } from 'react';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';
import PropTypes from 'prop-types';
import AppLocales from 'translations';
import { getUserLocale } from 'helpers';

const LanguageContext = createContext({
  locale: 'vi-VN',
  changeLanguage: () => {},
});

export const SUPPORTED_LOCALE = ['vi-VN', 'en-US'];
export const LOCALE_KEY = 'locale';

const getDefaultLocale = () => {
  if (localStorage.getItem(LOCALE_KEY)) {
    return localStorage.getItem(LOCALE_KEY);
  }

  const userLocale = getUserLocale();
  if (SUPPORTED_LOCALE.includes(userLocale)) {
    return userLocale;
  }

  return 'vi-VN';
};

function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(getDefaultLocale());
  // eslint-disable-next-line no-console
  console.log(locale);

  const changeLanguageHandler = localeValue => {
    setLocale(localeValue);
    localStorage.setItem(LOCALE_KEY, localeValue);
  };

  const lang = AppLocales[locale];
  // eslint-disable-next-line no-console
  console.log(lang);
  const onError = err => {
    if (!(err.code === ReactIntlErrorCode.MISSING_TRANSLATION)) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ locale, changeLanguage: changeLanguageHandler }}
    >
      <IntlProvider locale={locale} messages={lang.messages} onError={onError}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

LanguageProvider.defaultProps = {
  children: null,
};

LanguageProvider.propTypes = {
  children: PropTypes.element,
};

export const useLanguageContext = () => useContext(LanguageContext);

// return { locale, changeLanguage };

// export const useLanguageContext = () => useContext(LanguageProvider);
export default LanguageProvider;
