import {
  Page,
  PageBody,
  PageContent,
  PageHeader,
  PageContentBody,
  Link,
  FlexGroup,
  FlexItem,
  Title,
  ButtonIcon,
  HorizontalRule,
  FormRow,
  FieldText,
  TextArea,
  notification,
  Button,
  Form,
  Spacer,
} from '@antoree/ant-ui';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useBreadcrumbs } from 'hooks';
import { useQuery, useMutation } from 'react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  getTrialCourseById,
  GET_TRIAL_COURSE_BY_ID,
  updateCourseNote,
} from 'services/trialCourse';
import { STATUS, GENDER } from 'configs/app.constants';

import ErrorStatus from './ErrorConstant';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Trial courses" />,
    path: '/trial-courses',
  },
  {
    text: <FormattedMessage defaultMessage="Trial course detail" />,
  },
];

function TestingCourseDetail() {
  const intl = useIntl();

  useBreadcrumbs(breadcrumbs);

  const { id } = useParams();

  const { data, remove } = useQuery(
    [GET_TRIAL_COURSE_BY_ID(id)],
    () => getTrialCourseById(id),
    {
      suspense: true,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onSuccess: resData => {},
    },
  );

  const {
    control,
    handleSubmit,
    errors,
    formState: { isDirty },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      note: data?.data?.note_list[0]?.note,
    },

    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().nullable(),
      }),
    ),
  });

  const updateNoteMutation = useMutation(updateCourseNote, {
    onSuccess: async (resData, para) => {
      remove();
      reset(
        {
          note: para.noteText,
        },
        { keepDirty: false },
      );
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Update Note successfully!" />,
      });
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;
      const errorFinded = ErrorStatus.find(
        errItem => errItem.code === err?.response?.status,
      );

      notification.error({
        title: 'Failure',
        text: errorFinded?.message || mesError || (
          <FormattedMessage defaultMessage="Update failure!" />
        ),
      });
    },
  });

  const updateNoteHandler = formData => {
    updateNoteMutation.mutate({
      courseId: id,
      noteId: data?.data?.note_list[0]?.id,
      noteText: formData.note,
    });
  };

  const UPDATE_COURSE_FORM_ID = 'course-update-form-unique';

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Link to="/trial-courses">
                  <ButtonIcon color="text" size="m" iconType="arrowLeft" />
                </Link>
              </FlexItem>

              <FlexItem grow={false}>
                <Title>
                  <h2>
                    <FormattedMessage
                      defaultMessage="Detail of Courses #{id}"
                      values={{ id }}
                    />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
        />
        <PageContent>
          <PageContentBody>
            <Form
              component="form"
              id={UPDATE_COURSE_FORM_ID}
              onSubmit={handleSubmit(updateNoteHandler)}
            >
              <FlexGroup>
                <FlexItem>
                  <Title>
                    <h2>
                      <FormattedMessage defaultMessage="Course Information" />
                    </h2>
                  </Title>
                </FlexItem>
              </FlexGroup>

              <HorizontalRule />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: "Course's ID" }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.id}
                      readOnly
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: "Course's ID" }),
                      )}
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Testing Date' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={
                        data?.data?.test_time
                          ? intl.formatDate(data?.data?.test_time, {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hourCycle: 'h23',
                            })
                          : null
                      }
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Testing Date' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Status' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={
                        STATUS.find(({ value }) => value === data?.data?.status)
                          ?.label
                          ? intl.formatMessage(
                              STATUS.find(
                                ({ value }) => value === data?.data?.status,
                              )?.label,
                            )
                          : null
                      }
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Status' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              <Spacer />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Note from Sales',
                    })}
                    isInvalid={!!errors?.note}
                    error={errors?.note?.message}
                    fullWidth
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <TextArea
                          value={value}
                          onChange={onChange}
                          rows={3}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Note from Sales',
                          })}
                          // readOnly
                          fullWidth
                        />
                      )}
                      name="note"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              {isDirty && (
                <>
                  <Spacer size="s" />
                  <Button
                    type="submit"
                    form={UPDATE_COURSE_FORM_ID}
                    fill
                    size="s"
                    color="secondary"
                    isLoading={updateNoteMutation.isLoading}
                  >
                    <FormattedMessage defaultMessage="Save Changes" />
                  </Button>
                  <Button
                    className="ml-2"
                    fill
                    size="s"
                    color="danger"
                    onClick={() =>
                      reset(
                        {
                          note: data?.data?.note_list
                            ? data?.data?.note_list[0]?.note || ''
                            : '',
                        },
                        { keepDirty: false },
                      )
                    }
                    isLoading={updateNoteMutation.isLoading}
                  >
                    <FormattedMessage defaultMessage="Discard" />
                  </Button>
                </>
              )}

              <Spacer size="xxl" />

              <Title>
                <h2>
                  <FormattedMessage defaultMessage="Student Information" />
                </h2>
              </Title>

              <HorizontalRule />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: "User's ID" }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.student?.id}
                      readOnly
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: "User's ID" }),
                      )}
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'First Name' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.student?.first_name}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'First name' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Last Name' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.student?.last_name}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Last Name' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              <Spacer />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Phone Number' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.student?.phone}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Phone Number' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Email Address' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.student?.email}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Email Address' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Gender' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={
                        data?.data?.student?.gender
                          ? intl.formatMessage(
                              GENDER.find(
                                ({ value }) =>
                                  value === data.data.student.gender,
                              ).message,
                            )
                          : null
                      }
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Gender' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              <Spacer size="xxl" />

              <FlexGroup>
                <FlexItem>
                  <Title>
                    <h2>
                      <FormattedMessage defaultMessage="Teacher Information" />
                    </h2>
                  </Title>
                </FlexItem>
              </FlexGroup>

              <HorizontalRule />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: "Tester's ID" }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.tester?.id}
                      readOnly
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: "User's ID" }),
                      )}
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'First Name' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.tester?.first_name}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'First name' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Last Name' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.tester?.last_name}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Last Name' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              <Spacer />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Phone Number' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.tester?.phone}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Phone Number' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Email Address' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.tester?.email}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Email Address' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem />
              </FlexGroup>

              <Spacer size="xxl" />

              <FlexGroup>
                <FlexItem>
                  <Title>
                    <h2>
                      <FormattedMessage defaultMessage="Sales Information" />
                    </h2>
                  </Title>
                </FlexItem>
              </FlexGroup>

              <HorizontalRule />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Sales ID' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.sale?.id}
                      readOnly
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: "User's ID" }),
                      )}
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'First Name' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.sale?.first_name}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'First name' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Last Name' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.sale?.last_name}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Last Name' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>

              <Spacer />

              <FlexGroup>
                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Phone Number' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.sale?.phone}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Phone Number' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem>
                  <FormRow
                    label={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Email Address' }),
                    )}
                    fullWidth
                  >
                    <FieldText
                      value={data?.data?.sale?.email}
                      placeholder={intl.formatMessage(
                        defineMessage({ defaultMessage: 'Email Address' }),
                      )}
                      readOnly
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem />
              </FlexGroup>

              <Spacer size="xxl" />
            </Form>
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default TestingCourseDetail;
