import { ComboBox } from '@antoree/ant-ui';
import { toNonAccentVietnamese } from '@antoree/helpers';
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';

const CustomComboBox = ({
  isInvalid,
  handleSelected,
  data,
  isLoading,
  selectedOptions,
  disabled,
  className,
  borderRadius,
  placeholder,
}) => {
  const [allOptions, setAllOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    setAllOptions(
      data?.length > 0
        ? data?.map(({ name, id }) => ({
            label: name,
            id,
            key: id,
          }))
        : [],
    );
  }, [data]);
  useEffect(() => {
    setOptions(allOptions);
  }, [allOptions]);
  const [searchValue, setSearchValue] = useState('');
  let searchTimeout;
  useMemo(() => {
    setIsSearching(true);
    setOptions([]);
    clearTimeout(searchTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setIsSearching(false);
      setOptions(
        allOptions?.filter((option = {}) =>
          toNonAccentVietnamese(`${option.label} ${option.id}`).includes(
            toNonAccentVietnamese(searchValue),
          ),
        ),
      );
    }, 1200);
  }, [allOptions, searchValue]);
  const onSearchChange = valueSearch => {
    setSearchValue(valueSearch);
  };
  return (
    <ComboBox
      className={className || ''}
      fullWidth={false}
      async
      placeholder={placeholder}
      isClearable={false}
      isInvalid={isInvalid}
      isLoading={isLoading || isSearching}
      singleSelection={{ asPlainText: true }}
      onChange={handleSelected}
      options={options}
      selectedOptions={selectedOptions}
      onSearchChange={onSearchChange}
      borderRadius={borderRadius}
      isDisabled={disabled}
    />
  );
};

CustomComboBox.defaultProps = {
  isInvalid: false,
  isLoading: false,
  disabled: false,
  handleSelected: () => {},
  data: [],
  selectedOptions: [],
  className: null,
  borderRadius: null,
  placeholder: '',
};
/* eslint-disable react/forbid-prop-types */
CustomComboBox.propTypes = {
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  handleSelected: PropTypes.func,
  data: PropTypes.any,
  selectedOptions: PropTypes.any,
  className: PropTypes.string,
  borderRadius: PropTypes.number,
  placeholder: PropTypes.string,
};

export default CustomComboBox;
