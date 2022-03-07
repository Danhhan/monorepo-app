import {
  Button,
  Checkbox,
  FlexGroup,
  FlexItem,
  Health,
  Spacer,
  htmlIdGenerator,
} from '@antoree/ant-ui';
import {
  AVAILABLE_TIME_STATUS,
  durationType,
  HAS_OPENED_COURSE,
} from 'containers/Schedule/constants';
import { ScheduleActions, useScheduleContext } from 'containers/Schedule/store';

import { useState, useEffect } from 'react';

export type AvailableTimesProps = {
  seletedDayOfYear: string | undefined;
};
const AvailableTimes: React.FC<AvailableTimesProps> = ({
  seletedDayOfYear,
}) => {
  const { state, dispatch } = useScheduleContext();
  const { durationList } = state;
  const [isClickedDuration, setClickDuration] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const styleBooked = {
    backgroundColor: '#00C081',
    outline: 'none',
    border: 'none',
    color: '#ffff',
  };
  const styleNotBooked = {
    backgroundColor: '#F5F5F5',
    outline: 'none',
    border: 'none',
    color: '#69707D',
  };
  const styleTeachingCourse = {
    backgroundColor: '#FFC700',
    outline: 'none',
    border: 'none',
    color: '#000',
  };

  const handleClick = (index: number) => {
    const localDurationList: durationType[] = [...durationList];

    localDurationList[index].isSelected = !localDurationList[index].isSelected;
    setClickDuration((prev: boolean) => !prev);
    dispatch(ScheduleActions.setSelectedDurations({ durationList }));
  };

  const handleChangeSelectAll = (event: any) => {
    setCheckAll(event.target.checked);
    const localDurationList = [...durationList];
    localDurationList
      .filter((item: durationType) => item.dayOfYear === seletedDayOfYear)
      .map((item: durationType) => {
        const newItem = item;
        newItem.isSelected = event.target.checked;

        return newItem;
      });
    dispatch(
      ScheduleActions.setSelectedDurations({ durationList: localDurationList }),
    );
  };
  useEffect(() => {
    const filteredDurationList = durationList.filter(
      (duration: durationType) => duration.dayOfYear === seletedDayOfYear,
    );
    const isCheckAll = filteredDurationList.every(
      (duration: durationType) =>
        duration.isSelected && duration.dayOfYear === seletedDayOfYear,
    );
    setCheckAll(isCheckAll);
  }, [seletedDayOfYear, isClickedDuration, durationList]);

  const handleStyleDuration = (duration: durationType) => {
    if (duration.isSelected && duration.hasOpenedCourse === HAS_OPENED_COURSE) {
      return {
        backgroundColor: '#00C081',
        outline: 'none',
        border: '4px solid #FFC700',
        color: '#ffff',
      };
    }
    if (duration.isSelected) {
      return styleBooked;
    }
    if (duration.hasOpenedCourse === HAS_OPENED_COURSE) {
      return styleTeachingCourse;
    }
    return styleNotBooked;
  };

  return (
    <>
      <FlexGroup justifyContent="spaceBetween">
        <FlexItem grow={false}>
          <FlexGroup>
            {AVAILABLE_TIME_STATUS.map(status => (
              <FlexItem key={status.value} grow={false}>
                <Health color={status.color}>{status?.label}</Health>
              </FlexItem>
            ))}
          </FlexGroup>
        </FlexItem>
        <FlexItem grow={false} className="justify-center">
          <Checkbox
            id={htmlIdGenerator(seletedDayOfYear)()}
            label="Select all"
            checked={checkAll}
            onChange={e => handleChangeSelectAll(e)}
          />
        </FlexItem>
      </FlexGroup>
      <Spacer />
      <FlexGroup wrap gutterSize="s" responsive={false}>
        {durationList instanceof Array &&
          durationList.map((duration: durationType, index: number) => {
            return (
              duration.dayOfYear === seletedDayOfYear && (
                <FlexItem
                  key={index}
                  grow={false}
                  style={{
                    borderRadius: '10px',
                    cursor: 'pointer',
                    flexBasis: 'calc(100%/13)',
                  }}
                >
                  <Button
                    style={handleStyleDuration(duration)}
                    onClick={() => handleClick(index)}
                  >
                    {duration?.label}
                  </Button>
                </FlexItem>
              )
            );
          })}
      </FlexGroup>
    </>
  );
};

export default AvailableTimes;
