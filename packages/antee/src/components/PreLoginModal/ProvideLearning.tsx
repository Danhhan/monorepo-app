import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Spacer, Text } from '@antoree/ant-ui';
import banner1 from 'assets/images/booking-confirmation.png';
import PreLoginModal from './index';

import styles from '../AvailableTime/CreateConfirmation.module.scss';

type ProvideLearningProps = {
  dataCampain: {};
  isVisiableModal: boolean;
  closeModal: () => void;
  handleToggle?: () => void;
};

const ProvideLearning: React.FC<ProvideLearningProps> = ({
  dataCampain,
  isVisiableModal,
  closeModal,
  handleToggle,
}) => {
  return (
    <>
      <div
        className="flex justify-center items-center flex-col p-10"
        style={{ minHeight: '100px' }}
        id={styles.antoreeLearning}
      >
        <Spacer size="m" />
        <Text size="m">
          <h3
            className="text-center"
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            <FormattedMessage defaultMessage="Miễn phí học thử" />
          </h3>
        </Text>
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
                padding: '32px 32px 32px 32px',
              }}
            />
          </div>
        </div>
        <Spacer size="m" />

        <>
          <PreLoginModal
            dataCampain={dataCampain}
            isVisiable={isVisiableModal}
            onClose={closeModal}
          />
          <Button fullWidth fill onClick={handleToggle}>
            <FormattedMessage defaultMessage="Đăng ký học thử miễn phí" />
          </Button>
        </>
      </div>
    </>
  );
};

export default ProvideLearning;
