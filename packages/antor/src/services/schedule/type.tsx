/* eslint-disable camelcase */

export type AvailableTime = {
  dayOfYear: string;
  availableTimeId: number;
  dayOfWeek: number;
  timeFrom: string;
  timeTo: string;
  status: number;
  role: number;
  hasOpenedCourse: number;
};

export type schedule = {
  id: string;
  course_id: number;
  start: string;
  end: string;
  student_name: string;
  title: string;
};
export type scheduleObj = {
  dayOfWeek?: number;
  timeStart: string;
  timeEnd: string;
  dayOfYear: string | undefined;
};
