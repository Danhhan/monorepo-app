import React, { useState } from 'react';
import {
  Button,
  FieldPassword,
  FieldText,
  Form,
  FormRow,
  notification,
  PageContentBody,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import OtpInput from 'react-otp-input';

import { useHistory } from 'react-router-dom';

import {
  useRetrieveOTP,
  useRetrieveResendOTP,
  useRetrieveResetPassword,
  useRetrieveResetPasswordOTP,
} from 'services/auth';
import NewPasswordForm from './NewPasswordForm';
import CountDownResend from './CountDownResend';

interface OtpInputVerifyProps {
  token: string;
  datavalue: {};
  setToken: any;
  handleSignIn: () => void;
}
interface IFormData {
  code?: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

const defaultValues: IFormData = {
  code: '',
  password: '',
  confirmPassword: '',
  otp: '',
};

const OtpInputVerify = ({
  token,
  datavalue,
  setToken,
  handleSignIn,
}: OtpInputVerifyProps) => {
  const [initialSeconds, setInitialSeconds] = useState(60);
  const [updatePassword, setUpdatePassowrd] = useState(false);

  const history = useHistory();
  const [otpvalue, setOtpvalue] = useState('');
  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit: handleSubmitOtp,
    watch,
  } = useForm<IFormData>({ mode: 'all' });

  const hanleChangleOtp = (otp: any) => {
    setOtpvalue(otp);
  };
  const {
    mutate: mutateOtp,
    isLoading: isLoadingVerify,
    // variables,
  } = useRetrieveOTP();
  const dt = {
    token,
    code: otpvalue,
  };

  const onFormOtpSubmit = (data: { otpvalue: string }) => {
    mutateOtp(dt, {
      onSuccess: () => {
        setUpdatePassowrd(!updatePassword);
      },
      onError: err => {
        if (err?.response?.status === 400) {
          notification.error({
            title: <FormattedMessage defaultMessage="Có lỗi sảy ra !" />,
            text: <FormattedMessage defaultMessage="Sai mã OTP" />,
          });
          // resendHandle();
        } else {
          notification.error({
            title: <FormattedMessage defaultMessage="Error occured!" />,
          });
          // setValuePhone('phone', '');
        }
      },
    });
  };
  const {
    mutate: mutateResendOtp,
    isLoading: isLoadingResend,
  } = useRetrieveResendOTP({
    onSuccess: ({ data: dataSuccessVerify }) => {
      setToken(dataSuccessVerify.token);
      notification.success({
        title: <FormattedMessage defaultMessage="Gửi lại thành công" />,
      });
      // setValue('code', '');
      setInitialSeconds(60);
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Gửi lại thất bại" />,
      });
    },
  });
  const resendHandle = () => {
    setInitialSeconds(0);
    mutateResendOtp({
      token,
    });
  };

  return (
    <div>
      {!updatePassword ? (
        <Form
          key={1}
          component="form"
          onSubmit={handleSubmitOtp(onFormOtpSubmit)}
        >
          <Text style={{ fontSize: '16px', fontWeight: 600 }}>
            Nhập mã OTP{' '}
          </Text>
          <FormRow fullWidth>
            <OtpInput
              isDisabled={isLoadingResend}
              // isDisabled
              numInputs={6}
              separator={<span>-</span>}
              isInputNum
              // shouldAutoFocus={false}
              containerStyle={{
                justifyContent: 'center',
                marginTop: '8px',
              }}
              focusStyle={{
                outline: 'rgba(0, 192, 129, 1) auto 1px',
              }}
              value={otpvalue}
              onChange={hanleChangleOtp}
              inputStyle={{
                width: '2.5rem',
                height: '2.5rem',
                margin: '0 0.5rem',
                fontSize: '1.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.3)',
              }}
            />
          </FormRow>
          <FormRow>
            <CountDownResend
              initialSeconds={initialSeconds}
              //   resendHandle={resendHandle}
              resendHandle={resendHandle}
              isLoadingVerify={false}
              isLoadingResend={isLoadingResend}
            />
          </FormRow>
          <Button
            style={{
              marginTop: '10px',
              width: '100%',
            }}
            fill
            disabled={!(otpvalue.length >= 6)} // here
            className="btn btn-success w-100"
            type="submit"
          >
            Tiếp tục
          </Button>
        </Form>
      ) : (
        <div>
          <NewPasswordForm handleSignIn={handleSignIn} token={token} />
        </div>
      )}
    </div>
  );
};

export default OtpInputVerify;
