import {
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  Title,
  Text,
  Form,
  FormRow,
  FieldText,
  FieldPassword,
  Link,
  Button,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useMemo } from 'react';
import { useSignIn } from 'services/auth';
import { isAuthenticated } from 'helpers';
import styles from './SignIn.module.scss';

interface IFormData {
  userName: string;
  password: string;
}

const SignIn: React.FC<{}> = () => {
  const intl = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        // eslint-disable-next-line prettier/prettier
        userName: yup.string().trim().required(),
        password: yup.string().required(),
      }),
    ),
  });

  const { mutate, isLoading } = useSignIn();

  const onFormSubmit = (data: IFormData) => {
    mutate(data);
  };

  const authenticated = useMemo(() => isAuthenticated(), []);

  if (authenticated) {
    return (
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-row">
      <div className={styles.panelLeft} />
      <div className={styles.panelRight}>
        <Page className="h-full" paddingSize="none">
          <PageBody>
            <PageContent hasBorder={false} hasShadow={false}>
              <PageContentHeader>
                <PageContentHeaderSection>
                  <Title size="l">
                    <h1>
                      <FormattedMessage defaultMessage="Sign In" />
                    </h1>
                  </Title>
                  <Text color="subdued">
                    <p>
                      <FormattedMessage defaultMessage="Welcome back to Antoree" />
                    </p>
                  </Text>
                </PageContentHeaderSection>
              </PageContentHeader>
              <PageContentBody>
                <Form component="form" onSubmit={handleSubmit(onFormSubmit)}>
                  <FormRow
                    isInvalid={!!errors.userName}
                    label={intl.formatMessage({
                      defaultMessage: 'Email or Phone Number',
                    })}
                    fullWidth
                  >
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
                            defaultMessage:
                              'Enter email address or phone number',
                          })}
                        />
                      )}
                    />
                  </FormRow>
                  <FormRow
                    label="Password"
                    labelAppend={
                      <Text size="xs">
                        <Link to="forgot-password">
                          <FormattedMessage defaultMessage="Forgot Password?" />
                        </Link>
                      </Text>
                    }
                    isInvalid={!!errors.password}
                    error={errors.password?.message}
                    fullWidth
                  >
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <FieldPassword
                          {...field}
                          isInvalid={!!errors.password}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Enter your password',
                          })}
                          type="dual"
                          fullWidth
                        />
                      )}
                    />
                  </FormRow>
                  <FormRow fullWidth hasEmptyLabelSpace>
                    <Button fill fullWidth type="submit" isLoading={isLoading}>
                      <FormattedMessage defaultMessage="Sign in" />
                    </Button>
                  </FormRow>
                </Form>
              </PageContentBody>
            </PageContent>
          </PageBody>
        </Page>
      </div>
    </div>
  );
};

export default SignIn;
