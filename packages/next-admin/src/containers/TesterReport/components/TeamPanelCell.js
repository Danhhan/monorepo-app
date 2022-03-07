import { FlexGroup, FlexItem, Spacer, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const TeamPanelCell = ({
  label,
  value,
  color,
  labelColor,
  convertNumber,
  toDot,
  width,
  digitAfterDecimal,
}) => {
  function ultraConvertValueFunc() {
    if (digitAfterDecimal) {
      const num = Math.pow(10, digitAfterDecimal);
      return Math.round(value * num) / num;
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
    <FlexGroup
      gutterSize="none"
      responsive={false}
      direction="column"
      className="mx-4"
    >
      <FlexItem grow={false}>
        <Text size="s" color={labelColor}>
          <p className="font-semibold whitespace-nowrap">{label}</p>
        </Text>
      </FlexItem>
      <Spacer size="l" />
      <FlexItem grow={false}>
        <Text size="s" className="text-green-500">
          <p
            style={{ width: `${width}px` }}
            className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          >
            {ultraConvertValueFunc()}
          </p>
        </Text>
      </FlexItem>
    </FlexGroup>
  );
};

TeamPanelCell.defaultProps = {
  label: '',
  value: '',
  width: undefined,
  color: undefined,
  labelColor: undefined,
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
  labelColor: PropTypes.string,
  convertNumber: PropTypes.bool,
  toDot: PropTypes.bool,
};

export default TeamPanelCell;
