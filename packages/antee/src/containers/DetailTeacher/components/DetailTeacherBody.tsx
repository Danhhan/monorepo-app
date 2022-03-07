/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-target-blank */
import {
  FlexGroup,
  FlexItem,
  HorizontalRule,
  LoadingSpinner,
  Outline,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { AvailableTimeNew, RatingCard } from 'components';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { ReactElement } from 'react';
import { useRetrieveTeacherDetail } from 'services/teacher-market';
import { TEACHER_TEST_ROLE } from 'services/teachers';
import styles from '../DetailTeacher.module.scss';
import { useToggle } from '../../../hooks';

export type DetaulTeacherBodyProps = {
  id: number;
  floating?: boolean;
  role: 2 | 3;
};

const DetailTeacherBody: React.FC<DetaulTeacherBodyProps> = ({
  id,
  floating = true,
  role,
}) => {
  // console.log(id);
  const { data, isLoading } = useRetrieveTeacherDetail(
    {
      teacherID: id,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const teacher = data?.data?.data;

  const { ClockIcon, UserIcon: UserIconOutline } = Outline;
  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const handleToggle = () => {
    toggleModal();
  };

  const availableTime = (
    <AvailableTimeNew
      timeBottomselected=""
      handleSelectime={() => {}}
      isVisiableModal={isVisiableModal}
      handleToggle={handleToggle}
      closeModal={() => {}}
      role={role}
      // eslint-disable-next-line radix
      teacherId={id}
      teacherInfo={{
        avatar: teacher?.avatarUrl ?? '',
        name: teacher?.name ?? '',
        country: teacher?.nationality ?? '',
        rating: teacher?.rating ?? 5,
        video: teacher?.video ?? '',
      }}
      date={moment().format('YYYY-MM-DD')}
      minutesSpace={role === TEACHER_TEST_ROLE ? 20 : 30}
      startTimeRange={moment()
        .hours(0)
        .minutes(0)
        .seconds(0)
        .format('HH:mm:ss')}
      endTimeRange={moment()
        .hours(23)
        .minutes(59)
        .seconds(0)
        .format('HH:mm:ss')}
      successHandle={() => {
        if (role === TEACHER_TEST_ROLE) {
          window.location.href = '/testing';
        } else {
          // TODO: navigate to student page instead
          window.location.reload();
        }
      }}
    />
  );

  return isLoading ? (
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
            <h2>{teacher?.name}</h2>
          </Title>
          <Spacer size="s" />
          <div>
            <FlexGroup responsive={false} gutterSize="none">
              <FlexItem>
                <FlexGroup
                  gutterSize="none"
                  responsive
                  className="items-center flex-wrap"
                >
                  <FlexItem grow={false} className="flex-row">
                    <Text className="font-medium">
                      <p>{teacher?.nationality}</p>
                    </Text>
                    &nbsp; . &nbsp;
                    <RatingCard averageRating={teacher?.rating || 5} />
                  </FlexItem>
                  {/* <FlexItem className="-mt-2 hidden md:block" grow={false}>
                      &nbsp; . &nbsp;
                    </FlexItem>
                    <Text className="font-medium whitespace-nowrap">
                      <p>Giao tiếp công việc</p>
                    </Text> */}
                  <FlexItem className="-mt-2 hidden md:block" grow={false}>
                    &nbsp;&nbsp;
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
                          parseInt(teacher?.teaching_hours || '1') ?? 0,
                        )}{' '}
                        giờ
                      </p>
                    </Text>
                    <Text color="text" size="m" className="ml-2">
                      <p>
                        <UserIconOutline
                          style={{
                            width: '16px',
                            height: '16px',
                            fill: 'none',
                          }}
                          className="euiIcon euiButtonContent__icon"
                        />
                        &nbsp;{teacher?.students_count}&nbsp;
                        <FormattedMessage defaultMessage="học viên" />
                      </p>
                    </Text>
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
            </FlexGroup>
          </div>
          <Spacer />
          {teacher?.videoDemo?.meta?.files[0]?.url && (
            <video
              style={{
                width: '100%',
              }}
              className="mx-auto"
              controls
            >
              <source
                type="video/mp4"
                src={teacher?.videoDemo?.meta?.files[0]?.url}
              />
            </video>
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
            <p
              className={styles.textDescription}
              dangerouslySetInnerHTML={{
                __html: teacher?.description || '',
              }}
            />
          </Text>
          <Spacer />
          <FlexGroup gutterSize="m">
            <FlexItem>
              <img
                className="w-full h-full object-cover object-center rounded-lg"
                src={teacher?.avatarUrl}
                alt="okela"
              />
            </FlexItem>
            <FlexItem grow={2}>
              <iframe
                width="100%"
                height="100%"
                style={{ minHeight: 320 }}
                src={teacher?.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg overflow-hidden"
                sandbox=""
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
            {teacher?.certifications?.map(item => (
              // eslint-disable-next-line react/jsx-no-target-blank
              <p>
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
            {teacher?.work_experiences?.map(item => (
              <>
                <FlexGroup gutterSize="none">
                  <FlexItem style={{ marginBottom: '0px' }}>
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
                      <p
                        // className={styles.textDescription}
                        dangerouslySetInnerHTML={{
                          __html: item?.description || '',
                        }}
                      />
                    </Text>
                  </FlexItem>
                </FlexGroup>
                <Spacer size="xl" />
              </>
            ))}
          </div>
          <Spacer />
          <HorizontalRule margin="m" />
          <Spacer />
          <Title size="m" className="font-medium">
            <h3>
              <FormattedMessage defaultMessage="Chủ đề dạy" />
            </h3>
          </Title>
          <Spacer />
          {teacher?.topics?.map(item => (
            <>
              <FlexGroup>
                <FlexItem>
                  <Text>
                    <p>{item?.name}</p>
                  </Text>
                </FlexItem>
                <FlexItem grow={2}>
                  <Text>
                    <p>{item?.description}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
              <Spacer />
            </>
          ))}
          {!floating && availableTime}
        </FlexItem>
        {floating && (
          <FlexItem>
            <div
              className="p-4 sticky top-24 rounded-2xl mx-auto"
              style={{
                maxWidth: '380px',
                width: '100%',
                boxShadow:
                  '0px 1px 5px rgba(0, 0, 0, 0.1), 0px 3.6px 13px rgba(0, 0, 0, 0.07), 0px 8.4px 23px rgba(0, 0, 0, 0.06), 0px 23px 35px rgba(0, 0, 0, 0.05)',
              }}
            >
              {availableTime}
            </div>
          </FlexItem>
        )}
      </FlexGroup>
    </div>
  );
};

export default DetailTeacherBody;
