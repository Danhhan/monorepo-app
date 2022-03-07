import React from 'react';
import HeaderAffiliateMarketing from './components/HeaderAffiliateMarketing';
import MainAffiliateMarketing from './components/MainAffiliateMarketing';
import FooterAffiliateMarketing from './components/FooterAffiliateMarketing';

const AllAffiliateMarketing: React.FC<{}> = () => {
  return (
    <div>
      <HeaderAffiliateMarketing />
      <MainAffiliateMarketing />
      <FooterAffiliateMarketing />
    </div>
  );
};

export default AllAffiliateMarketing;
