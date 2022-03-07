import {
  Modal,
  ModalHeader,
  ModalHeaderTitle,
  ModalBody,
  ModalFooter,
  ButtonEmpty,
  Button,
  notification,
} from '@antoree/ant-ui';

import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';
import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { createTestCourse } from 'services/testingCourse';

import CreateTestingCourseForm from './CreateTestingCourseForm';
import style from './TeachersSelection.module.scss';
import { ERROR_STATUS } from '../../constant';

const CREATE_TESTING_COURSE_FORM_ID = 'create-testing-course-form';

const CreateTestingCourse = ({ onSuccessFallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModalHandler = () => {
    setTime(moment());
    setTeacher();
    setIsOpen(false);
  };

  const [time, setTime] = useState(moment());

  const [teacher, setTeacher] = useState();
  const [studentName, setStudentName] = useState();

  const toggleModalHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const createCourseMutation = useMutation(
    mutateData => createTestCourse(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Create new testing course successfully',
        });
        closeModalHandler();
        onSuccessFallback();
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
                  values={{ studentName: <b>{studentName}</b> }}
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
            title: mesError ?? 'Create new testing course failure',
          });
        }
      },
    },
  );

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
              <FormattedMessage defaultMessage="Create New Testing Course" />
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalBody>
            <CreateTestingCourseForm
              setTime={setTime}
              setTeacher={setTeacher}
              time={time}
              setStudentName={setStudentName}
              closeModalHandler={closeModalHandler}
              teacher={teacher}
              createCourseMutation={createCourseMutation}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={closeModalHandler}>
              <FormattedMessage defaultMessage="Cancel" />
            </ButtonEmpty>
            <Button
              form={CREATE_TESTING_COURSE_FORM_ID}
              type="submit"
              className={style.buttonConfirm}
              fill
              isLoading={createCourseMutation.isLoading}
              iconType="sortUp"
              iconSide="right"
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

CreateTestingCourse.defaultProps = {
  onSuccessFallback: () => {},
};

CreateTestingCourse.propTypes = {
  onSuccessFallback: PropTypes.func,
};

export default CreateTestingCourse;
