import { Type } from './constants';

const {
  NEXT_WEEK,
  PREV_WEEK,
  SELECTED_DURATION,
  SELECTED_DAY_OF_WEEK,
  CREATE_AVAILABLE_TIME,
  UPDATE_DAY_OF_WEEK,
  REMOVE_AVAILABLE_TIME,
} = Type;
export const setNextWeek = (payload: Object) => ({
  type: NEXT_WEEK,
  payload,
});
export const setPrevWeek = (payload: Object) => ({
  type: PREV_WEEK,
  payload,
});
export const setSelectedDurations = (payload: Object) => ({
  type: SELECTED_DURATION,
  payload,
});
export const setSelectedDayOfWeek = (payload: Object) => ({
  type: SELECTED_DAY_OF_WEEK,
  payload,
});
export const createAvailableTime = (payload: Object) => ({
  type: CREATE_AVAILABLE_TIME,
  payload,
});
export const removeAvailableTime = () => ({
  type: REMOVE_AVAILABLE_TIME,
  payload: {
    daysOfWeek: [],
    durationList: [],
    role: 0,
  },
});
export const updateDayOfWeek = (payload: Object) => ({
  type: UPDATE_DAY_OF_WEEK,
  payload,
});
