import {
  ButtonEmpty,
  ContextMenuItem,
  ContextMenuPanel,
  Popover,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';

function CreateLinkPopover({ onShowLinkCampaignLink, onShowTeacherLink }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const button = (
    <ButtonEmpty
      iconType="arrowDown"
      color="primary"
      iconSide="right"
      onClick={toggleHandler}
    >
      Create link
    </ButtonEmpty>
  );

  return (
    <Popover
      button={button}
      isOpen={isOpen}
      closePopover={closeHandler}
      panelPaddingSize="s"
      anchorPosition="downRight"
    >
      <ContextMenuPanel
        size="s"
        items={[
          <ContextMenuItem size="m" onClick={onShowLinkCampaignLink}>
            <ButtonEmpty size="s" color="text" iconSide="right">
              From the campaign list
            </ButtonEmpty>
          </ContextMenuItem>,
          // <ContextMenuItem size="m" onClick={onShowTeacherLink}>
          //   <ButtonEmpty size="s" color="text" iconSide="right">
          //     From teacher’s URL
          //   </ButtonEmpty>
          // </ContextMenuItem>,
        ]}
      />
    </Popover>
  );
}
CreateLinkPopover.defaultProps = {
  onShowLinkCampaignLink: () => {},
  onShowTeacherLink: () => {},
};

CreateLinkPopover.propTypes = {
  onShowLinkCampaignLink: PropTypes.func,
  onShowTeacherLink: PropTypes.func,
};

export default CreateLinkPopover;
