import {
  encodeDelimitedArray,
  decodeDelimitedArray,
  NumberParam,
} from 'use-query-params';
import moment from 'moment';

// Use for ComboBox
export const getComboBoxParam = (
  options = [],
  optionValueParam = NumberParam,
) => ({
  encode(selectOptions) {
    const selectedValues = selectOptions.map(({ value }) => value);

    return encodeDelimitedArray(selectedValues, ',');
  },
  decode(strValue) {
    let decoded = decodeDelimitedArray(strValue, ',') || [];

    decoded = decoded.map(el => optionValueParam.decode(el));

    const result = options.filter(({ value }) => decoded.includes(value));

    return result;
  },
});

export const getDataPickerParam = defaultValue => ({
  encode(momentObj) {
    return momentObj.format('DD-MM-YYYY');
  },
  decode(strValue) {
    const result = moment(strValue, 'DD-MM-YYYY').isValid()
      ? moment(strValue, 'DD-MM-YYYY')
      : defaultValue;

    return result;
  },
});
