export const ROLE_TRIAL = 3;
export const ROLE_TEST = 2;
export const DURATION_TEST = 20;
export const DURATION_TRIAL = 30;
// eslint-disable-next-line no-shadow
export enum TabId {
  TEACHING_SCHEDULE_ID = 'teaching-schedule--id',
  AVAILABLE_TIME_TETS_ID = 'available-time-test--id',
  AVAILABLE_TIME_TRIAL_ID = 'available-time-trial--id',
}
export const HAS_OPENED_COURSE = 1;
export const UNSELECTED = 1;
export const SELECTED = 2;
export const TEACHING_COURSE = 3;
export const REQUIRE_EVALUATION = 1;
export const REQUIRE_CONFIRM_SESSION = 2;

export const NOTIFICATION_TYPE_TEXTS = [
  {
    value: REQUIRE_EVALUATION,
    text: 'a periodic evaluation.',
    buttonText: 'Add evaluation',
  },
  {
    value: REQUIRE_CONFIRM_SESSION,
    text: 'is waiting for the session confirmation.',
    buttonText: 'Confirm now',
  },
];

export const AVAILABLE_TIME_STATUS = [
  {
    label: 'Unselected',
    value: UNSELECTED,
    color: '#D3DAE6',
  },
  {
    label: 'Selected',
    value: SELECTED,
    color: '#0AA263',
  },
  {
    label: 'Teaching courses',
    value: TEACHING_COURSE,
    color: '#FFC700',
  },
];

export type durationType = {
  id: string;
  label?: string;
  timeStart: string;
  timeEnd: string;
  isSelected?: boolean;
  dayOfYear?: string;
  dayOfWeek?: number;
  hasOpenedCourse: number;
};
export type dayOfWeekType = {
  label?: string;
  value?: string;
  isSelected?: boolean;
  countSlotTime: number;
};
