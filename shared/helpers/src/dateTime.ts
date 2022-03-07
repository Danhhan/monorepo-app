import moment from 'moment';

export const daysToString = (day: any, isShort: boolean = false): string => {
  if (!day) {
    return 'Unknown';
  }
  if (isShort) {
    return moment(day).format('ddd');
  }
  return moment(day).format('dddd');
};
