/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  FlexGroup,
  FlexItem,
  FormRow,
  htmlIdGenerator,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  RadioGroup,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { SelectCustomField } from 'components';
import {
  STUDENT_TYPES,
  STUDENT_TYPE_KID,
  TEACHER_GROUPS,
  TEACHER_PHIL,
} from 'configs/app.constants';
import { useBreadcrumbs } from 'hooks';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { COMUNICATION, IELTS, STUDY_PROGRAMS } from '../constants/constants';
import { PriceBox } from './components';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Create price" />,
  },
];
function CalculatePrice() {
  useBreadcrumbs(breadcrumbs);
  const [studentType, setStudentType] = useState(STUDENT_TYPE_KID);
  const [studyProgram, setStudyProgram] = useState(COMUNICATION);
  const [typeTeacher1, setTypeTeacher1] = useState(null);
  const [typeTeacher2, setTypeTeacher2] = useState(null);
  const [teacherGroup1, setTeacherGroup1] = useState(TEACHER_GROUPS);
  const [teacherGroup2, setTeacherGroup2] = useState(TEACHER_GROUPS);
  const [applyAt, setApplyAt] = useState(null);

  const onChangeApplyAt = value => {
    setApplyAt(value);
  };
  useEffect(() => {
    const localTeacherGroup1 = [...teacherGroup1];
    const newTeacherGroup1 = localTeacherGroup1.map(element => {
      const localElement = { ...element };
      localElement.id = htmlIdGenerator('teacherGroup1')();
      return localElement;
    });
    setTeacherGroup1(newTeacherGroup1);
  }, []);
  useEffect(() => {
    const localTeacherGroup2 = [...teacherGroup2];
    const newTeacherGroup2 = localTeacherGroup2.map(element => {
      const localElement = { ...element };
      localElement.id = htmlIdGenerator('teacherGroup2')();
      return localElement;
    });
    setTeacherGroup2(newTeacherGroup2);
  }, []);

  useEffect(() => {
    if (studyProgram === IELTS) {
      const localTeacherGroup1 = [...teacherGroup1];
      const newTeacherGroup1 = localTeacherGroup1
        .filter(item => item.value !== TEACHER_PHIL)
        .map(item => item);
      setTeacherGroup1(newTeacherGroup1);
    } else {
      const localTeacherGroup1 = [...TEACHER_GROUPS];
      const newTeacherGroup1 = localTeacherGroup1.map(element => {
        const localElement = { ...element };
        localElement.id = htmlIdGenerator('teacherGroup1')();
        return localElement;
      });
      setTeacherGroup1(newTeacherGroup1);
    }
  }, [studyProgram]);

  useEffect(() => {
    if (studyProgram === IELTS) {
      const localTeacherGroup2 = [...teacherGroup2];
      const newTeacherGroup2 = localTeacherGroup2
        .filter(item => item.value !== TEACHER_PHIL)
        .map(item => item);
      setTeacherGroup2(newTeacherGroup2);
    } else {
      const localTeacherGroup2 = [...TEACHER_GROUPS];
      const newTeacherGroup2 = localTeacherGroup2.map(element => {
        const localElement = { ...element };
        localElement.id = htmlIdGenerator('teacherGroup2')();
        return localElement;
      });
      setTeacherGroup2(newTeacherGroup2);
    }
  }, [studyProgram]);
  return (
    <Page>
      <PageBody component="main">
        <PageContent>
          <PageContentBody>
            <Title className="text-2xl font-bold">
              <p>
                <FormattedMessage defaultMessage="Tạo bảng học phí" />
              </p>
            </Title>
            <Spacer />
            <div>
              <FlexGroup>
                <FlexItem>
                  <Title className="text-xl font-bold">
                    <p>
                      <FormattedMessage defaultMessage="1. Thông tin khoá học:" />
                    </p>
                  </Title>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={
                      <Title className="text-base font-bold">
                        <p>
                          <FormattedMessage defaultMessage="Học viên" />
                        </p>
                      </Title>
                    }
                    required
                    // isInvalid={!!errors?.request_id}
                    // error={errors?.request_id?.message}
                  >
                    <RadioGroup
                      options={STUDENT_TYPES}
                      idSelected={studentType}
                      onChange={id => {
                        setTypeTeacher1(null);
                        setTypeTeacher2(null);
                        setStudentType(id);
                      }}
                      name="student-type"
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={
                      <Title className="text-base font-bold">
                        <p>
                          <FormattedMessage defaultMessage="Chương trình học" />
                        </p>
                      </Title>
                    }
                    required
                    // isInvalid={!!errors?.request_id}
                    // error={errors?.request_id?.message}
                  >
                    <RadioGroup
                      options={STUDY_PROGRAMS}
                      idSelected={studyProgram}
                      onChange={id => {
                        setTypeTeacher1(null);
                        setTypeTeacher2(null);
                        setStudyProgram(id);
                      }}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup className="w-1/2">
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={
                      <Title className="text-base font-bold">
                        <p>
                          <FormattedMessage defaultMessage="Học phí áp dụng tới ngày (nếu có)" />
                        </p>
                      </Title>
                    }
                  >
                    <DatePicker
                      className="rounded-lg border border-gray-300 border-solid"
                      fullWidth
                      dateFormat="YYYY/MM/DD"
                      popoverPlacement="bottom-end"
                      placeholder="Chọn ngày"
                      selected={applyAt ? moment(applyAt) : null}
                      onChange={onChangeApplyAt}
                      //   isInvalid={!!errors?.time_start}
                      //   disabled={view}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
            </div>
            {/* end course infor */}
            <Spacer />
            <div>
              <FlexGroup>
                <FlexItem>
                  <Title className="text-xl font-bold">
                    <p>
                      <FormattedMessage defaultMessage="2. Nhóm giáo viên - gói giờ học:" />
                    </p>
                  </Title>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={
                      <Title className="text-base font-bold">
                        <p>
                          <FormattedMessage defaultMessage="Nhóm giáo viên 1" />
                        </p>
                      </Title>
                    }
                  >
                    <SelectCustomField
                      style={{ border: '1px solid #CDCFD1' }}
                      valueOfSelected={typeTeacher1?.id}
                      onSelect={selected => {
                        setTypeTeacher1(selected);
                      }}
                      placeholder="Chọn nhóm giáo viên"
                      options={teacherGroup1}
                      borderRadius={8}
                      onClear={() => setTypeTeacher1(null)}
                      // disabled={view}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={
                      <Title className="text-base font-bold">
                        <p>
                          <FormattedMessage defaultMessage="Nhóm giáo viên 2" />
                        </p>
                      </Title>
                    }
                  >
                    <SelectCustomField
                      style={{ border: '1px solid #CDCFD1' }}
                      // isInvalid={!!errors?.type_teacher}
                      valueOfSelected={typeTeacher2?.id}
                      onSelect={selected => {
                        setTypeTeacher2(selected);
                      }}
                      placeholder="Chọn nhóm giáo viên"
                      options={teacherGroup2}
                      borderRadius={8}
                      onClear={() => setTypeTeacher2(null)}
                      // disabled={view}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer />
              <PriceBox
                typeTeacher1={typeTeacher1}
                typeTeacher2={typeTeacher2}
                studyProgram={studyProgram}
                studentType={studentType}
                applyAt={applyAt}
              />
            </div>
            <FlexGroup justifyContent="flexEnd">
              <FlexItem grow={false}>
                <Button
                  // form={CREATE_TESTER_FORM_ID}
                  type="submit"
                  fill
                  // isLoading={createStudentMutation.isLoading}
                  onClick={e => {
                    e.preventDefault();
                    if (window.location.origin === 'http://localhost:3000') {
                      window.open(`${window.location.origin}/prices/export`);
                    } else {
                      window.open(`${window.location.origin}/v2/prices/export`);
                    }
                  }}
                >
                  <FormattedMessage defaultMessage="Xuất bảng học phí" />
                </Button>
              </FlexItem>
            </FlexGroup>
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default CalculatePrice;
