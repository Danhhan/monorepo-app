import {
  FlexGroup,
  FlexItem,
  HeaderBreadcrumbs,
  AntoreeCustomizeLoading,
  notification,
  Page,
  PageBody,
  PageContent,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { TeacherSelector, TopTeachers } from 'components';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TEACHER_TRIAL_ROLE } from 'services/teachers';
import { CompleteTestCode, useRetrieveStatusUser } from 'services/user';
import CourseList from './CourseList';

export type TrialTeacherProps = {
  selectHandle?: Function;
};

const TrialTeacher: React.FC<TrialTeacherProps> = ({ selectHandle }) => {
  const { height } = useWindowDimensions();

  const { data, isLoading } = useRetrieveStatusUser({
    refetchOnWindowFocus: false,
    cacheTime: 0,
    retry: 1,
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;
      // const errCode = err?.response?.status;

      notification.error({
        title: <FormattedMessage defaultMessage="Error!" />,
        text: mesError || (
          <FormattedMessage defaultMessage="Please contact for help!" />
        ),
      });
    },
  });

  const [activeStep, setActiveStep] = useState(1);
  // this bool is used to check if the route is initially loaded
  // if it is, when navigate to step 2, check if there is a trial course. if there is none, navigate to step 0
  const [initial, setInitial] = useState(true);
  const activeStyle = {
    color: '#00c081',
    background: '#00c08126',
  };

  const disabledStyle = {
    color: '#5a606b',
    background: '#69707d33',
  };

  const breadcrumbs = [
    {
      text: <FormattedMessage defaultMessage="Booking" />,
      onClick: () => {
        if (activeStep < 0) {
          return;
        }
        setStep(0);
      },
      style: activeStep >= 0 ? activeStyle : disabledStyle,
      className: 'customClass',
    },
    {
      text: <FormattedMessage defaultMessage="Join Course" />,
      style: activeStep >= 1 ? activeStyle : disabledStyle,
      onClick: () => {
        // if (activeStep < 1) {
        //   return;
        // }
        setStep(1);
      },
    },
  ];

  const setStep = (step: number) => {
    setActiveStep(step);
    setInitial(false);
  };

  return (
    <Page
      paddingSize="none"
      style={{ minHeight: 'calc(100vh - 98px)', boxShadow: 'none' }}
    >
      <PageBody style={{ border: 'none' }}>
        <PageContent
          paddingSize="m"
          style={{ border: 'none', boxShadow: 'none' }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center justify-items-center py-10">
              <AntoreeCustomizeLoading />
            </div>
          ) : (
            <>
              <FlexGroup>
                <FlexItem grow={false}>
                  <Title>
                    <h2 className="font-semibold">
                      <FormattedMessage defaultMessage="Trial Course" />
                    </h2>
                  </Title>
                </FlexItem>
                <FlexItem className=" justify-center">
                  <HeaderBreadcrumbs
                    aria-label="Header breadcrumbs "
                    breadcrumbs={breadcrumbs}
                    className="flex-grow-0 block bg-white ml-0"
                  />
                </FlexItem>
              </FlexGroup>
              <Spacer />
              <Spacer />
              {activeStep === 0 && (
                <>
                  <TopTeachers
                    successHandle={() => setStep(1)}
                    role={TEACHER_TRIAL_ROLE}
                    // customAvailable={customAvailable}
                  />
                  <TeacherSelector
                    successHandle={() => setStep(1)}
                    isAcceptTrial={
                      (data?.data?.status || 1) >= CompleteTestCode
                    }
                    role={TEACHER_TRIAL_ROLE}
                  />
                </>
              )}
              {activeStep === 1 && (
                <CourseList
                  onCancelCourse={() => setStep(0)}
                  onFirstPageEmpty={() => {
                    if (initial) setStep(0);
                  }}
                  onSelectCourse={() => {}}
                  idSelected={0}
                  height={height}
                />
              )}
            </>
          )}
        </PageContent>
      </PageBody>
    </Page>
  );
};

export default TrialTeacher;
