/* eslint-disable func-names */
import * as yup from 'yup';
import moment from 'moment';

export const momentDate = parseFormats =>
  // eslint-disable-next-line prettier/prettier
  yup.date().transform(function (value, originalValue) {
    if (this.isType(value)) return value;

    // eslint-disable-next-line no-param-reassign
    value = moment(originalValue, parseFormats);

    return value.isValid() ? value.toDate() : new Date('');
  });

export const isDateRangeValue = () => yup.array().of(momentDate());
