/* eslint-disable no-nested-ternary */
import {
  ButtonEmpty,
  Modal,
  ModalBody,
  ModalHeader,
  notification,
  Text,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { IS_USING_SUB_USER } from 'configs/env.conf';
import ForgotPasswordForm from 'containers/SignIn/ForgotPasswordForm';
import OTPVerify from 'containers/SignIn/OTPVerify';
import SignInForm from 'containers/SignIn/SignInForm';
import SubUser from 'containers/SignIn/SubUser';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useRetrieveAccessToken,
  useRetrieveSignUpStudent,
  useRetrieveSignUpTrial,
} from 'services/auth';
import { useRetrieveSignUpLearning } from 'services/learning-request/retrieveLearning';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveUpdateStudentInfo } from 'services/user';
import * as yup from 'yup';
import SignUp from './SignUp';
import SignUpTrial from './SignUpTrial';
import styles from './PreLoginModal.module.scss';

export type PreLoginModalProps = {
  isVisiable: boolean;
  onConfirm?: () => void;
  onClose: () => void;
  isSignUpParam?: boolean;
  dataCampain?: any;
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

const PreLoginModal: React.FC<PreLoginModalProps> = ({
  isVisiable = false,
  onConfirm = () => {},
  onClose = () => {},
  isSignUpParam = true,
  dataCampain,
}) => {
  const { authenticateHandler, isAuthenticated, choosedSubUser } = useAuth();
  const [isFogotPass, setIsForgotpass] = useState(false);

  const intl = useIntl();
  const [token, setToken] = useState<string>('');
  const [isSignUpTrial, setIsSignUpTrial] = useState(isSignUpParam);
  const [isSignUp, setIsSignUp] = useState(false);

  const otherPriceValue = 'other';
  const { mutate: registerLerning } = useRetrieveSignUpLearning({
    onSuccess: data => {
      // console.log(data);
      onClose();
      notification.success({
        title: <FormattedMessage defaultMessage="Đăng ký thành công" />,
      });
    },
    onError: () => {
      onClose();
      notification.error({
        title: <FormattedMessage defaultMessage="Đăng ký thất bại" />,
      });
    },
  });
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

  const [firstName, setFistName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const validatePhone = (phonenumber: string) => {
    return phonenumber.match(/((09|03|07|08|05)+([0-9]{8})\b)/);
  };
  const phoneval = validatePhone(phoneNumber || '0');
  console.log(dataCampain);
  const onFormTrialSubmit = (event: any) => {
    registerLerning({
      phone: phoneNumber,
      email,
      first_name: firstName,
      last_name: lastName,
      campaign_link_id: dataCampain.dataCampain.dataCampain.campaign_link_id,
      partner_id: dataCampain.dataCampain.dataCampain.partner_id,
      campaign_id: dataCampain.dataCampain.dataCampain.campaign_id,
      utm_source: dataCampain.dataCampain.dataCampain.utm_source,
      utm_medium: dataCampain.dataCampain.dataCampain.utm_medium,
      utm_campaign: dataCampain.dataCampain.dataCampain.utm_campaign,
    });

    notification.success({
      title: <FormattedMessage defaultMessage="Đăng ký thành công" />,
    });
    onClose();
    event.preventDefault();
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
  } = useForm({
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
    <Modal
      onClose={() => {
        onClose();
        setIsSignUp(false);
        setIsSignUpTrial(true);
      }}
    >
      <ModalBody>
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
                  <SignUp
                    isVisiable={isVisiable}
                    onClose={onClose}
                    setIsSignUp={setIsSignUp}
                    isLoading={isLoading}
                    control={control}
                    errors={errors}
                    isSignUpParam={isSignUpParam}
                    handleSubmit={handleSubmit(onFormSubmit)}
                    onConfirm={onConfirm}
                  />
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
            ) : isSignUpTrial &&
              window.location.pathname !== '/testing/booking' ? (
              <>
                <SignUpTrial
                  onFormTrialSubmit={onFormTrialSubmit}
                  isLoading={isLoading}
                  isVisiable={isVisiable}
                  isSignUpParam={isSignUpParam}
                  setFistName={setFistName}
                  setLastName={setLastName}
                  setEmail={setEmail}
                  setphoneNumber={setphoneNumber}
                  control={control}
                  errors={errors}
                  onConfirm={onConfirm}
                  onClose={onClose}
                  setIsSignUpTrial={setIsSignUpTrial}
                  setIsSignUp={setIsSignUp}
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

export default PreLoginModal;
