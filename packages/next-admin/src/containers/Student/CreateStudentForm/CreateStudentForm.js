import {
  Modal,
  ModalHeader,
  ModalHeaderTitle,
  ModalFooter,
  ModalBody,
  Button,
  ButtonEmpty,
  Form,
  FormRow,
  FieldText,
  FlexGroup,
  FlexItem,
  Title,
  HorizontalRule,
  Spacer,
  Text,
  FieldPassword,
  SuperSelect,
  notification,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import {
  GENDER,
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
} from 'configs/app.constants';
import { useMutation, useQueryClient } from 'react-query';
import { createStudent, GET_STUDENTS } from 'services/student';
import { useToggle } from 'hooks';
import bgImage from 'assets/images/questions-confirm.png';

import {
  STUDENT_TYPES,
  STUDENT_TYPE_KID,
  STUDENT_TYPE_ADULT,
} from '../Students/constants';

import { ErrorStatus } from './ErrorConstant';

export const CREATE_TESTER_FORM_ID = 'create-tester-form';

// eslint-disable-next-line react/prop-types
function CreateStudentForm({ isVisible, closeModal }) {
  const intl = useIntl();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: GENDER_MALE,
      password: '',
      confirmPassword: '',
      studentType: STUDENT_TYPE_KID,
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
          .oneOf([STUDENT_TYPE_KID, STUDENT_TYPE_ADULT], 'Invalid studentType'),
      }),
    ),
  });

  const queryClient = useQueryClient();

  const createStudentMutation = useMutation(createStudent, {
    onSuccess: (data, variables, context) => {
      notification.success({
        title: 'Successfully',
        text: 'Create New Student successfully!',
      });

      // handleCreateSubUsers(data.contactId, variables);
      closeModal();
      // Refresh testers list
      queryClient.invalidateQueries(GET_STUDENTS);
    },
    onError: err => {
      if (err?.response.status === 409) {
        toggle();
      }
      // const mesError = err?.response?.data?.errors[0]?.message;

      const errorFinded = ErrorStatus.find(
        errItem => errItem.code === err?.response?.status,
      );

      if (errorFinded) {
        notification.error({
          title: errorFinded.message,
        });
      } else {
        notification.error({
          title: <FormattedMessage defaultMessage="Create student failure!" />,
        });
      }
    },
  });

  const onSubmit = data => {
    createStudentMutation.mutate(data);
  };

  const onSubmitUpdate = data => {
    createStudentMutation.mutate({ ...data, isUpdate: true });
    close();
  };

  const { isVisiable, toggle, close } = useToggle();

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
              <FormattedMessage defaultMessage="Do You Want To Update Infomation Of This Account?" />
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

            <Button
              onClick={handleSubmit(onSubmitUpdate)}
              fill
              isLoading={createStudentMutation.isLoading}
            >
              <FormattedMessage defaultMessage="Confirm" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <ModalHeader>
        <ModalHeaderTitle>
          <FormattedMessage defaultMessage="Create New Student" />
        </ModalHeaderTitle>
      </ModalHeader>

      <ModalBody>
        <Form
          component="form"
          id={CREATE_TESTER_FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Title size="s">
            <h2>
              <FormattedMessage defaultMessage="Persional Information" />
            </h2>
          </Title>

          <HorizontalRule margin="s" />

          <FlexGroup>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="First Name" />}
                isInvalid={!!errors?.firstName}
                error={errors?.firstName?.message}
              >
                <Controller
                  as={
                    <FieldText compressed fullWidth placeholder="First name" />
                  }
                  name="firstName"
                  control={control}
                />
              </FormRow>
            </FlexItem>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Last Name" />}
                isInvalid={!!errors?.lastName}
                error={errors?.lastName?.message}
              >
                <Controller
                  as={
                    <FieldText compressed fullWidth placeholder="Last name" />
                  }
                  name="lastName"
                  control={control}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>

          <FlexGroup>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Phone Number" />}
                isInvalid={!!errors?.phone}
                error={errors?.phone?.message}
              >
                <Controller
                  as={
                    <FieldText
                      compressed
                      fullWidth
                      placeholder="Phone number"
                    />
                  }
                  name="phone"
                  control={control}
                />
              </FormRow>
            </FlexItem>

            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Email Address" />}
                // isInvalid={!!errors?.email}
                error={errors?.email?.message}
              >
                <Controller
                  as={
                    <FieldText
                      compressed
                      fullWidth
                      placeholder="Email address"
                    />
                  }
                  name="email"
                  control={control}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>

          <FlexGroup>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Gender" />}
                isInvalid={!!errors?.gender}
                error={errors?.gender?.message}
              >
                <Controller
                  render={({ onChange, value }) => (
                    <SuperSelect
                      compressed
                      isInvalid={!!errors?.gender}
                      fullWidth
                      placeholder="Gender"
                      options={GENDER.map(item => ({
                        value: item.value,
                        inputDisplay: intl.formatMessage(item.message),
                      }))}
                      valueOfSelected={value}
                      onChange={onChange}
                    />
                  )}
                  name="gender"
                  control={control}
                />
              </FormRow>
            </FlexItem>

            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="StudentType" />}
                isInvalid={!!errors?.gender}
                error={errors?.gender?.message}
              >
                <Controller
                  render={({ onChange, value }) => (
                    <SuperSelect
                      compressed
                      isInvalid={!!errors?.studentType}
                      fullWidth
                      placeholder="StudentType"
                      options={STUDENT_TYPES.map(item => ({
                        value: item.value,
                        inputDisplay: intl.formatMessage(item.label),
                      }))}
                      valueOfSelected={value}
                      onChange={onChange}
                    />
                  )}
                  name="studentType"
                  control={control}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
          <Spacer size="s" />

          <Title size="s">
            <h2>
              <FormattedMessage defaultMessage="Credentials Information" />
            </h2>
          </Title>

          <HorizontalRule margin="s" />

          <FlexGroup>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Password" />}
                isInvalid={!!errors?.password}
                error={errors?.password?.message}
              >
                <Controller
                  as={
                    <FieldPassword
                      type="dual"
                      compressed
                      fullWidth
                      placeholder="Password"
                    />
                  }
                  name="password"
                  control={control}
                />
              </FormRow>
            </FlexItem>

            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Confirm Password" />}
                isInvalid={!!errors?.confirmPassword}
                error={errors?.confirmPassword?.message}
              >
                <Controller
                  as={
                    <FieldPassword
                      type="dual"
                      compressed
                      fullWidth
                      placeholder="Confirm password"
                    />
                  }
                  name="confirmPassword"
                  control={control}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>

          <Spacer size="m" />
        </Form>
      </ModalBody>

      <ModalFooter>
        <ButtonEmpty onClick={closeModal}>
          <FormattedMessage defaultMessage="Cancel" />
        </ButtonEmpty>

        <Button
          form={CREATE_TESTER_FORM_ID}
          type="submit"
          fill
          isLoading={createStudentMutation.isLoading}
        >
          <FormattedMessage defaultMessage="Confirm" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
}

CreateStudentForm.defaultProps = {
  closeModal: () => {},
  isVisible: false,
};

CreateStudentForm.propTypes = {
  closeModal: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default CreateStudentForm;
