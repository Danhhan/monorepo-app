import {
  ButtonEmpty,
  DatePicker,
  DatePickerRange,
  FieldSearch,
  FlexGroup,
  FlexItem,
  Health,
  SuperSelect,
} from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

function FilterBar({
  optionsData,
  onInputChange,
  keySearch,
  onSelect,
  keyOption,
  keyFromDateTime,
  keyToDateTime,
  query,
  optionValue,
}) {
  const onChangeSearch = event => {
    onInputChange(keySearch)(event);
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChangeFromDateTime = date => {
    let localDate = date;
    if (date.get('hour') === 0 && date.get('minute') === 0) {
      localDate = moment(date).set({
        hour: 0,
        minute: 0,
        second: 0,
      });
    }
    onSelect(keyFromDateTime)(localDate.format('YYYY-MM-DD HH:mm:ss'));
    setStartDate(localDate);
  };

  const handleChangeToDateTime = date => {
    let localDate = date;
    if (date.get('hour') === 0 && date.get('minute') === 0) {
      localDate = moment(date).set({
        hour: 23,
        minute: 59,
        second: 59,
      });
    }
    onSelect(keyToDateTime)(localDate.format('YYYY-MM-DD HH:mm:ss'));
    setEndDate(localDate);
  };
  const handleClearAll = () => {
    setStartDate(null);
    setEndDate(null);
    onInputChange(keySearch)();
    onSelect(keyFromDateTime)();
    onSelect(keyToDateTime)();
    onSelect(keyOption)();
  };
  return (
    <FlexItem>
      <FlexGroup justifyContent="flexEnd" gutterSize="xs">
        <FlexItem grow={false}>
          <ButtonEmpty
            style={{
              marginTop: '3px',
              color: 'black',
              textDecoration: 'underline',
            }}
            size="xs"
            iconType="broom"
            onClick={handleClearAll}
          >
            Xóa bộ lọc
          </ButtonEmpty>
        </FlexItem>
        <FlexItem grow={false}>
          <FieldSearch
            name="term-search"
            className="w-60 min-w-full rounded-lg"
            onChange={withDebounce(onChangeSearch)}
            placeholder="Tìm tên, email, SĐT, ID,..."
            fullWidth
            compressed
          />
        </FlexItem>
        <FlexItem grow={false}>
          <SuperSelect
            className="w-48 rounded-lg"
            options={[...optionsData].map(({ label, value, color }) => ({
              value,
              inputDisplay: (
                <Health color={color} style={{ lineHeight: 'inherit' }}>
                  <FormattedMessage {...label} />
                </Health>
              ),
            }))}
            valueOfSelected={optionValue}
            onChange={onSelect(keyOption)}
            fullWidth
            compressed
          />
        </FlexItem>
        <FlexItem grow={false}>
          <DatePickerRange
            height={30}
            className="w-auto max-w-md rounded-lg"
            startDateControl={
              <DatePicker
                showTimeSelect
                selected={startDate}
                onChange={handleChangeFromDateTime}
                dateFormat="DD-MM-YYYY HH:mm"
                onClear={() => {
                  setStartDate(null);
                  onSelect(keyFromDateTime)();
                }}
                timeFormat="HH:mm"
                injectTimes={[
                  moment().set({
                    hour: 23,
                    minute: 59,
                    second: 59,
                  }),
                ]}
              />
            }
            endDateControl={
              <DatePicker
                showTimeSelect
                selected={endDate}
                onChange={handleChangeToDateTime}
                dateFormat="DD-MM-YYYY HH:mm"
                onClear={() => {
                  setEndDate(null);
                  onSelect(keyToDateTime)();
                }}
                timeFormat="HH:mm"
                injectTimes={[
                  moment().set({
                    hour: 23,
                    minute: 59,
                    second: 59,
                  }),
                ]}
              />
            }
          />
        </FlexItem>
      </FlexGroup>
    </FlexItem>
  );
}
FilterBar.defaultProps = {
  optionsData: [],
  onInputChange: () => {},
  keySearch: undefined,
  onSelect: () => {},
  keyOption: undefined,
  keyFromDateTime: undefined,
  keyToDateTime: undefined,
  query: undefined,
  optionValue: undefined,
};
/* eslint-disable react/forbid-prop-types */
FilterBar.propTypes = {
  optionsData: PropTypes.array,
  onInputChange: PropTypes.func,
  keySearch: PropTypes.string,
  onSelect: PropTypes.func,
  keyOption: PropTypes.string,
  keyFromDateTime: PropTypes.string,
  keyToDateTime: PropTypes.string,
  query: PropTypes.any,
  optionValue: PropTypes.any,
};
export default FilterBar;
