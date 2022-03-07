import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLayout } from '@antoree/ant-ui';

function InputDuration({ onChange, value, disabled }) {
  return (
    <FormControlLayout icon="clock">
      <input
        type="number"
        className="euiFieldNumber pl-9 rounded-lg"
        aria-label="Use aria labels when no actual label is in use"
        placeholder="0"
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </FormControlLayout>
  );
}
/* eslint-disable react/forbid-prop-types */
InputDuration.defaultProps = {
  disabled: false,
};
InputDuration.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};

export default InputDuration;
