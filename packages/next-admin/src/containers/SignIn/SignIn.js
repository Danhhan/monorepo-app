import {
  Button,
  CallOut,
  FieldPassword,
  FieldText,
  Form,
  FormRow,
  Spacer,
} from '@antoree/ant-ui';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import textLogoUrl from 'assets/images/antoree-text-logo.png';
import { saveToken } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useAuthMutation } from 'services/auth';
import * as yup from 'yup';
import messages from './messages';
import SignInStyleWrapper from './SignIn.style';

function SignIn() {
  const intl = useIntl();
  const history = useHistory();

  const { control, errors, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email(intl.formatMessage(messages.validate.email))
          .required(
            intl.formatMessage(messages.validate.require, { field: 'Email' }),
          ),
        password: yup
          .string()
          .required(
            intl.formatMessage(messages.validate.require, {
              field: 'Password',
            }),
          )
          .min(
            6,
            intl.formatMessage(messages.validate.minLength, { length: 6 }),
          ),
        remember: yup.boolean(),
      }),
    ),
  });

  const signIn = useAuthMutation({
    onSuccess: data => {
      saveToken(`${data.token_type} ${data.access_token}`);

      history.push('/');
    },
  });

  const onSubmit = ({ email, password }) => {
    signIn.mutate({
      username: email,
      password,
    });
  };

  return (
    <SignInStyleWrapper>
      <div className="flex flex-col w-96 max-w-full bg-white rounded-lg p-5 shadow-lg z-10">
        <img
          src={textLogoUrl}
          alt="Antoree text logo"
          className="w-48 self-center"
        />
        <Spacer />
        <Form component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormRow
            label={intl.formatMessage(messages.label.email)}
            isInvalid={!!errors?.email}
            error={errors?.email?.message}
            fullWidth
          >
            <Controller
              as={
                <FieldText
                  data-testid="email"
                  icon="email"
                  fullWidth
                  placeholder={intl.formatMessage(messages.label.email)}
                />
              }
              name="email"
              control={control}
            />
          </FormRow>
          <FormRow
            label={intl.formatMessage(messages.label.password)}
            isInvalid={!!errors?.password}
            error={errors?.password?.message}
            fullWidth
          >
            <Controller
              as={
                <FieldPassword
                  data-testid="password"
                  fullWidth
                  type="dual"
                  placeholder={intl.formatMessage(messages.label.password)}
                />
              }
              name="password"
              control={control}
            />
          </FormRow>
          <Spacer />
          {signIn.isError && (
            <>
              <CallOut title="Sign in failure" color="danger" iconType="alert">
                <p>
                  The email address or password you entered is incorrect. Please
                  try again.
                </p>
              </CallOut>
              <Spacer />
            </>
          )}
          <FormRow display="center" fullWidth>
            <Button
              fullWidth
              type="submit"
              data-testid="signin-button"
              isLoading={signIn.isLoading}
            >
              <FormattedMessage {...messages.label.signIn} />
            </Button>
          </FormRow>
          <DevTool control={control} />
        </Form>
      </div>
    </SignInStyleWrapper>
  );
}

export default SignIn;
