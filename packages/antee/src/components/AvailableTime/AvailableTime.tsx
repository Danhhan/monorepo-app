/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import {
  FlexGroup,
  FlexGrid,
  FlexItem,
  Text,
  HorizontalRule,
  LoadingSpinner,
  Badge,
  Spacer,
  notification,
  Button,
} from '@antoree/ant-ui';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRetrieveTeacherAvailableTime } from 'services/teachers';
import { useRetrieveCreateCourse } from 'services/course';
import { useToggle } from 'hooks';
import moment from 'moment';
import { isMobile } from 'react-device-detect';

import { useAuth } from 'services/auth/contexts';
import { STATUS_CONSTANTS } from './constant';
import CreateConfirmation from './CreateConfirmation';
import PreLoginModal from '../PreLoginModal';

export type AvailableTimeProps = {
  date: string;
  successHandle?: () => void;
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
  onSelect: Function;
  minutesSpace: number;
  minHourSelected: number;
  minMinSelected: number;
  maxHourSelected: number;
  maxMinSelected: number;
  isMultipleSelect?: boolean;
  startTimeRange: string;
  endTimeRange: string;
  isTesting: boolean;
  isAcceptTrial?: boolean;
  fullSize?: boolean;
  customLabel?: any;
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
  startTimeRange,
  endTimeRange,
  isTesting,
  fullSize,
  customLabel,
}) => {
  const { isAuthenticated } = useAuth();
  const [timeList, setTimeList] = useState<
    {
      label: string;
      value: string;
      status: number;
      isDisable?: boolean;
    }[]
  >([]);
  const [timeSelected, setTimeSelected] = useState<
    { value: string; index: number }[]
  >([]);

  const minHour = minHourSelected || 0;
  const minMin = minMinSelected || 0;
  const maxHour = maxHourSelected || 24;
  const maxMin = maxMinSelected || 0;

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
  const today = moment().format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
  const {
    isLoading,
    isFetching,
    data,
    remove,
  } = useRetrieveTeacherAvailableTime(
    {
      teacherId,
      timeTo: `${tomorrow} ${endTimeRange}`,
      timeFrom: `${today} ${startTimeRange}`,
      role,
    },
    {
      enabled: !!teacherId,
      refetchOnWindowFocus: false,
      retry: (count, error) => {
        if (!teacherId || !date || count === 2) {
          return false;
        }
        return true;
      },
      onSuccess: dataSuc => {
        generateTimeList(dataSuc?.data?.data || []);
      },
      onError: () => {
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

      // eslint-disable-next-line no-restricted-globals
      if (location.pathname !== '/testing') {
        window.open('/courses');
      }
      if (successHandle) {
        successHandle();
      }

      isMobile
        ? notification.success({
            // toastLifeTimeMs:
            title: (
              <p className="font-semibold">
                <FormattedMessage defaultMessage="Tạo thành công" />
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
                <FormattedMessage defaultMessage="Create Success" />
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
      isTesting,
    });
  };

  const passingValue = (arr: any[]) => {
    const arrToSet = arr.sort((a, b) => b - a);
    setTimeSelected(arrToSet);
    // handleCreateCourse(
    //   data?.data?.availableTimes?.find(
    //     (item: { timeFrom: string; status: number }) =>
    //       item.timeFrom === arrToSet[0].value && item.status === 0,
    //   ),
    // );
  };

  const generateTimeList = (
    availableTimes: { timeFrom: string; status: number }[],
  ) => {
    const result = []; // Results will go here
    // eslint-disable-next-line radix
    const nowHour = parseInt(moment().format('HH') || '00'); // Get current hour of the day - to get all hours of a day value is 0
    // eslint-disable-next-line radix
    const nowMinutes = parseInt(moment().format('mm') || '00'); // Get current minutes of the day - to get all minutes of an hour value is 0
    for (let i = minHour; i < maxHour; i++) {
      // Loop throught every hour
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
              moment(date).isSame(new Date(), 'day') &&
              (nowHour > i ||
                (nowHour === i && nowMinutes >= minutesSpace * j)),
          });
        }
      }
    }

    setTimeList(
      result.filter(timeListItem =>
        availableTimes?.find(
          (item: { timeFrom: string; status: number }) =>
            item.timeFrom === timeListItem.value && item.status === 0,
        ),
      ),
    );
    passingValue([]);
  };

  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const handleToggle = () => {
    // if (!isAcceptTrial && !isTesting) {
    //   notification.error({
    //     title: (
    //       <FormattedMessage defaultMessage="Vui lòng hoàn thành bài test để tham gia học thử" />
    //     ),
    //   });
    // } else {
    //   toggleModal();
    // }
    toggleModal();
  };

  return (
    <>
      {teacherInfo?.video ? (
        <video
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: fullSize ? '40%' : '230px',

            display: 'block',
          }}
          className="mx-auto"
          controls
          autoPlay
          muted
        >
          <source type="video/mp4" src={teacherInfo?.video || ''} />
        </video>
      ) : null}
      <Spacer size="m" />
      {isLoading || isFetching ? (
        <div
          className="flex justify-center items-center flex-col p-10"
          style={{
            minHeight: '60px',
            maxWidth: fullSize ? '100%' : isMobile ? '80vw' : '16vw',
          }}
        >
          <LoadingSpinner size="xl" />
          <Spacer size="m" />
          <Text size="s">
            <FormattedMessage defaultMessage="Loading..." />
          </Text>
        </div>
      ) : data?.data?.data && data?.data?.data?.length !== 0 ? (
        <>
          <FlexGrid
            columns={4}
            gutterSize="s"
            style={{
              width: fullSize ? '100%' : isMobile ? '80vw' : '100%',
              overflowY: 'auto',
              maxHeight: '40vh',
            }}
            responsive
          >
            {timeList.map((timeListItem, index) => (
              <FlexItem
                style={{ flexBasis: fullSize ? 'calc(20% - 8px)' : '' }}
                className="cursor-pointer"
                key={timeListItem.value}
              >
                <Badge
                  color="#FFFFFF"
                  className="text-center pt-2 pb-2 border rounded-lg text-gray-400 border-gray-300 outline-none "
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSelectTime(timeListItem.value, index);
                  }}
                  isDisabled={timeListItem?.isDisable}
                  onClickAriaLabel="select item time"
                  // eslint-disable-next-line react/jsx-no-duplicate-props
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
                          color: '#000',
                        }
                  }
                >
                  <FlexItem>
                    <Text size="m">
                      <p className="w-12 m-auto">{timeListItem.label}</p>
                    </Text>
                  </FlexItem>
                </Badge>
              </FlexItem>
            ))}
          </FlexGrid>
          <Spacer />
          {timeSelected && timeSelected.length > 0 && isAuthenticated ? (
            <CreateConfirmation
              // eslint-disable-next-line radix
              teacherInfo={teacherInfo}
              isLoading={isLoadingCreate}
              dateFrom={moment(date).format('ddd D-MM-YYYY')}
              isTesting={isTesting}
              isVisiable={isVisiableModal}
              onConfirm={handleCreateCourse}
              onClose={closeModal}
              timeFrom={timeSelected[0].value}
            />
          ) : (
            <PreLoginModal
              isVisiable={isVisiableModal}
              onConfirm={handleCreateCourse}
              onClose={closeModal}
            />
          )}
          <Button
            disabled={!(timeSelected && timeSelected.length > 0)}
            fullWidth
            size="m"
            onClick={handleToggle}
          >
            <FormattedMessage defaultMessage="Book Course" />
          </Button>
        </>
      ) : (
        <div
          className="flex justify-center items-center flex-col p-10"
          style={{ minHeight: '100px' }}
        >
          <Spacer size="m" />
          <Text size="m">
            <p>No Available Time</p>
          </Text>
        </div>
      )}
    </>
  );
};

export default AvailableTime;
