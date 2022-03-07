/* eslint-disable no-nested-ternary */
import {
  Button,
  ButtonEmpty,
  FieldText,
  FilePicker,
  FlexGroup,
  FlexItem,
  Flyout,
  FlyoutBody,
  FlyoutFooter,
  FlyoutHeader,
  Form,
  FormRow,
  HorizontalRule,
  Icon,
  notification,
  Spacer,
  Text,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { DownloadList } from 'components';
import { HAPPENING } from 'constants/session';
import { useToggle } from 'hooks';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  HomeworkFile,
  Session,
  useConfirmSession,
  useDeleteHomeworkFile,
  useRetrieveSessionContent,
  useSendHomeworkFile,
  useUpdateContent,
} from 'services';
import * as yup from 'yup';
import { TEACHER_CONFIRMED_YES } from '../constants';

interface IFormData {
  idParam: Number;
  title: string;
  vocabularyContent: string;
  studentAttitude: string;
  grammarContent: string;
  homeworkContent: string;
  homeworkFile: string;
  homeworkResult: string;
}
export type ConfirmSessionProps = {
  session: Session;
  view: boolean;
  allowSubmit: boolean;
  onReload: (session: Session) => void;
};
export const CONFIRM_SESSION_FORM_ID = 'CONFIRM_SESSION_FORM_ID';

const ConfirmSession: React.FC<ConfirmSessionProps> = ({
  session,
  view,
  allowSubmit,
  onReload,
}) => {
  const { isVisiable, toggle, close } = useToggle();
  const intl = useIntl();
  const { data } = useRetrieveSessionContent(
    { id: session.id },
    {
      enabled: isVisiable && session.issueTexts?.length > 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  );

  const sendingHomework = useSendHomeworkFile({
    onSuccess: () => {
      notification.success({
        title: <FormattedMessage defaultMessage="Upload file success" />,
      });
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Upload file failed" />,
      });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      title: data?.data?.title ?? '',
      vocabularyContent: data?.data?.vocabulary ?? '',
      studentAttitude: data?.data?.studentAttitude ?? '',
      grammarContent: data?.data?.grammar ?? '',
      homeworkContent: data?.data?.homework ?? '',
      // homeworkReferenceLink: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        title: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
        vocabularyContent: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
        studentAttitude: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
        grammarContent: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
      }),
    ),
  });
  useEffect(() => {
    reset({
      title: data?.data.title ?? '',
      vocabularyContent: data?.data.vocabulary ?? '',
      studentAttitude: data?.data.studentAttitude ?? '',
      grammarContent: data?.data.grammar ?? '',
      homeworkContent: data?.data.homework ?? '',
    });
  }, [data]);
  const deleteHomeworkFileMutation = useDeleteHomeworkFile({});
  const deleteFileHandle = (file: HomeworkFile) => {
    const indices: number[] = [];
    const index = data?.data.homeworkUrl.findIndex(item => item === file);
    if (index !== -1 && index !== undefined) {
      indices.push(index);
    }
    if (indices.length > 0) {
      deleteHomeworkFileMutation.mutate({
        id: session.id,
        courseId: session.course_id,
        indices,
      });
    }
  };
  const confirmSession = useConfirmSession({
    onSuccess: dataRes => {
      notification.success({
        title: <FormattedMessage defaultMessage="Confirm session success" />,
      });
      onReload(dataRes?.data?.session);
      close();
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: <FormattedMessage defaultMessage="Confirm session failed" />,
        text: `${mesError}`,
      });
    },
  });
  const { mutate, isLoading } = useUpdateContent({
    onSuccess: () => {
      confirmSession.mutate({ id: session.id, courseId: session.course_id });
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;
      notification.error({
        title: <FormattedMessage defaultMessage="Update content failed" />,
        text: `${mesError}`,
      });
    },
  });

  const onSubmit = (formData: IFormData) => {
    if (!isDirty) {
      notification.error({
        title: <FormattedMessage defaultMessage="You didn't make any change" />,
      });
      return;
    }
    mutate({
      id: session.id,
      courseId: session.course_id,
      ...formData,
    });
  };
  return (
    <>
      <>
        {/* if pass condition then display */}
        {session?.teacherConfirmed === TEACHER_CONFIRMED_YES &&
          session?.vocabulary &&
          session?.studentNote &&
          session?.title &&
          session?.grammar && (
            <ButtonEmpty
              onClick={() => toggle()}
              className="h-6"
              // iconType="checkInCircleFilled"
              color="text"
            >
              <Icon type="checkInCircleFilled" className="mr-2" />
              <span>Confirmed</span>
            </ButtonEmpty>
          )}
        {session?.happenedStatus === HAPPENING &&
          session?.teacherConfirmed !== TEACHER_CONFIRMED_YES && (
            <ButtonEmpty onClick={() => toggle()} className="h-6">
              Confirm session
            </ButtonEmpty>
          )}
        {session?.testRequired && (
          <Text className="text-center">
            <p>{`${session?.testDuration}th-hour TEST`}</p>
          </Text>
        )}
      </>

      {isVisiable && (
        <Flyout style={{ width: '526px' }} ownFocus onClose={() => close()}>
          <FlyoutHeader>
            <Title size="m">
              <h2>Session content</h2>
            </Title>
          </FlyoutHeader>
          <FlyoutBody>
            <Form
              id={CONFIRM_SESSION_FORM_ID}
              component="form"
              onSubmit={handleSubmit(dataForm => onSubmit(dataForm))}
            >
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Title" />}
                    isInvalid={!!errors.title}
                    error={errors.title?.message}
                    required
                  >
                    <Controller
                      name="title"
                      control={control}
                      render={({ field: { ref, ...fieldRest } }) => (
                        <FieldText
                          inputRef={ref}
                          {...fieldRest}
                          isInvalid={!!errors.title}
                          required
                          fullWidth
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Title',
                          })}
                          disabled={view}
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
                    label={<FormattedMessage defaultMessage="Vocabulary" />}
                    isInvalid={!!errors.vocabularyContent}
                    error={errors.vocabularyContent?.message}
                    required
                  >
                    <Controller
                      name="vocabularyContent"
                      control={control}
                      render={({ field: { ref, ...fieldRest } }) => (
                        <TextArea
                          className="rounded-lg"
                          rows={2}
                          inputRef={ref}
                          {...fieldRest}
                          required
                          isInvalid={!!errors.vocabularyContent}
                          fullWidth
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Vocabulary',
                          })}
                          disabled={view}
                        />
                      )}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    required
                    fullWidth
                    isInvalid={!!errors.grammarContent}
                    error={errors.grammarContent?.message}
                    label={<FormattedMessage defaultMessage="Grammar" />}
                  >
                    <Controller
                      name="grammarContent"
                      control={control}
                      render={({ field: { ref, value, ...fieldRest } }) => (
                        <TextArea
                          rows={2}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Grammar',
                          })}
                          required
                          fullWidth
                          inputRef={ref}
                          {...fieldRest}
                          isInvalid={!!errors.grammarContent}
                          disabled={view}
                        />
                      )}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    required
                    fullWidth
                    label={
                      <FormattedMessage defaultMessage="Note for students" />
                    }
                    isInvalid={!!errors.studentAttitude}
                    error={errors.studentAttitude?.message}
                  >
                    <Controller
                      name="studentAttitude"
                      control={control}
                      render={({ field: { ref, value, ...fieldRest } }) => (
                        <TextArea
                          rows={2}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Note for students',
                          })}
                          required
                          inputRef={ref}
                          {...fieldRest}
                          isInvalid={!!errors.studentAttitude}
                          fullWidth
                          disabled={view}
                        />
                      )}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer />
              <Spacer />
              <Title>
                <h2>
                  <FormattedMessage defaultMessage="Homework" />
                </h2>
              </Title>
              <HorizontalRule className="mt-4" />
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Content" />}
                  >
                    <Controller
                      name="homeworkContent"
                      control={control}
                      render={({ field: { ref, ...fieldRest } }) => (
                        <TextArea
                          rows={2}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Content',
                          })}
                          // required
                          fullWidth
                          inputRef={ref}
                          {...fieldRest}
                          disabled={view}
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
                    label={<FormattedMessage defaultMessage="Attachment" />}
                  >
                    <FilePicker
                      // eslint-disable-next-line react/jsx-curly-brace-presence
                      display={'large'}
                      compressed
                      multiple
                      initialPromptText={<p>Upload files</p>}
                      fullWidth
                      onChange={files => {
                        if (files && files[0]) {
                          const formData = new FormData();
                          formData.append('attachment', files[0]);
                          sendingHomework.mutate({
                            id: session.id,
                            courseId: session.course_id,
                            formData,
                          });
                        }
                      }}
                      isLoading={sendingHomework.isLoading}
                      disabled={view}
                    />
                  </FormRow>
                  <Text color="subdued" style={{ fontSize: '14px' }}>
                    <p>Max size: 10 MB (Type: pdf, jpg, png, word, ppt)</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
              <Spacer />
              <FlexGroup>
                <FlexItem>
                  <DownloadList
                    deleteHandler={deleteFileHandle}
                    data={data?.data.homeworkUrl ?? []}
                  />
                </FlexItem>
              </FlexGroup>
            </Form>
          </FlyoutBody>
          <FlyoutFooter style={{ backgroundColor: '#fff' }}>
            {allowSubmit ? (
              <>
                <FlexGroup justifyContent="spaceBetween">
                  <FlexItem grow={false}>
                    <ButtonEmpty onClick={() => close()}>Cancel</ButtonEmpty>
                  </FlexItem>
                  <FlexItem grow={false}>
                    <Button
                      fill
                      type="submit"
                      form={CONFIRM_SESSION_FORM_ID}
                      isLoading={isLoading || false}
                    >
                      Confirm
                    </Button>
                  </FlexItem>
                </FlexGroup>
              </>
            ) : (
              <>
                <FlexGroup justifyContent="flexStart">
                  <FlexItem grow={false}>
                    <ButtonEmpty onClick={() => close()}>Close</ButtonEmpty>
                  </FlexItem>
                </FlexGroup>
              </>
            )}
          </FlyoutFooter>
        </Flyout>
      )}
    </>
  );
};

export default ConfirmSession;
