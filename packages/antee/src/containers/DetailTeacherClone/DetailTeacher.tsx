/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-target-blank */
import {
  Button,
  FlexGroup,
  FlexItem,
  HorizontalRule,
  LoadingSpinner,
  Outline,
  Page,
  PageBody,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import JoinAntoree from 'assets/images/Join-Antoree.svg';
import { Header, RatingCard } from 'components';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useRetrieveTeacherDetail } from 'services/teacher-market';
import styles from './DetailTeacher.module.scss';

const DetailTeacher: React.FC<{}> = () => {
  const { ClockIcon, UserIcon } = Outline;

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useRetrieveTeacherDetail(
    {
      teacherID: id,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const location = useLocation();

  return (
    <Page className="min-h-screen" paddingSize="none">
      <Header />

      <PageBody className={styles.pageBody}>
        <Spacer />
        {isLoading ? (
          <div
            style={{ minHeight: '80vh' }}
            className="flex justify-center items-center flex-col"
          >
            <LoadingSpinner size="xl" />
          </div>
        ) : (
          <div>
            <FlexGroup>
              <FlexItem grow={3}>
                <Title size="l" className="font-semibold">
                  <h2>{data?.data?.data?.name}</h2>
                </Title>
                <Spacer size="s" />
                <div>
                  <FlexGroup responsive={false} gutterSize="none">
                    <FlexItem>
                      <FlexGroup
                        gutterSize="s"
                        responsive={false}
                        className="items-center flex-wrap"
                      >
                        <FlexItem grow={false} className="flex-row">
                          <Text className="font-medium">
                            <p>{data?.data?.data?.nationality}</p>
                          </Text>
                          &nbsp; . &nbsp;
                          <RatingCard
                            averageRating={data?.data?.data?.rating || 5}
                          />
                        </FlexItem>

                        <FlexItem grow={false} className="flex-row">
                          <Text color="text" size="m">
                            <p>
                              <ClockIcon
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  fill: 'none',
                                }}
                                className="euiIcon euiButtonContent__icon"
                              />
                              &nbsp;
                              {Math.round(
                                // eslint-disable-next-line radix
                                parseInt(
                                  data?.data?.data?.teaching_hours || '1',
                                ) ?? 0,
                              )}{' '}
                              giờ
                            </p>
                          </Text>
                          <Text color="text" size="m" className="ml-2">
                            <p>
                              <UserIcon
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  fill: 'none',
                                }}
                                className="euiIcon euiButtonContent__icon"
                              />
                              &nbsp;{data?.data?.data?.students_count}&nbsp;
                              <FormattedMessage defaultMessage="học viên" />
                            </p>
                          </Text>
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                    <FlexItem
                      grow={false}
                      className="md:flex-row flex-col items-start"
                    >
                      {/* <div className="flex items-center">
                        <Icon type="share" />
                        <Text className="ml-2">
                          <p>
                            <FormattedMessage defaultMessage="Chia sẻ" />
                          </p>
                        </Text>
                      </div>
                      <div className="flex items-center md:ml-2">
                        <Icon type="starEmpty" />
                        <Text className="ml-2">
                          <p>
                            <FormattedMessage defaultMessage="Lưu" />
                          </p>
                        </Text>
                      </div> */}
                    </FlexItem>
                  </FlexGroup>
                </div>
                <Spacer />
                {data?.data?.data?.videoDemo?.meta?.files[0]?.url && (
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ minHeight: '300px' }}
                    src={data?.data?.data?.videoDemo?.meta?.files[0]?.url || ''}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg overflow-hidden"
                  />
                )}
                <Spacer />
                <Spacer />
                <Title className="font-semibold">
                  <h3>
                    <FormattedMessage defaultMessage="Giới thiệu" />
                  </h3>
                </Title>
                <Spacer />
                <Text>
                  <p>{data?.data?.data?.description}</p>
                </Text>
                <Spacer />
                <FlexGroup gutterSize="m">
                  <FlexItem grow={2}>
                    {data?.data?.data?.video && (
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ minHeight: '200px' }}
                        src={data?.data?.data?.video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg overflow-hidden"
                      />
                    )}
                  </FlexItem>
                  <FlexItem>
                    <img
                      className="w-full h-full object-cover object-center rounded-lg"
                      src={data?.data?.data?.avatarUrl}
                      alt="okela"
                    />
                  </FlexItem>
                </FlexGroup>
                <Spacer />
                <Spacer />
                <Title size="s" className="font-medium">
                  <h3>
                    <FormattedMessage defaultMessage="Bằng cấp" />
                  </h3>
                </Title>
                <Spacer />
                <Text>
                  {data?.data?.data?.certifications?.map((item, index) => (
                    <p key={index}>
                      {item?.name} - {item?.description} -{' '}
                      <a href={item?.files?.url} target="_blank">
                        <FormattedMessage defaultMessage="Chi tiết" />
                      </a>
                    </p>
                  ))}
                </Text>
                <Spacer />
                <Title size="s" className="font-medium">
                  <h3>
                    <FormattedMessage defaultMessage="Kinh nghiệm làm việc" />
                  </h3>
                </Title>
                <Spacer />
                <div>
                  {data?.data?.data?.work_experiences?.map((item, index) => (
                    <>
                      <FlexGroup key={index}>
                        <FlexItem key={index}>
                          <Text>
                            <p>
                              {moment(item?.start).format('MM/YYYY')} -{' '}
                              {moment(item?.end).format('MM/YYYY')}
                            </p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={2}>
                          <Title size="xs">
                            <h4>
                              {item?.field || item?.position} &nbsp; - &nbsp;{' '}
                              {item?.school || item?.company}
                            </h4>
                          </Title>
                          <Spacer size="s" />
                          <Text>
                            <p>{item?.description}</p>
                          </Text>
                        </FlexItem>
                      </FlexGroup>
                      <Spacer size="xl" />
                    </>
                  ))}
                </div>
                <HorizontalRule margin="m" />
                <Spacer />
                <Title size="m" className="font-medium">
                  <h3>
                    <FormattedMessage defaultMessage="Chủ đề dạy" />
                  </h3>
                </Title>
                <Spacer />
                {data?.data?.data?.topics?.map((item, index) => (
                  <>
                    <FlexGroup
                      key={index}
                      gutterSize="none"
                      className="md:mb-6"
                    >
                      <FlexItem key={index}>
                        <Text>
                          <p>{item?.name}</p>
                        </Text>
                      </FlexItem>
                      {item?.description && (
                        <FlexItem grow={2}>
                          <Text>
                            <p>{item?.description}</p>
                          </Text>
                        </FlexItem>
                      )}
                    </FlexGroup>
                    {/* <Spacer size="s" /> */}
                  </>
                ))}
              </FlexItem>
              <FlexItem className={styles.redirectToSignIn}>
                <div className="sticky " style={{ top: '-88px' }}>
                  <div style={{ height: '104px' }} />
                  <div
                    className="p-6 px-10 sticky top-4 rounded-2xl mx-auto"
                    style={{
                      // maxWidth: '380px',
                      width: '100%',
                      boxShadow:
                        '0px 1px 5px rgba(0, 0, 0, 0.1), 0px 3.6px 13px rgba(0, 0, 0, 0.07), 0px 8.4px 23px rgba(0, 0, 0, 0.06), 0px 23px 35px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <img
                      style={{ width: '100%' }}
                      src={JoinAntoree}
                      alt="JoinAntoree"
                    />
                    <Spacer />
                    <Link to={`/sign-in${location?.search || ''}`}>
                      <Button className="rounded-lg" fill fullWidth>
                        <Text>
                          <p>
                            <FormattedMessage defaultMessage="Học thử miễn phí" />
                          </p>
                        </Text>
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="fixed bottom-0 left-4 right-4 p-4 bg-white">
                  <Link to={`/sign-in${location?.search || ''}`}>
                    <Button className="rounded-lg" fill fullWidth>
                      <Text>
                        <p>
                          <FormattedMessage defaultMessage="Học thử miễn phí" />
                        </p>
                      </Text>
                    </Button>
                  </Link>
                </div>
              </FlexItem>
            </FlexGroup>
          </div>
        )}
        <Spacer />
        <Spacer />
      </PageBody>
    </Page>
  );
};

export default DetailTeacher;
