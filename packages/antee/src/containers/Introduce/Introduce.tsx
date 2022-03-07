/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Page, PageBody } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useRef } from 'react';
import { Footer, Header } from 'components';
import logoAntoree from 'assets/images/new-ant-logo.svg';
import { Helmet } from 'react-helmet';
import SimpleBottomNavigation from '../../components/BottomNav/SimpleBottomNavigation';
import featureArr from './data/featureArr';
import settings from './settingData/settings';
import styles from './Introduce.module.scss';
import NewsFeedBack from './components/NewsFeedBack';
import StudentsFeedBack from './components/StudentsFeedBack';
import YoutubeList from './components/YoutubeList';
import UsefulThree from './components/UsefulThree';
import UseFullTwo from './components/UseFullTwo';
import UseFullOne from './components/UseFullOne';
import Feature from './components/Feature';
import IntroductionBanner from './components/IntroductionBanner';
import BannerUnder from './components/BannerUnder';

const Introduce: React.FC<{}> = () => {
  const textArr = [
    <FormattedMessage defaultMessage="100% thời gian tương tác 1-1 với giáo viên" />,
    <FormattedMessage defaultMessage="Hiệu quả hơn 40% phương pháp học truyền thống (không phải theo giáo trình có sẵn)" />,
    <FormattedMessage defaultMessage="Tiến bộ rõ rệt chỉ sau 72h học (luyện nói và sửa lỗi thường xuyên)" />,
  ];

  const sliderRef = useRef<any>(null);

  const sliderRefSecond = useRef<any>(null);

  return (
    <Page className="min-h-screen" paddingSize="none">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giới thiệu | Antoree - Học tiếng Anh online 1 kèm 1</title>
        <meta
          name="description"
          content="Antoree ra đời giúp việc tìm kiếm giáo viên trở nên dễ dàng, và quan trọng hơn bạn có thể bắt đầu học nhanh chóng ở mọi lúc, mọi nơi"
        />
        <link rel="canonical" href="https://students.antoree.com/" />
      </Helmet>
      <PageBody className={styles.pageBody}>
        <Header
          isHideSearch
          background="#183059"
          colorText="#fff"
          logo={logoAntoree}
        />
        <div style={{ background: '#2C4251' }} />
        <IntroductionBanner />

        <BannerUnder textArr={textArr} />
        <div className={styles.Introcontainer}>
          <Feature featureArr={featureArr} />
          <UseFullOne />
          <UseFullTwo />
          <UsefulThree />
          <YoutubeList
            sliderRef={sliderRef}
            sliderRefSecond={sliderRefSecond}
          />
          <StudentsFeedBack />
          <NewsFeedBack settings={settings} />
        </div>
        <Footer />
        <SimpleBottomNavigation hanleOpen={() => {}} timeSelected={null} />
      </PageBody>
    </Page>
  );
};

export default Introduce;
