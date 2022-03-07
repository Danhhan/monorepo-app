import {
  ButtonEmpty,
  ComboBox,
  DatePicker,
  DatePickerRange,
  euiPaletteColorBlindBehindText,
  FieldSearch,
  FlexGroup,
  FlexItem,
} from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useState } from 'react';
import moment from 'moment';
import { useRemoveParams } from 'hooks';

function PannelFilter({
  optionsData,
  onInputChange,
  keySearch,
  onSelect,
  keyOption,
  keyFromDateTime,
  keyToDateTime,
  query,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { onRemove, onRemoveAll } = useRemoveParams();
  const visColorsBehindText = euiPaletteColorBlindBehindText();
  const optionsStatus = optionsData.map(option => {
    return {
      value: option.value,
      label: option.label.defaultMessage[0].value,
      color: visColorsBehindText[0],
    };
  });
  const onChangeStatus = value => {
    setSelectedOptions(value);
    onSelect(keyOption)(value[0]?.value);
  };
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
    onRemoveAll(query);
    document.getElementsByName('term-search')[0].value = '';
    setStartDate(null);
    setEndDate(null);
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
            // defaultValue={valueSearch}
            onChange={withDebounce(onChangeSearch)}
            placeholder="Tìm tên, email, SĐT, ID,..."
            // isClearable={search || false}
            fullWidth
            compressed
          />
        </FlexItem>
        <FlexItem grow={false}>
          <ComboBox
            className="w-44 min-w-full"
            placeholder="Trạng thái"
            singleSelection={{ asPlainText: true }}
            options={optionsStatus}
            selectedOptions={selectedOptions}
            onChange={onChangeStatus}
            compressed
            borderRadius={8}
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
                  onRemove(keyFromDateTime);
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
                  // onRemove('createdAtTo');
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
PannelFilter.defaultProps = {
  optionsData: [],
  onInputChange: () => {},
  keySearch: undefined,
  onSelect: () => {},
  keyOption: undefined,
  keyFromDateTime: undefined,
  keyToDateTime: undefined,
  query: undefined,
};
/* eslint-disable react/forbid-prop-types */
PannelFilter.propTypes = {
  optionsData: PropTypes.array,
  onInputChange: PropTypes.func,
  keySearch: PropTypes.string,
  onSelect: PropTypes.func,
  keyOption: PropTypes.string,
  keyFromDateTime: PropTypes.string,
  keyToDateTime: PropTypes.string,
  query: PropTypes.any,
};
export default PannelFilter;
