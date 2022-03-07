/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  FlexGroup,
  FlexItem,
  Icon,
  Page,
  PageBody,
  Solid,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import headSlider1 from 'assets/images/head-slider-1.png';
import headSlider2 from 'assets/images/head-slider-2.png';
import headSlider3 from 'assets/images/head-slider-3.png';
import { Footer, Header, RatingCard } from 'components';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  useInfinityTeacherListMarket,
  useRetrieveTeacherListMarket,
} from 'services/teacher-market';
import { Helmet } from 'react-helmet';
import { TeacherCateShow } from '../Homepage/components';
import styles from './Category.module.scss';

const Category: React.FC<{}> = () => {
  const history = useHistory();

  const arrConfig = [
    {
      pathname: 'tieng-anh-cho-tre-em',
      topics: [12],
      title: 'Tiếng anh cho trẻ em',
      label: <FormattedMessage defaultMessage="Tiếng Anh cho trẻ em" />,
      img: headSlider1,
    },
    {
      pathname: 'giao-tiep-cong-viec',
      topics: [3, 4, 5],
      title: 'Giao tiếp và công việc',
      label: <FormattedMessage defaultMessage="Giao tiếp và công việc" />,
      img: headSlider2,
    },
    {
      pathname: 'luyen-thi-chung-chi',
      topics: [7, 8, 9, 10, 13],
      title: 'Luyện chứng chỉ',
      label: <FormattedMessage defaultMessage="Luyện thi chứng chỉ" />,
      img: headSlider3,
    },
  ];

  const { topic } = useParams<{ topic: string }>();

  const findedLocation = arrConfig.find(item => item?.pathname === topic);

  if (!findedLocation) {
    history.goBack();
  }

  const {
    data,
    // isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinityTeacherListMarket(
    {
      topicType: findedLocation?.topics || [],
      pageSize: 18,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataOther1,
    isLoading: isLoadingOther1,
  } = useRetrieveTeacherListMarket(
    {
      topicType:
        arrConfig.filter(item => item?.pathname !== topic)[0]?.topics || [],
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataOther2,
    isLoading: isLoadingOther2,
  } = useRetrieveTeacherListMarket(
    {
      topicType:
        arrConfig.filter(item => item?.pathname !== topic)[1]?.topics || [],
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => {
        return acc + page.data?.data?.length ?? 0;
      }, 0) ?? 0,
    [data],
  );

  return (
    <Page
      className="min-h-screen"
      paddingSize="none"
      // style={{ paddingBottom: '100px' }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {findedLocation?.title}| Antoree - Học tiếng Anh online 1 kèm 1{' '}
        </title>
        <meta
          name="description"
          content="Antoree ra đời giúp việc tìm kiếm giáo viên trở nên dễ dàng, và quan trọng hơn bạn có thể bắt đầu học nhanh chóng ở mọi lúc, mọi nơi"
        />
        <meta property="og:locale" content="vi_VN" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://students.antoree.com/category/${findedLocation?.title}`}
        />
        <meta property="og:title" content={findedLocation?.title} />
        <meta
          property="og:description"
          content="Antoree Học tiếng anh online 1-1 cho người lớn và trẻ em, Trang web học tiếng anh trực tuyến số 1 tại Việt Nam"
        />
        <meta
          property="og:image"
          content="https://students.antoree.com/static/media/white-bg-logo.d2039209.svg"
        />
        <link
          rel="canonical"
          href={`https://students.antoree.com/category/${findedLocation?.title}`}
        />
        <meta name="googlebot" content="index,follow" />
      </Helmet>
      <PageBody className={styles.pageBody}>
        <Header datahead={findedLocation?.title} />

        <Spacer />
        <div
          style={{
            paddingTop: '50px',
          }}
        >
          <div className="px-2">
            <div
              onClick={() => history.goBack()}
              className="cursor-pointer flex items-center"
            >
              <Icon type="arrowLeft" size="l" />

              <Title size="m" className="ml-2 font-semibold">
                <p>{findedLocation?.label}</p>
              </Title>
            </div>
          </div>
        </div>
        <Spacer />
        <div>
          <div className={styles.teacherRowContain}>
            {data?.pages
              .map(page => page?.data?.data)
              .reduce((a, b) => [...a, ...b], [])
              .map(teacher => (
                <Link
                  to={`/detail-teacher/${teacher?.id}`}
                  className={styles.teacherRowItem}
                >
                  <div>
                    <div className={styles.imgContain}>
                      <img
                        className=" w-full object-cover object-center rounded-xl"
                        style={{ height: '14rem' }}
                        src={teacher?.avatarUrlThumb}
                        alt="feature"
                      />
                      <div className="absolute bottom-0 w-full py-2 flex justify-center">
                        <Button
                          fill
                          className="z-10 relative"
                          style={{ background: '#14B24C' }}
                          onClick={() =>
                            history.push(`/detail-teacher/${teacher?.id}`)
                          }
                        >
                          <FormattedMessage defaultMessage="Xem chi tiết" />
                        </Button>
                        <div
                          className="bg-black w-full h-full bottom-0 absolute"
                          style={{
                            opacity: '0.5',
                            zIndex: 0,
                            borderRadius: '0px 0px 12px 12px',
                          }}
                        />
                      </div>
                    </div>
                    <FlexGroup gutterSize="none" responsive={false}>
                      <FlexItem grow={false}>
                        <Text>
                          <p>{teacher?.nationality}</p>
                        </Text>
                      </FlexItem>
                      <FlexItem grow={false}>&nbsp; ∙ &nbsp;</FlexItem>
                      <FlexItem grow={false}>
                        <RatingCard averageRating={4.8} />
                      </FlexItem>
                    </FlexGroup>
                    <Title size="xs">
                      <h5>{teacher?.name}</h5>
                    </Title>
                    <Text color="text" size="s">
                      <p>
                        {
                          teacher?.topics?.find(item => item?.topic_id === 12)
                            ?.name
                        }
                      </p>
                    </Text>
                    <Spacer size="xs" />
                    <FlexGroup gutterSize="none">
                      <FlexItem grow={false}>
                        <Text color="text" size="xs">
                          <p>
                            {Math.round(
                              // eslint-disable-next-line radix
                              parseInt(teacher?.teaching_hours || '1') ?? 0,
                            )}{' '}
                            giờ
                          </p>
                        </Text>
                      </FlexItem>
                      <FlexItem grow={false} className="ml-2">
                        <Text color="text" size="xs">
                          <p>
                            <Icon type="user" />
                            &nbsp;
                            {teacher?.students_count}
                            &nbsp;
                            <FormattedMessage defaultMessage="học viên" />
                          </p>
                        </Text>
                      </FlexItem>
                    </FlexGroup>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <Spacer />
        {hasNextPage && dataLength !== 0 && (
          <Button
            color="ghost"
            className="m-auto"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            isDisabled={!hasNextPage}
            style={{
              background: '#14B24C',
              borderColor: 'rgba(52, 55, 65, 1)',
            }}
          >
            <p>
              <FormattedMessage defaultMessage="Xem thêm" />{' '}
              {data
                ? data?.pages[0]?.data?.pagination?.totalItems - dataLength
                : ''}
            </p>
          </Button>
        )}
        <Spacer />
        <div className="px-2">
          <Title size="m" className="ml-2 font-semibold">
            <p>
              <FormattedMessage defaultMessage="Có thể bạn quan tâm" />
            </p>
          </Title>
        </div>
        <div className="px-4">
          <TeacherCateShow
            data={dataOther1?.data?.data ?? []}
            title={arrConfig.filter(item => item?.pathname !== topic)[0]?.label}
            isLoading={isLoadingOther1}
            imgBanner={
              arrConfig.filter(item => item?.pathname !== topic)[0]?.img
            }
            link={`/category/${
              arrConfig.filter(item => item?.pathname !== topic)[0]?.pathname
            }`}
            pagination={dataOther1?.data?.pagination?.totalItems || 0}
          />
        </div>
        <Spacer />
        <div className="px-4">
          <TeacherCateShow
            link={`/category/${
              arrConfig.filter(item => item?.pathname !== topic)[1]?.pathname
            }`}
            data={dataOther2?.data?.data ?? []}
            title={arrConfig.filter(item => item?.pathname !== topic)[1]?.label}
            isLoading={isLoadingOther1}
            imgBanner={
              arrConfig.filter(item => item?.pathname !== topic)[1]?.img
            }
            pagination={dataOther2?.data?.pagination?.totalItems || 0}
          />
        </div>
        <Spacer />
        <Spacer />

        <Footer />
      </PageBody>
    </Page>
  );
};

export default Category;
