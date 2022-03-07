import {
  Button,
  ComboBox,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  Icon,
  LoadingSpinner,
  notification,
  Radio,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { EuiComboBoxOptionOption } from '@elastic/eui/src/components/combo_box/types';
import TestingInfoImage from 'assets/images/testing-info.png';
import moment from 'moment';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAuth } from 'services/auth/contexts';
import {
  englishLocale,
  vietnameseLocale,
  englishLocaleStatusPara,
  useLanguageContext,
  vietnameseLocaleStatusPara,
} from 'services/translation/context';
import {
  useRetrieveStudentInfo,
  useRetrieveUpdateStudentInfo,
} from 'services/user';
import {
  useRetrievePrice,
  useRetrieveStudyGoal,
} from 'services/user/retriveUserBasicInfoNoToken';
import { SubmitStudentInfo } from '../../TestingSteps';

export type TestingInfoFormProps = {
  selectHandle?: Function;
  handleSuccess: Function;
};

interface IFormData {
  studentType: string;
  goals: any[];
  otherGoals: string;
  date: any;
  otherPrice: string;
  priceRange: string;
}

const TestingInfoForm = forwardRef<
  SubmitStudentInfo | undefined,
  TestingInfoFormProps
>((props, testingInfoFormRef) => {
  const { selectHandle, handleSuccess } = props;
  const { locale } = useLanguageContext();

  const intl = useIntl();

  const [variableName, setVariableName] = useState(2);
  const [options, setOptions] = useState<(EuiComboBoxOptionOption & any)[]>([]);
  const { isAuthenticated } = useAuth();
  console.log(options);
  const otherPriceValue = 'other';

  const {
    data: dataInfo,
    isLoading: isLoadingDataInfo,
  } = useRetrieveStudentInfo(
    {
      localePara: locale === vietnameseLocale ? 'vi' : 'vi',
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      onSuccess: dataSuccess => {
        const findedInfo = dataSuccess?.data?.data?.userInfo?.find(
          item => item.type === 3 || item.type === 2,
        );

        setVariableName(findedInfo?.type || 2);
        const dataCooked = dataSuccess?.data?.data?.userInfo?.map(goal => ({
          label: goal.description,
          options: goal.data.map(need => ({
            label: need.name,
            value: need.id,
            ...need,
          })),
          ...goal,
        }));
        // console.log(dataCooked);
        // setOptions(dataCooked || []);
        const generateOptions = dataCooked
          ?.map(goal => goal.data)
          ?.flat()
          ?.filter(need => need.selected);
        const findedPriceRange =
          dataSuccess?.data?.data?.referencePrice
            ?.find(item => item?.checked)
            ?.id?.toString() || undefined;

        if (!getValues('priceRange')) {
          if (findedPriceRange) {
            setValue('priceRange', findedPriceRange);
          } else {
            setValue('priceRange', otherPriceValue);

            const valueDefault = getValues('otherPrice') || '1000000';

            setValue(
              'otherPrice',
              dataSuccess?.data?.data?.specificPrice || valueDefault,
            );
          }
        }

        setValue('goals', generateOptions || []);
        setValue('otherGoals', findedInfo?.textNote || '');
      },
    },
  );

  const { control, setValue, handleSubmit, getValues } = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      studentType: sessionStorage.getItem('studentType') || '0',
      goals: [],
      otherGoals: '',
      date: moment(),
      otherPrice: '',
      priceRange: undefined,
    },
  });

  const handleUpdateGoals = (array: any[]) => {
    setValue('goals', array);
  };

  // const storeStudyGoal = (data: IFormData) => {
  //   sessionStorage.setItem('studyGoals', JSON.stringify(data));
  // };

  const { mutate, isLoading: isLoadingUpdate } = useRetrieveUpdateStudentInfo();

  const { data: dataPrice } = useRetrievePrice({
    type: 1,
  });
  // eslint-disable-next-line radix
  const check = sessionStorage.getItem('studentType');

  // eslint-disable-next-line radix
  const val = check ? parseInt(check) : null;
  console.log(val);

  const { data: dataGoal } = useRetrieveStudyGoal(
    {
      localePara:
        locale === englishLocale
          ? vietnameseLocaleStatusPara
          : vietnameseLocaleStatusPara,
      // eslint-disable-next-line radix
      type: val || 1,
    },
    {
      onSuccess: dataSuccess => {
        const dataCooked = dataSuccess?.data?.userInfo?.map(goal => ({
          label: goal.data?.[0].description,
          options: goal.data.map(need => ({
            label: need.name,
            value: need.id,
            ...need,
          })),
          ...goal,
        }));
        setOptions(dataCooked || []);
        if (!isAuthenticated) {
          setOptions(dataCooked || []);
          // initInfo();
        }
      },
    },
  );

  // const initInfo = () => {
  //   if (!isAuthenticated) {
  //     const studyGoals = sessionStorage.getItem('studyGoals');
  //     const studentType = sessionStorage.getItem('studentType') || 1;
  //     if (studyGoals) {
  //       const item = JSON.parse(studyGoals);

  //       if (item.studentType === studentType) {
  //         setValue('goals', item.goals);
  //         setValue('otherGoals', item.otherGoals);
  //       }
  //       setValue('priceRange', item.priceRange);
  //       setValue('otherPrice', item.otherPrice);
  //     }
  //   }
  // };

  const onSubmitData = (data: IFormData, onSuccess: () => void) => {
    if (data?.priceRange === otherPriceValue && !data?.otherPrice) {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Please let we know what price fit with you!" />
        ),
      });
      return;
    }
    if (data?.priceRange === otherPriceValue && data?.otherPrice?.length < 6) {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Your price is below than our minimum price!" />
        ),
      });
      return;
    }

    if (!isAuthenticated) {
      // storeStudyGoal(data);
      handleSuccess(moment(data?.date));
      onSuccess();
      return;
    }
    mutate(
      {
        userInfo: {
          [`${variableName}`]: {
            // eslint-disable-next-line array-callback-return
            // eslint-disable-next-line consistent-return
            id: data.goals.map(item => {
              return item?.id;
            }),
            text: data.otherGoals,
          },
        },

        idPrice:
          data?.priceRange !== otherPriceValue
            ? // eslint-disable-next-line radix
              parseInt(data?.priceRange)
            : undefined,
        specificPrice:
          data?.priceRange === otherPriceValue ? data?.otherPrice : undefined,
      },
      {
        onSuccess: () => {
          handleSuccess(moment(data?.date));
          onSuccess();
        },
        onError: err => {
          handleSuccess(moment(data?.date));
          onSuccess();
        },
      },
    );
  };

  useImperativeHandle(testingInfoFormRef, () => ({
    onConfirm(onSuccess) {
      handleSubmit(data => onSubmitData(data, onSuccess))();
    },
  }));

  return (
    <FlexGroup alignItems="center">
      <FlexItem grow>
        <img
          className="m-auto "
          style={{ width: '80%' }}
          src={TestingInfoImage}
          alt="testing-info-img"
        />
      </FlexItem>
      <FlexItem grow>
        <Form component="form" style={{ maxWidth: 465 }}>
          <Spacer />
          <FormRow fullWidth>
            <>
              <Title size="m">
                <h1 className="font-semibold">
                  <FormattedMessage defaultMessage="Mục tiêu học" />
                </h1>
              </Title>
              <Spacer size="l" />
              <Title size="xxs">
                <p>
                  <FormattedMessage defaultMessage="Chọn mục tiêu học" />
                </p>
              </Title>
              <Controller
                name="goals"
                control={control}
                render={({ field: { ref, value, onChange } }) => {
                  return (
                    <ComboBox
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Chọn ',
                      })}
                      fullWidth
                      options={options}
                      selectedOptions={value.map((item, index) => ({
                        ...item,
                        label: item.name,
                        value: index,
                      }))}
                      onChange={values => handleUpdateGoals(values)}
                    />
                  );
                }}
              />
              <Spacer size="m" />

              <Controller
                name="otherGoals"
                control={control}
                render={({ field: { ref, ...fieldRest } }) => (
                  <FieldText
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Khác (Nếu có)',
                    })}
                    fullWidth
                    inputRef={ref}
                    {...fieldRest}
                  />
                )}
              />
            </>
          </FormRow>
          <Spacer />
          {isLoadingDataInfo ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Title size="xxs">
                <p>
                  <FormattedMessage defaultMessage="Mức đầu tư hiện tại cho việc học Tiếng Anh" />
                </p>
              </Title>
              <FormRow fullWidth>
                <Controller
                  name="priceRange"
                  control={control}
                  render={({
                    field: {
                      ref: radioPriceRef,
                      value,
                      onChange,
                      // ...fieldRest
                    },
                  }) => (
                    <FlexGroup direction="column" gutterSize="none">
                      {(
                        (isAuthenticated
                          ? dataInfo?.data?.data?.referencePrice
                          : dataPrice?.data?.data?.referencePrice
                        )?.map(itemPrice => {
                          return {
                            ...itemPrice,
                            id: `prefix-${itemPrice?.id}`,
                            // id: htmlIdGenerator()(),
                            label: `${itemPrice?.from} - ${itemPrice?.to} ₫/tháng`,
                          };
                        }) || []
                      )?.map(item => (
                        <FlexItem>
                          <Radio
                            id={item?.id}
                            style={{ margin: '4px 0px' }}
                            label={item?.label}
                            checked={value === item?.id?.replace('prefix-', '')}
                            onChange={e => {
                              const idItem = e?.target?.id?.replace(
                                'prefix-',
                                '',
                              );
                              setValue('otherPrice', '');
                              onChange(idItem);
                            }}
                          />
                        </FlexItem>
                      ))}
                      <FlexGroup>
                        <FlexItem grow={false}>
                          <Radio
                            id={otherPriceValue}
                            style={{ margin: '4px 0px' }}
                            label={<FormattedMessage defaultMessage="Other" />}
                            checked={value === 'other'}
                            onChange={e => {
                              const idItem = e?.target?.id?.replace(
                                'prefix-',
                                '',
                              );
                              onChange(idItem);
                            }}
                          />
                        </FlexItem>
                        <Spacer />
                        <FlexItem>
                          <FormRow fullWidth>
                            <Controller
                              name="otherPrice"
                              control={control}
                              render={({ field: { ref, ...fieldRest } }) => (
                                <FieldText
                                  onFocus={() =>
                                    setValue('priceRange', otherPriceValue)
                                  }
                                  placeholder={intl.formatMessage({
                                    defaultMessage: 'Mức cụ thể (Nếu có)',
                                  })}
                                  fullWidth
                                  inputRef={ref}
                                  {...fieldRest}
                                />
                              )}
                            />
                          </FormRow>
                        </FlexItem>
                      </FlexGroup>
                    </FlexGroup>
                  )}
                />
              </FormRow>
            </>
          )}
        </Form>
      </FlexItem>
    </FlexGroup>
  );
});

export default TestingInfoForm;
