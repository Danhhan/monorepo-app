import { Badge, FlexGroup, FlexItem, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { navbars } from '../constants';

function SideBar({ location }) {
  return (
    <FlexGroup wrap gutterSize="xs">
      {navbars.map(navbar => (
        <FlexItem key={navbar.id} grow={false}>
          <Badge style={{ backgroundColor: 'transparent' }} href={navbar.href}>
            <Text
              style={{
                color: location.hash === navbar.href && '#0AA263',
              }}
            >
              <p>{navbar.label}</p>
            </Text>
          </Badge>
        </FlexItem>
      ))}
    </FlexGroup>
  );
}
SideBar.defaultProps = {
  location: undefined,
};

SideBar.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  location: PropTypes.object,
};
export default SideBar;
