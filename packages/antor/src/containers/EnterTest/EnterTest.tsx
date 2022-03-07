import {
  Page,
  PageBody,
  PageContent,
  Title,
  FieldText,
  FlexGroup,
  FlexItem,
  Button,
  Icon,
  Form,
  FormRow,
  PageHeader,
  Spacer,
  notification,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LanguageSwitcher } from 'components';
import { useRetrieveRoomUrl } from 'hooks';
import textLogoImg from 'assets/images/text-logo.svg';
import { Link } from 'react-router-dom';
import { isAuthenticated } from 'helpers';
import styles from './EnterTest.module.scss';

const schema = yup.object().shape({
  courseId: yup
    .number()
    .typeError(() => (
      <FormattedMessage defaultMessage="Vui lòng nhập kí tự số" />
    ))
    .integer(() => (
      <FormattedMessage defaultMessage="Test ID phải là số nguyên dương" />
    ))
    .moreThan(0, () => (
      <FormattedMessage defaultMessage="Test ID phải là số nguyên dương" />
    ))
    .required(() => (
      <FormattedMessage defaultMessage="Vui lòng nhập Test ID" />
    )),
});

interface IFormData {
  courseId: string;
}

const EnterTest: React.FC<{}> = () => {
  const intl = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { courseId: undefined },
  });

  const { mutate, isLoading } = useRetrieveRoomUrl({
    onSuccess: ({ data }) => {
      window.open(data.vcUrl, '_blank');
    },
    onError: () => {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Không tìm thấy buổi kiểm tra" />
        ),
        text: (
          <FormattedMessage defaultMessage="Vui lòng kiểm tra lại Test ID hoặc liên hệ với tư vấn viên" />
        ),
      });
    },
  });

  const onSubmit = ({ courseId }: IFormData) => {
    mutate({
      courseId: parseInt(courseId, 10),
      whoami: 'teacher',
      source: 'web',
    });
  };

  return (
    <Page className="min-h-screen" paddingSize="none">
      <PageBody className={styles.pageBody}>
        <PageHeader
          pageTitle={<Icon size="original" type={textLogoImg} />}
          responsive
          paddingSize="l"
          rightSideItems={[
            isAuthenticated() ? (
              <Link to="/home">
                <Button fill iconType="home">
                  <FormattedMessage defaultMessage="Go to home" />
                </Button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <Button fill iconType="push">
                  <FormattedMessage defaultMessage="Sign in" />
                </Button>
              </Link>
            ),
            <LanguageSwitcher />,
          ]}
        />
        <PageContent
          color="transparent"
          verticalPosition="center"
          horizontalPosition="center"
          hasBorder={false}
          hasShadow={false}
        >
          <FlexGroup direction="column" className=" md:h-80">
            <FlexItem grow={false}>
              <Title size="l" className="text-white text-center">
                <h1>
                  <FormattedMessage defaultMessage="Tham gia buổi Testing" />
                </h1>
              </Title>
            </FlexItem>
            <FlexItem className="max-w-2xl" grow={false}>
              <Title className="text-white text-center">
                <p>
                  <FormattedMessage defaultMessage="Vui lòng nhập mã Test ID được cung cấp vào ô bên dưới để tham gia buổi kiểm tra cùng học viên" />
                </p>
              </Title>
            </FlexItem>
            <Spacer size="l" />
            <FlexItem>
              <Form component="form" onSubmit={handleSubmit(onSubmit)}>
                <FlexGroup
                  className="md:px-36"
                  justifyContent="center"
                  alignItems="flexStart"
                >
                  <FlexItem>
                    <FormRow
                      isInvalid={!!errors.courseId}
                      error={errors.courseId?.message}
                      fullWidth
                    >
                      <Controller
                        name="courseId"
                        control={control}
                        render={({ field: { ref, ...fieldRest } }) => (
                          <FieldText
                            isInvalid={!!errors.courseId}
                            className="border border-solid border-white rounded"
                            fullWidth
                            placeholder={intl.formatMessage({
                              defaultMessage: 'Test ID (Ví dụ: 32730)',
                            })}
                            inputRef={ref}
                            {...fieldRest}
                          />
                        )}
                      />
                    </FormRow>
                  </FlexItem>
                  <FlexItem grow={false}>
                    <Button
                      isLoading={isLoading}
                      aria-label="enter-test-btn"
                      type="submit"
                      fill
                      color="primary"
                      iconType="sortRight"
                      iconSide="right"
                      size="m"
                    >
                      <FormattedMessage defaultMessage="Tham gia" />
                    </Button>
                  </FlexItem>
                </FlexGroup>
              </Form>
            </FlexItem>
          </FlexGroup>
        </PageContent>
      </PageBody>
    </Page>
  );
};

export default EnterTest;
