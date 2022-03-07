/* eslint-disable react/prop-types */
import { Icon, Popover, PopoverTitle, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactReceivedToday = ({ total }) => {
  const [isOpened, setIsOpened] = useState(false);
  const notes = [
    'Ngày 1 mỗi nhân sự đều được nhận 3 newly',
    'Ngày 2 tested > 50% được rút 3 newly',
    'ROI > 5.0 được rút 4 newly',
    'ROI > 6.0 được rút 5 newly',
  ];
  return (
    <Text
      color="#343741"
      className="text-sm"
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(isOpened && false)}
    >
      <Popover
        display="block"
        isOpen={isOpened}
        closePopover={() => !isOpened}
        anchorPosition="leftCenter"
      >
        <PopoverTitle>How to be qualified to get new contact</PopoverTitle>
        {notes.map(item => (
          <Text style={{ width: 'auto' }}>
            <p>{item}</p>
          </Text>
        ))}
      </Popover>
      <p>
        <Icon type="iInCircle" /> Received contacts today: {total}/3
      </p>
    </Text>
  );
};
ContactReceivedToday.defaultProps = {
  total: 0,
};
/* eslint-disable react/forbid-prop-types */
ContactReceivedToday.propTypes = {
  total: PropTypes.number,
};

export default ContactReceivedToday;
