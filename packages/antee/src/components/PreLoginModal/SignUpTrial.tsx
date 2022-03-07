import React from 'react';
import {
  Button,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';

import styles from './SigupTrial.module.scss';

export type SignUpProps = {
  isVisiable: boolean;
  onConfirm?: () => void;
  onClose: () => void;
  onFormTrialSubmit?: (data: any) => void;
  setIsSignUpTrial: (data: boolean) => void;
  setIsSignUp: (data: boolean) => void;

  setFistName: (data: string) => void;
  setLastName: (data: string) => void;
  setphoneNumber: (data: string) => void;
  setEmail: (data: string) => void;
  isSignUpParam?: boolean;
  // handleTrialSubmit?: () => void;
  control?: any;
  errors?: any;
  isLoading: boolean;
};
const SignUpTrial: React.FC<SignUpProps> = ({
  // handleTrialSubmit,
  isLoading,
  setIsSignUpTrial,
  setIsSignUp,
  onFormTrialSubmit,
  setFistName,
  setLastName,
  setphoneNumber,
  setEmail,
}) => {
  const intl = useIntl();
  const hanldeRemoveUtmCookie = () => {
    // eslint-disable-next-line no-shadow
    document.cookie = '_utm=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };
  return (
    <>
      <PageContentHeader>
        <PageContentHeaderSection>
          <Title size="m" className="font-bold">
            <h1>
              <FormattedMessage defaultMessage="Đăng ký học thử miễn phí" />
            </h1>
          </Title>
          <Text size="s" color="text">
            <p />
          </Text>
        </PageContentHeaderSection>
      </PageContentHeader>
      <Spacer />
      <PageContentBody>
        <Form component="form" method="post" onSubmit={onFormTrialSubmit}>
          <FlexGroup>
            <FlexItem>
              <FormRow fullWidth>
                <FieldText
                  required
                  onChange={(e: any) => {
                    setFistName(e.target.value);
                  }}
                  fullWidth
                  icon="user"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Tên',
                  })}
                />
              </FormRow>
            </FlexItem>
            <FlexItem>
              <FormRow fullWidth>
                <FieldText
                  required
                  onChange={(e: any) => {
                    setLastName(e.target.value);
                  }}
                  fullWidth
                  icon="user"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Họ',
                  })}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
          <Spacer />
          <FormRow fullWidth>
            <FieldText
              required
              onChange={(e: any) => {
                setphoneNumber(e.target.value);
              }}
              fullWidth
              pattern="((09|03|07|08|05)+([0-9]{8})\b)"
              icon="mobile"
              placeholder={intl.formatMessage({
                defaultMessage: 'Số điện thoại',
              })}
            />
          </FormRow>
          <Spacer />
          <FormRow fullWidth>
            <FieldText
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              fullWidth
              icon="email"
              placeholder={intl.formatMessage({
                defaultMessage: 'Email (Không bắt buộc)',
              })}
            />
          </FormRow>

          <Spacer />

          <FormRow fullWidth>
            <Button
              color="warning"
              fill
              fullWidth
              type="submit"
              onClick={(e: any) => {
                hanldeRemoveUtmCookie();
              }}
              isLoading={isLoading}
            >
              <Text className="text-center" size="s">
                <FormattedMessage defaultMessage="Đăng ký" />
              </Text>
            </Button>
          </FormRow>
          {/* <HorizontalRule/> */}
          <div className={styles.antoreeTextmore}>
            <div className={styles.lineAntroee} />
            <div style={{ display: 'inline-block', fontSize: '12px' }}>
              Hoặc
            </div>
            <div className={styles.lineAntroee} />
          </div>
          <FormRow fullWidth hasEmptyLabelSpace>
            <Button
              fill
              fullWidth
              onClick={() => {
                setIsSignUpTrial(false);
                setIsSignUp(true);
              }}
              isLoading={isLoading}
            >
              <Text className="text-center" size="s">
                <FormattedMessage defaultMessage="Tạo tài khoản học viên" />
              </Text>
            </Button>
          </FormRow>
        </Form>
      </PageContentBody>
      <div className={styles.antoreeTextfooter}>
        <p>
          Đặt lịch với bất kỳ giáo viên nào <br /> hoặc tham gia kiểm tra Tiếng
          Anh miễn phí
        </p>
      </div>
    </>
  );
};
export default SignUpTrial;
