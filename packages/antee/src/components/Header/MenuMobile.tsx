import { Icon } from '@antoree/ant-ui';
import { AccessTime, AccountCircle } from '@mui/icons-material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import logoAntoree from 'assets/images/white-bg-logo.svg';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

interface MenuMobileProps {
  open: boolean;
  handelMenuOpen: any;
}

const linkTabs = [
  // {
  //   label: <FormattedMessage defaultMessage="Overview" />,
  //   pathname: '/overview',
  //   icon: 'ViewGridIcon',
  // },
  // {
  //   id: 'testing',
  //   label: <FormattedMessage defaultMessage="Free English Test" />,
  //   pathname: '/testing',
  //   icon: 'DocumentTextIcon',
  // },
  {
    id: 'introduce',
    label: <FormattedMessage defaultMessage="Giới thiệu" />,
    pathname: '/introduce',
    icon: <AccessTime />,
  },

  {
    id: 'tkhomepage',
    label: <FormattedMessage defaultMessage="Tìm giáo viên" />,
    pathname: '/tkhomepage',
    icon: <LibraryBooksIcon />,
  },

  {
    id: 'testing',
    label: <FormattedMessage defaultMessage="Test tiếng anh miễn phí" />,
    pathname: '/testing',
    icon: <LibraryBooksIcon />,
  },
];

const MenuMobile = ({ open, handelMenuOpen }: MenuMobileProps) => {
  const history = useHistory();

  return (
    <div style={{ width: '250px' }}>
      <SwipeableDrawer
        style={{ width: '250px', zIndex: 20000 }}
        anchor="left"
        onOpen={handelMenuOpen}
        open={open}
        onClose={handelMenuOpen}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem key={1}>
              <Icon
                type={logoAntoree}
                style={{
                  width: '150px',
                  height: 'auto',
                  marginRight: '20%',
                }}
              />
            </ListItem>
            <Divider />
            <div style={{ marginTop: '10%' }}>
              {linkTabs.map(item => (
                <ListItem
                  button
                  onClick={e => {
                    history.push(item.pathname);
                    handelMenuOpen();
                  }}
                  style={{ marginTop: '15px' }}
                  key={item.id}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </div>
            <Divider />
            <div>
              <ListItem button style={{ marginTop: '15px' }}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Tài khoản" />
              </ListItem>
            </div>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default MenuMobile;
