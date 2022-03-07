/* eslint-disable react/prop-types */
import {
  FlexGroup,
  FlexItem,
  HeaderSectionItemButton,
  Stat,
  Text,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const ContactAvailable = ({ total, isLoading, isFetching }) => {
  return (
    <HeaderSectionItemButton>
      <FlexGroup gutterSize="s">
        <FlexItem>
          <Text className="text-sm">
            <p>Available new contacts: {total}</p>
          </Text>
        </FlexItem>
      </FlexGroup>
    </HeaderSectionItemButton>
  );
};
ContactAvailable.defaultProps = {
  total: 0,
  isLoading: false,
  isFetching: false,
};
/* eslint-disable react/forbid-prop-types */
ContactAvailable.propTypes = {
  total: PropTypes.number,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
};

export default ContactAvailable;
