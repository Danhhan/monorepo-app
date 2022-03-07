import {
  Button,
  ButtonIcon,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  Link,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageHeader,
  Spacer,
  SuperSelect,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { SHEMA_SUB_USER, SubUserModule } from 'components';
import { useToggle } from 'hooks';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  deleteSubUsers,
  getStudentById,
  getSubUsers,
  GET_OR_UPDATE_SUB_USERS,
  GET_STUDENT_BY_ID,
  updateSubUsers,
} from 'services/student';
import * as yup from 'yup';
import {
  STUDENT_STATUS,
  STUDENT_TYPES,
  STUDENT_TYPE_ADULT,
  STUDENT_TYPE_KID,
} from '../Students/constants';
import {
  ErrorStatus,
  GENDER,
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
} from './constants';
import UnauthorizeUpdateModal from './UnauthorizeUpdateModal';
import LearningRequestUTM from './Components/LearningRequestUTM';
import UpdateSalemanModule from './UpdateSalemanModule';

function StudentDetail() {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [isEditable, setIsEditable] = useState(false);

  const { data } = useQuery([GET_STUDENT_BY_ID(id)], () => getStudentById(id), {
    suspense: true,
    retry: 1,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: subUsersData, refetch, remove } = useQuery(
    [GET_OR_UPDATE_SUB_USERS(id)],
    () => getSubUsers(id),
    {
      retry: 1,
      refetchOnReconnect: false,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  const arrSubsUser = subUsersData?.data?.learningRequests?.map(
    (learningRequestItem, index) => index,
  );

  const [arrSubs, setArrSubs] = useState(arrSubsUser);
  console.log(subUsersData);

  const learningRequestArray = subUsersData?.data?.learningRequests || [];

  const learningRequestDataExtract = learningRequestArray.map((item, i) => ({
    [`idSubUser${i + 1}`]: item?.user?.id,
    [`firstNameSubUser${i + 1}`]: item?.user?.firstName,
    [`lastNameSubUser${i + 1}`]: item?.user?.lastName,
    [`studentTypeSubUser${i + 1}`]: item?.user?.type,
    [`genderSubUser${i + 1}`]: item?.user?.gender,
    [`learningRequestSubUser${i + 1}`]: item?.user?.id,
    [`statusSubUser${i + 1}`]: item?.user?.status || 1,
  }));

  const { control, handleSubmit, errors, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: subUsersData?.data?.contact?.user?.firstName,
      lastName: subUsersData?.data?.contact?.user?.lastName,
      type: subUsersData?.data?.contact?.user?.type,
      gender: subUsersData?.data?.contact?.user?.gender,
      email: subUsersData?.data?.contact?.user?.email,
      phone: subUsersData?.data?.contact?.user?.phone,
      status: subUsersData?.data?.contact?.user?.status,
      subUserCount: subUsersData?.data?.learningRequests?.map(
        (learningRequestItem, index) => index,
      ),
      ...Object.assign({}, {}, ...learningRequestDataExtract),
    },

    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        // eslint-disable-next-line prettier/prettier
        phone: yup.string().nullable().max(10),
        gender: yup
          .mixed()
          .oneOf([GENDER_MALE, GENDER_FEMALE, GENDER_OTHER], 'Invalid gender'),
        type: yup
          .mixed()
          .oneOf([STUDENT_TYPE_KID, STUDENT_TYPE_ADULT], 'Invalid studentType')
          .required('Required'),
        ...SHEMA_SUB_USER,
      }),
    ),
  });

  const handleExecuteDataSubUsers = arraySub => {
    if (!arraySub) {
      return [];
    }

    const arrayToReturn = [...arraySub].map((learningRequestItem, index) => {
      setValue(
        `idSubUser${index + 1}`,
        learningRequestItem?.user?.id || undefined,
      );

      setValue(
        `firstNameSubUser${index + 1}`,
        learningRequestItem?.user?.firstName || '',
      );

      setValue(
        `lastNameSubUser${index + 1}`,
        learningRequestItem?.user?.lastName || '',
      );
      setValue(
        `studentTypeSubUser${index + 1}`,
        learningRequestItem?.user?.type || undefined,
      );
      setValue(
        `genderSubUser${index + 1}`,
        learningRequestItem?.user?.gender || undefined,
      );
      setValue(
        `learningRequestSubUser${index + 1}`,
        learningRequestItem?.id || undefined,
      );
      setValue(
        `statusSubUser${index + 1}`,
        learningRequestItem?.user?.status || 1,
      );
      return index;
    });

    return arrayToReturn;
  };

  const updateSubUsersMutation = useMutation(updateSubUsers, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: (
          <FormattedMessage defaultMessage="Update Student successfully!" />
        ),
      });
      setDisableEdit();
    },
    onError: err => {
      if (err?.response.status === 403) {
        toggle();
      }

      const mesError = err?.response?.data?.errors[0]?.message;
      const errorFinded = ErrorStatus.find(
        errItem => errItem.code === err?.response?.status,
      );

      notification.error({
        title: 'Failure',
        text: errorFinded?.message || mesError || (
          <FormattedMessage defaultMessage="Update failure!" />
        ),
      });
    },
  });

  const deleteSubUsersMutation = useMutation(deleteSubUsers, {
    onSuccess: () => {
      remove();
      notification.success({
        title: 'Successfully',
        text: (
          <FormattedMessage defaultMessage="Remove Sub User successfully!" />
        ),
      });

      queryClient.invalidateQueries(GET_OR_UPDATE_SUB_USERS(id));
    },
    onError: err => {
      if (err?.response.status === 403) {
        toggle();
      }

      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: 'Failure',
        text: mesError || (
          <FormattedMessage defaultMessage="Remove Sub User failure!" />
        ),
      });
    },
  });

  const UPDATE_STUDENT_FORM_ID = 'update-student-form';

  const updateUserHandler = formData => {
    updateSubUsersMutation.mutate({
      contactId: subUsersData?.data?.contact?.id,
      id,
      ...formData,
      birthDay: formData?.birthDay
        ? formData?.birthDay?.format('YYYY-MM-DD')
        : null,
      subusers: formData.subUserCount.map(item => {
        const indexToGet = item + 1;
        return {
          requestId: learningRequestArray.find(
            item => item?.user?.id === formData[`idSubUser${indexToGet}`],
          )?.id,
          id: formData[`idSubUser${indexToGet}`],
          firstName: formData[`firstNameSubUser${indexToGet}`],
          lastName: formData[`lastNameSubUser${indexToGet}`],
          type: formData[`studentTypeSubUser${indexToGet}`],
          gender: formData[`genderSubUser${indexToGet}`],
        };
      }),
    });
  };

  const setDisableEdit = async () => {
    await remove();
    const refetchData = await refetch();

    setValue('firstName', refetchData?.data?.data?.contact?.user?.firstName);
    setValue('lastName', refetchData?.data?.data?.contact?.user?.lastName);
    setValue('type', refetchData?.data?.data?.contact?.user?.type);
    setValue('gender', refetchData?.data?.data?.contact?.user?.gender);
    setValue('email', refetchData?.data?.data?.contact?.user?.email);
    setValue('phone', refetchData?.data?.data?.contact?.user?.phone);

    const arraySubUsersAfterRefetch = await handleExecuteDataSubUsers(
      refetchData?.data?.data?.learningRequest,
    );

    setValue('subUserCount', arraySubUsersAfterRefetch);
    setArrSubs(arraySubUsersAfterRefetch);
    setIsEditable(false);
  };

  const setEnableEdit = () => {
    setIsEditable(true);
  };

  const noticeErrorsHandlers = errors => {
    notification.error({
      title: errors && (
        <FormattedMessage defaultMessage="Please re-check your form before submit!" />
      ),
      text: (
        <FormattedMessage defaultMessage="Some field are invalid or not acceptable!" />
      ),
    });
  };

  const { isVisiable, toggle, close } = useToggle();
  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Link to="/students">
                  <ButtonIcon
                    aria-label="arrowLeftBack"
                    color="text"
                    size="m"
                    iconType="arrowLeft"
                  />
                </Link>
              </FlexItem>

              <FlexItem grow={false}>
                <Title>
                  <h2>
                    <FormattedMessage
                      defaultMessage="Detail of Student #{id}"
                      values={{ id }}
                    />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
          rightSideItems={[
            isEditable ? (
              <FlexGroup>
                <FlexItem>
                  <Button
                    type="submit"
                    form={UPDATE_STUDENT_FORM_ID}
                    fill
                    color="secondary"
                    isLoading={updateSubUsersMutation.isLoading}
                  >
                    <FormattedMessage defaultMessage="Save Changes" />
                  </Button>
                  <UnauthorizeUpdateModal
                    isVisible={isVisiable}
                    close={close}
                    carer={
                      updateSubUsersMutation.error?.response?.data?.errors[0]
                        ?.carer ||
                      deleteSubUsersMutation.error?.response?.data?.errors[0]
                        ?.carer
                    }
                  />
                </FlexItem>
                <FlexItem>
                  <Button
                    isLoading={updateSubUsersMutation.isLoading}
                    onClick={setDisableEdit}
                    fill
                    color="danger"
                  >
                    <FormattedMessage defaultMessage="Discard Changes" />
                  </Button>
                </FlexItem>
              </FlexGroup>
            ) : (
              <Button onClick={setEnableEdit} fill color="primary">
                <FormattedMessage defaultMessage="Edit" />
              </Button>
            ),
          ]}
        />
        <PageContent>
          <PageContentBody>
            <Form
              component="form"
              id={UPDATE_STUDENT_FORM_ID}
              onSubmit={handleSubmit(updateUserHandler, noticeErrorsHandlers)}
            >
              <Title>
                <p>
                  {/* <FormattedMessage defaultMessage="Persional Information" /> */}
                  <FormattedMessage defaultMessage="Persional Information - User 1" />
                </p>
              </Title>

              <HorizontalRule />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({ defaultMessage: 'First Name' })}
                    fullWidth
                    isInvalid={!!errors?.firstName}
                    error={errors?.firstName?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <FieldText
                          value={value}
                          disabled={!isEditable}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'First name',
                          })}
                          fullWidth
                          onChange={onChange}
                        />
                      )}
                      name="firstName"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({ defaultMessage: 'Last Name' })}
                    fullWidth
                    isInvalid={!!errors?.lastName}
                    error={errors?.lastName?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <FieldText
                          value={value}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Last name',
                          })}
                          disabled={!isEditable}
                          fullWidth
                          onChange={onChange}
                        />
                      )}
                      name="lastName"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Phone Number',
                    })}
                    fullWidth
                    isInvalid={!!errors?.phone}
                    error={errors?.phone?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <FieldText
                          value={value}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Phone number',
                          })}
                          disabled={!isEditable}
                          onChange={onChange}
                          fullWidth
                        />
                      )}
                      name="phone"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              <Spacer />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Email Address',
                    })}
                    fullWidth
                    isInvalid={!!errors?.email}
                    error={errors?.email?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <FieldText
                          value={value}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Email Address',
                          })}
                          disabled={!isEditable}
                          onChange={onChange}
                          fullWidth
                        />
                      )}
                      name="email"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Gender',
                    })}
                    fullWidth
                    isInvalid={!!errors?.gender}
                    error={errors?.gender?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SuperSelect
                          isInvalid={!!errors?.gender}
                          fullWidth
                          placeholder="Gender"
                          options={GENDER.map(item => ({
                            value: item.value,
                            inputDisplay: intl.formatMessage(item.label),
                          }))}
                          valueOfSelected={value}
                          onChange={onChange}
                          disabled={!isEditable}
                        />
                      )}
                      name="gender"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem />
              </FlexGroup>

              <Spacer size="xxl" />

              <Title>
                <h2>
                  <FormattedMessage defaultMessage="Account Detail" />
                </h2>
              </Title>

              <HorizontalRule />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Type',
                    })}
                    fullWidth
                    isInvalid={!!errors?.type}
                    error={errors?.type?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SuperSelect
                          fullWidth
                          placeholder="Type"
                          options={STUDENT_TYPES.map(item => ({
                            value: item.value,
                            inputDisplay: intl.formatMessage(item.label),
                          }))}
                          valueOfSelected={value}
                          onChange={onChange}
                          disabled={!isEditable}
                        />
                      )}
                      name="type"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Status',
                    })}
                    fullWidth
                    isInvalid={!!errors?.status}
                    error={errors?.status?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SuperSelect
                          isInvalid={!!errors?.status}
                          fullWidth
                          placeholder="Status"
                          options={STUDENT_STATUS.map(item => ({
                            value: item.value,
                            inputDisplay: intl.formatMessage(item.label),
                          }))}
                          valueOfSelected={value}
                          disabled
                        />
                      )}
                      name="status"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Referral Code',
                    })}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.referralCode || ''}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Referral Code',
                      })}
                      disabled
                      // onChange={onChange}
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer size="xxl" />
              <FlexGroup>
                <LearningRequestUTM
                  id={subUsersData?.data?.contact?.learningRequest?.id}
                />
              </FlexGroup>
              <Spacer size="xxl" />
              <UpdateSalemanModule id={id} salemanData={data?.data?.sale} />

              <Spacer size="xxl" />

              <Spacer />

              <Title>
                <h2>
                  <FormattedMessage defaultMessage="Sub Users" />
                </h2>
              </Title>
              <p>Learning Request</p>
              {/* <SubUser subUserData={subUsersData?.data?.contact.user} /> */}
              <HorizontalRule />
              <SubUserModule
                handleDelete={deleteSubUsersMutation}
                subsData={subUsersData?.data?.learningRequests || []}
                data={handleExecuteDataSubUsers(
                  subUsersData?.data?.learningRequests,
                )}
                control={control}
                errors={errors}
                setValue={setValue}
                watch={watch}
                isDisable={!isEditable}
              />
            </Form>
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default StudentDetail;
