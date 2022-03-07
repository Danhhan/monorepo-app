import {
  Modal,
  ModalHeader,
  ModalHeaderTitle,
  ModalFooter,
  ModalBody,
  Button,
  ButtonEmpty,
  Title,
  Spacer,
  Text,
  Link,
  notification,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SHEMA_SUB_USER_DEFAULT, SHEMA_SUB_USER } from 'components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
} from 'configs/app.constants';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import {
  createStudentWithSubUsers,
  CREATE_STUDENT_WITH_SUB_USERS,
  refreshContact,
  REFRESH_CONTACT_DATA,
} from 'services/student';
import { useToggle } from 'hooks';

import bgImage from 'assets/images/questions-confirm.png';

import { STUDENT_TYPE_KID, STUDENT_TYPE_ADULT } from '../Students/constants';
import CreateStudentFormNewFlowForm from './CreateStudentNewFlowForm';
import { ErrorStatus } from './ErrorConstant';

export const CREATE_TESTER_FORM_ID = 'create-tester-form';
function CreateStudentFormNewFlow({ isVisible, closeModal }) {
  const [errorRefresh, setErrorRefresh] = useState(false);

  const {
    control,
    handleSubmit,
    errors,
    setValue,
    watch,
    reset,
    // getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: undefined,
      password: '',
      confirmPassword: '',
      studentType: undefined,
      ...SHEMA_SUB_USER_DEFAULT,
    },

    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        // eslint-disable-next-line prettier/prettier
        phone: yup.string().nullable().max(10).required('Required'),
        gender: yup
          .mixed()
          .required('Required')
          .oneOf([GENDER_MALE, GENDER_FEMALE, GENDER_OTHER], 'Invalid gender'),
        password: yup
          .string()
          .required('Required')
          .min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
        studentType: yup
          .mixed()
          .oneOf([STUDENT_TYPE_KID, STUDENT_TYPE_ADULT], 'Invalid studentType')
          .required('Required'),
        ...SHEMA_SUB_USER,
      }),
    ),
  });

  const queryClient = useQueryClient();

  const createStudentWithSubUsersMutation = useMutation(
    createStudentWithSubUsers,
    {
      onSuccess: () => {
        notification.success({
          title: 'Successfully',
          text: 'Create New Student successfully!',
        });

        closeModal();
        // Refresh testers list
        queryClient.invalidateQueries(CREATE_STUDENT_WITH_SUB_USERS);
      },
      onError: err => {
        const mesError = err?.response?.data?.errors[0]?.message;

        const errorFinded = ErrorStatus.find(
          errItem => errItem.code === err?.response?.status,
        );

        notification.error({
          title: 'Failure',
          text: errorFinded?.message || mesError || (
            <FormattedMessage defaultMessage="Create student failure!" />
          ),
        });
      },
    },
  );

  const handleCreateSubUsers = data => {
    const subUsersArr = data.subUserCount.map(item => {
      const indexToGet = item + 1;
      return {
        requestId: refreshData?.contact[0]?.learningRequests[item]?.id,
        firstName: data[`firstNameSubUser${indexToGet}`],
        lastName: data[`lastNameSubUser${indexToGet}`],
        type: data[`studentTypeSubUser${indexToGet}`],
        gender: data[`genderSubUser${indexToGet}`],
      };
    });

    createStudentWithSubUsersMutation.mutate({
      contactId: refreshData?.contact[0]?.id,
      ...data,
      subusers: subUsersArr,
    });
  };

  const onSubmit = dataForm => {
    const refreshEmail = refreshData?.contact[0].email;

    if (dataForm.email === refreshEmail) {
      notification.error({
        title: <FormattedMessage defaultMessage="Email Existed!" />,
      });
      return;
    }
    handleCreateSubUsers(dataForm);
  };

  const { isVisiable, toggle, close } = useToggle();

  const [phoneInput, setPhoneInput] = useState();
  const [idContact, setIdContact] = useState();

  const handleRefreshDataSuccess = data => {
    setIdContact(data?.id);

    const lengthArr = data?.learningRequests?.length || 0;

    setValue('firstName', data?.name, { shouldValidate: true });
    // setValue('email', data?.email, { shouldValidate: true });
    setValue('gender', data?.gender, { shouldValidate: true });
    setValue('studentType', data?.type, { shouldValidate: true });

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < lengthArr; i++) {
      const indexToGet = i + 1;
      setValue(
        `firstNameSubUser${indexToGet}`,
        data?.learningRequests[i]?.firstName || data?.learningRequests[i]?.name,
        { shouldValidate: true },
      );
      setValue(
        `lastNameSubUser${indexToGet}`,
        data?.learningRequests[i]?.lastName || '',
        { shouldValidate: true },
      );
      setValue(
        `genderSubUser${indexToGet}`,
        data?.learningRequests[i]?.gender,
        { shouldValidate: true },
      );
      setValue(
        `studentTypeSubUser${indexToGet}`,
        data?.learningRequests[i]?.type,
        { shouldValidate: true },
      );
      setValue(
        `learningRequestSubUser${indexToGet}`,
        data?.learningRequests[i]?.id,
      );
    }
  };

  const noticeErrorsHandlers = () => {
    notification.error({
      title: (
        <FormattedMessage defaultMessage="Please re-check your form before submit!" />
      ),
      text: (
        <FormattedMessage defaultMessage="Some field are invalid or not acceptable!" />
      ),
    });
  };

  const {
    data: refreshData,
    error: refreshError,
    isFetching,
    // refetch,
  } = useQuery(
    [REFRESH_CONTACT_DATA, phoneInput],
    () => refreshContact(phoneInput),
    {
      retry: 1,
      enabled: !!phoneInput,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: dataRes => {
        setErrorRefresh();
        handleRefreshDataSuccess(dataRes?.contact[0]);
      },
      onError: err => {
        if (idContact) {
          setIdContact();
        }
        const idRedirect =
          err?.response?.data?.errors?.studentId ||
          err?.response?.data?.errors?.userId;
        if (err?.response.status === 409 && idRedirect) {
          toggle();
          setErrorRefresh(<FormattedMessage defaultMessage="Account Exist!" />);
          return;
        }
        const mesError = err?.response?.data?.errors[0]?.message;
        setErrorRefresh(
          mesError || (
            <FormattedMessage defaultMessage="Refresh contact failure!" />
          ),
        );
        notification.error({
          title: <FormattedMessage defaultMessage="Error Occurs!" />,
          text: mesError || (
            <FormattedMessage defaultMessage="Refresh contact failure!" />
          ),
        });
      },
    },
  );

  const studentId =
    refreshError?.response?.data?.errors?.studentId ||
    refreshError?.response?.data?.errors?.userId;

  const handleRefreshData = value => {
    if (!value) {
      setIdContact();
      reset();
    }
    setPhoneInput(value);
    queryClient.invalidateQueries([REFRESH_CONTACT_DATA, phoneInput]);
  };

  useEffect(() => {
    setPhoneInput();
    setIdContact();
  }, [isVisible]);

  return isVisible ? (
    <Modal maxWidth={false} style={{ width: '800px' }} onClose={closeModal}>
      {isVisiable && (
        <Modal className="p-4" onClose={close}>
          <ModalHeaderTitle>
            <Title>
              <FormattedMessage defaultMessage="Account Exist" />
            </Title>
            <Spacer size="s" />
            <Text size="s" color="subdued">
              <FormattedMessage defaultMessage="Do You Want To Redirect To Account Detail Page To Update?" />
            </Text>
          </ModalHeaderTitle>
          <ModalBody>
            <img
              width={300}
              // height={180}
              className="object-contain m-auto block"
              src={bgImage}
              alt="confirm-img"
            />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={close}>
              <FormattedMessage defaultMessage="Cancel" />
            </ButtonEmpty>

            <Link to={`/students/${studentId}`}>
              <Button fill>
                <FormattedMessage defaultMessage="Confirm" />
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      )}
      <ModalHeader>
        <ModalHeaderTitle>
          <FormattedMessage defaultMessage="Create New Student" />
        </ModalHeaderTitle>
      </ModalHeader>

      <ModalBody>
        <CreateStudentFormNewFlowForm
          errorRefresh={errorRefresh}
          handleSubmit={handleSubmit(onSubmit, noticeErrorsHandlers)}
          setValue={setValue}
          control={control}
          errors={errors}
          watch={watch}
          CREATE_TESTER_FORM_ID={CREATE_TESTER_FORM_ID}
          handleRefreshData={handleRefreshData}
          phoneInputLoading={isFetching}
          hasContact={!!idContact}
          subUsersData={refreshData?.contact[0]?.learningRequests?.map(
            (learningRequestItem, index) => index,
          )}
        />
      </ModalBody>

      <ModalFooter>
        <ButtonEmpty onClick={closeModal}>
          <FormattedMessage defaultMessage="Cancel" />
        </ButtonEmpty>

        <Button
          form={CREATE_TESTER_FORM_ID}
          type="submit"
          fill
          disabled={!idContact}
          isLoading={createStudentWithSubUsersMutation.isLoading}
        >
          <FormattedMessage defaultMessage="Confirm" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
}

CreateStudentFormNewFlow.defaultProps = {
  closeModal: () => {},
  isVisible: false,
};

CreateStudentFormNewFlow.propTypes = {
  closeModal: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default CreateStudentFormNewFlow;
