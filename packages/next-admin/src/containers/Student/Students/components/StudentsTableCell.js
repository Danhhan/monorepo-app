import { FlexGroup, FlexItem, Spacer, Text } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const StudentsTableCell = ({
  label,
  value,
  color,
  convertNumber,
  toDot,
  width,
  digitAfterDecimal,
}) => {
  return (
    <FlexGroup
      gutterSize="none"
      responsive={false}
      direction="column"
      className="mx-2"
    >
      <FlexItem>
        <Text size="xs" color={color}>
          <p className="font-semibold whitespace-nowrap">{label}</p>
        </Text>
      </FlexItem>
      <FlexItem style={{ height: '100%' }}>
        <Text size="s" color="text">
          <p
            style={{ width: `${width}px` }}
            className="overflow-hidden overflow-ellipsis whitespace-nowrap"
          >
            {value}
          </p>
        </Text>
      </FlexItem>
    </FlexGroup>
  );
};

StudentsTableCell.defaultProps = {
  label: '',
  value: '',
  width: false,
  color: 'subdued',
  convertNumber: false,
  toDot: true,
  digitAfterDecimal: 0,
};

StudentsTableCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  label: PropTypes.any,
  digitAfterDecimal: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  color: PropTypes.string,
  convertNumber: PropTypes.bool,
  toDot: PropTypes.bool,
};

export default StudentsTableCell;
