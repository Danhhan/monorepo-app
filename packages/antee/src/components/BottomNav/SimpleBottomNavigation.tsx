import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Button } from '@antoree/ant-ui';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import React, { FunctionComponent } from 'react';
import styles from './Bottom.module.scss';
import { useAuth } from '../../services/auth/contexts';

interface OwnProps {
  hanleOpen: () => void;
  timeSelected: any;
}

const SimpleBottomNavigation: FunctionComponent<OwnProps> = ({
  hanleOpen,
  timeSelected,
}) => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Box
        sx={{ width: '100%', position: 'fixed', bottom: 0 }}
        className={styles.BottomNav}
      >
        {window.location.pathname === '/tkhomepage' ||
        window.location.pathname === '/home' ||
        window.location.pathname === '/introduce' ||
        window.location.pathname === '/courses' ||
        window.location.pathname === '/today' ||
        window.location.pathname === '/testing' ? (
          <BottomNavigation showLabels>
            <BottomNavigationAction
              component={Link}
              to="/tkhomepage"
              value="/tkhomepage"
              label="Trang chủ"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/introduce"
              value="/introduce"
              label="Giới thiệu"
              icon={<InfoIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/courses"
              value="/courses"
              label="Khóa học"
              icon={<LibraryBooksIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/testing"
              value="/testing"
              label="Test T.Anh"
              icon={<QuizIcon />}
            />
          </BottomNavigation>
        ) : (
          <BottomNavigation
            style={{ height: '80px' }}
            className={styles.antoreeBoxshadow}
          >
            {isAuthenticated ? (
              <Button
                disabled={!(timeSelected && timeSelected.length > 0)}
                onClick={() => {
                  hanleOpen();
                }}
                style={{ width: '100vw', marginTop: '16px' }}
                fill
              >
                Đặt lịch học
              </Button>
            ) : (
              <Button
                onClick={() => {
                  hanleOpen();
                }}
                style={{ width: '100vw', marginTop: '16px' }}
                fill
              >
                Đăng ký học thử miễn phí
              </Button>
            )}
          </BottomNavigation>
        )}
      </Box>
    </>
  );
};

export default SimpleBottomNavigation;
