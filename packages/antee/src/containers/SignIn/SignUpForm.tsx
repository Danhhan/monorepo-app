import {
  Button,
  FieldPassword,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  notification,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useRetrieveAccessToken,
  useRetrieveSignUpStudent,
} from 'services/auth';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveUpdateStudentInfo } from 'services/user';
import { StringParam, useQueryParams } from 'use-query-params';
import * as yup from 'yup';
import OTPVerify from './OTPVerify';

interface IFormData {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  referral?: string;
  gender?: string;
  type: string;
}

const defaultValues: IFormData = {
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  referral: '',
  gender: undefined,
  type: '1',
};

const formSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().required(),
  referral: yup.string(),
  gender: yup.string(),
  type: yup.string().required(),
});

const SignUpForm: React.FC<{
  handleFallBack: Function;
}> = ({ handleFallBack }) => {
  const intl = useIntl();
  const { mutate: mutateUpdate } = useRetrieveUpdateStudentInfo({
    onSuccess: () => {
      // onConfirm();
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: <FormattedMessage defaultMessage="Lỗi!" />,
        text: mesError || (
          <FormattedMessage defaultMessage="Cập nhật thông tin thất bại !" />
        ),
      });
    },
  });
  const otherPriceValue = 'other';

  const [token, setToken] = useState<string>('');

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

  const [query, setQuery] = useQueryParams({
    utm_source: StringParam,
    utm_medium: StringParam,
    utm_campaign: StringParam,
  });

  const {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  } = query;

  const { authenticateHandler } = useAuth();

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
        title: 'Đăng ký thất bại!',
        text: mesError || (
          <FormattedMessage
            defaultMessage="Đăng ký thất bại, vui lòng liên hệ bộ phận hỗ trợ kỹ thuật để được trợ giúp! Error: {code}"
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
      updateStudentInfo();
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Đăng nhập thất bại!" />,
      });

      handleFallBack();
    },
  });

  const onFormSubmit = (data: IFormData) => {
    const source = localStorage.getItem('source');

    mutate({
      source: source || undefined,

      // get all params in the url, treat them as utm sources
      // they could be utm_source, utm_campaign, etc
      ...data,
      utmCampaign: utmCampaign ?? '',
      utmMedium: utmMedium ?? '',
      utmSource: utmSource ?? '',
    });
  };

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

  const updateStudentInfo = () => {
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

  return (
    <>
      {!token ? (
        <Form component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <FlexGroup>
            <FlexItem>
              <FormRow
                isInvalid={!!errors.firstName}
                // label={intl.formatMessage({
                //   defaultMessage: 'Họ',
                // })}
                fullWidth
              >
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
                        defaultMessage: 'Họ và tên đệm',
                      })}
                    />
                  )}
                />
              </FormRow>
            </FlexItem>
            <FlexItem>
              <FormRow
                isInvalid={!!errors.lastName}
                // label={intl.formatMessage({
                //   defaultMessage: 'Tên',
                // })}
                fullWidth
              >
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
                        defaultMessage: 'Tên',
                      })}
                    />
                  )}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
          <Spacer />
          <FormRow
            isInvalid={!!errors.phoneNumber}
            // label={intl.formatMessage({
            //   defaultMessage: 'Số điện thoại',
            // })}
            fullWidth
          >
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
                    defaultMessage: 'Số điện thoại của bạn',
                  })}
                />
              )}
            />
          </FormRow>
          <Spacer />
          <FormRow
            // label={intl.formatMessage({
            //   defaultMessage: 'Tạo mật khẩu',
            // })}
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
                    defaultMessage: 'Nhập mật khẩu mới',
                  })}
                  type="dual"
                  fullWidth
                />
              )}
            />
          </FormRow>

          {/* <FormRow
          label={intl.formatMessage({
            defaultMessage: 'Giới tính',
          })}
        >
          <Controller
            name="gender"
            control={control}
            render={({ field: { ref, onChange, value, ...fieldRest } }) => (
              <FlexGroup>
                {[
                  {
                    label: <FormattedMessage defaultMessage="Male" />,
                    value: '1',
                    id: 'male-ratio',
                  },
                  {
                    label: <FormattedMessage defaultMessage="Female" />,
                    value: '2',
                    id: 'female-ratio',
                  },
                  {
                    label: <FormattedMessage defaultMessage="Private" />,
                    value: '3',
                    id: 'private-ratio',
                  },
                ].map(itemType => {
                  const isSelected = value == itemType.value;
                  return (
                    <FlexItem>
                      <div
                        className="p-2 rounded-lg cursor-pointer"
                        style={{
                          border: '1px solid',
                          borderColor: isSelected ? '#00C081' : '#999999',
                        }}
                      >
                        <Radio
                          onChange={onChange}
                          checked={isSelected}
                          value={itemType.value.toString()}
                          id={itemType.id}
                          label={itemType.label}
                          labelProps={{ className: 'w-full' }}
                        />
                      </div>
                    </FlexItem>
                  );
                })}
              </FlexGroup>
            )}
          />
        </FormRow> */}
          <Spacer />

          <FormRow fullWidth>
            <Button
              color="warning"
              fill
              fullWidth
              type="submit"
              isLoading={isLoading}
            >
              <FormattedMessage defaultMessage="Đăng ký" />
            </Button>
          </FormRow>
          <HorizontalRule />
          <Text className="text-center">
            <p>
              <FormattedMessage defaultMessage="Đã có tài khoản ?" />
            </p>
          </Text>
          <FormRow fullWidth hasEmptyLabelSpace>
            <Button
              fill
              fullWidth
              onClick={() => handleFallBack()}
              isLoading={isLoading}
            >
              <FormattedMessage defaultMessage="Sign In" />
            </Button>
          </FormRow>
        </Form>
      ) : (
        <OTPVerify
          handleFallBack={handleFallBack}
          resetToken={setToken}
          token={token}
          handleSuccess={handleSuccessOTP}
          isLoadingSignIn={isLoadingSignIn}
        />
      )}
    </>
  );
};

export default SignUpForm;
