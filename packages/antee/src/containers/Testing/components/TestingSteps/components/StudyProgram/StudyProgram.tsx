/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  FlexGroup,
  FlexItem,
  Icon,
  KeyPadMenuItem,
  LoadingSpinner,
  notification,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import AdultSelectImg from 'assets/images/adult-selection.png';
import ChildSelectImg from 'assets/images/child-selection.png';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'services/auth/contexts';
import {
  englishLocale,
  englishLocaleStatusPara,
  useLanguageContext,
  vietnameseLocaleStatusPara,
} from 'services/translation/context';
import {
  useRetrieveStudentInfo,
  useRetrieveUpdateStudentInfo,
} from 'services/user';
import { SubmitStudentInfo } from '../../TestingSteps';
import styles from './StudyProgram.module.scss';

export type StudyProgramProps = {
  customAvailable?: any;
  isLoading?: boolean;
};

const StudyProgram = forwardRef<
  SubmitStudentInfo | undefined,
  StudyProgramProps
>((props, ref) => {
  const { customAvailable, isLoading } = props;
  const { locale } = useLanguageContext();

  const { isAuthenticated } = useAuth();

  const [typeSelected, setTypeSelected] = useState('1');
  sessionStorage.setItem('studentType', typeSelected);
  const x = sessionStorage.getItem('studentType');
  const {
    // data: dataInfo,
    isLoading: getUserInfoLoading,
  } = useRetrieveStudentInfo(
    {
      localePara:
        locale === englishLocale
          ? englishLocaleStatusPara
          : vietnameseLocaleStatusPara,
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      onSuccess: dataSuccess => {
        setTypeSelected(dataSuccess?.data?.data?.userType?.toString());
      },
    },
  );

  const { mutate, isLoading: isLoadingUpdate } = useRetrieveUpdateStudentInfo();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useImperativeHandle(ref, () => ({
    onConfirm(onSuccess) {
      if (isAuthenticated) {
        mutate(
          {
            userType: typeSelected,
          },
          {
            onSuccess: dataSuccess => {
              storeStudent(typeSelected);
              onSuccess();
            },
            onError: err => {
              const mesError = err?.response?.data?.errors[0]?.message;
              // const errCode = err?.response?.status;

              notification.error({
                title: <FormattedMessage defaultMessage="Error!" />,
                text: mesError || (
                  <FormattedMessage defaultMessage="Update Info Failed!" />
                ),
              });
            },
          },
        );
      } else {
        storeStudent(typeSelected);
        onSuccess();
      }
    },
  }));

  const storeStudent = (value: string) => {
    sessionStorage.setItem('studentType', value);
  };

  return isLoading || getUserInfoLoading ? (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <LoadingSpinner size="xl" />
      <Title>
        <p>Loading...</p>
      </Title>
    </div>
  ) : (
    <>
      {/* <FlexItem> */}
      <FlexGroup
        direction="row"
        justifyContent="spaceEvenly"
        alignItems="center"
        className={styles.StudyBody}
      >
        <FlexItem grow={false}>
          <KeyPadMenuItem
            checkable="single"
            name="userType"
            className={styles.bigRadio}
            id="1"
            label={
              <>
                <Title size="m">
                  <h3 className="font-semibold">Dành cho trẻ em</h3>
                </Title>
                <Text size="m" color="subdued">
                  Bằng quốc tế cho trẻ em, trải nghiệm học riêng cho trẻ,...{' '}
                </Text>
              </>
            }
            onChange={setTypeSelected}
            isSelected={typeSelected === '1'}

            // style={{ width: 448, height: 308 }}
          >
            <Icon type={ChildSelectImg} style={{ width: 223, height: 114 }} />
          </KeyPadMenuItem>
        </FlexItem>
        <FlexItem grow={false}>
          <KeyPadMenuItem
            checkable="single"
            name="userType"
            className={styles.bigRadio}
            id="2"
            label={
              <>
                <Title size="m">
                  <h3 className="font-semibold">
                    <FormattedMessage defaultMessage="Dành cho người lớn" />
                  </h3>
                </Title>
                <Text size="m" color="subdued">
                  <FormattedMessage defaultMessage="Chinh phục các bằng cấp quốc tế, hỗ trợ công việc,..." />
                </Text>
              </>
            }
            onChange={setTypeSelected}
            isSelected={typeSelected === '2'}
          >
            <Icon type={AdultSelectImg} style={{ width: 223, height: 114 }} />
          </KeyPadMenuItem>
        </FlexItem>
      </FlexGroup>
      {/* </FlexItem> */}

      <Spacer />
    </>
  );
});

export default StudyProgram;
