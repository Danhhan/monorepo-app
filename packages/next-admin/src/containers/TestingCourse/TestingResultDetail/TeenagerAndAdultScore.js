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
    style={{ width: '101px' }}
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
function TeenagerAndAdultScore() {
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
            </tr>
            <tr>
              <Td2>
                <FormattedMessage defaultMessage="Not Applicable" />
              </Td2>
              <Td2>
                <FormattedMessage defaultMessage="Basic" />
              </Td2>
              <Td2>
                <FormattedMessage defaultMessage="Adaptable" />
              </Td2>
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
              <Td>0.0 – 1.0</Td>
              <Td>1.0 – 2.5</Td>
              <Td>3.0 – 3.5</Td>
              <Td>4.0 – 5.0</Td>
              <Td>5.5 – 6.5</Td>
              <Td>7.0 – 8.0</Td>
              <Td>8.5 – 9.0</Td>
            </tr>
            <tr>
              <Td3>A0 (Starter)</Td3>
              <Td3>A1 (Beginner)</Td3>
              <Td3>A2 (Elementary)</Td3>
              <Td3>B1 (Intermediate)</Td3>
              <Td3>B2 (Upper Intermediate)</Td3>
              <Td3>C1 (Advanced)</Td3>
              <Td3>C2 (Proficiency)</Td3>
            </tr>
          </tbody>
        </table>
      </FlexItem>
    </FlexGroup>
  );
}

export default TeenagerAndAdultScore;
