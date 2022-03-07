import { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DatePicker, DatePickerRange } from '@antoree/ant-ui';
import moment from 'moment';
import { useIntl } from 'react-intl';
import messages from './messages';

function CustomDatePickerRange(props) {
  const { value, onChange, showTimeSelect, compressed, dateFormat } = props;

  const intl = useIntl();

  const [valueTmp, setValueTmp] = useState([...value]);

  const changeStartDateHandler = useCallback(
    (momentObj, event) => {
      const nextValue = [momentObj, valueTmp[1]];

      setValueTmp(nextValue);

      onChange(nextValue, event);
    },
    [onChange, valueTmp],
  );

  const changeEndDateHandler = useCallback(
    (momentObj, event) => {
      const nextValue = [valueTmp[0], momentObj];

      setValueTmp(nextValue);

      onChange(nextValue, event);
    },
    [onChange, valueTmp],
  );

  const isInvalid = useMemo(() => {
    let result = false;

    if (value?.[0] && value?.[1]) {
      result = value[1].isBefore(value[0]);
    }

    return result;
  }, [value]);

  return (
    <DatePickerRange
      style={compressed ? { height: '32px' } : {}}
      fullWidth
      startDateControl={
        <DatePicker
          className={classnames({ 'h-8': compressed })}
          dateFormat={dateFormat}
          placeholder={intl.formatMessage(messages.label.startDatePlaceholder)}
          selected={value[0]}
          onChange={changeStartDateHandler}
          startDate={value[0]}
          endDate={value[1]}
          isInvalid={isInvalid}
          aria-label="Start date"
          showTimeSelect={showTimeSelect}
        />
      }
      endDateControl={
        <DatePicker
          className={classnames({ 'h-8': compressed })}
          dateFormat={dateFormat}
          placeholder={intl.formatMessage(messages.label.endDatePlaceholder)}
          selected={value[1]}
          onChange={changeEndDateHandler}
          startDate={value[0]}
          endDate={value[1]}
          isInvalid={isInvalid}
          aria-label="End date"
          showTimeSelect={showTimeSelect}
        />
      }
    />
  );
}

CustomDatePickerRange.defaultProps = {
  value: [null, null],
  showTimeSelect: false,
  onChange: () => {},
  compressed: false,
  dateFormat: 'DD/MM/YYYY',
};

CustomDatePickerRange.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  showTimeSelect: PropTypes.bool,
  onChange: PropTypes.func,
  compressed: PropTypes.bool,
  dateFormat: PropTypes.string,
};

export default CustomDatePickerRange;
