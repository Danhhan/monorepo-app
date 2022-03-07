/* eslint-disable no-param-reassign */
import {
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  notification,
  Spacer,
} from '@antoree/ant-ui';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import {
  AvailableTime,
  useRetrieveTeacherAvailableTime,
  useUpdateAvailableTime,
} from 'services/schedule';
import {
  dayOfWeekType,
  durationType,
  DURATION_TEST,
  ROLE_TEST,
} from '../../constants';
import {
  generateDaysOfWeek,
  generateDurationList,
  ScheduleActions,
  useScheduleContext,
} from '../../store';
import AvailableTimes from '../AvailableTimes';
import DaysOfWeek from '../DaysOfWeek';

const AvailableTimeTest: React.FC<{}> = () => {
  const { state, dispatch } = useScheduleContext();
  const { daysOfWeek, durationList, startOfWeek, endOfWeek, role } = state;
  const [, reRender] = useState<any>();

  const location = useLocation();

  useEffect(() => {
    dispatch(ScheduleActions.removeAvailableTime());
    // prettier-ignore
    const startWeek = moment().startOf('week').add(1, 'days');
    // prettier-ignore
    const endWeek = moment().endOf('week').add(1, 'days');
    const payload = {
      daysOfWeek: generateDaysOfWeek(startWeek, endWeek),
      durationList: generateDurationList(
        generateDaysOfWeek(startWeek, endWeek),
        DURATION_TEST,
      ),
      startOfWeek: startWeek,
      endOfWeek: endWeek,
      role: ROLE_TEST,
    };
    dispatch(ScheduleActions.createAvailableTime({ ...payload }));
  }, [location]);

  const { data, isFetching, remove } = useRetrieveTeacherAvailableTime(
    {
      role: [ROLE_TEST],
      dayOfYearFrom: !startOfWeek
        ? ''
        : startOfWeek
            .hours(0)
            .minutes(0)
            .seconds(0)
            .format('YYYY-MM-DD HH:mm:ss'),
      dayOfYearTo: !endOfWeek
        ? ''
        : endOfWeek
            .hours(23)
            .minutes(59)
            .seconds(59)
            .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
  const { mutate, isLoading } = useUpdateAvailableTime({
    onSuccess: () => {
      notification.success({
        title: <FormattedMessage defaultMessage="Update successful" />,
      });
      remove();
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Update failed" />,
      });
    },
  });

  useEffect(() => {
    const localDurationList: Array<durationType> =
      data?.data?.availableTimes instanceof Array
        ? data?.data?.availableTimes.map((item: AvailableTime) => {
            return {
              id: `${item.dayOfYear}-${item.timeFrom}`,
              timeStart: item.timeFrom,
              timeEnd: item.timeTo,
              isSelected: true,
              dayOfYear: item.dayOfYear,
              hasOpenedCourse: item.hasOpenedCourse,
            };
          })
        : [];
    const localDaysOfWeek = [...daysOfWeek];
    localDaysOfWeek.map(item => {
      const count = localDurationList.filter(
        duration => duration.dayOfYear === item.value,
      ).length;
      const newItem = item;
      if (count > 0) {
        newItem.countSlotTime = count;
      } else {
        newItem.countSlotTime = 0;
      }
      return newItem;
    });
    if (localDaysOfWeek.length > 0 && role === ROLE_TEST) {
      dispatch(
        ScheduleActions.updateDayOfWeek({ daysOfWeek: localDaysOfWeek }),
      );
    }
    const newDurationList = [...durationList];
    newDurationList.map((duration: durationType) => {
      const newDuration: durationType = duration;
      const index = localDurationList.findIndex(
        (item: durationType) => item.id === duration.id,
      );
      if (index !== -1) {
        newDuration.isSelected = true;
        newDuration.isSelected = true;
        newDuration.hasOpenedCourse = localDurationList[index].hasOpenedCourse;
      }
      return newDuration;
    });
    if (newDurationList.length > 0 && role === ROLE_TEST) {
      dispatch(
        ScheduleActions.setSelectedDurations({ durationList: newDurationList }),
      );
    }
  }, [data?.data?.availableTimes]);

  const handleOnUpdate = () => {
    const schedule: any = durationList
      .filter((duration: durationType) => duration.isSelected)
      .map((item: durationType) => {
        return {
          'day-of-week': item.dayOfWeek,
          'time-start': item.timeStart,
          'time-end': item.timeEnd,
          'day-of-year': item.dayOfYear,
        };
      });
    mutate({
      schedule,
      role: ROLE_TEST,
      dayOfYearFrom: startOfWeek
        .hours(0)
        .minutes(0)
        .seconds(0)
        .format('YYYY-MM-DD HH:mm:ss'),
      dayOfYearTo: endOfWeek
        .hours(23)
        .minutes(59)
        .seconds(59)
        .format('YYYY-MM-DD HH:mm:ss'),
    });
  };
  const handleUnDo = () => {
    reRender((prev: any) => !prev);
    remove();
  };

  const findDayOfWeek = daysOfWeek.find(
    (item: dayOfWeekType) => item.isSelected,
  );

  return (
    <>
      <Spacer />
      <DaysOfWeek isFetching={isFetching} teachingTime={DURATION_TEST} />
      <Spacer />
      {findDayOfWeek && (
        <>
          <AvailableTimes seletedDayOfYear={findDayOfWeek?.value} />
          <Spacer size="xxl" />
          <FlexGroup justifyContent="flexEnd">
            <FlexItem grow={false}>
              <ButtonEmpty onClick={handleUnDo}>Undo</ButtonEmpty>
            </FlexItem>

            <FlexItem grow={false}>
              <Button fill onClick={handleOnUpdate} isLoading={isLoading}>
                Update
              </Button>
            </FlexItem>
          </FlexGroup>
        </>
      )}
    </>
  );
};

export default AvailableTimeTest;
