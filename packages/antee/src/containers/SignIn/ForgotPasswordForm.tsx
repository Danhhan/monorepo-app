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
import { useState } from 'react';
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
import * as yup from 'yup';
import { FormControl, InputBase, TextField } from '@mui/material';
import { isEmpty } from 'lodash';
import CountDownResend from './CountDownResend';
import OtpInputVerify from './OtpInputVerify';

interface IFormData {
  code?: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: IFormData = {
  code: '',
  password: '',
  confirmPassword: '',
};

interface IFormPhone {
  phone: string;
}

const defaultValuesPhone: IFormPhone = {
  phone: '',
};

const formSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  code: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Required'),
});

const formSchemaPhone: yup.SchemaOf<IFormPhone> = yup.object().shape({
  phone: yup.string().required(),
});

const ForgotPasswordForm: React.FC<{
  //   handleSuccess?: (value: boolean) => void;
  handleSignIn: () => void;
  setIsForgotpass: any;
  isPreLogin: boolean;
}> = ({ handleSignIn, isPreLogin = false }) => {
  const intl = useIntl();

  const [initialSeconds, setInitialSeconds] = useState(60);
  const history = useHistory();
  const [otpvalue, setOtpvalue] = useState('');
  const [datavalue, setDatavalue] = useState({});

  const [token, setToken] = useState<string>('');

  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit: handleSubmitPhone,
    watch,
  } = useForm({ mode: 'all' });

  const {
    mutate: mutatePhoneOTP,
    isLoading: isLoadingOTP,
  } = useRetrieveResetPasswordOTP({
    onSuccess: data => {
      console.log(data);
      setDatavalue(data.data.data);
      setToken(data?.data?.data?.token);
    },
    onError: () => {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Số điện thoại không tồn tại trên hệ thống" />
        ),
      });
    },
  });

  const {
    mutate: mutateResetPassword,
    isLoading: isLoadingResetPassword,
  } = useRetrieveResetPassword({
    onSuccess: ({ data: dataSuccessVerify }) => {
      notification.success({
        title: <FormattedMessage defaultMessage="Khôi phục thành công" />,
      });
      handleSignIn();
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Khôi phục thất bại !" />,
      });
    },
  });

  const {
    mutate: mutateResendOtp,
    isLoading: isLoadingResend,
  } = useRetrieveResendOTP({
    onSuccess: ({ data: dataSuccessVerify }) => {
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

  const onFormSubmitPhone = (data: IFormPhone) => {
    console.log(data);
    mutatePhoneOTP(data);
  };

  return (
    <>
      {isPreLogin ? <Spacer /> : ''}
      <PageContentBody>
        {isEmpty(token) ? (
          <Form
            key={1}
            component="form"
            onSubmit={handleSubmitPhone(onFormSubmitPhone)}
          >
            <Text style={{ fontSize: '16px', fontWeight: 600 }}>
              Số điện thoại{' '}
            </Text>
            <FormRow fullWidth>
              <FieldText
                fullWidth
                icon="user"
                {...register('phone', {
                  required: true,

                  pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Số điện thoại của bạn',
                })}
              />
            </FormRow>
            <p style={{ color: 'red', fontSize: '13px' }}>
              {errors.phone?.type === 'required' &&
                'Vui lòng nhập số điện thoại'}
              {errors.phone?.type === 'pattern' && 'Vui lòng nhập sđt hợp lệ'}
            </p>{' '}
            <Button
              style={{
                marginTop: '10px',
                width: '100%',
              }}
              fill
              disabled={!isDirty || !isValid || isLoadingOTP} // here
              className="btn btn-success w-100"
              type="submit"
            >
              {isLoadingOTP ? 'Đang lấy mã OTP' : 'Tiếp tục'}
            </Button>
          </Form>
        ) : (
          <>
            <OtpInputVerify
              handleSignIn={handleSignIn}
              token={token}
              datavalue={datavalue}
              setToken={setToken}
            />
          </>
        )}
      </PageContentBody>
    </>
  );
};

export default ForgotPasswordForm;
