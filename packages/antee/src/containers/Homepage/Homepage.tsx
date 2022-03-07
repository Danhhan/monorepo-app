import { Outline, Page, PageBody, Spacer } from '@antoree/ant-ui';
import headSlider1 from 'assets/images/head-slider-1.png';
import headSlider2 from 'assets/images/head-slider-2.png';
import headSlider3 from 'assets/images/head-slider-3.png';
import { FilterBar, Footer, Header } from 'components';
import { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useRetrieveTeacherListMarket } from 'services/teacher-market';
import SimpleBottomNavigation from '../../components/BottomNav/SimpleBottomNavigation';
import { TeacherCateShow } from './components';
import styles from './Homepage.module.scss';
import sty from './HomepageV2.module.scss';
import TopTeacher from './components/TopTeacher';
import HomeBanner from './components/HomeBanner';
import HomeBannerUnder from './components/HomeBannerUnder';

const Homepage: React.FC<{}> = () => {
  const history = useHistory();
  // console.log(history);

  const { ClockIcon, UserIcon: OutlinieUserIcon } = Outline;
  const underBannerArr = [
    {
      icon: 'stats',
      title: <FormattedMessage defaultMessage="7 năm" />,
      text: <FormattedMessage defaultMessage="Phát triển" />,
    },
    {
      icon: 'clock',
      title: <FormattedMessage defaultMessage="1.100.000+" />,
      text: <FormattedMessage defaultMessage="Giờ học đăng ký" />,
    },
    {
      icon: 'users',
      title: <FormattedMessage defaultMessage="10.000+" />,
      text: <FormattedMessage defaultMessage="Học viên" />,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    arrows: false,

    autoplay: false,
    autoplaySpeed: 4000,
    // variableWidth: true,
    // className: 'pr-20',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          autoplay: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<any>(null);

  const {
    data: dataListTeacherChild,
    isLoading: isLoadingListTeacherChild,
  } = useRetrieveTeacherListMarket(
    {
      topicType: [12],
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataListTeacherComunicate,
    isLoading: isLoadingListTeacherComunicate,
  } = useRetrieveTeacherListMarket(
    {
      topicType: [3, 4, 5],
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataListTeacherCertificate,
    isLoading: isLoadingListTeacherCertificate,
  } = useRetrieveTeacherListMarket(
    {
      topicType: [7, 8, 9, 10, 13],
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataListTeacherTopMonth,
    isLoading: isLoadingListTeacherTopMonth,
  } = useRetrieveTeacherListMarket({
    isTop: 1,
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Page className="min-h-screen" paddingSize="none">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Antoree - Học tiếng Anh online 1 kèm 1 | Antoree</title>
        <meta
          name="description"
          content="Antoree ra đời giúp việc tìm kiếm giáo viên trở nên dễ dàng, và quan trọng hơn bạn có thể bắt đầu học nhanh chóng ở mọi lúc, mọi nơi"
        />
        <link rel="canonical" href="https://students.antoree.com/" />
      </Helmet>
      <PageBody className={styles.pageBody}>
        <Header />
        <Spacer />
        <div className={styles.pageContainer}>
          <div className={sty.searchBar}>
            <FilterBar />
          </div>
          <Spacer />
          <HomeBanner />
          <HomeBannerUnder underBannerArr={underBannerArr} />
          <TopTeacher
            isLoading={isLoadingListTeacherTopMonth}
            settings={settings}
            dataListTeacherTopMonth={dataListTeacherTopMonth?.data?.data}
            sliderRef={sliderRef}
            scrollToTop={scrollToTop}
          />

          <div className={styles.antoreeEnglishchild}>
            <div className="py-4 pt-16">
              <TeacherCateShow
                data={dataListTeacherChild?.data?.data ?? []}
                title={
                  <FormattedMessage defaultMessage="Tiếng Anh cho trẻ em" />
                }
                link="/category/tieng-anh-cho-tre-em"
                isLoading={isLoadingListTeacherChild}
                imgBanner={headSlider1}
                filterParam={[12]}
                pagination={
                  dataListTeacherChild?.data?.pagination?.totalItems || 0
                }
              />
            </div>
          </div>

          <div className="py-4 pt-16" style={{ paddingTop: '32px' }}>
            <TeacherCateShow
              link="/category/giao-tiep-cong-viec"
              data={dataListTeacherComunicate?.data?.data ?? []}
              title={
                <FormattedMessage defaultMessage="Giao tiếp và công việc" />
              }
              isLoading={isLoadingListTeacherComunicate}
              imgBanner={headSlider2}
              filterParam={[3, 4, 5]}
              pagination={
                dataListTeacherComunicate?.data?.pagination?.totalItems || 0
              }
            />
          </div>
          <div className="py-4 pt-16" style={{ paddingTop: '32px' }}>
            <TeacherCateShow
              link="/category/luyen-thi-chung-chi"
              data={dataListTeacherCertificate?.data?.data ?? []}
              title={<FormattedMessage defaultMessage="Luyện thi chứng chỉ" />}
              isLoading={isLoadingListTeacherCertificate}
              imgBanner={headSlider3}
              filterParam={[]}
              pagination={
                dataListTeacherCertificate?.data?.pagination?.totalItems || 0
              }
            />
          </div>
        </div>
        <Spacer />
        <Footer />
      </PageBody>
      <SimpleBottomNavigation hanleOpen={() => {}} timeSelected={null} />
    </Page>
  );
};

export default Homepage;
