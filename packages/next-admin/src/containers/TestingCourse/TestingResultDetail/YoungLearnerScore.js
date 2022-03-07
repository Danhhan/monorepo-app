/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FlexGroup, FlexItem } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

const Td = ({ children }) => (
  <td className="border border-gray-300 border-solid px-4 py-2">{children}</td>
);

const TdColSpan2 = ({ children }) => (
  <td
    style={{ width: '201px' }}
    colSpan="2"
    className="border border-gray-300 border-solid px-4 py-2"
  >
    {children}
  </td>
);

const Td2 = ({ children }) => (
  <td
    style={{ width: '251px' }}
    className="border border-gray-300 border-solid px-4 py-2"
  >
    {children}
  </td>
);

const Td3 = ({ children }) => (
  <td
    style={{ width: '144px' }}
    className="border border-gray-300 border-solid px-4 py-2"
  >
    {children}
  </td>
);

// eslint-disable-next-line react/prop-types
function YoungLearnerScore() {
  return (
    <FlexGroup>
      <FlexItem>
        <table style={{ margin: '20px 0 40px 0' }} className="table-fixed">
          <thead>
            <tr>
              <th
                colSpan="10"
                className="border border-gray-300 border-solid px-4 py-2"
              >
                SCORE FOR EACH CRITERIA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>0</Td>
              <Td>1</Td>
              <Td>2</Td>
              <Td>3</Td>
              <Td>4</Td>
              <Td>5</Td>
              <Td>6</Td>
              <Td>7</Td>
              <Td>8</Td>
              <Td>9</Td>
            </tr>
            <tr>
              <Td2>
                <FormattedMessage defaultMessage="Not Passed" />
              </Td2>
              <TdColSpan2>
                <FormattedMessage defaultMessage="Acceptable" />
              </TdColSpan2>
              <TdColSpan2>
                <FormattedMessage defaultMessage="Basic" />
              </TdColSpan2>
              <TdColSpan2>
                <FormattedMessage defaultMessage="Adaptable" />
              </TdColSpan2>
              <TdColSpan2>
                <FormattedMessage defaultMessage="Good" />
              </TdColSpan2>
              <Td2>
                <FormattedMessage defaultMessage="Perfect" />
              </Td2>
            </tr>
          </tbody>
        </table>
        <table className="table-fixed">
          <thead>
            <tr>
              <th
                colSpan="10"
                className="border border-gray-300 border-solid px-4 py-2"
              >
                TOTAL SCORE & LEVELS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>0 - 5</Td>
              <Td>6 - 10</Td>
              <Td>11 - 15</Td>
              <Td>16 - 20</Td>
              <Td>21 - 25</Td>
              <Td>26 - 30</Td>
            </tr>
            <tr>
              <Td3>Pre-A1</Td3>
              <Td3>Upper Pre-A1</Td3>
              <Td3>A1</Td3>
              <Td3>Upper A1</Td3>
              <Td3>Pre-A2</Td3>
              <Td3>A2</Td3>
            </tr>
          </tbody>
        </table>
      </FlexItem>
    </FlexGroup>
  );
}

export default YoungLearnerScore;
