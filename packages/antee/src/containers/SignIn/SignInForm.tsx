import {
  Button,
  FieldPassword,
  FieldText,
  FieldTextProps,
  FlexGrid,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  notification,
  PageContentBody,
  Spacer,
  Text,
  ButtonEmpty,
  PageContentHeader,
  PageContentHeaderSection,
  Outline,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRetrieveAccessToken } from 'services/auth';
import { useAuth } from 'services/auth/contexts';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import styles from './SignIn.module.scss';

interface IFormData {
  userName: string;
  password: string;
}

const defaultValues: IFormData = {
  userName: '',
  password: '',
};

const formSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  userName: yup.string().trim().required(),
  password: yup.string().required(),
});

const SignInForm: React.FC<{
  handleSuccess: () => void;
  handleSignUp: () => void;
  handleFogotPass: () => void;
  isPreLogin: boolean;
}> = ({ handleSuccess, handleSignUp, handleFogotPass, isPreLogin = false }) => {
  const intl = useIntl();

  const { authenticateHandler } = useAuth();

  const [isForgot, setIsForgot] = useState(false);
  const { VideoCameraIcon } = Outline;
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const { mutate, isLoading } = useRetrieveAccessToken({
    onSuccess: data => {
      authenticateHandler(data.data.access_token);
      handleSuccess();
      // console.log(data.data.access_token);
      {
        window.location.pathname === '/affiliatemarketing' &&
          history.push('/affiliates');
      }
    },
    onError: () => {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Sai tên tài khoản hoặc mật khẩu" />
        ),
      });
    },
  });

  const onFormSubmit = (data: IFormData) => {
    mutate(data);
  };

  return isForgot ? (
    <p />
  ) : (
    <>
      {isPreLogin ? <Spacer /> : ''}
      <PageContentHeader>
        {window.location.pathname !== '/sign-in' ? (
          <PageContentHeaderSection>
            <Title size="m" className="font-bold">
              <h1>
                <FormattedMessage defaultMessage="Đăng nhập" />
              </h1>
            </Title>
          </PageContentHeaderSection>
        ) : null}
      </PageContentHeader>
      <Spacer />
      <PageContentBody>
        <Form component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <Text style={{ fontSize: '16px', fontWeight: 600 }}>
            Email hoặc số điện thoại{' '}
          </Text>
          <FormRow isInvalid={!!errors.userName} fullWidth>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <FieldText
                  {...field}
                  fullWidth
                  icon="user"
                  isInvalid={!!errors.password}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Nhập email hoặc số điện thoại',
                  })}
                />
              )}
            />
          </FormRow>
          <div className="labelpassword" style={{ marginTop: '25px' }}>
            <FlexGrid columns={2} direction={isMobile ? 'column' : 'row'}>
              <FlexItem>
                <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Mật khẩu
                </Text>
              </FlexItem>
              <FlexItem grow={2}>
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#00C081',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                  }}
                  onClick={handleFogotPass}
                >
                  Quên mật khẩu
                </Text>
              </FlexItem>
            </FlexGrid>
          </div>
          <FormRow
            isInvalid={!!errors.password}
            error={errors.password?.message}
            fullWidth
            className={styles.antoReeeIconLock}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
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
                </>
              )}
            />
          </FormRow>
          <FormRow fullWidth hasEmptyLabelSpace>
            <Button
              style={{
                textDecoration: 'none',
                background: '#14B24C',
              }}
              fill
              fullWidth
              type="submit"
              isLoading={isLoading}
            >
              <Text className="text-center" size={isPreLogin ? 's' : 'm'}>
                <FormattedMessage defaultMessage="Đăng nhập" />
              </Text>
            </Button>
          </FormRow>
          {/* <HorizontalRule /> */}
          <Text
            className={styles.antoreeTextmore}
            size={isPreLogin ? 'xs' : 'm'}
          >
            <p>
              <FormattedMessage defaultMessage="Chưa có tài khoản ?" />
            </p>
          </Text>
          <Button
            style={{
              textDecoration: 'none',
            }}
            fill
            fullWidth
            color="warning"
            onClick={() => handleSignUp()}
            isLoading={isLoading}
          >
            <FormattedMessage defaultMessage="Đăng Ký" />
          </Button>
        </Form>
      </PageContentBody>
    </>
  );
};

export default SignInForm;
