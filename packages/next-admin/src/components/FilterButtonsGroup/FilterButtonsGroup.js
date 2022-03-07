import { FlexGroup, FlexItem, ButtonIcon } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import moment from 'moment';
import { useToggle } from 'hooks';

import ExportModule from '../ExportModule';
import FilterModal from './FilterModal';

const FilterButtonsGroup = ({
  // eslint-disable-next-line react/prop-types
  data,
  isAvailable,
  handleExtractDataExport,
  applyHandle,
}) => {
  const { isVisiable, open, close } = useToggle();

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handle = () => {
    applyHandle(startDate, endDate);
    close();
  };

  const handleRefresh = () => {
    const yesterday = moment();
    const today = moment();
    setStartDate(yesterday);
    setEndDate(today);
    applyHandle(yesterday, today);
  };

  return (
    <FlexGroup
      className="justify-end items-center"
      responsive={false}
      gutterSize="s"
    >
      {isVisiable && (
        <FilterModal
          setStartDate={setStartDate}
          startDate={startDate}
          setEndDate={setEndDate}
          endDate={endDate}
          closeModal={close}
          handle={handle}
        />
      )}
      <FlexItem grow={false}>
        <ExportModule
          isAvailable={!!handleExtractDataExport && isAvailable}
          data={data}
          dataToExtract={
            handleExtractDataExport ? handleExtractDataExport() : []
          }
        />
      </FlexItem>
      <FlexItem grow={false}>
        <ButtonIcon
          color="success"
          size="s"
          display="fill"
          isDisabled={!isAvailable}
          iconType="logstashFilter"
          onClick={open}
          aria-label="showModal"
        />
      </FlexItem>
      <FlexItem grow={false}>
        <ButtonIcon
          isDisabled={!isAvailable}
          color="success"
          size="s"
          display="fill"
          onClick={handleRefresh}
          iconType="refresh"
          aria-label="handleRefresh"
        />
      </FlexItem>
    </FlexGroup>
  );
};

FilterButtonsGroup.defaultProps = {
  applyHandle: () => {},
  isAvailable: false,
  handleExtractDataExport: undefined,
};

FilterButtonsGroup.propTypes = {
  applyHandle: PropTypes.func,
  isAvailable: PropTypes.bool,
  handleExtractDataExport: PropTypes.func,
};

export default FilterButtonsGroup;
