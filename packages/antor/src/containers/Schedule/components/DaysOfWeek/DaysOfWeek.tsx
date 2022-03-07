/* eslint-disable react/jsx-closing-tag-location */
import {
  ButtonIcon,
  FlexGroup,
  FlexItem,
  KeyPadMenuItem,
  NotificationBadge,
  Skeleton,
  Spacer,
} from '@antoree/ant-ui';
import { daysToString } from '@antoree/helpers';
import {
  generateDaysOfWeek,
  generateDurationList,
  ScheduleActions,
  useScheduleContext,
} from 'containers/Schedule/store';
import moment from 'moment';
import { memo } from 'react';

export type dayOfWeekType = {
  label?: string;
  value?: string;
  isSelected?: boolean;
  countSlotTime: number;
};
// prettier-ignore
export const currentStartOfWeek = moment().startOf('week').add(1, 'days');
// prettier-ignore
export const currentEndOfWeek = moment().endOf('week').add(1, 'days');
export type daysOfWeekProps = {
  isFetching?: boolean;
  teachingTime: number;
};
const DaysOfWeek: React.FC<daysOfWeekProps> = ({
  isFetching,
  teachingTime,
}) => {
  const { state, dispatch } = useScheduleContext();
  const { startOfWeek, endOfWeek, daysOfWeek } = state;
  const handleStyle = (index: number, item: dayOfWeekType) => {
    const styles = {
      color: '',
      backgroundColor: '',
      outline: 'none',
      width: '132px',
      height: '72px',
    };
    const sunDay = 6;
    if (index === sunDay) styles.color = 'red';
    if (item.isSelected) {
      styles.color = '#0AA263';
      styles.backgroundColor = 'rgba(0, 192, 129, 0.15)';
    }
    return styles;
  };
  const handleSelected = (index: number) => {
    const localDaysOfWeek: any = daysOfWeek instanceof Array && [...daysOfWeek];
    localDaysOfWeek.map((item: any) => {
      const newItem = item;
      newItem.isSelected = false;
      return newItem;
    });
    localDaysOfWeek[index].isSelected = true;

    dispatch(
      ScheduleActions.setSelectedDayOfWeek({
        daysOfWeek: localDaysOfWeek,
        seletedDayOfYear: localDaysOfWeek[index].value,
      }),
    );
  };

  const handleClickPrevious = () => {
    const payload: any = {
      startOfWeek: moment(startOfWeek).subtract(7, 'days'),
      endOfWeek: moment(endOfWeek).subtract(7, 'days'),
      daysOfWeek: generateDaysOfWeek(
        moment(startOfWeek).subtract(7, 'days'),
        moment(endOfWeek).subtract(7, 'days'),
      ),
      durationList: generateDurationList(
        generateDaysOfWeek(
          moment(startOfWeek).subtract(7, 'days'),
          moment(endOfWeek).subtract(7, 'days'),
        ),
        teachingTime,
      ),
    };
    dispatch(ScheduleActions.setPrevWeek(payload));
  };

  const handleClickNext = () => {
    const payload: any = {
      startOfWeek: moment(startOfWeek).add(7, 'days'),
      endOfWeek: moment(endOfWeek).add(7, 'days'),
      daysOfWeek: generateDaysOfWeek(
        moment(startOfWeek).add(7, 'days'),
        moment(endOfWeek).add(7, 'days'),
      ),
      durationList: generateDurationList(
        generateDaysOfWeek(
          moment(startOfWeek).add(7, 'days'),
          moment(endOfWeek).add(7, 'days'),
        ),
        teachingTime,
      ),
    };
    dispatch(ScheduleActions.setNextWeek(payload));
  };
  return (
    <>
      <FlexGroup justifyContent="center" responsive={false}>
        <FlexItem grow={false}>
          <ButtonIcon
            color="text"
            style={{ minWidth: '73px' }}
            onClick={handleClickPrevious}
            size="s"
            iconSize="m"
            className="px-4 w-full z-10"
            iconType="arrowLeft"
            aria-label="Previous"
          />
        </FlexItem>
        <FlexItem grow={false}>
          <strong className="text-xl">{`${
            startOfWeek ? startOfWeek.format('DD/MM/YYYY') : ''
          } - ${endOfWeek ? endOfWeek.format('DD/MM/YYYY') : ''}`}</strong>
        </FlexItem>
        <FlexItem grow={false}>
          <ButtonIcon
            color="text"
            onClick={handleClickNext}
            style={{ minWidth: '73px' }}
            size="s"
            iconSize="m"
            iconType="arrowRight"
            aria-label="Next"
          />
        </FlexItem>
      </FlexGroup>
      <Spacer size="xl" />
      {isFetching ? (
        <FlexGroup justifyContent="center" gutterSize="s" responsive>
          {Array.from(Array(7).keys()).map(index => (
            <FlexItem key={index} grow={false}>
              <Skeleton style={{ width: '132px', height: '72px' }} />
            </FlexItem>
          ))}
        </FlexGroup>
      ) : (
        <FlexGroup justifyContent="center" gutterSize="s" responsive>
          {daysOfWeek instanceof Array &&
            daysOfWeek.map((item, index) => (
              <FlexItem key={index} grow={false}>
                <KeyPadMenuItem
                  style={handleStyle(index, item)}
                  label={<p>{item.label}</p>}
                  isSelected={item.isSelected}
                  onClick={() => handleSelected(index)}
                >
                  <FlexGroup gutterSize="s">
                    <FlexItem>
                      <span>{daysToString(item?.value, true)}</span>
                    </FlexItem>
                    <>
                      <FlexItem>
                        <p>
                          {item?.countSlotTime > 0 && (
                            <NotificationBadge>
                              {item.countSlotTime}
                            </NotificationBadge>
                          )}
                        </p>
                      </FlexItem>
                    </>
                  </FlexGroup>
                </KeyPadMenuItem>
              </FlexItem>
            ))}
        </FlexGroup>
      )}
    </>
  );
};

export default memo(DaysOfWeek);
