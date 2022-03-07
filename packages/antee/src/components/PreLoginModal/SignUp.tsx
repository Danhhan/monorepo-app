import React from 'react';
import {
  Button,
  FieldPassword,
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
import { Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from './SigupTrial.module.scss';

export type SignUpProps = {
  isVisiable: boolean;
  onConfirm?: () => void;
  onClose: () => void;
  setIsSignUp: (data: boolean) => void;
  isSignUpParam?: boolean;
  handleSubmit?: () => void;
  control?: any;
  errors?: any;
  isLoading: boolean;
};
const SignUp: React.FC<SignUpProps> = ({
  isVisiable = false,
  onConfirm = () => {},
  onClose = () => {},
  isSignUpParam = true,
  control,
  errors,
  handleSubmit,
  isLoading,
  setIsSignUp,
}) => {
  const intl = useIntl();

  return (
    <>
      <PageContentHeader>
        <PageContentHeaderSection>
          <Title size="m" className="font-bold">
            <h1>
              <FormattedMessage defaultMessage="Đăng ký" />
            </h1>
          </Title>
          <Text size="s" color="text">
            <p style={{ fontSize: '12px' }}>
              <FormattedMessage defaultMessage="Học thử và kiểm tra trình độ Tiếng Anh miễn phí" />
            </p>
          </Text>
        </PageContentHeaderSection>
      </PageContentHeader>
      <Spacer />
      <PageContentBody>
        <Form component="form" onSubmit={handleSubmit}>
          <FlexGroup>
            <FlexItem>
              <FormRow isInvalid={!!errors.firstName} fullWidth>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <FieldText
                      {...field}
                      fullWidth
                      icon="user"
                      isInvalid={!!errors.firstName}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Tên',
                      })}
                    />
                  )}
                />
              </FormRow>
            </FlexItem>
            <FlexItem>
              <FormRow isInvalid={!!errors.lastName} fullWidth>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <FieldText
                      {...field}
                      fullWidth
                      icon="user"
                      isInvalid={!!errors.lastName}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Họ',
                      })}
                    />
                  )}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
          <Spacer />
          <FormRow isInvalid={!!errors.phoneNumber} fullWidth>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <FieldText
                  {...field}
                  fullWidth
                  icon="mobile"
                  isInvalid={!!errors.phoneNumber}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Số điện thoại',
                  })}
                />
              )}
            />
          </FormRow>
          <Spacer />
          <FormRow
            isInvalid={!!errors.password}
            error={errors.password?.message}
            fullWidth
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FieldPassword
                  borderRaius={8}
                  className="rounded-l-lg"
                  {...field}
                  isInvalid={!!errors.password}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Nhập mật khẩu',
                  })}
                  type="dual"
                  fullWidth
                />
              )}
            />
          </FormRow>

          <Spacer />

          <Button
            color="warning"
            fill
            fullWidth
            type="submit"
            isLoading={isLoading}
          >
            <Text className="text-center" size="s">
              <FormattedMessage defaultMessage="Đăng ký" />
            </Text>
          </Button>
          <Text
            style={{
              textAlign: 'center',
              paddingTop: '32px',
              paddingBottom: '8px',
            }}
            size="xs"
          >
            <p>
              <FormattedMessage defaultMessage="Đã có tài khoản?" />
            </p>
          </Text>
          <Button
            fill
            fullWidth
            onClick={() => setIsSignUp(false)}
            isLoading={isLoading}
          >
            <Text className="text-center" size="s">
              <FormattedMessage defaultMessage="Đăng nhập" />
            </Text>
          </Button>
        </Form>
      </PageContentBody>
    </>
  );
};
export default SignUp;
