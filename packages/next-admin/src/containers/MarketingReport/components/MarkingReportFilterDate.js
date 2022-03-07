import React from 'react';
import {
  PageContentHeader,
  PageContentHeaderSection,
  FlexGroup,
  FlexItem,
  Title,
  Text,
  DatePickerRange,
  FieldSearch,
  DatePicker,
  ComboBox,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SORT_VALUES } from '../constants';

const MarkingReportFilterDate = ({
  campaign,
  withDebounce,
  onInputChange,
  dateFrom,
  dateTo,
  onSelect,
  sortType,
  onSelectDatePicker,
}) => {
  MarkingReportFilterDate.propTypes = {
    campaign: PropTypes.string,
    withDebounce: PropTypes.func,
    onInputChange: PropTypes.func,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    onSelect: PropTypes.func,
    onSelectDatePicker: PropTypes.func,
    sortType: PropTypes.func,
  };
  MarkingReportFilterDate.defaultProps = {
    campaign: '',
    withDebounce,
    onInputChange,
    dateFrom: '',
    dateTo: '',
    onSelect,
    onSelectDatePicker,
    sortType,
  };

  return (
    <div>
      <PageContentHeader>
        <PageContentHeaderSection className="flex-grow">
          <FlexGroup
            justifyContent="flexEnd"
            alignItems="center"
            gutterSize="s"
          >
            {/* <FlexItem grow={false} className="w-72">
              <FieldSearch
                defaultValue={campaign}
                onChange={withDebounce(onInputChange('campaign'))}
                // placeholder={intl.formatMessage({
                //   defaultMessage: 'Tìm chiến dịch quảng cáo',
                // })}
                isClearable
                fullWidth
              />
            </FlexItem> */}
            <FlexItem grow={false} className="w-72">
              <DatePickerRange
                fullWidth={false}
                startDateControl={
                  <DatePicker
                    selected={dateFrom && moment(dateFrom)}
                    onChange={(date, event) => {
                      onSelectDatePicker('dateFrom')(date, event);
                      !dateTo && onSelectDatePicker('dateTo')(moment(), event);
                    }}
                    startDate={moment(dateFrom)}
                    endDate={moment(dateTo)}
                    isInvalid={moment(dateFrom) > moment(dateTo)}
                    aria-label="Start date"
                  />
                }
                endDateControl={
                  <DatePicker
                    selected={dateTo && moment(dateTo)}
                    onChange={onSelectDatePicker('dateTo')}
                    startDate={moment(dateFrom)}
                    endDate={moment(dateTo)}
                    onClear={() => {
                      onSelect('dateTo')(undefined);
                      onSelect('dateFrom')(undefined);
                    }}
                    isInvalid={
                      moment(dateFrom) > moment(dateTo) ||
                      moment(dateTo) > moment()
                    }
                    aria-label="End date"
                  />
                }
                aria-label="End date"
              />
            </FlexItem>

            <FlexItem grow={false} className="w-72">
              <ComboBox
                async
                isClearable={false}
                singleSelection={{ asPlainText: true }}
                prepend="Sắp xếp theo"
                options={SORT_VALUES}
                onChange={selectedOptions => {
                  return onSelect('sortType')(selectedOptions[0].value);
                }}
                selectedOptions={SORT_VALUES.filter(
                  option => option.value === sortType,
                )}
              />
            </FlexItem>
          </FlexGroup>
        </PageContentHeaderSection>
      </PageContentHeader>
    </div>
  );
};

export default MarkingReportFilterDate;
