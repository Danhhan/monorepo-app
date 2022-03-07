export type Schedule = {
  dayfrom: number;
  dayto: number;
  timeFrom: string;
  timeTo: string;
};
export type User = {
  name: string;
  avatarUrl: string;
  skypeId: string;
  email: string;
  phone: string;
};
export type ScheduleGroupText = {
  dayOfWeeks: string;
  groupedTime: string;
};

export type Course = {
  id: number;
  student: User;
  teacher: User;
  carer: User;
  totalDuration: number;
  totalPassedDuration: number;
  type: number;
  formattedStartedAt: number;
  formattedNextSession: number;
  scheduleGroupTexts: string;
  // eslint-disable-next-line camelcase
  schedule_group_texts: ScheduleGroupText;
  title: string;
  averageRating: number;
  totalSession: number;
  refId: string;
  requestId: number;
  status: number;
  formattedTotalDuration: string;
  schedule: Schedule[];
  courseNote: string;
};
