/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import {
  Badge,
  FlexGroup,
  FlexItem,
  FormRow,
  HorizontalRule,
  LoadingSpinner,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { HAVING_OPENED_COURSE, STATUS_CONSTANTS } from './constant';

const AvailableTime = ({
  date,
  teacherId,
  errors,
  teacherName,
  skype,
  onSelect,
  minutesSpace,
  getTeacherAvailableTime,
  GET_TEACHER_AVAILABLE_TIME,
  minHourSelected,
  minMinSelected,
  maxHourSelected,
  maxMinSelected,
  isMultipleSelect,
}) => {
  const [timeList, setTimeList] = useState([]);
  const [timeSelected, setTimeSelected] = useState([]);

  const minHour = minHourSelected || 0;
  const minMin = minMinSelected || 0;
  const maxHour = maxHourSelected || 24;
  const maxMin = maxMinSelected || 0;

  const handleSelectTime = (value, index) => {
    const arrChoosed = timeSelected;

    if (!value) {
      return;
    }

    const removeIndex = timeSelected.findIndex(item => item.index === index);

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
          item => Math.abs(item.index - index) === 1,
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

  const passingValue = arr => {
    const arrToSet = arr.sort((a, b) => b - a);
    setTimeSelected(arrToSet);
    onSelect(arrToSet);
  };

  const { data, isLoading } = useQuery(
    [GET_TEACHER_AVAILABLE_TIME, { teacherId, date }],
    () => teacherId && getTeacherAvailableTime(teacherId, date),
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: (count, error) => {
        if (!teacherId || !date || count === 2) {
          return false;
        }
        return true;
      },
    },
  );

  useEffect(() => {
    const result = []; // Results will go here
    // const nowHour = 0; // Get current hour of the day - to get all hours of a day value is 0
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
          });
        }
      }
    }

    setTimeList(result);
    passingValue([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    date,
    teacherId,
    minHourSelected,
    minMinSelected,
    maxHourSelected,
    maxMinSelected,
  ]);
  const havingOpenedCourse = timeItem => {
    return data?.availableTimes?.find(
      item =>
        item.timeFrom === timeItem.value &&
        item.hasOpenedCourse === HAVING_OPENED_COURSE,
    );
  };
  return (
    <>
      <Spacer />
      <FlexGroup responsive={false} className="flex-grow-0">
        <FlexItem>
          <FormRow
            isInvalid={!!errors?.testingStartTime}
            error={errors?.testingStartTime?.message}
          >
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="Available Time of" />
                &nbsp;{teacherName}&nbsp;({skype})
              </h4>
            </Title>
          </FormRow>
        </FlexItem>
        {timeSelected.length > 0 && (
          <FlexItem grow={false}>
            <Text>
              <FormattedMessage
                defaultMessage="{minutes} mins"
                values={{ minutes: timeSelected.length * minutesSpace }}
              />
            </Text>
          </FlexItem>
        )}
      </FlexGroup>
      <HorizontalRule margin="xs" />
      <Spacer size="s" />
      <FlexGroup responsive={false} className="md:max-h-10">
        <FlexItem className="flex-row justify-center items-center" grow={false}>
          <div
            className="w-2 h-2 rounded-full mr-1"
            style={{ backgroundColor: '#00c081' }}
          />
          <Text size="xs">
            <p>
              <FormattedMessage defaultMessage="Selected" />
            </p>
          </Text>
        </FlexItem>
        <FlexItem className="flex-row justify-center items-center" grow={false}>
          <div
            className="w-2 h-2 rounded-full mr-1"
            style={{
              backgroundColor: '#fff',
              boxShadow: '0px 4px 15px rgba(0, 0, 1, 0.4)',
            }}
          />
          <Text size="xs">
            <p>
              <FormattedMessage defaultMessage="Available" />
            </p>
          </Text>
        </FlexItem>
        <FlexItem className="flex-row justify-center items-center" grow={false}>
          <div
            className="w-2 h-2 rounded-full mr-1"
            style={{ backgroundColor: '#ffc700' }}
          />
          {/* <Text size="xs">
            <p>
              <FormattedMessage defaultMessage="Unavailable" />
            </p>
          </Text> */}
          <Text size="xs">
            <p>
              <FormattedMessage defaultMessage="Having opened course" />
            </p>
          </Text>
        </FlexItem>
      </FlexGroup>
      <Spacer size="m" />
      {timeSelected?.length > 1 && (
        <>
          <Text size="s" className="text-red-600">
            <p>
              (Lưu ý: Test 40 phút chỉ áp dụng cho khoá IELTS, TOEIC, test giữa
              kỳ và cuối kỳ)
            </p>
          </Text>
          <Spacer />
        </>
      )}

      {isLoading ? (
        <div
          className="flex justify-center items-center flex-col p-10"
          style={{ minHeight: '450px' }}
        >
          <LoadingSpinner size="xl" />
          <Spacer size="m" />
          <Text size="m">
            <p>Loading...</p>
          </Text>
        </div>
      ) : data?.availableTimes && data?.availableTimes?.length !== 0 ? (
        <FlexGroup
          wrap
          gutterSize="m"
          style={{ flexGrow: 0 }}
          responsive={false}
        >
          {timeList.map((timeListItem, index) => (
            <FlexItem
              className="cursor-pointer"
              style={{
                flexBasis: 'calc(calc(100% / 6) - 16px)',
                display: data?.availableTimes?.find(
                  item =>
                    item.timeFrom === timeListItem.value && item.status === 0,
                )
                  ? 'block'
                  : 'none',
              }}
              grow={false}
              key={timeListItem.value}
            >
              <Badge
                // style={{
                //   backgroundColor: 'red',
                //   // backgroundColor: timeListItem?.hasOpenedCourse && 'yellow',
                // }}
                color="#FFFFFF"
                className="text-center p-2 rounded-lg shadow-lg text-gray-400 border-transparent outline-none"
                isDisabled={
                  !data?.availableTimes?.find(
                    item =>
                      item.timeFrom === timeListItem.value && item.status === 0,
                  )
                }
                onClick={e => {
                  e.preventDefault();
                  handleSelectTime(timeListItem.value, index);
                }}
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
                        ).colorCode,
                        color: '#fff',
                      }
                    : {
                        backgroundColor: havingOpenedCourse(timeListItem)
                          ? '#ffc700'
                          : '',
                        color: havingOpenedCourse(timeListItem)
                          ? 'black'
                          : '#9d9fa0',
                      }
                }
              >
                <FlexItem>
                  <Text size="m">
                    <p className="w-14 m-auto">{timeListItem.label}</p>
                  </Text>
                </FlexItem>
              </Badge>
            </FlexItem>
          ))}
        </FlexGroup>
      ) : (
        <div
          className="flex justify-center items-center flex-col p-10"
          style={{ minHeight: '450px' }}
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

AvailableTime.defaultProps = {
  date: '',
  teacherId: null,
  teacherName: '',
  skype: '',
  errors: undefined,
  onSelect: () => {},
  minutesSpace: 30,
  getTeacherAvailableTime: () => {},
  GET_TEACHER_AVAILABLE_TIME: '',
  minHourSelected: undefined,
  minMinSelected: undefined,
  maxHourSelected: undefined,
  maxMinSelected: undefined,
  isMultipleSelect: false,
};

AvailableTime.propTypes = {
  date: PropTypes.string,
  teacherId: PropTypes.number,
  teacherName: PropTypes.string,
  skype: PropTypes.string,
  onSelect: PropTypes.func,
  getTeacherAvailableTime: PropTypes.func,
  GET_TEACHER_AVAILABLE_TIME: PropTypes.string,
  minutesSpace: PropTypes.number,
  errors: PropTypes.shape({
    testingStartTime: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  minHourSelected: PropTypes.number,
  minMinSelected: PropTypes.number,
  maxHourSelected: PropTypes.number,
  maxMinSelected: PropTypes.number,
  isMultipleSelect: PropTypes.bool,
};

export default AvailableTime;
