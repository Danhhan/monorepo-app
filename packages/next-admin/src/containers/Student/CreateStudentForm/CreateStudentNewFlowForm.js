import {
  ButtonIcon,
  CallOut,
  FieldPassword,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  Spacer,
  SuperSelect,
  Title,
} from '@antoree/ant-ui';
import { SubUserModule } from 'components';
import { GENDER } from 'configs/app.constants';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { STUDENT_TYPES } from '../Students/constants';

function CreateStudentFormNewFlowForm({
  CREATE_TESTER_FORM_ID,
  phoneInputLoading,
  handleSubmit,
  errors,
  control,
  setValue,
  watch,
  handleRefreshData,
  hasContact,
  subUsersData,
  errorRefresh,
}) {
  const intl = useIntl();

  return (
    <Form component="form" id={CREATE_TESTER_FORM_ID} onSubmit={handleSubmit}>
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="Contact Information" />
        </h2>
      </Title>

      <HorizontalRule margin="s" />
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Phone Number" />}
            isInvalid={!!errors?.phone}
            error={errors?.phone?.message}
          >
            <Controller
              render={({ value, onChange, ...rest }) => (
                <div className="flex ">
                  <FieldText
                    onChange={onChange}
                    isLoading={phoneInputLoading}
                    disabled={hasContact}
                    compressed
                    value={value}
                    fullWidth
                    placeholder="Phone number"
                  />
                  <ButtonIcon
                    isDisabled={hasContact}
                    display="fill"
                    size="s"
                    iconType="refresh"
                    className="ml-2 w-10"
                    onClick={e => handleRefreshData(value)}
                  />
                  <ButtonIcon
                    color="danger"
                    display="fill"
                    size="s"
                    className="ml-2 w-10"
                    isDisabled={!hasContact}
                    iconType="cross"
                    onClick={() => {
                      setValue('phone', undefined);
                      handleRefreshData();
                    }}
                  />
                </div>
              )}
              // as={}
              name="phone"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem />
      </FlexGroup>

      {errorRefresh && (
        <>
          <Spacer size="m" />
          <CallOut title="Error" color="danger" iconType="alert">
            <p>{errorRefresh}</p>
          </CallOut>
        </>
      )}

      <div style={{ display: hasContact ? 'block' : 'none' }}>
        <Spacer size="m" />
        <Title size="s">
          <p>
            <FormattedMessage
              defaultMessage="User {index}"
              values={{ index: 1 }}
            />
          </p>
        </Title>
        <Spacer size="m" />
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
                    disabled={!hasContact}
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
                    disabled={!hasContact}
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
                  <FieldText
                    disabled={!hasContact}
                    compressed
                    fullWidth
                    placeholder="First name"
                  />
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
                  <FieldText
                    disabled={!hasContact}
                    compressed
                    fullWidth
                    placeholder="Last name"
                  />
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
              label={<FormattedMessage defaultMessage="Email Address" />}
              // isInvalid={!!errors?.email}
              error={errors?.email?.message}
            >
              <Controller
                as={
                  <FieldText
                    disabled={!hasContact}
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
                    disabled={!hasContact}
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
        </FlexGroup>

        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="StudentType" />}
              isInvalid={!!errors?.studentType}
              error={errors?.studentType?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SuperSelect
                    compressed
                    disabled={!hasContact}
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
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Status" />}
            >
              <FieldText
                autoComplete="off"
                disabled
                compressed
                // readOnly
                value={intl.formatMessage({ defaultMessage: 'New' })}
                fullWidth
                placeholder="Status"
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>

        <Spacer size="xl" />
        <SubUserModule
          disableDeletePreviousData
          isDisable={!hasContact}
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
          data={subUsersData}
        />
      </div>
    </Form>
  );
}

CreateStudentFormNewFlowForm.defaultProps = {
  CREATE_TESTER_FORM_ID: '',
  errorRefresh: undefined,
  handleSubmit: () => {},
  errors: undefined,
  control: undefined,
  setValue: () => {},
  watch: undefined,
  handleRefreshData: () => {},
  hasContact: false,
  phoneInputLoading: false,
  subUsersData: [],
};

CreateStudentFormNewFlowForm.propTypes = {
  CREATE_TESTER_FORM_ID: PropTypes.string,
  errorRefresh: PropTypes.string,
  handleSubmit: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any,
  setValue: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  watch: PropTypes.any,
  handleRefreshData: PropTypes.func,
  hasContact: PropTypes.bool,
  phoneInputLoading: PropTypes.bool,
  subUsersData: PropTypes.arrayOf(PropTypes.number),
};

export default CreateStudentFormNewFlowForm;
