/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import {
  Badge,
  Button,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  notification,
  Slider,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveCreateCourse } from 'services/course';
import {
  TEACHER_TEST_ROLE,
  useRetrieveTeacherAvailableTime,
} from 'services/teachers';
import banner1 from 'assets/images/booking-confirmation.png';
import PreLoginModal from '../PreLoginModal';
import styles from './AvailableTime.module.scss';
import { STATUS_CONSTANTS } from './constant';
import CreateConfirmation from './CreateConfirmation';
import ProvideLearning from '../PreLoginModal/ProvideLearning';
import TeacherNotFree from './components/TeacherNotFree';

const maximumDisplayedItems = 12;

export type AvailableTimeProps = {
  date: string;
  successHandle?: () => void;
  handleToggle?: () => void;
  teacherId: number;
  errors?: any;
  role: number;
  teacherInfo: {
    name: string;
    country: string;
    rating: number;
    avatar: string;
    video?: null | string;
  };
  onSelect?: Function;
  minutesSpace: number;
  minHourSelected?: number;
  minMinSelected?: number;
  maxHourSelected?: number;
  maxMinSelected?: number;
  isMultipleSelect?: boolean;
  startTimeRange: string;
  endTimeRange: string;
  isAcceptTrial?: boolean;
  fullSize?: boolean;
  customLabel?: any;
  handleChangeDate?: any;
  dataCampain?: {};
  isVisiableModal: boolean;
  closeModal?: any;
  handleSelectime: (data: any) => void;
  timeBottomselected: any;
};

const AvailableTime: React.FC<AvailableTimeProps> = ({
  date,
  successHandle,
  isAcceptTrial,
  teacherId,
  teacherInfo,
  onSelect,
  role,
  minutesSpace,
  minHourSelected,
  minMinSelected,
  maxHourSelected,
  maxMinSelected,
  isMultipleSelect,
  handleChangeDate,
  startTimeRange,
  endTimeRange,
  fullSize,
  customLabel,
  dataCampain,
  isVisiableModal,
  handleSelectime,
  timeBottomselected,
}) => {
  const { isAuthenticated } = useAuth();
  const [timeList, setTimeList] = useState<
    {
      label: string;
      value: string;
      status: number;
    }[]
  >([]);

  const [timeSelected, setTimeSelected] = useState<
    { value: string; index: number }[]
  >([]);

  const minHour = minHourSelected || 0;
  const minMin = minMinSelected || 0;
  const maxHour = maxHourSelected || 24;
  const maxMin = maxMinSelected || 0;
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');

  const handleSelectTime = (value: any, index: number) => {
    const arrChoosed = timeSelected;

    if (!value) {
      return;
    }

    const removeIndex = timeSelected.findIndex(
      (item: { index: number }) => item.index === index,
    );

    if (removeIndex !== -1) {
      const arr = [...timeSelected];
      arr.splice(removeIndex, 1);

      passingValue(arr);
      return;
    }

    if (arrChoosed.length >= 1 && isMultipleSelect) {
      const isNearPrevious = Math.abs(timeSelected[0].index - index) === 1;
      if (arrChoosed.length >= 2) {
        const filteredArr = arrChoosed.filter(
          (item: { index: number }) => Math.abs(item.index - index) === 1,
        );
        if (filteredArr.length === 0) {
          passingValue([{ value, index }]);
        } else {
          passingValue([...filteredArr, { value, index }]);
        }
      } else if (isNearPrevious) {
        passingValue([...arrChoosed, { value, index }]);
      } else {
        passingValue([{ value, index }]);
      }
    } else {
      passingValue([{ value, index }]);
    }
  };
  const [dateslected, setDate] = useState('');
  const {
    isVisiable: isVisiableModalDesktop,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const handleToggle = () => {
    toggleModal();
  };

  const arrayOptionsDate = [
    {
      label: (
        <span style={{ cursor: 'pointer' }}>
          <FormattedMessage defaultMessage="Hôm nay" />
          ,&nbsp;
          <br />
          {moment().format('DD-MM-YYYY')}
        </span>
      ),
      value: moment(),
      onclick: () => setDate(moment().format('YYYY-MM-DD')),
    },
    {
      label: (
        <span
          // onClick={() => {
          //   setTomorrow(moment().add(1, 'days').format('YYYY-MM-DD'));
          // }}
          style={{ cursor: 'pointer' }}
        >
          <FormattedMessage defaultMessage="Ngày mai" />
          ,&nbsp; <br /> {moment().add(1, 'days').format('DD-MM-YYYY')}
        </span>
      ),
      value: moment().add(1, 'days'),
      onclick: () => setDate(moment().add(1, 'days').format('YYYY-MM-DD')),
    },
  ];
  const [dateSelect, setDateSelect] = useState(0);
  const [ava, setAct] = useState(false);
  const todays = moment().format('YYYY-MM-DD');
  const tomorrows = moment().add(1, 'days').format('YYYY-MM-DD');
  const {
    isLoading,
    isFetching,
    data,
    remove,
  } = useRetrieveTeacherAvailableTime(
    {
      teacherId,
      timeTo: `${dateslected || todays} ${endTimeRange}`,
      timeFrom: `${dateslected || todays} ${startTimeRange}`,
      role,
    },
    {
      enabled: !!teacherId,
      refetchOnWindowFocus: false,
      retry: (count, error) => {
        if (
          !teacherId ||
          !arrayOptionsDate[dateSelect].value.format('YYYY-MM-DD') ||
          count === 2
        ) {
          return false;
        }
        return true;
      },
      onSuccess: dataSuc => {
        generateTimeList(dataSuc?.data?.data || []);
      },
      onError: () => {
        // add for test only if done remove imediately
        // generateTimeList([]);

        notification.error({
          title: (
            <FormattedMessage defaultMessage="Available time of this teacher not found!" />
          ),
        });
      },
    },
  );

  const { mutate, isLoading: isLoadingCreate } = useRetrieveCreateCourse({
    onSuccess: ({ data: dataCreate }) => {
      remove();
      passingValue([]);
      closeModal();
      if (successHandle) {
        successHandle();
      }
      // eslint-disable-next-line no-restricted-globals
      if (location.pathname !== '/testing') {
        window.open('/courses');
      }
      isMobile
        ? notification.success({
            // toastLifeTimeMs:
            title: (
              <p className="font-semibold">
                <FormattedMessage defaultMessage="Create Success" />
                <br />
                <FormattedMessage defaultMessage="Tải app Antoree để tham gia buổi test" />
              </p>
            ),
            text: (
              <div>
                <p>
                  <FormattedMessage defaultMessage="Chức năng tham gia cuộc gọi trên thiết bị di động chỉ hỗ trợ qua app Antoree." />
                </p>
                <Button className="block ml-auto" fill>
                  <a
                    style={{ textDecoration: 'none', color: 'white' }}
                    target="_blank"
                    rel="noreferrer"
                    href="http://bit.ly/Antoree-App"
                  >
                    <Text>
                      <p>
                        <FormattedMessage defaultMessage="Tải app ngay" />
                      </p>
                    </Text>
                  </a>
                </Button>
              </div>
            ),
          })
        : notification.success({
            title: (
              <p className="font-semibold">
                <FormattedMessage defaultMessage="Tạo thành công" />
              </p>
            ),
          });
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;
      // const errCode = err?.response?.status;

      notification.error({
        title: <FormattedMessage defaultMessage="Error!" />,
        text: mesError || (
          <FormattedMessage defaultMessage="Create Course Failed!" />
        ),
      });
    },
  });

  const handleCreateCourse = () => {
    const itemSelected = data?.data?.data?.find(
      (item: { timeFrom: string; status: number }) =>
        item.timeFrom === timeSelected[0].value && item.status === 0,
    );
    if (!itemSelected) {
      return;
    }
    mutate({
      availableTimeId: itemSelected.availableTimeId,
      selectedTimeStart: `${itemSelected.dayOfYear} ${itemSelected.timeFrom}`,
      isTesting: role === TEACHER_TEST_ROLE,
    });
  };

  const passingValue = (arr: any[]) => {
    const arrToSet = arr.sort((a, b) => b - a);
    setTimeSelected(arrToSet);
    handleSelectime(arrToSet);
  };
  const [arraySplited, setArraySplited] = useState<any>([]);

  const generateTimeList = (
    availableTimes: { timeFrom: string; status: number }[],
  ) => {
    const result = []; // Results will go here
    // eslint-disable-next-line radix
    const nowHour = parseInt(moment().format('HH') || '00'); // Get current hour of the day - to get all hours of a day value is 0
    // eslint-disable-next-line radix
    const nowMinutes = parseInt(moment().format('mm') || '00'); // Get current minutes of the day - to get all minutes of an hour value is 0

    for (let i = minHour; i < maxHour; i++) {
      for (let j = 0; j < 60 / minutesSpace; j++) {
        if (
          !(i === minHour && minMin > minutesSpace * j) &&
          !(i === maxHour - 1 && minutesSpace * j > maxMin)
        ) {
          // Loop throught every minutes space
          const label = `${i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}:${j === 0 ? '00' : minutesSpace * j}`;

          result.push({
            label,
            value: `${label}:00`,
            status: 1,
            isDisable:
              arrayOptionsDate[dateSelect].value.isSame(new Date(), 'day') &&
              (nowHour > i ||
                (nowHour === i && nowMinutes >= minutesSpace * j)),
          });
        }
      }
    }

    const filteredResult = result.filter(timeListItem =>
      availableTimes?.find(
        (item: { timeFrom: string; status: number }) =>
          item.timeFrom === timeListItem.value && item.status === 0,
      ),
    );

    setTimeList(filteredResult);
    const cloneResult = [...filteredResult];
    const cloneArray: { label: string; value: string; status: number }[][] = [];
    while (cloneResult.length > 0) {
      cloneArray.push(cloneResult.splice(0, maximumDisplayedItems));
    }
    setArraySplited(cloneArray);

    passingValue([]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    dotsClass: '-mb-6 slick-dots',
  };

  const sliderRef = useRef<any>(null);

  const nextHandle = () => {
    if (sliderRef?.current) {
      sliderRef?.current?.slickNext();
    }
  };

  const prevHandle = () => {
    if (sliderRef?.current) {
      sliderRef?.current?.slickPrev();
    }
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="p-4">
          <FlexGroup gutterSize="none" responsive>
            {arrayOptionsDate?.map((timeItem, ind) => (
              <FlexItem className={styles.dateButton}>
                <div
                  className={dateSelect === ind ? styles.activeDateButton : ''}
                  onClick={() => {
                    setDateSelect(ind);
                  }}
                >
                  <Text
                    onClick={timeItem.onclick}
                    color={dateSelect === ind ? 'text' : 'subdued'}
                  >
                    {timeItem.label}
                  </Text>
                </div>
              </FlexItem>
            ))}
          </FlexGroup>
          <Spacer size="m" />
          {isLoading || isFetching ? (
            <div
              className="flex justify-center items-center flex-col p-10"
              style={{
                minHeight: '60px',
              }}
            >
              <LoadingSpinner size="xl" />
              <Spacer size="m" />
              <Text size="s">
                <FormattedMessage defaultMessage="Loading..." />
              </Text>
            </div>
          ) : data?.data?.data &&
            data?.data?.data?.length !== 0 &&
            arraySplited ? (
            <>
              <Slider ref={sliderRef} {...settings}>
                {arraySplited?.map((arraySplitedItem: any[]) => (
                  <div>
                    <FlexGroup
                      // columns={fullSize ? 4 : 3}
                      gutterSize="s"
                      style={{
                        overflowY: 'auto',
                        maxHeight: '40vh',
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(80px, 1fr))',
                      }}
                    >
                      {arraySplitedItem?.map((timeListItem, index) => (
                        <FlexItem
                          className="cursor-pointer"
                          key={timeListItem.value}
                        >
                          <Badge
                            color="#FFFFFF"
                            className={`text-center p-1 rounded-lg text-gray-400 border-transparent outline-none ${styles.shadowlessBadge}`}
                            onClick={(e: any) => {
                              e.preventDefault();
                              handleSelectTime(timeListItem.value, index);
                            }}
                            onClickAriaLabel="select item time"
                            isDisabled={timeListItem?.isDisable}
                            style={
                              timeSelected.find(
                                itemTimeSelected =>
                                  itemTimeSelected.value === timeListItem.value,
                              )
                                ? {
                                    backgroundColor: STATUS_CONSTANTS.find(
                                      item => item.value === 2,
                                    )?.colorCode,
                                    color: '#fff',
                                  }
                                : {
                                    color: 'rgba(52, 55, 65, 1)',
                                    border: '1px solid #CDCFD1',
                                  }
                            }
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                          >
                            <FlexItem>
                              <Text size="m">
                                <p className="w-12 m-auto">
                                  {timeListItem.label}
                                </p>
                              </Text>
                            </FlexItem>
                          </Badge>
                        </FlexItem>
                      ))}
                    </FlexGroup>
                  </div>
                ))}
              </Slider>
              <Spacer />

              {data?.data?.data?.length > maximumDisplayedItems && (
                <FlexGroup justifyContent="spaceBetween" responsive={false}>
                  <FlexItem grow={false}>
                    <ButtonIcon
                      color="text"
                      style={{ border: '1px solid #cdcfd1', minWidth: '73px' }}
                      onClick={prevHandle}
                      size="s"
                      iconSize="m"
                      className="px-4 w-full z-10"
                      iconType="arrowLeft"
                    />
                  </FlexItem>
                  <FlexItem grow={false}>
                    <ButtonIcon
                      color="text"
                      onClick={nextHandle}
                      className="px-4 w-full  z-10"
                      style={{ border: '1px solid #cdcfd1', minWidth: '73px' }}
                      size="s"
                      iconSize="m"
                      iconType="arrowRight"
                    />
                  </FlexItem>
                </FlexGroup>
              )}
              <Spacer />
              {timeSelected && timeSelected.length > 0 ? (
                <CreateConfirmation
                  // eslint-disable-next-line radix
                  teacherInfo={teacherInfo}
                  isLoading={isLoadingCreate}
                  dateFrom={arrayOptionsDate[dateSelect].value.format(
                    'ddd D-MM-YYYY',
                  )}
                  isTesting={role === TEACHER_TEST_ROLE}
                  isVisiable={isVisiableModalDesktop}
                  onConfirm={handleCreateCourse}
                  onClose={closeModal}
                  timeFrom={timeSelected[0].value}
                />
              ) : (
                <PreLoginModal
                  dataCampain={dataCampain}
                  isVisiable={isVisiableModalDesktop}
                  onConfirm={handleCreateCourse}
                  onClose={closeModal}
                />
              )}
              <Button
                disabled={!(timeSelected && timeSelected.length > 0)}
                fullWidth
                fill
                onClick={handleToggle}
                className={styles.antoreeDatlich}
              >
                <FormattedMessage defaultMessage="Đặt lịch" />
              </Button>
            </>
          ) : (
            <>
              <TeacherNotFree />
            </>
          )}
        </div>
      ) : (
        <>
          <ProvideLearning
            dataCampain={dataCampain || {}}
            isVisiableModal={isVisiableModalDesktop}
            closeModal={closeModal}
            handleToggle={handleToggle}
          />
        </>
      )}
    </>
  );
};

export default AvailableTime;
