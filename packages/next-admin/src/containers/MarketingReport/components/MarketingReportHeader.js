import {
  Button,
  FlexGroup,
  FlexItem,
  Icon,
  PageHeader,
  Text,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import FilterTab from '../../../components/FilterTab';
import { FILTER_TABS } from '../constants';

const MarketingReportHeader = ({
  dataTotalItem,
  onRemoveAll,
  isLoading,
  isFetching,
  isInvalid,
  onSelect,
  active,
  path,
  query,
}) => {
  MarketingReportHeader.propTypes = {
    dataTotalItem: PropTypes.number,
    onRemoveAll: PropTypes.func,
    isFetching: PropTypes.bool,
    isInvalid: PropTypes.bool,
    onSelect: PropTypes.func,
    active: PropTypes.bool,
    path: PropTypes.string,
    query: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  MarketingReportHeader.defaultProps = {
    dataTotalItem: 0,
    onRemoveAll,
    isFetching: false,
    isInvalid: false,
    onSelect,
    isLoading: false,
    active: false,
    path: '',
    query,
  };
  return (
    <div>
      <PageHeader
        pageTitle={
          <FlexGroup gutterSize="s" direction="row">
            <FlexItem grow={false} className="w-64">
              <Title>
                <h2>
                  <FormattedMessage defaultMessage="Marketing Report" />
                </h2>
              </Title>
            </FlexItem>

            {/* <FlexItem grow={false}>
              <FilterTab
                count={dataTotalItem}
                items={FILTER_TABS}
                selectedValue={active}
                loading={isLoading || isFetching}
                onSelect={async (key, value) => {
                  await onRemoveAll(query);
                  await onSelect(key)(value);
                }}
              />
            </FlexItem> */}
            <FlexItem grow />
            <FlexItem grow={false}>
              <Link to={`${path}/price`}>
                <Button fill className="rounded-lg" color="primary">
                  <Text>
                    <p>
                      <Icon type="listAdd" />
                      &nbsp;
                      <FormattedMessage defaultMessage="Nhập dữ liệu" />
                    </p>
                  </Text>
                </Button>
              </Link>
            </FlexItem>
          </FlexGroup>
        }
      />
    </div>
  );
};

export default MarketingReportHeader;
