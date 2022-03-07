import {
  Avatar,
  Button,
  HeaderSectionItemButton,
  Popover,
  PopoverFooter,
  PopoverTitle,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { removeToken } from 'helpers';
import { useCurrentUser } from 'hooks';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { userPopoverMessages } from './messages';

function UserPopover() {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const [{ avatar, displayName, id }] = useCurrentUser();

  const signOuthandler = () => {
    removeToken();
  };

  return (
    <Popover
      id="guideHeaderUserMenu"
      ownFocus
      repositionOnScroll
      button={
        <HeaderSectionItemButton
          aria-controls="guideHeaderUserMenu"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}
        >
          <Avatar
            name={displayName ?? 'User Name'}
            size="s"
            imageUrl={avatar}
          />
        </HeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsUserMenuVisible(false)}
    >
      <div style={{ width: 180 }}>
        <PopoverTitle>
          <FormattedMessage
            defaultMessage="Hi {displayName} !"
            values={{ displayName }}
          />
        </PopoverTitle>
        <Text size="s" color="subdued">
          <FormattedMessage defaultMessage="Your ID: {id}" values={{ id }} />
        </Text>
        <Spacer size="m" />
        <Text size="s" color="subdued">
          <p>Your profile</p>
        </Text>
        <PopoverFooter>
          <Link to="/sign-in" onClick={signOuthandler}>
            <Button iconType="push" color="danger" fullWidth size="s">
              <FormattedMessage {...userPopoverMessages.label.signOut} />
            </Button>
          </Link>
        </PopoverFooter>
      </div>
    </Popover>
  );
}

export default UserPopover;
