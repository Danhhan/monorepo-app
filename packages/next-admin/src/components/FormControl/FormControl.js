/* eslint-disable react/self-closing-comp */
import { FlexGroup, FlexItem, FormRow } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const FormControl = ({ label, children, required, isInvalid, error }) => {
  return (
    <FlexGroup>
      <FlexItem grow={2}>
        <FormRow
          style={{ width: '108px' }}
          labelFontWeight={400}
          fullWidth
          label={<p>{label}</p>}
          required={required}
          isInvalid={isInvalid}
          error={error}
          // disabled={view}
        >
          <span></span>
        </FormRow>
      </FlexItem>
      <FlexItem grow={8}>{children}</FlexItem>
    </FlexGroup>
  );
};

FormControl.defaultProps = {
  required: false,
  isInvalid: false,
  error: undefined,
};
/* eslint-disable react/forbid-prop-types */
FormControl.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  required: PropTypes.bool,
  isInvalid: PropTypes.bool,
  error: PropTypes.string,
};

export default FormControl;
