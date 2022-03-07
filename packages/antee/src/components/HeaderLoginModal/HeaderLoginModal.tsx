/* eslint-disable no-nested-ternary */
import {
  Button,
  ButtonEmpty,
  FieldPassword,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  Modal,
  ModalBody,
  ModalHeader,
  notification,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { IS_USING_SUB_USER } from 'configs/env.conf';
import ForgotPasswordForm from 'containers/SignIn/ForgotPasswordForm';
import OTPVerify from 'containers/SignIn/OTPVerify';
import SignInForm from 'containers/SignIn/SignInForm';
import SubUser from 'containers/SignIn/SubUser';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useRetrieveAccessToken,
  useRetrieveSignUpStudent,
} from 'services/auth';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveUpdateStudentInfo } from 'services/user';
import * as yup from 'yup';
import styles from '../PreLoginModal/SigupTrial.module.scss';

export type PreLoginModalProps = {
  isVisiable: boolean;
  onConfirm?: () => void;
  onClose: () => void;
  isSignUpParam?: boolean;
};

interface IFormData {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  referral?: string;
  gender: string;
  type: string;
}

const defaultValues: IFormData = {
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  referral: '',
  gender: '1',
  type: '1',
};

const formSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().required(),
  referral: yup.string(),
  gender: yup.string().required(),
  type: yup.string().required(),
});

const HeaderLoginModal: React.FC<PreLoginModalProps> = ({
  isVisiable = false,
  onConfirm = () => {},
  onClose = () => {},
  isSignUpParam = true,
}) => {
  const { authenticateHandler, isAuthenticated, choosedSubUser } = useAuth();
  const [isFogotPass, setIsForgotpass] = useState(false);

  const intl = useIntl();
  const [token, setToken] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState(isSignUpParam);
  const otherPriceValue = 'other';

  const { mutate, isLoading } = useRetrieveSignUpStudent({
    onSuccess: dataSuccess => {
      if (dataSuccess?.data?.data?.token) {
        sessionStorage.setItem(
          'temporary',
          JSON.stringify({
            username: getValues('phoneNumber'),
            password: getValues('password'),
          }),
        );
        localStorage.removeItem('source');
        setToken(dataSuccess?.data?.data?.token);
      }
    },
    onError: err => {
      const errCode = err?.response?.status;
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: 'Sign Up Failure!',
        text: mesError || (
          <FormattedMessage
            defaultMessage="Sign Up failure please contact tech for help! Error: {code}"
            values={{ code: errCode }}
          />
        ),
      });
    },
  });

  const {
    mutate: mutateSignIn,
    isLoading: isLoadingSignIn,
  } = useRetrieveAccessToken({
    onSuccess: data => {
      sessionStorage.removeItem('source');
      authenticateHandler(data.data.access_token);
      window.location.reload();
      handleFallBack();
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Đăng nhập thất bại!" />,
      });

      // handleFallBack();
    },
  });

  const { mutate: mutateUpdate } = useRetrieveUpdateStudentInfo({
    onSuccess: () => {
      onConfirm();
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: <FormattedMessage defaultMessage="Error!" />,
        text: mesError || (
          <FormattedMessage defaultMessage="Update Info Failed!" />
        ),
      });
    },
  });

  const handleFallBack = () => {
    const studentType = sessionStorage.getItem('studentType');
    const studyGoals = sessionStorage.getItem('studyGoals');
    if (studyGoals) {
      const studyJson = JSON.parse(studyGoals);
      mutateUpdate({
        userType: studentType,
        userInfo: {
          [studentType === '1' ? `2` : `3`]: {
            // eslint-disable-next-line array-callback-return
            // eslint-disable-next-line consistent-return
            id: studyJson.goals.map((item: { id: any }) => {
              return item?.id;
            }),
            text: studyJson.otherGoals,
          },
        },

        idPrice:
          studyJson.priceRange !== otherPriceValue
            ? // eslint-disable-next-line radix
              parseInt(studyJson.priceRange)
            : undefined,
        specificPrice:
          studyJson.priceRange === otherPriceValue
            ? studyJson.otherPrice
            : undefined,
      });
    }
  };

  const onFormSubmit = (data: IFormData) => {
    const source = localStorage.getItem('source');

    mutate({
      source: source || undefined,

      // get all params in the url, treat them as utm sources
      // they could be utm_source, utm_campaign, etc
      ...data,
      utmCampaign: '',
      utmMedium: '',
      utmSource: '',
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const handleSuccessOTP = () => {
    const temporaryInfo = sessionStorage.getItem('temporary');

    if (temporaryInfo) {
      const cookedInfo = JSON.parse(temporaryInfo);

      mutateSignIn({
        userName: cookedInfo.username,
        password: cookedInfo.password,
      });
    }
  };
  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalBody
        style={{
          paddingTop: '32px',
          paddingBottom: '32px',
        }}
      >
        {isAuthenticated && IS_USING_SUB_USER && !choosedSubUser ? (
          <>
            <ModalHeader>
              <Text textAlign="center">
                <h3>
                  <FormattedMessage defaultMessage="Chọn tài khoản" />
                </h3>
              </Text>
            </ModalHeader>
            <ModalBody>
              <SubUser handleSuccess={onClose} />
            </ModalBody>
          </>
        ) : (
          <>
            {isSignUp ? (
              !token ? (
                <>
                  <PageContentHeader>
                    <PageContentHeaderSection>
                      <Title size="m" className="font-bold">
                        <h1>
                          <FormattedMessage defaultMessage="Đăng ký" />
                        </h1>
                      </Title>
                      <Text size="s" color="text">
                        <p>
                          <FormattedMessage defaultMessage="Vui lòng đăng ký tài khoản để tham gia trải nghiệm" />
                        </p>
                      </Text>
                    </PageContentHeaderSection>
                  </PageContentHeader>
                  <Spacer />
                  <Form component="form" onSubmit={handleSubmit(onFormSubmit)}>
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
                            icon="user"
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
                    {/* <HorizontalRule/> */}
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
                </>
              ) : (
                <OTPVerify
                  handleFallBack={() => {}}
                  resetToken={setToken}
                  token={token}
                  handleSuccess={handleSuccessOTP}
                  isLoadingSignIn={isLoadingSignIn}
                />
              )
            ) : isFogotPass ? (
              <>
                <span>
                  <ButtonEmpty
                    onClick={() => setIsForgotpass(false)}
                    // color="danger"
                    iconType="arrowLeft"
                    iconSide="left"
                    size="s"
                    contentProps={{
                      style: { paddingLeft: '0px' },
                    }}
                  >
                    <FormattedMessage defaultMessage="Đăng nhập" />
                  </ButtonEmpty>
                </span>
                <ForgotPasswordForm
                  setIsForgotpass={setIsForgotpass}
                  handleSignIn={() => setIsForgotpass(true)}
                  isPreLogin
                />
              </>
            ) : (
              <SignInForm
                handleFogotPass={() => setIsForgotpass(true)}
                handleSignUp={() => setIsSignUp(true)}
                handleSuccess={() => {}}
                isPreLogin
              />
            )}
          </>
        )}
      </ModalBody>
    </Modal>
  ) : null;
};

export default HeaderLoginModal;
