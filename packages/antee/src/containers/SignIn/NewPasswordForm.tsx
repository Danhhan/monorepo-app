import {
  Button,
  FieldPassword,
  Form,
  FormRow,
  notification,
  Text,
  FieldText,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRetrieveResetPassword } from 'services/auth';
import * as yup from 'yup';

interface OtpComfirmProps {
  token: string;
  handleSignIn: () => void;
}
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

const NewPasswordForm: FunctionComponent<OtpComfirmProps> = ({
  token,
  handleSignIn,
}) => {
  const intl = useIntl();

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
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'all' });

  const onFormUpdatePaswwordSubmit = (data: IFormData) => {
    const dt = {
      token,
      password: data.password,
    };
    mutateResetPassword(dt, {
      onSuccess: () => {
        notification.success({
          title: <FormattedMessage defaultMessage="Thông báo!" />,
          text: <FormattedMessage defaultMessage="Thay đổi mk thành công" />,
        });
      },
      onError: err => {
        if (err?.response?.status === 400) {
          notification.error({
            title: <FormattedMessage defaultMessage="Có lỗi xảy ra !" />,
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
  return (
    <div>
      <Form
        key={1}
        component="form"
        onSubmit={handleSubmit(onFormUpdatePaswwordSubmit)}
      >
        <Text
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '16px',
          }}
        >
          Mật khẩu mới
        </Text>
        <FormRow fullWidth>
          <FieldPassword
            placeholder={intl.formatMessage({
              defaultMessage: 'Nhập mật khẩu của bạn',
            })}
            {...register('password', {
              required: true,
              minLength: 6,
              validate: (value: any) =>
                value === watch('confirmPassword') || "Passwords don't match.",
            })}
            type="dual"
            fullWidth
          />
        </FormRow>
        <p style={{ color: 'red', fontSize: '13px' }}>
          {' '}
          {errors.password?.type === 'required' && 'Vui lòng nhập mật khẩu'}
          {errors.password?.type === 'minLength' && 'MK Tối thiểu 6 ký  tự'}
          {errors.password?.type === 'pattern' &&
            'Mật khẩu phải có :1 chữ in hoa, chữ viết thường và 1 ký tự đặc biệt '}
        </p>
        <Text style={{ fontSize: '16px', fontWeight: 600, marginTop: '16px' }}>
          <FormattedMessage defaultMessage="Xác nhận Mật khẩu mới" />{' '}
        </Text>
        <FormRow fullWidth>
          <FieldPassword
            type="dual"
            fullWidth
            placeholder="Xác nhận mật khẩu mới"
            {...register('confirmPassword', {
              validate: (value: any) =>
                value === watch('password') || "Passwords don't match.",
            })}
          />
        </FormRow>
        <p style={{ color: 'red', fontSize: '13px' }}>
          {' '}
          {errors.confirmPassword?.type === 'required' &&
            'Vui lòng nhập lại mật khẩu'}
          {errors.confirmPassword?.type === 'validate' &&
            'Hai mật khẩu không giống nhau'}
        </p>
        <Button
          style={{
            marginTop: '10px',
            width: '100%',
          }}
          fill
          className="btn btn-success w-100"
          type="submit"
        >
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default NewPasswordForm;
