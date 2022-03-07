/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  FlexGroup,
  FlexItem,
  Icon,
  LoadingSpinner,
  Page,
  PageBody,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import headSlider1 from 'assets/images/head-slider-1.png';
import headSlider2 from 'assets/images/head-slider-2.png';
import { FilterBar, Footer, Header, RatingCard } from 'components';
import { usePagiantion } from 'hooks';
import moment from 'moment';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import {
  useInfinityTeacherListMarket,
  useRetrieveTeacherListMarket,
} from 'services/teacher-market';
import {
  ArrayParam,
  StringParam,
  useQueryParam,
  withDefault,
} from 'use-query-params';
import { TeacherCateShow } from '../Homepage/components';
import styles from './Search.module.scss';
import sty from '../Homepage/HomepageV2.module.scss';

const Search: React.FC<{}> = () => {
  const history = useHistory();

  const {
    query: {
      startTimeRange,
      endTimeRange,
      dateRange,
      // gender,
      // nation,
      // region,
      // topics,
      // certificates,
    },
    onSelect,
  } = usePagiantion({
    startTimeRange: withDefault(
      StringParam,
      // eslint-disable-next-line prettier/prettier
      moment().hours(0).minutes(0).seconds(0).format('HH:mm:ss'),
    ),
    endTimeRange: withDefault(
      StringParam,
      // eslint-disable-next-line prettier/prettier
      moment().hours(23).minutes(59).seconds(0).format('HH:mm:ss'),
    ),
    dateRange: withDefault(StringParam, moment().format('YYYY-MM-DD')),
    // gender: withDefault(ArrayParam, []),
    // nation: withDefault(ArrayParam, []),
    // region: withDefault(ArrayParam, []),
    // topics: withDefault(ArrayParam, []),
    // certificates: withDefault(ArrayParam, []),
  });

  const [topics, setTopics] = useQueryParam('topics', ArrayParam);
  const [nation, setNation] = useQueryParam('nation', ArrayParam);
  const [gender, setGender] = useQueryParam('gender', ArrayParam);
  const [region, setRegion] = useQueryParam('region', ArrayParam);
  const [certificates, setCertificates] = useQueryParam(
    'certificates',
    ArrayParam,
  );

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfinityTeacherListMarket(
    {
      teacherType: region,
      national: nation,
      gender,
      topicType: topics,
      certificate: certificates,
      dayFrom: `${dateRange} ${startTimeRange}`,
      dayTo: `${dateRange} ${endTimeRange}`,
      pageSize: 10,
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

  return (
    <Page className="min-h-screen" paddingSize="none">
      <PageBody className={styles.pageBody}>
        <Header />
        <Spacer />
        <div className={styles.searchBar}>
          <FilterBar />
        </div>
        <Spacer />
        <div>
          <div className="px-2">
            <div
              onClick={() => history.goBack()}
              className="flex items-center cursor-pointer"
            >
              <Icon type="arrowLeft" size="l" />

              <Title size="m" className="ml-2 font-semibold">
                <p>
                  <FormattedMessage defaultMessage="Tìm kiếm giáo viên" />
                </p>
              </Title>
            </div>
            {!isLoading && (
              <Text color="text">
                <p>
                  <FormattedMessage
                    defaultMessage="Có {value} giáo viên phù hợp."
                    values={{ value: dataLength }}
                  />
                </p>
              </Text>
            )}
          </div>
        </div>
        <Spacer />
        <div>
          {isLoading ? (
            <div className="py-4 flex justify-center items-center w-full">
              <LoadingSpinner size="xl" />
            </div>
          ) : (
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
                        <div className="absolute bottom-0 w-full py-4 flex justify-center">
                          <Button
                            fill
                            className="z-10 relative"
                            onClick={() =>
                              history.push(`/detail-teacher/${teacher?.id}`)
                            }
                            style={{ background: '#14B24C' }}
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
          )}
        </div>
        <Spacer />
        {hasNextPage && dataLength !== 0 && (
          <Button
            color="ghost"
            className="m-auto"
            onClick={() => fetchNextPage()}
            isDisabled={!hasNextPage}
            style={{
              background: 'rgba(52, 55, 65, 1)',
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
        <div className="py-4">
          <TeacherCateShow
            link="/category/giao-tiep-cong-viec"
            data={dataListTeacherComunicate?.data?.data ?? []}
            title={<FormattedMessage defaultMessage="Giao tiếp và công việc" />}
            isLoading={isLoadingListTeacherComunicate}
            imgBanner={headSlider2}
            pagination={
              dataListTeacherComunicate?.data?.pagination?.totalItems || 0
            }
          />
        </div>
        <div className="py-4">
          <TeacherCateShow
            data={dataListTeacherChild?.data?.data ?? []}
            title={<FormattedMessage defaultMessage="Tiếng Anh cho trẻ em" />}
            link="/category/tieng-anh-cho-tre-em"
            isLoading={isLoadingListTeacherChild}
            imgBanner={headSlider1}
            pagination={dataListTeacherChild?.data?.pagination?.totalItems || 0}
          />
        </div>
        <Spacer />
        <Spacer />
        <Footer />
      </PageBody>
    </Page>
  );
};

export default Search;
