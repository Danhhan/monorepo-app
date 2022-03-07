import { createContext, useState, useContext } from 'react';
import { IntlProvider, IntlConfig, ReactIntlErrorCode } from 'react-intl';
import AppLocales from 'translations';
import { getUserLocale } from 'helpers';

export type LocaleType = 'en-US' | 'vi-VN';

export type LangType = {
  messages: Record<any, any>;
  locale: LocaleType;
};

export type AppLocalesType = {
  'en-US': LangType;
  'vi-VN': LangType;
};

export type LanguageContextType = {
  locale: LocaleType;
  changeLanguage: (locale: LocaleType) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  locale: 'en-US',
  changeLanguage: () => {},
});

export const SUPPORTED_LOCALE = ['vi-VN', 'en-US'];
export const LOCALE_KEY = 'locale';

const getDefaultLocale = (): LocaleType => {
  if (localStorage.getItem(LOCALE_KEY)) {
    return localStorage.getItem(LOCALE_KEY) as LocaleType;
  }

  const userLocale = getUserLocale();
  if (SUPPORTED_LOCALE.includes(userLocale)) {
    return userLocale as LocaleType;
  }

  return 'en-US';
};

export const LanguageProvider: React.FC<{}> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(getDefaultLocale());

  const changeLanguageHandler = (localeValue: LocaleType) => {
    setLocale(localeValue);
    localStorage.setItem(LOCALE_KEY, localeValue);
  };

  const lang = AppLocales[locale] as LangType;

  const onError: IntlConfig['onError'] = err => {
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
};

export const useLanguageContext = () => useContext(LanguageContext);
