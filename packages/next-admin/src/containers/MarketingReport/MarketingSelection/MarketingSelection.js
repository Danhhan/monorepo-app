import { ComboBox } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const MarketingSelection = ({
  dateFrom,
  dateTo,
  dataUtm,
  hanldegetEmail,
  handleAddNew,
  handleRemove,
  hanldeCombobox,
  onChange,
  selectedOptions,
  dataMakter,
}) => {
  MarketingSelection.propTypes = {
    dateFrom: PropTypes.string,
    onChange: PropTypes.func,
    hanldegetEmail: PropTypes.func,
    dateTo: PropTypes.string,
    handleAddNew: PropTypes.func,
    handleRemove: PropTypes.func,
    hanldeCombobox: PropTypes.func,
    selectedOptions: PropTypes.oneOfType(PropTypes.object),
    dataUtm: PropTypes.oneOfType(PropTypes.array),
    dataMakter: PropTypes.oneOfType(PropTypes.array),
  };

  MarketingSelection.defaultProps = {
    dateFrom: '',
    dateTo: '',
    handleAddNew,
    dataUtm: [],
    hanldegetEmail,
    handleRemove,
    hanldeCombobox,
    onChange,
    selectedOptions: {},
    dataMakter: [],
  };

  const [options, setOptions] = useState(dataMakter);
  // const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);

  let searchTimeout;

  const onSearchChange = useCallback(searchValue => {
    setLoading(true);
    setOptions([]);

    clearTimeout(searchTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setLoading(false);
      setOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }, 1200);
  }, []);

  return (
    <div>
      <ComboBox
        aria-label="Accessible screen reader label"
        placeholder="Tìm kiếm theo email"
        options={dataMakter}
        //   isLoading
        //   async
        delimiter=","
        selectedOptions={selectedOptions}
        onChange={onChange}
        onSearchChange={onSearchChange}
        isLoading={isLoading}
        //   onCreateOption={onCreateOption}
        isClearable
        data-test-subj="demoComboBox"
      />
    </div>
  );
};

export default MarketingSelection;
