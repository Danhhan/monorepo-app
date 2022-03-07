/* eslint-disable react/prop-types */
import { Text } from '@antoree/ant-ui';
import AutoComplete from 'components/AutoComplete';
import PropTypes from 'prop-types';

const SelectCustomField = ({
  options,
  onSelect,
  valueOfSelected,
  isInvalid,
  placeholder,
  borderRadius,
  disabled,
  style,
  onClear,
}) => {
  return (
    <AutoComplete
      isInvalid={isInvalid}
      fullWidth
      placeholder={placeholder}
      valueOfSelected={valueOfSelected}
      borderRadius={borderRadius}
      options={options?.map?.(el => ({
        ...el,
        dropdownDisplay: (
          <div>
            <Text>
              <p>{el.label}</p>
            </Text>
          </div>
        ),
      }))}
      onSelect={onSelect}
      onClear={onClear}
      disabled={disabled}
      style={style || null}
    />
  );
};

SelectCustomField.defaultProps = {
  isInvalid: false,
  placeholder: '',
  borderRadius: undefined,
  disabled: undefined,
  style: undefined,
  onClear: () => {},
  valueOfSelected: null,
};

SelectCustomField.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  isInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  borderRadius: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default SelectCustomField;
