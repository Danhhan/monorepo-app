import {
  Icon,
  Text,
  CollapsibleNav,
  Solid,
  ButtonEmpty,
  CollapsibleNavGroup,
} from '@antoree/ant-ui';
import {
  useRetriveCertificatesList,
  useRetriveTopicsList,
} from 'services/teachers';
import { FormattedMessage } from 'react-intl';
import React, { useState } from 'react';
import logoAntoree from 'assets/images/white-bg-logo.svg';
import { Link } from 'react-router-dom';

import styles from './SideBarMobile.module.scss';

const SideBarMobile: React.FC<{ isWhiteIcon: boolean }> = ({ isWhiteIcon }) => {
  const { MenuIcon, BriefcaseIcon } = Solid;

  const [navIsOpen, setNavIsOpen] = useState<boolean>(
    JSON.parse(
      String(localStorage.getItem('euiCollapsibleNavExample--isDocked')),
    ) || false,
  );

  const {
    data: dataListTopics,
    isLoading: isLoadingTopics,
  } = useRetriveTopicsList(
    {
      localePara: 'vi',
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataListCertificates,
    isLoading: isLoadingCertificates,
  } = useRetriveCertificatesList(
    {
      localePara: 'vi',
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  return (
    <CollapsibleNav
      isOpen={navIsOpen}
      isDocked={false}
      size={240}
      button={
        <ButtonEmpty onClick={() => setNavIsOpen(isOpen => !isOpen)}>
          <MenuIcon
            style={{
              width: '24px',
              height: '24px',
              color: isWhiteIcon ? 'white' : 'black',
            }}
            className="euiIcon euiButtonContent__icon"
          />
        </ButtonEmpty>
      }
      onClose={() => setNavIsOpen(false)}
    >
      <div style={{ maxHeight: '100vh', overflow: 'auto' }}>
        <div className="sticky top-0 bg-white z-10 pb-4">
          <Link to="/tkhomepage">
            <Icon
              className="px-4 pt-4 "
              type={logoAntoree}
              style={{ width: '200px', height: 'auto', top: 0 }}
            />
          </Link>
        </div>
        <CollapsibleNavGroup
          title={<FormattedMessage defaultMessage="Nhu cầu riêng" />}
          buttonClassName="p-0"
          iconType="minus"
          iconSize="l"
          titleSize="xs"
          isCollapsible
          paddingSize="none"
          initialIsOpen
          arrowDisplay="none"
          className={styles.navSideBarItem}
          // background="dark"
        >
          {dataListTopics?.data?.data?.slice(0, 8).map(topicItem => (
            <Link
              key={topicItem.id}
              className={styles.innerNavItem}
              style={{ color: 'inherit' }}
              to={`/search-page?topics=${topicItem?.id}`}
            >
              <BriefcaseIcon
                style={{ width: '16px', height: '16px' }}
                className="euiIcon euiButtonContent__icon"
              />
              <Text size="s" className="pl-4">
                <p>{topicItem?.name}</p>
              </Text>
            </Link>
          ))}
        </CollapsibleNavGroup>
        <CollapsibleNavGroup
          title={<FormattedMessage defaultMessage="Luyện thi chứng chỉ" />}
          buttonClassName="p-0"
          iconType="minus"
          iconSize="m"
          titleSize="xs"
          isCollapsible
          paddingSize="none"
          initialIsOpen
          arrowDisplay="none"
          className={styles.navSideBarItem}
          // background="dark"
        >
          {dataListCertificates?.data?.data?.slice(0, 8).map(certItem => (
            <Link
              key={certItem.id}
              className={styles.innerNavItem}
              style={{ color: 'inherit' }}
              to={`/search-page?certificates=${certItem?.id}`}
            >
              <BriefcaseIcon
                style={{ width: '16px', height: '16px' }}
                className="euiIcon euiButtonContent__icon"
              />
              <Text size="s" className="pl-4">
                <p>{certItem?.name}</p>
              </Text>
            </Link>
          ))}
        </CollapsibleNavGroup>
      </div>
    </CollapsibleNav>
  );
};

export default SideBarMobile;
