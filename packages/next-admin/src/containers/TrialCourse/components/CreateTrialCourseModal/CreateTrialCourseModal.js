import {
  Button,
  ButtonEmpty,
  DatePicker,
  FieldText,
  FlexGrid,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
  notification,
  Spacer,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { AvailableTime, SelectCustomField, SelectTimeRange } from 'components';
import PrivateField from 'containers/TestingCourse/components/CreateTestingCourseModal/PrivateField';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import { getLearningTopics, GET_LEARNING_TOPICS } from 'services/common';
import {
  createTrialCourse,
  getTeacherAvailableTime,
  GET_TEACHER_AVAILABLE_TIME,
} from 'services/trialCourse';
import * as yup from 'yup';
import { ERROR_STATUS, STUDENT_LEVELS, STUDENT_TYPES } from '../../constant';
import PriceCourse from './PriceCourse';
import SelectStudentField from './SelectStudentField';
import TeachersSelection from './TeachersSelection';
import style from './TeachersSelection.module.scss';

const CREATE_TRIAL_COURSE_FORM_ID = 'create-trial-course-form';

const defaultTopic = 12;

const CreateTrialCourseModal = ({ onSuccessFallback }) => {
  const intl = useIntl();

  const [isOpen, setIsOpen] = useState(false);

  const closeModalHandler = () => {
    setTime(moment());
    setTopic(defaultTopic);
    onSuccessFallback();
    setIsOpen(false);
    setTeacher();
  };

  const toggleModalHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const [time, setTime] = useState(moment());
  const [topic, setTopic] = useState(defaultTopic);
  const [teacher, setTeacher] = useState();

  const { data: dataListTopics, isLoading: isLoadingTopics } = useQuery(
    [GET_LEARNING_TOPICS],
    () => getLearningTopics('vi'),
    {
      refetchOnWindowFocus: false,
    },
  );

  const createCourseMutation = useMutation(
    mutateData => createTrialCourse(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Create new trial course successfully',
        });
        closeModalHandler();
      },
      onError: err => {
        const errorFinded = ERROR_STATUS.find(
          errItem => errItem.code === err?.response?.status,
        );

        if (errorFinded) {
          if (errorFinded.code === 409) {
            notification.error({
              title: (
                <FormattedMessage
                  defaultMessage="The current customer's {studentName} trial slot has been booked. Please cancel the current schedule or book another one."
                  values={{ studentName: <b>{getValues('studentName')}</b> }}
                />
              ),
            });
          } else {
            notification.error({
              title: errorFinded.message,
            });
          }
        } else {
          const mesError = err?.response?.data?.errors[0]?.message;
          notification.error({
            title: mesError ?? 'Create new trial course failure',
          });
        }
      },
    },
  );

  const { control, errors, watch, handleSubmit, setValue, getValues } = useForm(
    {
      mode: 'onChange',
      defaultValues: {
        testerId: undefined,
        testingStart: time,
        testingStartTime: undefined,
        topicId: topic,
        duration: 30,
        price: undefined,
        level: undefined,
        studentId: undefined,
        studentType: undefined,
        learningRequestId: undefined,
        courseId: undefined,
        note: undefined,
        studentName: undefined,
      },
      resolver: yupResolver(
        yup.object().shape({
          testerId: yup.number().required('Required'),
          testingStart: yup.string().required('Required'),
          testingStartTime: yup
            .array(
              yup.object().shape({ value: yup.string(), index: yup.number() }),
            )
            .min(1, 'Required'),
          topicId: yup.number().required('Required'),
          duration: yup.number().required('Required'),
          price: yup.string().required('Required'),
          level: yup.number().required('Required'),
          studentId: yup.number().required('Required'),
          studentType: yup.string().required('Required'),
          courseId: yup.mixed(),
          note: yup.string(),
        }),
      ),
    },
  );

  const createCoursehandler = formData => {
    createCourseMutation.mutate({
      ...formData,
      testingStart: formData.testingStartTime.map(
        timeItem => `${time.format('YYYY-MM-DD')} ${timeItem.value}`,
      ),
    });
  };

  // eslint-disable-next-line prettier/prettier
  const defautlStartTime = moment().hours(0).minutes(0).seconds(0);
  // eslint-disable-next-line prettier/prettier
  const defautlEndTime = moment().hours(23).minutes(59).seconds(0);

  const [startTime, setStartTime] = useState(defautlStartTime);
  const [endTime, setEndTime] = useState(defautlEndTime);

  const timesCollection = watch('testingStartTime');

  return (
    <>
      {isOpen ? (
        <Modal
          maxWidth={false}
          style={{ width: 1250 }}
          maxHeight="90vh"
          onClose={closeModalHandler}
        >
          <ModalHeader>
            <ModalHeaderTitle>
              <FormattedMessage defaultMessage="Create New Trial Course" />
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalBody>
            <Form
              component="form"
              id={CREATE_TRIAL_COURSE_FORM_ID}
              onSubmit={handleSubmit(createCoursehandler)}
            >
              <Title size="xs">
                <h4>
                  <FormattedMessage defaultMessage="Select a Student" />
                </h4>
              </Title>
              <HorizontalRule margin="xs" />
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
                          onSelect={selected => {
                            onChange(selected.value);
                            setValue(
                              'learningRequestId',
                              selected.learningRequestId,
                            );
                            setValue('studentType', selected.type || 1, {
                              shouldValidate: true,
                            });
                            setValue('studentName', selected.displayName);
                          }}
                        />
                      )}
                      name="studentId"
                      control={control}
                    />
                  </FormRow>
                  <Controller name="studentName" control={control} />
                  <Controller name="learningRequestId" control={control} />
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label="Student Level"
                    isInvalid={!!errors?.level}
                    error={errors?.level?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SelectCustomField
                          isInvalid={!!errors?.level}
                          valueOfSelected={value}
                          onSelect={selected => {
                            onChange(selected.value);
                          }}
                          placeholder="Select Student Level"
                          options={STUDENT_LEVELS}
                        />
                      )}
                      name="level"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Student Type',
                    })}
                    isInvalid={!!errors?.studentType}
                    error={errors?.studentType?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <FieldText
                          disabled
                          value={
                            value &&
                            STUDENT_TYPES?.find(stu => stu.value === value)
                              ? STUDENT_TYPES?.find(stu => stu.value === value)
                                  .label
                              : ''
                          }
                        />
                      )}
                      name="studentType"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer />
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Note" />}
                isInvalid={!!errors?.note}
                error={errors?.note?.message}
              >
                <Controller
                  render={({ onChange, value }) => (
                    <TextArea
                      aria-label="Note"
                      value={value}
                      onChange={onChange}
                      resize="none"
                      fullWidth
                      rows={3}
                      // compressed
                    />
                  )}
                  name="note"
                  control={control}
                />
              </FormRow>
              <Spacer size="l" />
              <Title size="xs">
                <h4>
                  <FormattedMessage defaultMessage="Choose Time & Duration" />
                </h4>
              </Title>
              <HorizontalRule margin="xs" />
              <FlexGrid columns={3}>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Trial Duration',
                    })}
                    isInvalid={!!errors?.duration}
                    error={errors?.duration?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SelectCustomField
                          isInvalid={!!errors?.duration}
                          valueOfSelected={value}
                          onSelect={selected => {
                            onChange(selected.value);
                          }}
                          placeholder="Select Trial Duration"
                          options={[{ label: '30 mins. (Default)', value: 30 }]}
                        />
                      )}
                      name="duration"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label="Studying Topic"
                    isInvalid={!!errors?.topicId}
                    error={errors?.topicId?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SelectCustomField
                          isInvalid={!!errors?.topicId}
                          valueOfSelected={value}
                          onSelect={selected => {
                            onChange(selected.value);
                            setTopic(selected.value);
                          }}
                          placeholder="Select Studying Topic"
                          options={dataListTopics.data.map(data => ({
                            label: data.name,
                            value: data.id,
                          }))}
                        />
                      )}
                      name="topicId"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Book a Studying Time',
                    })}
                    isInvalid={!!errors?.testingStart}
                    error={errors?.testingStart?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <DatePicker
                          dateFormat="DD/MM/YYYY"
                          // minDate={moment()}
                          popoverPlacement="bottom-end"
                          placeholder="Select time"
                          // showTimeSelect
                          selected={value}
                          onSelect={() => {
                            setTime(getValues('testingStart'));
                          }}
                          onChange={onChange}
                        />
                      )}
                      name="testingStart"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Select Suitable Time Range',
                    })}
                  >
                    <SelectTimeRange
                      setStartTimeProp={setStartTime}
                      startTimeProp={startTime}
                      setEndTimeProp={setEndTime}
                      endTimeProp={endTime}
                      time={time}
                      timeIntervals={30}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'CourseId (ACS Only)',
                    })}
                    isInvalid={!!errors?.courseId}
                    error={errors?.courseId?.message}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <PrivateField onChange={onChange} value={value} />
                      )}
                      name="courseId"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGrid>
              <Spacer />
              <Controller name="testerId" control={control} />
              <Controller name="price" control={control} />
              <Controller name="testingStartTime" control={control} />
              {teacher && (
                <PriceCourse
                  isDividing={timesCollection?.length === 1}
                  topicSalary={teacher.topicSalary}
                />
              )}
              <FlexGroup>
                <FlexItem>
                  <TeachersSelection
                    setValue={setValue}
                    selectedTeacher={teacher}
                    onSelect={teacherPara => {
                      if (
                        teacherPara?.id === getValues('testerId') &&
                        teacherPara === undefined
                      ) {
                        return;
                      }
                      setValue('testerId', teacherPara?.id, {
                        shouldValidate: true,
                      });
                      setTeacher(teacherPara);
                      setValue(
                        'price',
                        teacherPara?.topicSalary?.hourlyAmount || 0,
                      );
                    }}
                    time={time?.format('YYYY-MM-DD HH:mm:ss')}
                    startTime={startTime?.format('YYYY-MM-DD HH:mm:ss')}
                    topic={topic}
                    endTime={endTime?.format('YYYY-MM-DD HH:mm:ss')}
                    errors={errors}
                  />
                </FlexItem>
                <FlexItem>
                  <AvailableTime
                    minHourSelected={startTime?.hours()}
                    minMinSelected={startTime?.minutes()}
                    maxHourSelected={endTime?.hours() + 1}
                    maxMinSelected={endTime?.minutes()}
                    date={time?.format('YYYY-MM-DD')}
                    teacherId={teacher?.id}
                    teacherName={teacher?.name}
                    skype={teacher?.skype}
                    errors={errors}
                    isMultipleSelect
                    getTeacherAvailableTime={getTeacherAvailableTime}
                    GET_TEACHER_AVAILABLE_TIME={GET_TEACHER_AVAILABLE_TIME}
                    onSelect={dateTimeArr => {
                      setValue('testingStartTime', dateTimeArr, {
                        shouldValidate: dateTimeArr.length > 0,
                      });
                    }}
                  />
                </FlexItem>
              </FlexGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={closeModalHandler}>
              <FormattedMessage defaultMessage="Cancel" />
            </ButtonEmpty>
            <Button
              form={CREATE_TRIAL_COURSE_FORM_ID}
              type="submit"
              className={style.buttonConfirm}
              fill
              iconType="sortUp"
              iconSide="right"
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
};

CreateTrialCourseModal.defaultProps = {
  onSuccessFallback: () => {},
};

CreateTrialCourseModal.propTypes = {
  onSuccessFallback: PropTypes.func,
};

export default CreateTrialCourseModal;
