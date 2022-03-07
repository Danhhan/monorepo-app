import { FormattedMessage, useIntl } from 'react-intl';
import {
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  HorizontalRule,
  TextArea,
  Title,
  FilePicker,
  Spacer,
  FieldText,
} from '@antoree/ant-ui';
import { Controller, useForm } from 'react-hook-form';

import {
  useRetrieveSessionById,
  useSendHomeworkResultFile,
  useDeleteHomeworkFile,
} from 'services/session';

import { DownloadList } from 'components/DownloadList';

export type FeedbackFormProps = {
  id: number;
  courseId: string | number;
};

interface IFormData {
  title: string;
  vocabularyContent: string;
  studentAttitude: string;
  grammarContent: string;
  homeworkContent: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ id, courseId }) => {
  const intl = useIntl();

  const { data } = useRetrieveSessionById({ id }, { suspense: true });

  const { mutate, isLoading } = useSendHomeworkResultFile();

  const { control } = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      title: data?.data.title,
      vocabularyContent: data?.data.vocabulary,
      studentAttitude: data?.data.studentAttitude,
      grammarContent: data?.data.grammar,
      homeworkContent: data?.data.homework,
    },
  });

  const deleteHomeworkFileMutation = useDeleteHomeworkFile();

  const onFileChange = (files: FileList | null) => {
    if (files?.[0]) {
      const formData = new FormData();
      formData.append('attachment', files[0]);
      mutate({ formData, id, courseId });
    }
  };

  const deleteFileHandle = (url?: string) => {
    if (url) {
      const urls =
        data?.data.homeworkResultUrl
          .filter(file => file.url !== url)
          .map(file => file.url) ?? [];

      deleteHomeworkFileMutation.mutate({
        id,
        courseId,
        urls,
      });
    }
  };

  return (
    <Form component="form">
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="Session Feedback" />
        </h2>
      </Title>
      <HorizontalRule margin="s" />
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Session title" />}
          >
            <Controller
              name="vocabularyContent"
              control={control}
              render={({ field: { ref, ...fieldRest } }) => (
                <FieldText
                  compressed
                  readOnly
                  inputRef={ref}
                  {...fieldRest}
                  fullWidth
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type title of session',
                  })}
                />
              )}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Vocabulary Content" />}
          >
            <Controller
              name="vocabularyContent"
              control={control}
              render={({ field: { ref, ...fieldRest } }) => (
                <TextArea
                  rows={2}
                  readOnly
                  inputRef={ref}
                  {...fieldRest}
                  fullWidth
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type vocabulary Content',
                  })}
                />
              )}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Student’s Attitude" />}
          >
            <Controller
              name="studentAttitude"
              control={control}
              render={({ field: { ref, value, ...fieldRest } }) => (
                <TextArea
                  rows={2}
                  readOnly
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type student’s attitude',
                  })}
                  inputRef={ref}
                  {...fieldRest}
                  fullWidth
                />
              )}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Grammar Content" />}
          >
            <Controller
              name="grammarContent"
              control={control}
              render={({ field: { ref, value, ...fieldRest } }) => (
                <TextArea
                  rows={2}
                  readOnly
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type grammar content',
                  })}
                  fullWidth
                  inputRef={ref}
                  {...fieldRest}
                />
              )}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <Spacer size="l" />
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="Homework" />
        </h2>
      </Title>
      <HorizontalRule margin="s" />
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Homework Content" />}
          >
            <Controller
              name="homeworkContent"
              control={control}
              render={({ field: { ref, ...fieldRest } }) => (
                <TextArea
                  rows={2}
                  readOnly
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Type homework content',
                  })}
                  fullWidth
                  inputRef={ref}
                  {...fieldRest}
                />
              )}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Homework Result" />}
          >
            <FilePicker
              display="default"
              compressed
              onChange={onFileChange}
              fullWidth
              isLoading={isLoading}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <Spacer size="m" />
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Homework Attachment" />}
          >
            <DownloadList
              // deleteHandler={deleteFileHandle}
              data={data?.data.homeworkUrl ?? []}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={
              <FormattedMessage defaultMessage="Homework Result Attachment" />
            }
          >
            <DownloadList
              deleteHandler={deleteFileHandle}
              data={data?.data?.homeworkResultUrl ?? []}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
    </Form>
  );
};

export default FeedbackForm;
