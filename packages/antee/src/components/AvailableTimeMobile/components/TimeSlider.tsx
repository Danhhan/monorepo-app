import React, { FunctionComponent } from 'react';
import {
  Badge,
  Button,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  notification,
  Slider,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import styles from '../AvailableTime.module.scss';
import { STATUS_CONSTANTS } from '../constant';

interface TimeSliderProps {
  sliderRef: any;
  settings: any;
  arraySplited: any;
  handleSelectTime: (timevalue: any, index: number) => void;
  timeSelected: any;
}

const TimeSlider: FunctionComponent<TimeSliderProps> = ({
  sliderRef,
  settings,
  arraySplited,
  handleSelectTime,
  timeSelected,
}) => {
  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {arraySplited?.map((arraySplitedItem: any[]) => (
          <div>
            <FlexGroup
              // columns={fullSize ? 4 : 3}
              gutterSize="s"
              style={{
                overflowY: 'auto',
                maxHeight: '40vh',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              }}
            >
              {arraySplitedItem?.map((timeListItem, index) => (
                <FlexItem className="cursor-pointer" key={timeListItem.value}>
                  <Badge
                    color="#FFFFFF"
                    className={`text-center p-1 rounded-lg text-gray-400 border-transparent outline-none ${styles.shadowlessBadge}`}
                    onClick={(e: any) => {
                      e.preventDefault();
                      handleSelectTime(timeListItem.value, index);
                    }}
                    /*
                    *        itemTimeSelected =>
                          itemTimeSelected.value === timeListItem.value,
                    *
                    * */
                    onClickAriaLabel="select item time"
                    isDisabled={timeListItem?.isDisable}
                    style={
                      timeSelected.find(
                        (itemTimeSelected: any) =>
                          itemTimeSelected.value === timeListItem.value,
                      )
                        ? {
                            backgroundColor: STATUS_CONSTANTS.find(
                              item => item.value === 2,
                            )?.colorCode,
                            color: '#fff',
                          }
                        : {
                            color: 'rgba(52, 55, 65, 1)',
                            border: '1px solid #CDCFD1',
                          }
                    }
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                  >
                    <FlexItem>
                      <Text size="m">
                        <p className="w-12 m-auto">{timeListItem.label}</p>
                      </Text>
                    </FlexItem>
                  </Badge>
                </FlexItem>
              ))}
            </FlexGroup>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TimeSlider;
