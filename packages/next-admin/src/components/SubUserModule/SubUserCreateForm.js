import {
  ButtonIcon,
  FormRow,
  FieldText,
  FlexGroup,
  FlexItem,
  Title,
  Spacer,
  SuperSelect,
  Modal,
  Button,
  ModalHeaderTitle,
  ModalFooter,
  ModalBody,
  ButtonEmpty,
  Text,
} from '@antoree/ant-ui';
import { Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { GENDER } from 'configs/app.constants';
import PropTypes from 'prop-types';
import { useToggle } from 'hooks';
import bgImage from 'assets/images/questions-confirm.png';

import LearningRequestUTM from 'containers/Student/StudentDetail/Components/LearningRequestUTM';
import {
  STUDENT_TYPES,
  STUDENT_STATUS,
} from '../../containers/Student/Students/constants';

const SubUserCreateForm = ({
  control,
  watch,
  errors,
  index,
  handleReduceSubUser,
  isDisable,
  isVisible,
  isDisableDelete,
  lrId,
}) => {
  const intl = useIntl();
  const { isVisiable, toggle, close } = useToggle();
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <FlexGroup gutterSize="s">
        <Controller
          render={({ value }) =>
            !isDisable && (
              <FlexItem grow={false}>
                {isVisiable && (
                  <Modal className="p-4" onClose={close}>
                    <ModalHeaderTitle>
                      <Title>
                        <FormattedMessage defaultMessage="This Action Cannot Undo!" />
                      </Title>
                      <Spacer size="s" />
                      <Text size="s" color="subdued">
                        <FormattedMessage defaultMessage="Do You Want To Delete This User?" />
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
                        fill
                        color="danger"
                        onClick={() => {
                          handleReduceSubUser(value, index - 1);
                          close();
                        }}
                      >
                        <FormattedMessage defaultMessage="Delete" />
                      </Button>
                    </ModalFooter>
                  </Modal>
                )}
                <ButtonIcon
                  isDisabled={isDisable || isDisableDelete}
                  onClick={toggle}
                  display="fill"
                  color="danger"
                  iconType="trash"
                  size="s"
                  aria-label={`firstNameSubUser${index}`}
                  aria-labelledby={`firstNameSubUser${index}`}
                />
              </FlexItem>
            )
          }
          name={`idSubUser${index}`}
          control={control}
        />

        <FlexItem grow={false} className="items-start justify-center">
          <Title size="s">
            <p>
              <FormattedMessage
                defaultMessage="User {index}"
                values={{ index: index + 1 }}
              />
            </p>
          </Title>
        </FlexItem>
      </FlexGroup>

      <Spacer size="s" />
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Learning Request" />}
            isInvalid={!!errors?.[`learningRequestSubUser${index}`]}
            error={errors?.[`learningRequestSubUser${index}`]?.message}
          >
            <Controller
              as={
                <FieldText
                  autoComplete="off"
                  disabled
                  compressed
                  // readOnly
                  fullWidth
                  placeholder="Learning Request"
                />
              }
              name={`learningRequestSubUser${index}`}
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Status" />}
            isInvalid={!!errors?.[`statusSubUser${index}`]}
            error={errors?.[`statusSubUser${index}`]?.message}
          >
            <Controller
              render={({ value }) => {
                const matchedStatus = STUDENT_STATUS.find(item => {
                  return item.value === value;
                });
                return (
                  <FieldText
                    autoComplete="off"
                    disabled
                    compressed
                    // readOnly
                    value={
                      matchedStatus
                        ? intl.formatMessage(matchedStatus.label)
                        : undefined
                    }
                    fullWidth
                    placeholder="Status"
                  />
                );
              }}
              name={`statusSubUser${index}`}
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="First Name" />}
            isInvalid={!!errors?.[`firstNameSubUser${index}`]}
            error={errors?.[`firstNameSubUser${index}`]?.message}
          >
            <Controller
              as={
                <FieldText
                  autoComplete="off"
                  disabled={isDisable}
                  compressed
                  fullWidth
                  placeholder="First name"
                />
              }
              name={`firstNameSubUser${index}`}
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Last Name" />}
            isInvalid={!!errors?.[`lastNameSubUser${index}`]}
            error={errors?.[`lastNameSubUser${index}`]?.message}
          >
            <Controller
              as={
                <FieldText
                  autoComplete="off"
                  disabled={isDisable}
                  compressed
                  fullWidth
                  placeholder="Last name"
                />
              }
              name={`lastNameSubUser${index}`}
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
            isInvalid={!!errors?.[`genderSubUser${index}`]}
            error={errors?.[`genderSubUser${index}`]?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <SuperSelect
                  disabled={isDisable}
                  compressed
                  isInvalid={!!errors?.[`genderSubUser${index}`]}
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
              name={`genderSubUser${index}`}
              control={control}
            />
          </FormRow>
        </FlexItem>

        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="StudentType" />}
            isInvalid={!!errors?.[`studentTypeSubUser${index}`]}
            error={errors?.[`studentTypeSubUser${index}`]?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <SuperSelect
                  disabled={isDisable}
                  compressed
                  isInvalid={!!errors?.[`studentTypeSubUser${index}`]}
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
              name={`studentTypeSubUser${index}`}
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <Spacer size="xxl" />
      {lrId && (
        <FlexGroup>
          <LearningRequestUTM id={lrId} />
        </FlexGroup>
      )}

      <Spacer size="xl" />
    </div>
  );
};

SubUserCreateForm.defaultProps = {
  control: () => {},
  handleReduceSubUser: () => {},
  watch: () => {},
  errors: {},
  index: 1,
  isDisable: false,
  isVisible: false,
  isDisableDelete: false,
  lrId: undefined,
};

SubUserCreateForm.propTypes = {
  control: PropTypes.func,
  watch: PropTypes.func,
  handleReduceSubUser: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
  index: PropTypes.number,
  isDisable: PropTypes.bool,
  isVisible: PropTypes.bool,
  isDisableDelete: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  lrId: PropTypes.any,
};

export default SubUserCreateForm;
