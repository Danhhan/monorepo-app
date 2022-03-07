/* eslint-disable radix */
import {
  Button,
  FieldText,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import styles from './UserProfile.module.scss';

export type UserProfileProps = {
  isVisiable: boolean;
  onClose: () => void;
  User: {
    fullName: string | undefined;
    phoneNumber: string | undefined;
    birthDay: string | undefined;
    gender: number | undefined;
    userType: number | undefined;
    goals: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = ({
  User,
  isVisiable = false,
  onClose = () => {},
}) => {
  const isReading = true;
  return isVisiable ? (
    <Modal onClose={onClose} style={{ width: '696px', padding: '0 30px' }}>
      <ModalHeader style={{ justifyContent: 'left' }}>
        <Text textAlign="center">
          <h2>
            <FormattedMessage defaultMessage="My profile" />
          </h2>
        </Text>
      </ModalHeader>
      <ModalBody>
        <FlexGroup direction="column" gutterSize="m">
          <FlexItem grow={false}>
            <FlexGroup alignItems="flexStart" gutterSize="s" responsive={false}>
              <FlexItem style={{ borderRight: '1px solid #999999' }}>
                <FlexGroup
                  direction="column"
                  justifyContent="center"
                  gutterSize="xs"
                >
                  <Title size="xxs">
                    <h5 style={{ margin: '5px 0px' }}>
                      <FormattedMessage defaultMessage="Personal information" />
                    </h5>
                  </Title>
                  <FlexItem style={{ margin: '7px 0px', paddingRight: '30px' }}>
                    <Text size="xs" color="default">
                      <p>
                        <FormattedMessage defaultMessage="Full Name" />
                      </p>
                    </Text>
                    <FieldText
                      style={{
                        borderRadius: '3px',
                        border: '1.25px solid #999999',
                        height: '48px',
                      }}
                      className={styles.FieldTextLeft}
                      readOnly={isReading}
                      value={User.fullName}
                      fullWidth
                    />
                  </FlexItem>
                  <FlexItem style={{ margin: '7px 0px', paddingRight: '30px' }}>
                    <Text size="xs" color="default">
                      <p>
                        <FormattedMessage defaultMessage="Your phone number" />
                      </p>
                    </Text>
                    <FieldText
                      style={{
                        borderRadius: '3px',
                        border: '1.25px solid #999999',
                        height: '48px',
                      }}
                      className={styles.FieldTextLeft}
                      readOnly={isReading}
                      value={User.phoneNumber}
                      fullWidth
                    />
                  </FlexItem>
                  <FlexItem style={{ margin: '7px 0px', paddingRight: '30px' }}>
                    <Text size="xs" color="default">
                      <p>
                        &nbsp;
                        <FormattedMessage defaultMessage="Date of birth" />
                      </p>
                    </Text>
                    <FieldText
                      style={{
                        borderRadius: '3px',
                        border: '1.25px solid #999999',
                        height: '48px',
                      }}
                      className={styles.FieldTextLeft}
                      readOnly={isReading}
                      value={User.birthDay}
                      fullWidth
                    />
                  </FlexItem>
                  <FlexItem style={{ margin: '7px 0px', paddingRight: '30px' }}>
                    <Text size="xs" color="default">
                      <p>
                        <FormattedMessage defaultMessage="Gender" />
                      </p>
                    </Text>
                    <FieldText
                      style={{
                        borderRadius: '3px',
                        border: '1.25px solid #999999',
                        height: '48px',
                      }}
                      readOnly={isReading}
                      value={User.gender === 1 ? 'Male' : 'Female'}
                      fullWidth
                      className={styles.FieldTextLeft}
                    />
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
              <Spacer size="m" />
              <FlexItem style={{ margin: '7px 0px', paddingLeft: '25px' }}>
                <FlexGroup
                  justifyContent="center"
                  gutterSize="xs"
                  direction="column"
                >
                  <Title size="xxs">
                    <h5 style={{ margin: '5px 0px' }}>
                      <FormattedMessage defaultMessage="Learning profile" />
                    </h5>
                  </Title>
                  <FlexItem style={{ margin: '7px 0px' }}>
                    <Text size="xs" color="default">
                      <p>
                        <FormattedMessage defaultMessage="Student Type" />
                      </p>
                    </Text>
                    <FieldText
                      style={{
                        borderRadius: '3px',
                        border: '1.25px solid #999999',
                        height: '48px',
                      }}
                      className={styles.FieldTextRight}
                      readOnly={isReading}
                      value={User.userType === 1 ? 'Kid' : 'Adult'}
                      fullWidth
                    />
                  </FlexItem>
                  <FlexItem style={{ margin: '7px 0px' }}>
                    <Text size="xs" color="default">
                      <p>
                        <FormattedMessage defaultMessage="Your goal" />
                      </p>
                    </Text>
                    <TextArea
                      style={{
                        borderRadius: '3px',
                        border: '1.25px solid #999999',
                      }}
                      readOnly={isReading}
                      value={User.goals}
                      fullWidth
                      className={styles.FieldTextRight}
                    />
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
            </FlexGroup>
          </FlexItem>
        </FlexGroup>
      </ModalBody>
      <ModalFooter>
        <Button fill onClick={onClose} style={{ background: '#14B24C' }}>
          <FormattedMessage defaultMessage="close" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default UserProfile;
