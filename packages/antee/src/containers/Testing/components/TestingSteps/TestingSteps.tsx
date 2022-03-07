import {
  AntoreeCustomizeLoading,
  BottomBar,
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Icon,
  PageContent,
  Progress,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router';
import { StatusUserExplain, useRetrieveStatusUser } from 'services/user';
import { useAuth } from 'services/auth/contexts';
import { isMobile, isIPad13, isDesktop } from 'react-device-detect';
import { Link } from 'react-router-dom';
import styles from './TesttingStep.module.scss';

import {
  StudyProgram,
  TestingInfoForm,
  TestingTeacherSelector,
} from './components';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const TestingSteps: React.FC<{}> = () => {
  const [customAvailable, setCustomAvailable] = useState();
  const history = useHistory();
  const query = useQuery();
  const stepv = query.get('step');
  const { isAuthenticated } = useAuth();

  const { data, isLoading, isFetching } = useRetrieveStatusUser({
    refetchOnWindowFocus: false,
    cacheTime: 0,
    onSuccess: dataSuccess => {
      if (dataSuccess?.data?.status) {
        const statusTabFinded = StatusUserExplain.find(
          item => item.value === dataSuccess?.data?.status,
        );
        if (statusTabFinded) {
          //   setActiveStep(statusTabFinded?.tab || 0);
        } else {
          window.location.href = '/home';
        }
      }
    },
    // onError: err => {
    //   const mesError = err?.response?.data?.errors[0]?.message;
    //   // const errCode = err?.response?.status;

    //   notification.error({
    //     title: <FormattedMessage defaultMessage="Error!" />,
    //     text: mesError || (
    //       <FormattedMessage defaultMessage="Please contact for help!" />
    //     ),
    //   });
    // },
  });
  const stepvalue = sessionStorage.getItem('stepsave');

  // eslint-disable-next-line radix
  const step = stepvalue ? parseInt(stepvalue) : null;
  const [activeStep, setActiveStep] = useState(
    stepv === '2' && isAuthenticated ? 2 : 0,
  );
  const [stepLoading, setStepLoading] = useState(false);

  const handleSuccessInfoBasic = (value: any) => {
    setCustomAvailable(value);
  };

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
      text: <FormattedMessage defaultMessage="Study program" />,
      onClick: () => {
        if (activeStep < 0) {
          return;
        }
        setActiveStep(0);
      },
      style: activeStep >= 0 ? activeStyle : disabledStyle,
      className: 'customClass',
    },
    {
      text: <FormattedMessage defaultMessage="Study goal" />,
      style: activeStep >= 1 ? activeStyle : disabledStyle,
      onClick: () => {
        if (activeStep < 1) {
          return;
        }
        setActiveStep(1);
      },
    },
    {
      text: <FormattedMessage defaultMessage="Book Teacher" />,
      style: activeStep >= 2 ? activeStyle : disabledStyle,
      onClick: () => {
        if (activeStep < 2) {
          return;
        }
        setActiveStep(2);
      },
    },
    {
      text: <FormattedMessage defaultMessage="Join Session" />,
      href: '#',
      style: activeStep >= 3 ? activeStyle : disabledStyle,
      onClick: () => {
        if (activeStep < 2) {
          return;
        }
        setActiveStep(3);
      },
    },
  ];

  const { height } = useWindowDimensions();

  const steps: React.MutableRefObject<SubmitStudentInfo | undefined>[] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  return (
    <>
      {isLoading || isFetching ? (
        <FlexGroup>
          <div className="w-full h-full flex justify-center items-center flex-col">
            <AntoreeCustomizeLoading />
          </div>
        </FlexGroup>
      ) : (
        <>
          <PageContent
            hasBorder={false}
            style={{
              border: 0,

              backgroundColor: activeStep === 2 ? '#F5F7FA' : 'white',
            }}
          >
            <FlexGroup
              direction={isDesktop ? 'column' : 'rowReverse'}
              className="eui-fullHeight"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Spacer size="xxl" /> */}
              {activeStep === 0 && <StudyProgram ref={steps[0]} />}
              {activeStep === 1 && (
                <TestingInfoForm
                  handleSuccess={handleSuccessInfoBasic}
                  ref={steps[1]}
                />
              )}
              {activeStep === 2 && (
                <>
                  {isDesktop ? (
                    <TestingTeacherSelector
                      successHandle={() => {
                        history.push('/testing');
                      }}
                      customAvailable={customAvailable}
                      ref={steps[2]}
                    />
                  ) : (
                    <div>
                      <p
                        style={{
                          color: 'green',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}
                      >
                        Tính năng chọn giáo viên trên mobile đang được xây dựng,
                        trong lúc chờ đợi, bạn có thể tải ứng dụng Antoree của
                        chúng tôi trên{' '}
                        <span style={{ color: 'black' }}>Google Play </span>và
                        <span style={{ color: 'black' }}> Apple Store</span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </FlexGroup>
          </PageContent>
          <BottomBar
            style={{ background: 'white', boxShadow: 'none', padding: 0 }}
          >
            <Progress
              value={activeStep + 1}
              max={4}
              size="xs"
              color="primary"
            />
            <Spacer />
            <FlexGroup
              justifyContent="spaceEvenly"
              direction={isDesktop ? 'column' : 'row'}
              alignItems="center"
              wrap
              className={styles.ButtonBottombar}
              style={{ maxHeight: 100 }}
            >
              <FlexItem grow={false}>
                <ButtonEmpty
                  color="primary"
                  onClick={() => {
                    if (activeStep === 0) {
                      history.goBack();
                    } else if (steps?.[activeStep]?.current) {
                      setStepLoading(true);
                      steps[activeStep].current?.onConfirm?.(() => {
                        setActiveStep(activeStep - 1);
                        setStepLoading(false);
                      });
                    }
                  }}
                >
                  <>
                    <Icon type="arrowLeft" size="m" />
                    Quay lại
                  </>
                </ButtonEmpty>
              </FlexItem>
              <FlexItem grow={false}>
                {activeStep !== 2 ? (
                  <Button
                    style={{ marginTop: '10px' }}
                    fill
                    color="primary"
                    onClick={() => {
                      if (steps?.[activeStep]?.current) {
                        setStepLoading(true);
                        steps[activeStep].current?.onConfirm?.(() => {
                          setActiveStep(activeStep + 1);
                          setStepLoading(false);
                        });
                      }
                    }}
                    className="mx-auto"
                    isLoading={isLoading || stepLoading}
                  >
                    <FormattedMessage defaultMessage="Tiếp tục" />
                  </Button>
                ) : (
                  <FlexItem grow={false}>
                    <Text color="black" style={{ marginTop: '10px' }}>
                      <p>(Chọn giáo viên và đặt lịch)</p>
                    </Text>
                  </FlexItem>
                )}
              </FlexItem>
            </FlexGroup>
            {/* <Spacer /> */}
          </BottomBar>
        </>
      )}
    </>
  );
};

interface SubmitStudentInfo {
  onConfirm: (onSuccess: () => void) => void;
}

export default TestingSteps;
export type { SubmitStudentInfo };
