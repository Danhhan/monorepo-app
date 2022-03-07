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
  FieldPassword,
  SuperSelect,
  notification,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  GENDER,
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
} from 'configs/app.constants';
import { useMutation, useQueryClient } from 'react-query';
import { createTester, GET_TESTERS } from 'services/tester';

export const CREATE_TESTER_FORM_ID = 'create-tester-form';

// eslint-disable-next-line react/prop-types
function CreateTesterForm({ isVisible, closeModal }) {
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
    },
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        phone: yup.string().nullable(),
        // eslint-disable-next-line prettier/prettier
        email: yup.string().required('Required').email('Invalid email'),
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
      }),
    ),
  });

  const queryClient = useQueryClient();

  const createTesterMutation = useMutation(createTester, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: 'Create new tester successfully!',
      });
      // Close form modal
      closeModal();
      // Refresh testers list
      queryClient.invalidateQueries(GET_TESTERS);
    },
    onError: () => {
      notification.error({
        title: 'Failure',
        text: 'Create tester failure!',
      });
    },
  });

  const onSubmit = data => {
    createTesterMutation.mutate(data);
  };

  return isVisible ? (
    <Modal onClose={closeModal}>
      <ModalHeader>
        <ModalHeaderTitle>
          <FormattedMessage defaultMessage="Create New Tester" />
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
                isInvalid={!!errors?.email}
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

            <FlexItem />
          </FlexGroup>

          <Spacer size="l" />

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
          isLoading={createTesterMutation.isLoading}
        >
          <FormattedMessage defaultMessage="Confirm" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
}

export default CreateTesterForm;
