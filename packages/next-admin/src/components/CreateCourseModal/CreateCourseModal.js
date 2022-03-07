/* eslint-disable no-param-reassign */
import {
  Modal,
  ModalHeader,
  ModalHeaderTitle,
  ModalBody,
  ModalFooter,
  ButtonEmpty,
  Button,
  Form,
  FormRow,
  DatePicker,
  FlexGroup,
  FlexItem,
  Spacer,
  Portal,
  notification,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { createCourse } from 'services/course';
import SelectStudentField from './SelectStudentField';
import SelectTeacherField from './SelectTecherField';

const CREATE_COURSE_FORM_ID = 'create-course-form';

function CreateCourseModal({ type, onSuccess }) {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const toggleModalHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      studentId: undefined,
      teacherId: undefined,
      time: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        studentId: yup.number().required('Required'),
        teacherId: yup.number().required('Required'),
        time: yup.mixed().required('Required'),
      }),
    ),
  });

  const createCourseMutation = useMutation(
    mutateData => createCourse(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Create new course successfully',
        });
        closeModalHandler();
        onSuccess();
      },
      onError: err => {
        notification.error({
          title: err?.message ?? 'Create new course failure',
        });
      },
    },
  );

  const createCoursehandler = formData => {
    createCourseMutation.mutate({
      ...formData,
      time: formData.time.format('YYYY-MM-DD HH:mm:ss'),
      type: type === 'testing' ? 7 : 5,
    });
  };

  return (
    <>
      {isOpen ? (
        <Modal onClose={closeModalHandler}>
          <ModalHeader>
            <ModalHeaderTitle>
              <FormattedMessage defaultMessage="Create New Course" />
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalBody>
            <Form
              component="form"
              id={CREATE_COURSE_FORM_ID}
              onSubmit={handleSubmit(createCoursehandler)}
            >
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Student',
                    })}
                    isInvalid={!!errors?.studentId}
                    error={errors?.studentId?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SelectStudentField
                          isInvalid={!!errors?.studentId}
                          valueOfSelected={value}
                          onSelect={selected => onChange(selected.value)}
                        />
                      )}
                      name="studentId"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Teacher',
                    })}
                    isInvalid={!!errors?.teacherId}
                    error={errors?.teacherId?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SelectTeacherField
                          isInvalid={!!errors?.teacherId}
                          valueOfSelected={value}
                          onSelect={selected => onChange(selected.value)}
                        />
                      )}
                      name="teacherId"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Time',
                    })}
                    fullWidth
                    isInvalid={!!errors?.time}
                    error={errors?.time?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <DatePicker
                          timeIntervals={type === 'testing' ? 20 : 30}
                          isInvalid={!!errors?.time}
                          fullWidth
                          minDate={moment()}
                          dateFormat="DD/MM/YYYY HH:mm"
                          placeholder="Select time"
                          showTimeSelect
                          popperProps={{
                            innerRef: ref => {
                              if (ref) {
                                ref.style.border = '1px solid #D3DAE6';
                                ref.style.backgroundColor = '#fff';
                                ref.style.borderRadius = '0 0 4px 4px';
                                ref.style.scrollbarColor =
                                  'rgba(105,112,125,0.5) transparent';
                                ref.style.zIndex = '9005';
                                ref.style.background = '#ffff';
                                ref.style.boxShadow =
                                  '0 1px 1px -1px rgba(152, 162, 179, 0.2), 0 3px 2px -2px rgba(152, 162, 179, 0.2), inset 0 0 0 1px rgba(11, 62, 82, 0.1);';
                              }
                            },
                          }}
                          popperContainer={({ children }) => (
                            <>{children && <Portal>{children}</Portal>}</>
                          )}
                          selected={value}
                          onChange={onChange}
                        />
                      )}
                      name="time"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer size="m" />
            </Form>
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={closeModalHandler}>
              <FormattedMessage defaultMessage="Cancel" />
            </ButtonEmpty>
            <Button
              form={CREATE_COURSE_FORM_ID}
              type="submit"
              fill
              isLoading={createCourseMutation.isLoading}
            >
              <FormattedMessage defaultMessage="Confirm" />
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}
      <Button
        fill
        color="primary"
        iconType="indexOpen"
        onClick={toggleModalHandler}
      >
        <FormattedMessage defaultMessage="Create New Course" />
      </Button>
    </>
  );
}

CreateCourseModal.defaultProps = {
  onSuccess: () => {},
};

CreateCourseModal.propTypes = {
  type: PropTypes.oneOf(['tesing', 'trial']).isRequired,
  onSuccess: PropTypes.func,
};

export default CreateCourseModal;
