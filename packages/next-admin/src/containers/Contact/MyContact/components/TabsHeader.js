import {
  Badge,
  HeaderSectionItem,
  PageHeader,
  PageHeaderSection,
  Text,
} from '@antoree/ant-ui';
import { CustomTabs } from 'components';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const TabsHeader = ({ report }) => {
  const tabs = [
    {
      id: 'campaign-report--id',
      link: '/my-contacts',
      name: <FormattedMessage defaultMessage="My contact list" />,
    },
    {
      id: 'partner-report--id',
      link: '/received-contacts',
      name: <FormattedMessage defaultMessage="Contacts Received" />,
    },
  ];
  return (
    <PageHeader
      className="sticky top-0 z-10 pl-10 pr-10"
      style={{
        backgroundColor: '#fff',
        boxShadow: 'inset 0px -1px 0px #EAEAEA',
      }}
      responsive={false}
    >
      <PageHeaderSection>
        <CustomTabs tabs={tabs} />
      </PageHeaderSection>
      <PageHeaderSection>
        <HeaderSectionItem>
          <Text size="xs" className="mr-1">
            <p>1 - 14 March, 2022</p>
          </Text>
          <Badge
            style={{
              backgroundColor: 'rgba(20, 178, 76, 0.15)',
              color: '#14B24C',
            }}
          >
            Tested/Contacts {report?.tested}%
          </Badge>
          <Badge
            style={{
              backgroundColor: 'rgba(20, 178, 76, 0.15)',
              color: '#14B24C',
            }}
          >
            ROI {Number.parseFloat(report?.ROI).toFixed(1)}
          </Badge>
        </HeaderSectionItem>
      </PageHeaderSection>
    </PageHeader>
  );
};

TabsHeader.defaultProps = {
  report: {
    ROI: 0,
    tested: 0,
  },
};
/* eslint-disable react/forbid-prop-types */
TabsHeader.propTypes = {
  report: PropTypes.objectOf(
    PropTypes.shape({
      ROI: PropTypes.number,
      tested: PropTypes.number,
    }),
  ),
};

export default TabsHeader;
