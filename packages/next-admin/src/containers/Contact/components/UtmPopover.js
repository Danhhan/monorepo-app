import {
  FlexGroup,
  FlexItem,
  Popover,
  PopoverTitle,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';

const UtmPopover = ({ utmSource, utmCampaign }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <FlexGroup alignItems="center" gutterSize="xs">
      <FlexItem
        grow={false}
        className="w-28"
        onMouseEnter={() => setIsOpened(true)}
        onMouseLeave={() => setIsOpened(isOpened && false)}
      >
        <Popover
          display="block"
          isOpen={isOpened}
          closePopover={() => !isOpened}
          anchorPosition="rightUp"
        >
          <PopoverTitle>Utm source and utm campain</PopoverTitle>
          <Text style={{ width: 'auto' }}>
            <p>{utmSource}</p>
            <p>{utmCampaign}</p>
          </Text>
        </Popover>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {utmSource}
        </p>
        <Spacer size="xs" />
        <Text color="#828282" className="text-xs">
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {utmCampaign}
          </p>
        </Text>
      </FlexItem>
    </FlexGroup>
  );
};

UtmPopover.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  utmSource: PropTypes.string.isRequired,
  utmCampaign: PropTypes.string.isRequired,
};

export default UtmPopover;
