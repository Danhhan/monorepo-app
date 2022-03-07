/* eslint-disable radix */
import {
  Button,
  ButtonEmpty,
  FieldPassword,
  FieldText,
  Form,
  FormRow,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';

export type UserProfileProps = {
  isVisiable: boolean;
  isLoading: boolean;
  onClose: () => void;
  mutate: Function;
};
export const CHANGE_PASSWORD_FORM_ID = 'change-password-form';
interface IFormData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
const defaultValues: IFormData = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
};

const formSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  currentPassword: yup.string().required('Please enter current password'),
  newPassword: yup.string().required('Please enter new password'),
  newPasswordConfirmation: yup
    .string()
    .required('Please enter confirm new password')
    .oneOf([yup.ref('newPassword'), null], 'New password must match'),
});

const ChangePassWord: React.FC<UserProfileProps> = ({
  isLoading = false,
  isVisiable = false,
  onClose = () => {},
  mutate,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(formSchema),
  });
  const intl = useIntl();
  const onFormSubmit = (data: IFormData) => {
    mutate({
      ...data,
    });
  };
  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalHeader style={{ justifyContent: 'left' }}>
        <Text textAlign="left">
          <h2>
            <FormattedMessage defaultMessage="Change password" />
          </h2>
        </Text>
      </ModalHeader>
      <ModalBody>
        <Form
          id={CHANGE_PASSWORD_FORM_ID}
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <FormRow
            label="Current password"
            isInvalid={!!errors.currentPassword}
            error={errors.currentPassword?.message}
            fullWidth
          >
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <FieldText
                  {...field}
                  isInvalid={!!errors.currentPassword}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Current password',
                  })}
                  fullWidth
                />
              )}
            />
          </FormRow>
          <FormRow
            label="New password"
            isInvalid={!!errors.newPassword}
            error={errors.newPassword?.message}
            fullWidth
          >
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <FieldPassword
                  {...field}
                  isInvalid={!!errors.newPassword}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'New password',
                  })}
                  fullWidth
                  type="dual"
                />
              )}
            />
          </FormRow>
          <FormRow
            isInvalid={!!errors.newPasswordConfirmation}
            error={errors.newPasswordConfirmation?.message}
            fullWidth
          >
            <Controller
              name="newPasswordConfirmation"
              control={control}
              render={({ field }) => (
                <FieldPassword
                  {...field}
                  isInvalid={!!errors.newPasswordConfirmation}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Confirm new password',
                  })}
                  fullWidth
                  type="dual"
                />
              )}
            />
          </FormRow>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ButtonEmpty onClick={onClose}>
          <FormattedMessage defaultMessage="Cancel" />
        </ButtonEmpty>

        <Button
          form={CHANGE_PASSWORD_FORM_ID}
          type="submit"
          fill
          isLoading={isLoading}
          style={{ background: '#14B24C' }}
        >
          <FormattedMessage defaultMessage="Save" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default ChangePassWord;
