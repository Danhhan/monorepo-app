/* eslint-disable react/no-array-index-key */
import { Text, Solid, CollapsibleNavGroup } from '@antoree/ant-ui';
import {
  useRetriveCertificatesList,
  useRetriveTopicsList,
} from 'services/teachers';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import styles from './SideBarDesktop.module.scss';

const SideBarDesktop: React.FC<{}> = () => {
  const { MenuIcon, BriefcaseIcon } = Solid;

  const {
    data: dataListTopics,
    // isLoading: isLoadingTopics,
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
    // isLoading: isLoadingCertificates,
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
    <div className={styles.navSideBar}>
      <div
        className="flex py-2 justify-start items-center text-white px-4"
        style={{ background: '#14B24C' }}
      >
        <MenuIcon
          style={{ width: '24px', height: '24px' }}
          className="euiIcon euiButtonContent__icon"
        />
        <Text size="s" className="pl-4">
          <p>
            <FormattedMessage defaultMessage="Chủ đề nổi bật" />
          </p>
        </Text>
      </div>
      <CollapsibleNavGroup
        title={<FormattedMessage defaultMessage="Nhu cầu riêng" />}
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
        {dataListTopics?.data?.data?.slice(0, 6).map((topicItem, index) => (
          <Link
            key={index}
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
        {dataListCertificates?.data?.data
          ?.slice(0, 6)
          .map((certItem, index) => (
            <Link
              key={index}
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
      {/* <CollapsibleNavGroup
        title={<FormattedMessage defaultMessage="Nói như người bản xứ" />}
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
        {accentArr?.map(item => (
          <div className={styles.innerNavItem}>
            <BriefcaseIcon
              style={{ width: '16px', height: '16px' }}
              className="euiIcon euiButtonContent__icon"
            />
            <Text size="s" className="pl-4">
              <p>{item?.label}</p>
            </Text>
          </div>
        ))}
      </CollapsibleNavGroup> */}
    </div>
  );
};

export default SideBarDesktop;
