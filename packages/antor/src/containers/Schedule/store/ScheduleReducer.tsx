import {
  durationType,
  DURATION_TEST,
  DURATION_TRIAL,
} from 'containers/Schedule/constants';
import moment from 'moment';
import { ActionType, State, Type } from './constants';

export const scheduleReducer = (state: State, action: ActionType) => {
  const {
    NEXT_WEEK,
    PREV_WEEK,
    SELECTED_DURATION,
    SELECTED_DAY_OF_WEEK,
    CREATE_AVAILABLE_TIME,
    UPDATE_DAY_OF_WEEK,
    REMOVE_AVAILABLE_TIME,
  } = Type;
  switch (action.type) {
    case CREATE_AVAILABLE_TIME:
      return {
        ...action.payload,
      };
    case REMOVE_AVAILABLE_TIME:
      return {
        ...state,
        ...action.payload,
      };
    case NEXT_WEEK:
      return {
        ...state,
        ...action.payload,
      };
    case PREV_WEEK:
      return {
        ...state,
        ...action.payload,
      };
    case SELECTED_DURATION:
      return {
        ...state,
        ...action.payload,
      };
    case SELECTED_DAY_OF_WEEK:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_DAY_OF_WEEK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};

export const generateDaysOfWeek = (startOfWeek: any, endOfWeek: any) => {
  const localDaysOfWeek = [];
  localDaysOfWeek.push({
    label: startOfWeek.format('DD'),
    value: startOfWeek.format('YYYY-MM-DD'),
    isSelected: true,
    countSlotTime: 0,
  });
  for (let i = 1; i < 6; i += 1) {
    localDaysOfWeek.push({
      // prettier-ignore
      label: moment(startOfWeek).add(i, 'days').format('DD'),
      // prettier-ignore
      value: moment(startOfWeek).add(i, 'days').format('YYYY-MM-DD'),
      isSelected: false,
      countSlotTime: 0,
    });
  }
  localDaysOfWeek.push({
    label: endOfWeek.format('DD'),
    value: endOfWeek.format('YYYY-MM-DD'),
    isSelected: false,
    countSlotTime: 0,
  });
  return localDaysOfWeek;
};

export const generateDurationList = (
  daysOfWeek: any,
  teachingTime: number = DURATION_TRIAL,
) => {
  const localDurationList: Array<durationType> = [];
  for (let j = 0; j < daysOfWeek.length; j += 1) {
    const dayOfWeek: any = daysOfWeek[j];
    for (let i = 8; i < 24; i += 1) {
      if (i < 10) {
        localDurationList.push({
          id: `${dayOfWeek ? dayOfWeek.value : ''}-0${i}:00:00`,
          label: `0${i}: 00`,
          timeStart: `0${i}:00:00`,
          timeEnd: `0${i}:${teachingTime}:00`,
          dayOfYear: dayOfWeek ? dayOfWeek.value : '',
          isSelected: false,
          dayOfWeek: j,
          hasOpenedCourse: 0,
        });
        localDurationList.push({
          id: `${dayOfWeek ? dayOfWeek.value : ''}-0${i}:${teachingTime}:00`,
          label: `0${i}: ${teachingTime}`,
          timeStart: `0${i}:${teachingTime}:00`,
          timeEnd: i + 1 < 10 ? `0${i + 1}:00:00` : `${i + 1}:00:00`,
          dayOfYear: dayOfWeek ? dayOfWeek.value : '',
          isSelected: false,
          dayOfWeek: j,
          hasOpenedCourse: 0,
        });
        // add 40 minute
        if (teachingTime === DURATION_TEST) {
          localDurationList.push({
            id: `${dayOfWeek ? dayOfWeek.value : ''}-0${i}:${
              // eslint-disable-next-line prettier/prettier
              teachingTime + teachingTime
            }:00`,
            // eslint-disable-next-line prettier/prettier
            label: `0${i}: ${teachingTime + teachingTime}`,
            // eslint-disable-next-line prettier/prettier
            timeStart: `0${i}:${teachingTime + teachingTime}:00`,
            timeEnd: i + 1 < 10 ? `0${i + 1}:00:00` : `${i + 1}:00:00`,
            dayOfYear: dayOfWeek ? dayOfWeek.value : '',
            isSelected: false,
            dayOfWeek: j,
            hasOpenedCourse: 0,
          });
        }
      }
      if (i >= 10) {
        localDurationList.push({
          id: `${dayOfWeek ? dayOfWeek.value : ''}-${i}:00:00`,
          label: `${i}: 00`,
          timeStart: `${i}:00:00`,
          timeEnd: `${i}:${teachingTime}:00`,
          dayOfYear: dayOfWeek ? dayOfWeek.value : '',
          isSelected: false,
          dayOfWeek: j,
          hasOpenedCourse: 0,
        });
        localDurationList.push({
          id: `${dayOfWeek ? dayOfWeek.value : ''}-${i}:${teachingTime}:00`,
          label: `${i}: ${teachingTime}`,
          timeStart: `${i}:${teachingTime}:00`,
          timeEnd: `${i + 1}:00:00`,
          dayOfYear: dayOfWeek ? dayOfWeek.value : '',
          isSelected: false,
          dayOfWeek: j,
          hasOpenedCourse: 0,
        });
        // add 40 minute
        if (teachingTime === DURATION_TEST) {
          localDurationList.push({
            id: `${dayOfWeek ? dayOfWeek.value : ''}-${i}:${
              // eslint-disable-next-line prettier/prettier
              teachingTime + teachingTime
            }:00`,
            // eslint-disable-next-line prettier/prettier
            label: `${i}: ${teachingTime + teachingTime}`,
            // eslint-disable-next-line prettier/prettier
            timeStart: `${i}:${teachingTime + teachingTime}:00`,
            timeEnd: `${i + 1}:00:00`,
            dayOfYear: dayOfWeek ? dayOfWeek.value : '',
            isSelected: false,
            dayOfWeek: j,
            hasOpenedCourse: 0,
          });
        }
      }
    }
  }
  return localDurationList;
};
