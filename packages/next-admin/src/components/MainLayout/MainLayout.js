import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  HeaderLogo,
  HeaderSectionItemButton,
  Icon,
} from '@antoree/ant-ui';
import { useHistory } from 'react-router-dom';
import appConfig from 'configs/app.config';
import { useHeaderActions } from 'hooks';
import LanguageSwitcher from '../LanguageSwitcher';
import UserPopover from './UserPopover';
import Navbar from './Navbar';

function MainLayout({ breadcrumbs }) {
  const history = useHistory();
  const redirectHomeHandler = () => {
    history.push('/');
  };
  return (
    <>
      <Header
        theme="dark"
        position="static"
        sections={[
          {
            items: [
              <HeaderLogo
                iconType="https://commercial.static.antoree.com/assets/images/logo_withtagline.svg"
                iconTitle="Antoree Next Admin"
                onClick={redirectHomeHandler}
              >
                {appConfig.appName} &nbsp; &nbsp;
                <span style={{ fontSize: '14px' }}>
                  Version {appConfig.appVersion}
                </span>
              </HeaderLogo>,
            ],
            borders: 'none',
          },
          {
            items: [
              <LanguageSwitcher />,
              <HeaderSectionItemButton
                notification
                aria-label="Notifications: Updates available"
                onClick={() => {}}
              >
                <Icon type="cheer" size="m" />
              </HeaderSectionItemButton>,
              <UserPopover />,
            ],
            borders: 'none',
          },
        ]}
      />
      <Header
        position="static"
        sections={[
          {
            items: [<Navbar />],
            breadcrumbs,
            borders: 'right',
          },
          {
            items: useHeaderActions(),
            // breadcrumbs,
            borders: 'none',
          },
        ]}
      />
    </>
  );
}

MainLayout.defaultProps = {
  breadcrumbs: [],
};

MainLayout.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
};

export default memo(MainLayout);
