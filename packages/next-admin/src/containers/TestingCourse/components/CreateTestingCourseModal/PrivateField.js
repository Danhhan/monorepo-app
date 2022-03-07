import { FieldText, ButtonIcon } from '@antoree/ant-ui';
import { useState } from 'react';
import { useCurrentUser } from 'hooks';
import PropTypes from 'prop-types';

const PrivateField = ({ onChange, value }) => {
  const [{ permissions }] = useCurrentUser();

  const havePermission = permissions
    ? !permissions?.find(item => item.includes('course-create'))
    : false;

  const [lock, setLock] = useState(havePermission);

  return (
    <FieldText
      placeholder="Course Id"
      disabled={lock}
      value={value}
      onChange={onChange}
      aria-label="CourseId"
      prepend={
        <ButtonIcon
          style={{ backgroundColor: lock ? '#c50966' : '#00a770' }}
          display="fill"
          color={lock ? 'accent' : 'primary'}
          iconType={lock ? 'lock' : 'lockOpen'}
          aria-label="Next"
          size="m"
          //   isDisabled={!lock}
          //   onClick={() => setLock(!lock)}
        />
      }
    />
  );
};

PrivateField.defaultProps = {
  onChange: () => {},
  value: undefined,
};

PrivateField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PrivateField;
