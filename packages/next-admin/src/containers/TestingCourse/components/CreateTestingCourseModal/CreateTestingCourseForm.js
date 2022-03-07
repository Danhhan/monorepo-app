import {
  DatePicker,
  FieldText,
  FlexGrid,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  Spacer,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { AvailableTime, SelectCustomField, SelectTimeRange } from 'components';
import { useCurrentUser } from 'hooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  getTeacherAvailableTime,
  GET_TEACHER_AVAILABLE_TIME,
} from 'services/testingCourse';
import * as yup from 'yup';
import { STUDENT_TYPES } from '../../constant';
import PrivateField from './PrivateField';
import SelectStudentField from './SelectStudentField';
import TeachersSelection from './TeachersSelection';

const CREATE_TESTING_COURSE_FORM_ID = 'create-testing-course-form';

const CreateTestingCourseForm = ({
  refetch,
  closeModalHandler,
  time,
  setStudentName,
  teacher,
  setTime,
  setTeacher,
  createCourseMutation,
}) => {
  const [isMultipleSelect, setMultipleSelec] = useState(false);
  const [{ permissions }] = useCurrentUser();
  // eslint-disable-next-line prettier/prettier
  const defautlStartTime = moment().hours(0).minutes(0).seconds(0);
  // eslint-disable-next-line prettier/prettier
  const defautlEndTime = moment().hours(23).minutes(59).seconds(0);
  const [startTime, setStartTime] = useState(defautlStartTime);
  const [endTime, setEndTime] = useState(defautlEndTime);

  const intl = useIntl();

  useEffect(() => {
    const checkPerm = permissions?.includes('multiple-book-test');
    setMultipleSelec(checkPerm || false);
  }, [permissions]);
  const { control, errors, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      testerId: undefined,
      testingStart: time,
      testingStartTime: undefined,
      duration: 20,
      studentId: undefined,
      studentType: undefined,
      studentName: undefined,
      learningRequestId: undefined,
      courseId: undefined,
      note: undefined,
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
        duration: yup.number().required('Required'),
        studentId: yup.number().required('Required'),
        studentType: yup.string().required('Required'),
        courseId: yup.mixed(),
        note: yup.string(),
      }),
    ),
  });

  const createCoursehandler = formData => {
    createCourseMutation.mutate({
      ...formData,
      testingStart: formData.testingStartTime.map(
        timeItem => `${time.format('YYYY-MM-DD')} ${timeItem.value}`,
      ),
    });
  };

  return (
    <Form
      component="form"
      id={CREATE_TESTING_COURSE_FORM_ID}
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
                    setValue('learningRequestId', selected.learningRequestId);
                    setValue('studentType', selected.type || 1, {
                      shouldValidate: true,
                    });
                    setStudentName(selected.displayName);
                  }}
                />
              )}
              name="studentId"
              control={control}
            />
          </FormRow>
          <Controller name="learningRequestId" control={control} />
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
                    value && STUDENT_TYPES?.find(stu => stu.value === value)
                      ? STUDENT_TYPES?.find(stu => stu.value === value).label
                      : ''
                  }
                />
              )}
              name="studentType"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem />
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
                  options={[{ label: '20 mins. (Default)', value: 20 }]}
                />
              )}
              name="duration"
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
              timeIntervals={20}
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
      <FlexGroup>
        <FlexItem>
          <TeachersSelection
            setValue={setValue}
            miniSize={false}
            selectedTeacher={teacher}
            onSelect={teacherPara => {
              if (
                teacherPara?.id === getValues('testerId') &&
                teacherPara === undefined
              ) {
                return;
              }
              setValue('testerId', teacherPara?.id, { shouldValidate: true });
              setTeacher(teacherPara);
            }}
            startTime={startTime?.format('YYYY-MM-DD HH:mm:ss')}
            endTime={endTime?.format('YYYY-MM-DD HH:mm:ss')}
            time={time?.format('YYYY-MM-DD HH:mm:ss')}
            errors={errors}
          />
        </FlexItem>
        <FlexItem>
          <AvailableTime
            date={time?.format('YYYY-MM-DD')}
            teacherId={teacher?.id}
            teacherName={teacher?.name}
            skype={teacher?.skype}
            minutesSpace={20}
            minHourSelected={startTime?.hours()}
            minMinSelected={startTime?.minutes()}
            maxHourSelected={endTime?.hours() + 1}
            maxMinSelected={endTime?.minutes()}
            isMultipleSelect={isMultipleSelect}
            getTeacherAvailableTime={getTeacherAvailableTime}
            GET_TEACHER_AVAILABLE_TIME={GET_TEACHER_AVAILABLE_TIME}
            onSelect={dateTimeArr => {
              setValue('testingStartTime', dateTimeArr, {
                shouldValidate: dateTimeArr.length > 0,
              });
            }}
            errors={errors}
          />
        </FlexItem>
      </FlexGroup>
    </Form>
  );
};

CreateTestingCourseForm.defaultProps = {
  refetch: () => {},
  closeModalHandler: () => {},
  time: null,
  teacher: null,
  setTime: () => {},
  setTeacher: () => {},
  setStudentName: () => {},
  createCourseMutation: {},
};

CreateTestingCourseForm.propTypes = {
  refetch: PropTypes.func,
  closeModalHandler: PropTypes.func,
  time: PropTypes.string,
  teacher: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    skype: PropTypes.string,
  }),
  setTime: PropTypes.func,
  setTeacher: PropTypes.func,
  setStudentName: PropTypes.func,
  createCourseMutation: PropTypes.shape({
    mutate: PropTypes.func,
  }),
};

export default CreateTestingCourseForm;
