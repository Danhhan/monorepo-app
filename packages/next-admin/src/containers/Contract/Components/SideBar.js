import { Badge, FlexGroup, FlexItem, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React from 'react';

function SideBar({ location }) {
  return (
    <FlexGroup wrap gutterSize="xs">
      <FlexItem grow={false}>
        <Badge
          // iconType="checkInCircleFilled"
          style={{ backgroundColor: 'transparent' }}
          href="#/section-customer-info"
        >
          <Text
            style={{
              color: location.hash === '#/section-customer-info' && '#0AA263',
            }}
          >
            <p>Thông tin khách hàng</p>
          </Text>
        </Badge>
      </FlexItem>
      <FlexItem grow={false}>
        <Badge
          // iconType="checkInCircleFilled"
          style={{ backgroundColor: 'transparent' }}
          href="#/section-registration-course"
        >
          <Text
            style={{
              color:
                location.hash === '#/section-registration-course' && '#0AA263',
            }}
          >
            Khoá học đăng ký
          </Text>
        </Badge>
      </FlexItem>
      <FlexItem grow={false}>
        <Badge
          // iconType="checkInCircleFilled"
          style={{ backgroundColor: 'transparent' }}
          href="#/section-admin"
        >
          <Text
            style={{
              color: location.hash === '#/section-admin' && '#0AA263',
            }}
          >
            Admin
          </Text>
        </Badge>
      </FlexItem>
      <FlexItem grow={false}>
        <Badge
          // iconType="checkInCircleFilled"
          style={{ backgroundColor: 'transparent' }}
          href="#/section-payment-methods"
        >
          <Text
            style={{
              color: location.hash === '#/section-payment-methods' && '#0AA263',
            }}
          >
            Phương thức thanh toán
          </Text>
        </Badge>
      </FlexItem>
      <FlexItem grow={false}>
        <Badge
          // iconType="checkInFICircleFilled"
          style={{ backgroundColor: 'transparent' }}
          href="#/section-other-info"
        >
          <Text
            style={{
              color: location.hash === '#/section-other-info' && '#0AA263',
            }}
          >
            Thông tin khác
          </Text>
        </Badge>
      </FlexItem>
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
