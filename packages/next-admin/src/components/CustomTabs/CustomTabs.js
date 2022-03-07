import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@antoree/ant-ui';
import { Link } from 'react-router-dom';
import { useRedirect } from 'hooks';
import { useRouteMatch } from 'react-router';

const StyleWrapper = styled.div`
  .euiTab__content {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .euiTab.euiTab-isSelected {
    box-shadow: inset 0 -2px 0 #000000;
  }
`;
const CustomTabs = ({ tabs }) => {
  const { redirectTo } = useRedirect();
  const match = useRouteMatch();

  return (
    <StyleWrapper>
      <Tabs display="condensed">
        {tabs
          .filter(item => item?.name)
          .map(tab => (
            <Tab
              key={tab?.id}
              onClick={() => {
                redirectTo(tab?.link);
              }}
              isSelected={match.path.startsWith(tab?.link)}
            >
              <Link
                style={{
                  color: match.path.startsWith(tab?.link)
                    ? '#000000'
                    : '#69707D',
                }}
              >
                <p>{tab?.name}</p>
              </Link>
            </Tab>
          ))}
      </Tabs>
    </StyleWrapper>
  );
};
CustomTabs.defaultProps = {
  tabs: [],
};
/* eslint-disable react/forbid-prop-types */
CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default CustomTabs;
