import React from 'react';
import PropTypes from 'prop-types';
import { FieldText, FormRow } from '@antoree/ant-ui';
import { Controller } from 'react-hook-form';

function CustomFieldText({ control, label, fieldName, isDisabled }) {
  return (
    <FormRow fullWidth label={label ?? 'Undefined'}>
      <Controller
        render={({ onChange, value }) => (
          <FieldText
            style={{ border: '1px solid #CDCFD1' }}
            className="rounded-lg"
            value={value}
            fullWidth
            onChange={onChange}
            disabled={isDisabled}
          />
        )}
        name={fieldName ?? 'Undefined'}
        control={control}
      />
    </FormRow>
  );
}

CustomFieldText.defaultProps = {
  isDisabled: false,
};
/* eslint-disable react/forbid-prop-types */
CustomFieldText.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  isDisabled: PropTypes.object,
};

export default CustomFieldText;
