import {
  HeaderSectionItemButton,
  Icon,
  PageHeader,
  PageHeaderSection,
  Tab,
  Tabs,
} from '@antoree/ant-ui';
import logoAntoree from 'assets/images/logo-antoree-v2.svg';
import { useRedirect } from 'hooks';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';
import UserPopover from './UserPopover';

const MainLayout: React.FC<{}> = ({ children }) => {
  const tabs = [
    {
      id: 'introduce-id',
      link: '/courses',
      name: <FormattedMessage defaultMessage="My courses" />,
    },
    {
      id: 'teacher-id',
      link: '/schedule/teaching-schedule',
      name: <FormattedMessage defaultMessage="Schedule" />,
    },
  ];
  const [title, setTitle] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    const titleList = location.pathname
      .split('/')
      .filter(item => typeof item === 'string');
    let localTitle = '';
    titleList.forEach((item, index) => {
      // capitalize First Letter
      const capitalizeItem = item.charAt(0).toUpperCase() + item.slice(1);
      localTitle += index === 0 ? `${capitalizeItem}` : `${capitalizeItem} | `;
    });
    setTitle(localTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const { redirectTo } = useRedirect();

  return (
    <>
      <Helmet>
        <title>{`${title} Antoree PWA For Teacher`}</title>
      </Helmet>
      <PageHeader
        paddingSize="l"
        className="sticky top-0 z-10"
        style={{
          backgroundColor: '#fff',
          boxShadow: 'inset 0px -1px 0px #EAEAEA',
          paddingTop: 8,
          paddingBottom: 8,
        }}
        responsive={false}
      >
        <PageHeaderSection>
          <HeaderSectionItemButton onClick={() => redirectTo('/courses')}>
            <Icon type={logoAntoree} size="original" />
          </HeaderSectionItemButton>
        </PageHeaderSection>
        <PageHeaderSection>
          <Tabs display="condensed">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                onClick={() => redirectTo(tab.link)}
                isSelected={location.pathname.startsWith(tab.link)}
              >
                <Link to={tab.link}>
                  <p
                    style={{
                      color: location.pathname.startsWith(tab.link)
                        ? '#119b42'
                        : '#000000',
                    }}
                  >
                    {tab.name}
                  </p>
                </Link>
              </Tab>
            ))}
          </Tabs>
        </PageHeaderSection>
        <PageHeaderSection>
          <LanguageSwitcher color="primary" />
          <HeaderSectionItemButton aria-label="2 Notifications">
            <Icon type="bell" size="m" />
          </HeaderSectionItemButton>
          <UserPopover />
        </PageHeaderSection>
      </PageHeader>

      <div>{children}</div>
    </>
  );
};

export default MainLayout;
