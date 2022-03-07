import { FlexItem, FlexGrid } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

import OverviewPanel from './OverviewPanel';

const OverviewContain = ({ isLoading, dataOverview }) => {
  // eslint-disable-next-line no-console
  return (
    <FlexGrid gutterSize="s" columns={4}>
      {dataOverview.map(dataItem => (
        <FlexItem key={dataItem.title} style={{ flexGrow: 1 }}>
          <OverviewPanel
            isLoading={isLoading}
            title={dataItem.title}
            description={dataItem.description}
            data={dataItem.data}
          />
        </FlexItem>
      ))}
    </FlexGrid>
  );
};

OverviewContain.defaultProps = {
  isLoading: true,
  dataOverview: [],
};

OverviewContain.propTypes = {
  isLoading: PropTypes.bool,
  dataOverview: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      // eslint-disable-next-line react/forbid-prop-types
      description: PropTypes.any,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          // eslint-disable-next-line react/forbid-prop-types
          label: PropTypes.any,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
      ),
    }),
  ),
};

export default OverviewContain;
