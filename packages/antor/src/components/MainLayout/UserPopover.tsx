import { useState } from 'react';
import {
  Popover,
  HeaderSectionItemButton,
  Avatar,
  Text,
  PopoverTitle,
  PopoverFooter,
  Button,
  Icon,
} from '@antoree/ant-ui';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useCurrentUser } from 'contexts';

const UserPopover: React.FC<{}> = () => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const { displayName, firstName, avatarUrl } = useCurrentUser();

  const signOuthandler = () => {
    localStorage.removeItem('token');
  };

  const closeHandler = () => {
    setIsUserMenuVisible(false);
  };

  const toggleHandler = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  return (
    <Popover
      id="userMemu"
      ownFocus
      repositionOnScroll
      button={
        <HeaderSectionItemButton
          aria-controls="userMemu"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={toggleHandler}
          style={{ border: '1px solid #CDCFD1', borderRadius: '40px' }}
        >
          <div>
            <Icon type="menu" className="mr-2" />
            <Avatar name={displayName} imageUrl={avatarUrl} size="m" />
          </div>
        </HeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={closeHandler}
    >
      <div style={{ width: 180 }}>
        <PopoverTitle>
          <FormattedMessage
            defaultMessage="Hello {firstName}!"
            values={{ firstName }}
          />
        </PopoverTitle>
        <Text size="s" color="subdued">
          <p>
            <span role="img" aria-label="icon">
              🚧
            </span>
            &nbsp;Coming soon...
          </p>
        </Text>
        <PopoverFooter>
          <Link to="/sign-in" onClick={signOuthandler}>
            <Button iconType="push" color="danger" fullWidth size="s">
              <FormattedMessage defaultMessage="Sign out" />
            </Button>
          </Link>
        </PopoverFooter>
      </div>
    </Popover>
  );
};

export default UserPopover;
