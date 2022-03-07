import { Switch } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';

const LoadingableSwitch = ({ checked, onChange }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Switch
      disabled={loading}
      checked={checked}
      onChange={async e => {
        setLoading(true);
        await onChange(e);
        setLoading(false);
      }}
    />
  );
};

LoadingableSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
LoadingableSwitch.defaultProps = {
  checked: false,
  onChange: e => {},
};

export default LoadingableSwitch;
