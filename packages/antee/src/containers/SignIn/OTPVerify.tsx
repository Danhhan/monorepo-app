import { Button, Form, FormRow, notification } from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRetrieveOTP, useRetrieveResendOTP } from 'services/auth';
import * as yup from 'yup';
import CountDownResend from './CountDownResend';
import OTPVerifyInput from './OTPVerifyInput';

interface IFormData {
  code: string;
}

const defaultValues: IFormData = {
  code: '',
};

const regExp = /\b\d{6}\b/;

const formSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  code: yup
    .string()
    .matches(regExp, {
      message: 'Must be exactly 6 numbers',
      excludeEmptyString: true,
    })
    .required('Please input verify code'),
});

const OTPVerify: React.FC<{
  handleSuccess: Function;
  isLoadingSignIn: boolean;
  handleFallBack: Function;
  resetToken: Function;
  token: string;
}> = ({
  handleFallBack,
  token,
  resetToken,
  handleSuccess,
  isLoadingSignIn,
}) => {
  const intl = useIntl();

  const [initialSeconds, setInitialSeconds] = useState(60);

  const { mutate: mutateOtp, isLoading: isLoadingVerify } = useRetrieveOTP({
    onSuccess: ({ data: dataSuccessVerify }) => {
      notification.success({
        title: <FormattedMessage defaultMessage="Verify Success" />,
      });
      handleSuccess();
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Verify failed!" />,
      });
    },
  });

  const {
    mutate: mutateResendOtp,
    isLoading: isLoadingResend,
  } = useRetrieveResendOTP({
    onSuccess: ({ data: dataSuccessVerify }) => {
      notification.success({
        title: <FormattedMessage defaultMessage="Resend Success" />,
      });
      resetToken(dataSuccessVerify?.token);
      setInitialSeconds(60);
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Resend failed!" />,
      });
    },
  });

  const resendHandle = () => {
    setInitialSeconds(0);
    mutateResendOtp({
      token,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit = (data: IFormData) => {
    mutateOtp({
      token,
      ...data,
    });
  };

  return (
    <Form component="form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormRow
        isInvalid={!!errors.code}
        label={intl.formatMessage({
          defaultMessage: 'Enter verification code',
        })}
        helpText={intl.formatMessage({
          defaultMessage:
            'We have send you a 6 - digits code. Please check your email or mobile phone.',
        })}
        fullWidth
        error={errors?.code?.message}
      >
        <Controller
          name="code"
          control={control}
          render={({ field: { ref, value, onChange, ...fieldRest } }) => (
            <OTPVerifyInput {...fieldRest} value={value} onChange={onChange} />
          )}
        />
      </FormRow>
      <FormRow>
        <CountDownResend
          initialSeconds={initialSeconds}
          resendHandle={resendHandle}
          isLoadingVerify={isLoadingVerify}
          isLoadingResend={isLoadingResend}
        />
        {/* <ButtonEmpty
          style={{ marginLeft: '-8px' }}
          size="xs"
          onClick={resendHandle}
          isLoading={isLoadingVerify || isLoadingResend}
        >
          <FormattedMessage defaultMessage="Not received? Resend" />
        </ButtonEmpty> */}
      </FormRow>
      <FormRow fullWidth>
        <Button
          type="sub"
          fullWidth
          fill
          isLoading={isLoadingVerify || isLoadingResend || isLoadingSignIn}
        >
          <FormattedMessage defaultMessage="Continue" />
        </Button>
      </FormRow>
    </Form>
  );
};

export default OTPVerify;
