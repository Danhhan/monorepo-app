import { Icon } from '@antoree/ant-ui';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import logoAntoree from 'assets/images/logo-antoree.svg';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

interface MenuMobileProps {
  open: boolean;
  handelMenuOpen: () => void;
}

const linkTabs = [
  {
    id: 'today',
    label: <FormattedMessage defaultMessage="Hôm Nay" />,
    pathname: '/today',
    icon: <AccessTimeIcon />,
  },
  // {
  //   label: <FormattedMessage defaultMessage="Trial" />,
  //   pathname: '/trial',
  //   icon: 'UsersIcon',
  // },
  {
    id: 'courses',
    label: <FormattedMessage defaultMessage="Khóa học của tôi" />,
    pathname: '/courses',
    icon: <LibraryBooksIcon />,
  },
  {
    id: 'tkhomepage',
    label: <FormattedMessage defaultMessage="Tìm giáo viên" />,
    pathname: '/tkhomepage',
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
        open={open}
        onOpen={handelMenuOpen}
        onClose={handelMenuOpen}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem key={1}>
              <Icon
                type={logoAntoree}
                style={{
                  width: '95px',
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
