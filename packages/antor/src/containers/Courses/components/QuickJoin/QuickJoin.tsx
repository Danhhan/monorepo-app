import {
  Button,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormControlLayout,
  FormRow,
  Icon,
  notification,
  PageContentBody,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
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
      whoami: 'teacher',
      source: 'web',
    });
  };

  return (
    <>
      <PageContentBody>
        <Form component="form" onSubmit={handleSubmit(onSubmit)}>
          <FlexGroup gutterSize="none" responsive={false}>
            <FlexItem grow={false}>
              <FormRow
                isInvalid={!!errors.courseId}
                error={errors.courseId?.message}
              >
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field: { ref, ...fieldRest } }) => (
                    <FormControlLayout
                      style={{ borderRadius: 8 }}
                      append={
                        <Button
                          type="submit"
                          fill
                          style={{
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                          }}
                          minWidth={81}
                        >
                          Join
                          <Icon
                            style={{ backgroundColor: 'transparent' }}
                            type="sortRight"
                          />
                        </Button>
                      }
                    >
                      <FieldText
                        style={{ width: '446px', boxShadow: 'none' }}
                        isInvalid={!!errors.courseId}
                        fullWidth
                        placeholder={intl.formatMessage({
                          defaultMessage:
                            'Quick join with course ID (Ex: 231413)',
                        })}
                        inputRef={ref}
                        {...fieldRest}
                      />
                    </FormControlLayout>
                  )}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
        </Form>
      </PageContentBody>
    </>
  );
};

export default QuickJoin;
