import { FlexGroup, LoadingSpinner } from '@antoree/ant-ui';
import { EuiMoment } from '@elastic/eui/src/components/search_bar/query/date_format';
import { TeacherSelector, TopTeachers } from 'components';
import { forwardRef, useImperativeHandle } from 'react';
import { TEACHER_TEST_ROLE } from 'services/teachers';
import { SubmitStudentInfo } from '../../TestingSteps';

export type TestingTeacherSelectorProps = {
  successHandle?: () => void;
  customAvailable?: EuiMoment;
  isLoading?: boolean;
};

const TestingTeacherSelector = forwardRef<
  SubmitStudentInfo | undefined,
  TestingTeacherSelectorProps
>((props, ref) => {
  const { successHandle, customAvailable, isLoading } = props;

  useImperativeHandle(ref, () => ({
    onConfirm(onSuccess) {
      onSuccess();
    },
  }));

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <FlexGroup direction="column" style={{ width: '100%' }}>
      <TopTeachers
        successHandle={successHandle}
        role={TEACHER_TEST_ROLE}
        customAvailable={customAvailable}
      />
      <TeacherSelector
        successHandle={successHandle}
        role={TEACHER_TEST_ROLE}
        customAvailable={customAvailable}
      />
    </FlexGroup>
  );
});

export default TestingTeacherSelector;
