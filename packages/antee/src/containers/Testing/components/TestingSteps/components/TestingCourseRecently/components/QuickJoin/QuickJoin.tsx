import {
  PageContentHeader,
  PageContentBody,
  Text,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  notification,
  PageContentHeaderSection,
  ButtonIcon,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRetrieveRoomUrlByCourseId } from 'services/videoCall';

import { schema } from './formSchema';

interface IFormData {
  courseId: string;
}

const QuickJoin: React.FC<{}> = () => {
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

  const { mutate, isLoading } = useRetrieveRoomUrlByCourseId({
    onSuccess: ({ data }) => {
      window.open(data.vcUrl, '_blank');
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Session not found" />,
      });
    },
  });

  const onSubmit = ({ courseId }: IFormData) => {
    mutate({
      courseId: parseInt(courseId, 10),
      whoami: 'student',
      source: 'web',
    });
  };

  return (
    <>
      <PageContentHeader>
        <PageContentHeaderSection>
          <Title>
            <h1>
              <FormattedMessage defaultMessage="Quick Join" />
            </h1>
          </Title>
          <Text size="s" color="text">
            <p>
              <FormattedMessage defaultMessage="Enter the course code provided in the box below to quickly enter the lesson with the teacher Antoree" />
            </p>
          </Text>
        </PageContentHeaderSection>
      </PageContentHeader>
      <PageContentBody>
        <Form component="form" onSubmit={handleSubmit(onSubmit)}>
          <FlexGroup gutterSize="s" responsive={false}>
            <FlexItem grow={false}>
              <FormRow
                className="w-64 md:w-96"
                isInvalid={!!errors.courseId}
                error={errors.courseId?.message}
              >
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field: { ref, ...fieldRest } }) => (
                    <FieldText
                      isInvalid={!!errors.courseId}
                      fullWidth
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Course ID (Example: 32730)',
                      })}
                      inputRef={ref}
                      {...fieldRest}
                    />
                  )}
                />
              </FormRow>
            </FlexItem>
            <FlexItem grow={false}>
              <ButtonIcon
                size="m"
                display="fill"
                type="submit"
                iconType="sortRight"
                iconSize="l"
                isDisabled={isLoading}
                aria-label="enter-test-btn"
              />
            </FlexItem>
          </FlexGroup>
        </Form>
      </PageContentBody>
    </>
  );
};

export default QuickJoin;
