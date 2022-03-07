import {
  FlexGroup,
  FlexItem,
  Title,
  Text,
  ButtonEmpty,
  Popover,
  HorizontalRule,
  Outline,
  FieldText,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import { FormattedMessage, useIntl } from 'react-intl';

export type FilterTeacherDateRangeProps = {
  handleChangeStartTime: Function;
  handleChangeEndTime: Function;
  handleChangeDate: Function;
  dateRange?: string;
  startTimeRange?: string;
  endTimeRange?: string;
};

const FilterTeacherDateRange: React.FC<FilterTeacherDateRangeProps> = ({
  handleChangeStartTime,
  handleChangeEndTime,
  handleChangeDate,
  dateRange,
  startTimeRange,
  endTimeRange,
}) => {
  const intl = useIntl();
  const { isVisiable, toggle, close } = useToggle();

  const { SunIcon, MoonIcon, CloudIcon } = Outline;

  const arrayOption = [
    {
      label: <FormattedMessage defaultMessage="All Time" />,
      hoursLabel: 'All Day',
      startTime: '00:00:00',
      endTime: '23:59:00',
      icons: [
        <SunIcon className="euiIcon euiButtonContent__icon" />,
        <MoonIcon className="euiIcon euiButtonContent__icon" />,
      ],
    },
    {
      label: <FormattedMessage defaultMessage="Sáng" />,
      hoursLabel: '8 - 12 giờ',
      startTime: '08:00:00',
      endTime: '12:00:00',
      icons: [<SunIcon className="euiIcon euiButtonContent__icon" />],
    },
    {
      label: <FormattedMessage defaultMessage="Chiều" />,
      hoursLabel: '12 - 18 giờ',
      startTime: '12:00:00',
      endTime: '18:00:00',
      icons: [<CloudIcon className="euiIcon euiButtonContent__icon" />],
    },
    {
      label: <FormattedMessage defaultMessage="Tối" />,
      hoursLabel: '18 - 22 giờ',
      startTime: '18:00:00',
      endTime: '22:00:00',
      icons: [<MoonIcon className="euiIcon euiButtonContent__icon" />],
    },
  ];

  const arrayOptionsDate = [
    {
      label: (
        <span>
          <FormattedMessage defaultMessage="Hôm nay" />
          ,&nbsp;
          {moment().format('DD-MM-YYYY')}
        </span>
      ),
      onclick: () => handleChangeDate(moment().format('YYYY-MM-DD')),
      value: moment(),
    },
    {
      label: (
        <span>
          <FormattedMessage defaultMessage="Ngày mai" />
          ,&nbsp; {moment().add(1, 'days').format('DD-MM-YYYY')}
        </span>
      ),
      value: moment().add(1, 'days'),
      onclick: () =>
        handleChangeDate(moment().add(1, 'days').format('YYYY-MM-DD')),
    },
  ];

  return (
    <Popover
      id="popoverExampleMultiSelect"
      panelStyle={{ maxWidth: '80vw' }}
      display="block"
      button={
        <FieldText
          icon="calendar"
          placeholder={intl.formatMessage({
            defaultMessage: 'Search this',
          })}
          style={{ minWidth: '240px' }}
          value={`${moment(dateRange).calendar({
            sameDay: `[${intl.formatMessage({
              defaultMessage: 'Hôm nay',
            })}]`,
            nextDay: `[${intl.formatMessage({
              defaultMessage: 'Ngày mai',
            })}]`,
          })}, ${moment(dateRange).format(
            'DD-MM-YYYY',
          )}, ${startTimeRange} - ${endTimeRange}`}
          // onChange={e => {}}
          // rea
          onClick={toggle}
          // isClearable={false}
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      isOpen={isVisiable}
      closePopover={close}
      panelPaddingSize="none"
    >
      <div className="p-4">
        <FlexGroup gutterSize="none">
          {arrayOptionsDate.map(item => (
            <FlexItem>
              <ButtonEmpty
                onClick={item.onclick}
                style={
                  item.value.isSame(dateRange, 'day')
                    ? { background: '#CCF2E6' }
                    : {}
                }
                className="rounded-lg p-4"
              >
                {item.label}
              </ButtonEmpty>
            </FlexItem>
          ))}
        </FlexGroup>
        <HorizontalRule margin={isMobile ? 'xs' : 'm'} />
        <FlexGroup
          style={{ overflowX: 'auto' }}
          responsive={false}
          gutterSize="none"
        >
          {arrayOption.map(option => (
            <FlexItem>
              <ButtonEmpty
                className="p-4 rounded-xl text-gray-600"
                style={
                  option.startTime === startTimeRange &&
                  option.endTime === endTimeRange
                    ? { background: '#CCF2E6', height: 'fit-content' }
                    : { height: 'fit-content' }
                }
                contentProps={{ style: { height: 'fit-content' } }}
                textProps={{ style: { height: 'fit-content' } }}
                isSelected={
                  option.startTime === startTimeRange &&
                  option.endTime === endTimeRange
                }
                onClick={() => {
                  handleChangeStartTime(option.startTime);
                  handleChangeEndTime(option.endTime);
                }}
              >
                <Title size="xs" className="mb-2">
                  <p className="text-gray-600">
                    {option.label}
                    {option.startTime === startTimeRange &&
                      option.endTime === endTimeRange}
                  </p>
                </Title>
                <Text>
                  <p>{option.hoursLabel}</p>
                </Text>
                <FlexGroup responsive={false}>
                  {option.icons.map((icon: any) => (
                    <FlexItem>
                      <div
                        className="mx-auto"
                        style={{ width: '24px', height: '24px' }}
                      >
                        {icon}
                      </div>
                    </FlexItem>
                  ))}
                </FlexGroup>
              </ButtonEmpty>
            </FlexItem>
          ))}
        </FlexGroup>
      </div>
    </Popover>
  );
};

export default FilterTeacherDateRange;
