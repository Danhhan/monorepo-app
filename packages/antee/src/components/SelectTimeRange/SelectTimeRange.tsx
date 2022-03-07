/* eslint-disable react/prop-types */
import {
  FormRow,
  DatePicker,
  FlexGroup,
  FlexItem,
  Spacer,
  FieldText,
  Button,
  InputPopover,
  ButtonEmpty,
  FormControlLayout,
} from '@antoree/ant-ui';
import { useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import moment from 'moment';

export type SelectTimeRangeProps = {
  paginationEffect?: boolean;
  time?: any;
  setStartTimeProp: Function;
  startTimeProp?: any;
  endTimeProp?: any;
  setEndTimeProp: Function;
  timeIntervals?: number;
};

const SelectTimeRange: React.FC<SelectTimeRangeProps> = ({
  paginationEffect,
  time,
  setStartTimeProp,
  startTimeProp,
  setEndTimeProp,
  endTimeProp,
  timeIntervals,
}) => {
  const intl = useIntl();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startTime, setStartTime] = useState(startTimeProp);
  const [endTime, setEndTime] = useState(endTimeProp);

  const handleReset = () => {
    if (paginationEffect) {
      // eslint-disable-next-line prettier/prettier
      setStartTime(moment().hours(0).minutes(0).seconds(0));
      // eslint-disable-next-line prettier/prettier
      setEndTime(moment().hours(23).minutes(59).seconds(0));
    } else {
      setStartTime(startTimeProp);
      setEndTime(endTimeProp);
    }
  };

  const onOpenPopover = () => {
    if (!isPopoverOpen && startTimeProp && endTimeProp) {
      setStartTime(startTimeProp);
      setEndTime(endTimeProp);
    }

    setIsPopoverOpen(true);
  };
  const closePopover = () => setIsPopoverOpen(false);

  const isDefault = () => {
    const isDefaultStartTime =
      startTime.isSame(startTimeProp, 'hour') &&
      startTime.isSame(startTimeProp, 'minute');

    const isDefaultEndTime =
      endTime.isSame(endTimeProp, 'hour') &&
      endTime.isSame(endTimeProp, 'minute');

    if (paginationEffect) {
      return false;
    }

    return isDefaultStartTime && isDefaultEndTime;
  };

  const handleApply = () => {
    const timeRecent = time || moment();

    const startTimeSelected = moment(
      `${timeRecent.format('YYYY-MM-DD')} ${startTime.format('HH:mm:ss')}`,
    );
    const endTimeSelected = moment(
      `${timeRecent.format('YYYY-MM-DD')} ${endTime.format('HH:mm:ss')}`,
    );

    setStartTimeProp(startTimeSelected);
    setEndTimeProp(endTimeSelected);

    closePopover();
  };

  useEffect(() => {
    if (!paginationEffect) {
      handleApply();
    }
  }, [time]);

  return (
    <InputPopover
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="m"
      disableFocusTrap
      fullWidth
      style={{ minWidth: '240px' }}
      input={
        <FormControlLayout
          //   isLoading={isLoading}
          icon={{ type: 'arrowDown', side: 'right' }}
        >
          <FieldText
            icon={{ type: 'clock', side: 'left' }}
            // isInvalid={isInvalid}
            // onBlur={onBlur}
            value={
              startTimeProp && endTimeProp
                ? `${startTimeProp.format('HH:mm')} - ${endTimeProp.format(
                    'HH:mm',
                  )}`
                : undefined
            }
            onFocus={onOpenPopover}
            onClick={onOpenPopover}
            placeholder={intl.formatMessage({
              defaultMessage: '-- Enter Time Range --',
            })}
            readOnly
          />
        </FormControlLayout>
      }
    >
      <FlexGroup gutterSize="s">
        <FlexItem>
          <FormRow
            label={intl.formatMessage({
              defaultMessage: 'From',
            })}
          >
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              selected={startTime}
              onChange={setStartTime}
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              timeIntervals={timeIntervals}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            label={intl.formatMessage({
              defaultMessage: 'To',
            })}
          >
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              selected={endTime}
              minTime={startTime}
              // eslint-disable-next-line prettier/prettier
              maxTime={moment().hours(23).minutes(59).seconds(0)}
              onChange={setEndTime}
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              timeIntervals={timeIntervals}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <Spacer size="l" />
      <FlexGroup gutterSize="s">
        <FlexItem>
          <ButtonEmpty onClick={handleReset} disabled={isDefault()} size="s">
            Reset
          </ButtonEmpty>
        </FlexItem>
        <FlexItem>
          <Button
            // disabled={startTime.isSame(startTimeProp)}
            onClick={handleApply}
            fill
            size="s"
          >
            Apply
          </Button>
        </FlexItem>
      </FlexGroup>
    </InputPopover>
  );
};

export default SelectTimeRange;
