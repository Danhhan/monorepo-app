import { createContext, useState, useContext } from 'react';
import { IntlProvider, IntlConfig, ReactIntlErrorCode } from 'react-intl';
import { getUserLocale } from 'helpers';

import { useRetrieveTranslationMessages } from '../retrieveTranslationMessages';

export type LocaleType = 'en-US' | 'vi-VN';

export type LanguageContextType = {
  locale: LocaleType;
  changeLanguage: (locale: LocaleType) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  locale: 'en-US',
  changeLanguage: () => {},
});

export const vietnameseLocale = 'vi-VN';
export const vietnameseLocaleStatusPara = 'vi';
export const englishLocale = 'en-US';
export const englishLocaleStatusPara = 'en';
export const SUPPORTED_LOCALE = [vietnameseLocale, englishLocale];
export const LOCALE_KEY = 'locale';

const getDefaultLocale = (): LocaleType => {
  if (localStorage.getItem(LOCALE_KEY)) {
    return localStorage.getItem(LOCALE_KEY) as LocaleType;
  }

  const userLocale = getUserLocale();
  if (SUPPORTED_LOCALE.includes(userLocale)) {
    return userLocale as LocaleType;
  }

  return 'vi-VN';
};

export const LanguageProvider: React.FC<{}> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(getDefaultLocale());

  const { data } = useRetrieveTranslationMessages({ locale });

  const changeLanguageHandler = (localeValue: LocaleType) => {
    setLocale(localeValue);
    localStorage.setItem(LOCALE_KEY, localeValue);
    window?.location?.reload();
  };

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
      <IntlProvider locale={locale} messages={data} onError={onError}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
