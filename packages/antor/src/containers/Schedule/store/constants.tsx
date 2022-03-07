import { dayOfWeekType } from 'containers/Schedule/constants';
import { Dispatch } from 'react';

export type State = {
  daysOfWeek: dayOfWeekType[];
  durationList: any[];
  startOfWeek: any;
  endOfWeek: any;
  seletedDayOfYear: string;
  role: number;
};

export type ActionType = {
  type: string;
  payload?: any;
};
export type ContextType = {
  state: State;
  dispatch: Dispatch<ActionType>;
};
// eslint-disable-next-line no-shadow
export enum Type {
  NEXT_WEEK = 'NEXT_WEEK',
  PREV_WEEK = 'PREV_WEEK',
  SELECTED_DURATION = 'SELECTED_DURATION',
  SELECTED_DAY_OF_WEEK = 'SELECTED_DAY_OF_WEEK',
  CREATE_AVAILABLE_TIME = 'CREATE_AVAILABLE_TIME',
  REMOVE_AVAILABLE_TIME = 'REMOVE_AVAILABLE_TIME',
  UPDATE_DAY_OF_WEEK = 'UPDATE_DAY_OF_WEEK',
}
