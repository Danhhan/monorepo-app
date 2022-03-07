import { FlexGroup, FlexItem, Title } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const PriceCourse = ({ topicSalary, isDividing }) => {
  function numberWithCommas(x, type) {
    // eslint-disable-next-line radix
    const reCookParam = Math.round(parseInt(x));

    if (isDividing) {
      return (reCookParam / 2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, type === 'VND' ? ',' : '.');
    }

    return reCookParam
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, type === 'VND' ? ',' : '.');
  }

  return (
    <FlexGroup>
      <FlexItem>
        <Title size="xs">
          <h4>
            <FormattedMessage defaultMessage="Estimated Price" />
          </h4>
        </Title>
      </FlexItem>
      <FlexItem className="justify-end">
        <Title size="xs">
          <p className="text-green-400 text-right">
            {`${
              topicSalary
                ? numberWithCommas(
                    topicSalary?.hourlyAmount || 0,
                    topicSalary?.amountCurrency || 'VND',
                  )
                : 0
            } ${topicSalary?.amountCurrency || 'VND'}`}
          </p>
        </Title>
      </FlexItem>
    </FlexGroup>
  );
};

PriceCourse.defaultProps = {
  topicSalary: {},
  isDividing: false,
};

PriceCourse.propTypes = {
  topicSalary: PropTypes.shape({
    hourlyAmount: PropTypes.number,
    amountCurrency: PropTypes.string,
  }),
  isDividing: PropTypes.bool,
};

export default PriceCourse;
