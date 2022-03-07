import { FlexGroup, FlexItem, Spacer, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const TeamPanelCell = ({
  label,
  value,
  color,
  convertNumber,
  toDot,
  width,
  digitAfterDecimal,
}) => {
  function ultraConvertValueFunc() {
    if (digitAfterDecimal) {
      const num = Math.pow(10, digitAfterDecimal);
      return `${Math.round(value * num) / num}%`;
    }

    if (!convertNumber) {
      return value;
    }

    // eslint-disable-next-line radix
    const reCookParam = Math.round(parseInt(value));
    return reCookParam
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, toDot ? '.' : ',');
  }

  return (
    <FlexItem>
      <FlexGroup
        gutterSize="none"
        responsive={false}
        direction="column"
        className="mx-4"
        style={{ width: `${width || 100}px` }}
      >
        <FlexItem grow={false}>
          <Text size="s" color={color}>
            <p className="font-semibold whitespace-nowrap">{label}</p>
          </Text>
        </FlexItem>
        <Spacer size="l" />
        <FlexItem grow={false}>
          <Text size="s" color={color}>
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap m-0">
              {ultraConvertValueFunc()}
            </p>
          </Text>
        </FlexItem>
      </FlexGroup>
    </FlexItem>
  );
};

TeamPanelCell.defaultProps = {
  label: '',
  value: '',
  width: false,
  color: 'subdued',
  convertNumber: false,
  toDot: true,
  digitAfterDecimal: 0,
};

TeamPanelCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  label: PropTypes.any,
  digitAfterDecimal: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  color: PropTypes.string,
  convertNumber: PropTypes.bool,
  toDot: PropTypes.bool,
};

export default TeamPanelCell;
