import React, { FunctionComponent } from 'react';
import {
  Badge,
  Button,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  notification,
  Slider,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import banner1 from '../../../assets/images/booking-confirmation.png';

interface OwnProps {}

type Props = OwnProps;

const NotimeFree: FunctionComponent<Props> = props => {
  return (
    <>
      <div
        className="flex justify-center items-center flex-col p-10"
        style={{ minHeight: '100px' }}
      >
        <div
          style={{ maxHeight: '40vh' }}
          className="flex flex-col justify-center items-center h-auto"
        >
          <div>
            <img
              src={banner1}
              alt="map"
              style={{
                width: '340px',
                paddingBottom: '32px',
              }}
            />
          </div>
        </div>
        <Spacer size="m" />
        <Text size="m">
          <p className="text-center">
            <FormattedMessage defaultMessage="Giáo viên hiện chưa có lịch trống" />
          </p>
        </Text>

        <Spacer size="m" />
      </div>
    </>
  );
};

export default NotimeFree;
