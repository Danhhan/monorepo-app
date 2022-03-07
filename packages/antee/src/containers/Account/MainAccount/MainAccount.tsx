import React from 'react';
import {
  englishLocale,
  englishLocaleStatusPara,
  useLanguageContext,
  vietnameseLocaleStatusPara,
} from 'services/translation/context';
import { useRetrieveStudentInfo } from 'services/user';
import ContentAccount from '../ContentAccount/ContentAccount';
import HeaderAccount from '../HeaderAccount/HeaderAccount';

const MainAccount = () => {
  const { locale } = useLanguageContext();
  const { data: userInfo } = useRetrieveStudentInfo(
    {
      localePara:
        locale === englishLocale
          ? englishLocaleStatusPara
          : vietnameseLocaleStatusPara,
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  const datauser: any = userInfo?.data?.data?.userProfile ?? '';
  return (
    <div
      style={{
        minHeight: '100vh',
      }}
    >
      <HeaderAccount />

      <ContentAccount datauser={datauser} />
    </div>
  );
};

export default MainAccount;
