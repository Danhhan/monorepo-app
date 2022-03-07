import { Panel, Stat, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const OverviewPanel = ({ data, title, description, digitAfterDecimal }) => {
  function ultraConvertValueFunc(value) {
    if (digitAfterDecimal) {
      const num = Math.pow(10, digitAfterDecimal);
      return Math.round(value * num) / num;
    }

    // eslint-disable-next-line radix
    const reCookParam = Math.round(parseInt(value));
    return reCookParam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Panel>
      <Stat
        className="font-semibold"
        title={ultraConvertValueFunc(title)}
        titleSize="m"
        description={description}
        descriptionElement="p"
        titleFontWeight={600}
        descriptionColor="#9FA2B4"
      >
        <Text
          size="s"
          className="text-green-500 leading-4 h-12 flex flex-col items-start"
        >
          {data?.map((item, index) =>
            item.label ? (
              <p
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="mt-auto"
                style={{ marginBottom: '0px' }}
              >
                <span className="text-gray-500">{item.label} =</span>
                &nbsp;{item.value}
              </p>
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <p key={index} className="mt-auto">
                {item.value}
              </p>
            ),
          )}
        </Text>
      </Stat>
    </Panel>
  );
};

OverviewPanel.defaultProps = {
  data: [],
  title: '',
  description: '',
  digitAfterDecimal: false,
};

OverviewPanel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // eslint-disable-next-line react/forbid-prop-types
  description: PropTypes.any,
  digitAfterDecimal: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
};

export default OverviewPanel;
