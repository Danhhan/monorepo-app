import {
  Button,
  FlexItem,
  Icon,
  PageHeader,
  PageHeaderSection,
  Tab,
  Tabs,
} from '@antoree/ant-ui';
import logoAntoree from 'assets/images/white-bg-logo.svg';
import { SideBarMobile } from 'components/SideBar';
import { useToggle } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../MainLayout/MainLayout.scss';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import UserPopoverV2 from './UserPopover';

export type HeaderProps = {
  background?: string;
  colorText?: string;
  logo?: any;
  isHideSearch?: boolean;
  isShowBarNav?: boolean;
  datahead?: any;
};

const Header: React.FC<HeaderProps> = ({
  background,
  colorText,
  logo,
  isHideSearch = false,
  isShowBarNav,
  datahead,
}) => {
  const [selectedTabId, setSelectedTabId] = useState('cobalt--id');
  const [selectedPath, setSelectedPath] = useState('');

  const history = useHistory();

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };
  // console.log(datahead);
  const tabs = [
    {
      id: 'introduce-id',
      link: '/introduce',
      name: <FormattedMessage defaultMessage="Giới thiệu" />,
    },
    {
      id: 'teacher-id',
      link: '/tkhomepage',
      name: <FormattedMessage defaultMessage="Tìm giáo viên" />,
    },
    {
      id: 'test-id',
      // disabled: true,
      link: '/testing',
      name: <FormattedMessage defaultMessage="Test Tiếng Anh miễn phí" />,
      // prepend: <EuiIcon type="heatmap" />,
    },
  ];

  const location = useLocation();
  // console.log(selectedTabId);

  const { isVisiable, toggle, close } = useToggle();
  const [y, setY] = useState(window.scrollY);
  const [isScollup, setisScollup] = useState(true);

  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        // console.log('scrolling up');
        setisScollup(true);
      } else if (y < window.scrollY) {
        // console.log('scrolling down');
        setisScollup(false);
      }
      setY(window.scrollY);
    },
    [y],
  );

  // console.log(isScollup);
  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <PageHeader
        paddingSize="m"
        style={{
          background: background || '#fff',
          color: colorText,
          maxWidth: '100%',
          margin: 'auto',
          zIndex: 100,
        }}
        className="sticky top-0"
        responsive={false}
      >
        <PageHeaderSection className={styles.headerItem}>
          <Link to="/tkhomepage">
            <Icon
              className={styles.antoreeLogo}
              type={logo || logoAntoree}
              style={{
                width: 240,
                height: 'auto',
                paddingRight: 80,
                marginLeft: '8%',
              }}
            />
          </Link>
          <div>
            <SideBarMobile isWhiteIcon={isHideSearch} />
          </div>
        </PageHeaderSection>
        <PageHeaderSection className={styles.headerItem}>
          <Tabs display="condensed">
            {tabs.map((tab, index) => (
              <Tab
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={styles.customTab}
                style={{ color: colorText }}
                // href={tab.href}
                onClick={() => {
                  onSelectedTabChanged(tab.id);
                  setSelectedPath(tab.link);
                  history.push(tab.link);
                }}
                isSelected={location.pathname.startsWith(tab.link)}
                // disabled={tab?.disabled}
              >
                <Link
                  style={{
                    color: location.pathname.startsWith('/introduce')
                      ? 'white'
                      : 'black',
                  }}
                  to={tab.link}
                >
                  {tab.name}
                </Link>
              </Tab>
            ))}
          </Tabs>
          {isHideSearch ? (
            <Link to="/tkhomepage">
              <Icon
                className={styles.antoreeLogo}
                type={logo || logoAntoree}
                // style={{ width: '160px', height: 'auto' }}
              />
            </Link>
          ) : (
            <>
              <Link to="/tkhomepage">
                <Icon
                  className={styles.antoreeLogo}
                  type={logo || logoAntoree}
                  // style={{ width: '160px', height: 'auto' }}
                />
              </Link>
            </>
          )}
        </PageHeaderSection>

        <PageHeaderSection
          className="justify-end items-end flex"
          style={{
            width: 'fit-content',
            marginLeft: '0px',
            marginRight: '25px',
          }}
        >
          <FlexItem style={{ marginRight: '16px' }}>
            {window.location.pathname === '/introduce' ? (
              <span>
                <span
                  style={{
                    backgroundColor: background || 'rgba(52, 55, 65, 0.15)',
                    border: 'none',
                    outline: 'none',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: colorText || 'black',
                    width: '150px',
                  }}
                  className={styles.buttonSoucre}
                />
              </span>
            ) : (
              <Link target="_blank" to="/today">
                <Button
                  style={{
                    backgroundColor: background || 'rgba(52, 55, 65, 0.15)',
                    border: 'none',
                    outline: 'none',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: colorText || 'black',
                  }}
                  className={styles.buttonSoucre}
                >
                  Quản lý khóa học
                </Button>
              </Link>
            )}
          </FlexItem>
          <span style={{ marginLeft: '30px' }}>
            <UserPopoverV2 />
          </span>
        </PageHeaderSection>
      </PageHeader>

      {isScollup ? (
        <div className={styles.antoreeSearchContainer}>
          <Search toggle={toggle} isVisiable={isVisiable} close={close} />
        </div>
      ) : null}
    </>
  );
};

export default Header;
