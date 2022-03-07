import {
  DatePicker,
  DatePickerRange,
  FieldSearch,
  FlexGroup,
  FlexItem,
  FormControlLayout,
} from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const FilterBar = ({ onInputChange, onSelect }) => {
  const onChangeSearch = event => {
    onInputChange('search_query')(event);
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
    onSelect('createdAtFrom')(localDate.format('YYYY-MM-DD HH:mm:ss'));
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
    onSelect('createdAtTo')(localDate.format('YYYY-MM-DD HH:mm:ss'));
    setEndDate(localDate);
  };
  return (
    <FlexGroup justifyContent="flexStart" gutterSize="m">
      <FlexItem grow={false}>
        <FieldSearch
          name="term-search"
          className="w-80 min-w-full rounded-lg"
          // defaultValue={valueSearch}
          onChange={withDebounce(onChangeSearch)}
          placeholder="Search campaign name"
          // isClearable={search || false}
          fullWidth
        />
      </FlexItem>
      <FlexItem grow={false}>
        <FormControlLayout
          clear={{
            onClick: () => {
              setStartDate(null);
              setEndDate(null);
              onSelect('createdAtFrom')('');
              onSelect('createdAtTo')('');
            },
          }}
        >
          <DatePickerRange
            className="w-auto max-w-md rounded-lg"
            startDateControl={
              <DatePicker
                showTimeSelect
                selected={startDate}
                onChange={handleChangeFromDateTime}
                dateFormat="DD-MM-YYYY HH:mm"
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
        </FormControlLayout>
      </FlexItem>
    </FlexGroup>
  );
};

FilterBar.defaultProps = {
  onInputChange: () => {},
  onSelect: () => {},
};
FilterBar.propTypes = {
  onInputChange: PropTypes.func,
  onSelect: PropTypes.func,
};

export default FilterBar;
