import React, { FunctionComponent } from 'react';
import { ButtonIcon, FlexGroup, FlexItem } from '@antoree/ant-ui';

interface TimeSelectedProps {
  dataLenght: number;
  nextHandle: () => void;
  prevHandle: () => void;
  maximumDisplayedItems: number;
}

const TimeSelected: FunctionComponent<TimeSelectedProps> = ({
  dataLenght,
  nextHandle,
  prevHandle,
  maximumDisplayedItems,
}) => {
  return (
    <>
      {dataLenght > maximumDisplayedItems && (
        <FlexGroup justifyContent="spaceBetween" responsive={false}>
          <FlexItem grow={false}>
            <ButtonIcon
              color="text"
              style={{ border: '1px solid #cdcfd1', minWidth: '73px' }}
              onClick={prevHandle}
              size="s"
              iconSize="m"
              className="px-4 w-full z-10"
              iconType="arrowLeft"
            />
          </FlexItem>
          <FlexItem grow={false}>
            <ButtonIcon
              color="text"
              onClick={nextHandle}
              className="px-4 w-full  z-10"
              style={{ border: '1px solid #cdcfd1', minWidth: '73px' }}
              size="s"
              iconSize="m"
              iconType="arrowRight"
            />
          </FlexItem>
        </FlexGroup>
      )}
    </>
  );
};

export default TimeSelected;
