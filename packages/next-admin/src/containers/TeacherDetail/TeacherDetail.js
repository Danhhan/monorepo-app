import {
  Page,
  PageBody,
  PageContent,
  PageHeader,
  PageContentBody,
  Link,
  FlexGroup,
  FlexGrid,
  FlexItem,
  Title,
  notification,
  ButtonIcon,
  HorizontalRule,
  FormRow,
  FieldText,
  Spacer,
  InMemoryTable,
  BasicTable,
  Health,
  TabbedContent,
  SuperSelect,
} from '@antoree/ant-ui';
import {
  useIntl,
  defineMessage,
  FormattedMessage,
  FormattedDate,
} from 'react-intl';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { downloadURI } from 'helpers';
import { useState } from 'react';
import {
  getTesterById,
  GET_TESTER_BY_ID,
  getSessionsByTesterId,
  GET_SESSIONS_BY_TESTER_ID,
  updateTesterId,
} from 'services/tester';
import { GENDER, STATUS, TESTER_TYPES } from './constants';
import Availabletime from './AvailableTimeTable';

function TeacherDetail() {
  const intl = useIntl();

  const { id } = useParams();

  const { data, remove } = useQuery(
    [GET_TESTER_BY_ID(id)],
    () => getTesterById(id),
    {
      suspense: true,
      retry: 1,
    },
  );

  const [isExcellentedTester, setIsExcellentedTester] = useState(
    data?.data?.isExcellented,
  );

  const sessionsQuery = useQuery(
    [GET_SESSIONS_BY_TESTER_ID(id)],
    () => getSessionsByTesterId(id),
    { retry: 1 },
  );

  const updateTesterIdMutation = useMutation(updateTesterId, {
    onSuccess: () => {
      remove();
      notification.success({
        title: <FormattedMessage defaultMessage="Successfully" />,
        text: <FormattedMessage defaultMessage="Update successfully!" />,
      });
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Failure" />,
        text: <FormattedMessage defaultMessage="Update failure!" />,
      });
    },
  });

  const handleChange = () => {
    updateTesterIdMutation.mutate({
      testerId: id,
      isExcellented: isExcellentedTester,
    });
  };

  const tabs = [
    {
      id: 'Monday',
      name: <FormattedMessage defaultMessage="Monday" />,
      content: <Availabletime dayOfWeeks={0} testerId={id} />,
    },
    {
      id: 'Tuesday',
      name: <FormattedMessage defaultMessage="Tuesday" />,
      content: <Availabletime dayOfWeeks={1} testerId={id} />,
    },
    {
      id: 'Wednesday',
      name: <FormattedMessage defaultMessage="Wednesday" />,
      content: <Availabletime dayOfWeeks={2} testerId={id} />,
    },
    {
      id: 'Thurday',
      name: <FormattedMessage defaultMessage="Thurday" />,
      content: <Availabletime dayOfWeeks={3} testerId={id} />,
    },
    {
      id: 'Friday',
      name: <FormattedMessage defaultMessage="Friday" />,
      content: <Availabletime dayOfWeeks={4} testerId={id} />,
    },
    {
      id: 'Saturday',
      name: <FormattedMessage defaultMessage="Saturday" />,
      content: <Availabletime dayOfWeeks={5} testerId={id} />,
    },
    {
      id: 'Sunday',
      name: <FormattedMessage defaultMessage="Sunday" />,
      content: <Availabletime dayOfWeeks={6} testerId={id} />,
    },
  ];

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <ButtonIcon
                  onClick={() => window.history.back()}
                  color="text"
                  size="m"
                  iconType="arrowLeft"
                />
              </FlexItem>

              <FlexItem grow={false}>
                <Title>
                  <h2>
                    <FormattedMessage
                      defaultMessage="Detail of Teacher #{id}"
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
            <Title>
              <h2>
                <FormattedMessage defaultMessage="Persional Information" />
              </h2>
            </Title>

            <HorizontalRule />

            <FlexGrid columns={3}>
              <FlexItem>
                <FormRow
                  label={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Tester ID' }),
                  )}
                  fullWidth
                >
                  <FieldText value={data?.data?.id} readOnly fullWidth />
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
                    value={data?.data?.first_name}
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
                    value={data?.data?.last_name}
                    placeholder={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Last name' }),
                    )}
                    readOnly
                    fullWidth
                  />
                </FormRow>
              </FlexItem>

              <Spacer />
              <FlexItem>
                <FormRow
                  label={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Phone Number' }),
                  )}
                  fullWidth
                >
                  <FieldText
                    value={data?.data?.phone}
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
                    value={data?.data?.email}
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
                      data?.data?.gender
                        ? intl.formatMessage(
                            GENDER.find(
                              ({ value }) => value === data.data.gender,
                            ).label,
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
              <FlexItem>
                <FormRow
                  label={intl.formatMessage({
                    defaultMessage: 'Type',
                  })}
                  fullWidth
                >
                  <SuperSelect
                    fullWidth
                    placeholder="Type"
                    options={TESTER_TYPES.map(item => ({
                      value: item.value,
                      inputDisplay: item.label,
                    }))}
                    valueOfSelected={isExcellentedTester}
                    onChange={value => setIsExcellentedTester(value)}
                  />
                </FormRow>
                {data?.data?.isExcellented !== isExcellentedTester && (
                  <>
                    <Spacer size="s" />
                    <FlexGroup gutterSize="s">
                      <FlexItem grow={false}>
                        <ButtonIcon
                          iconType="check"
                          aria-label="confirm-change"
                          size="m"
                          display="fill"
                          onClick={handleChange}
                        />
                      </FlexItem>
                      <FlexItem grow={false}>
                        <ButtonIcon
                          color="danger"
                          iconType="cross"
                          aria-label="confirm-change"
                          size="m"
                          display="fill"
                          onClick={() =>
                            setIsExcellentedTester(data?.isExcellented || 0)
                          }
                        />
                      </FlexItem>
                    </FlexGroup>
                  </>
                )}
              </FlexItem>
            </FlexGrid>

            <Spacer size="xxl" />

            <Title>
              <h2>
                <FormattedMessage defaultMessage="Available Time" />
              </h2>
            </Title>

            <HorizontalRule />

            <TabbedContent tabs={tabs} />

            <Spacer size="xxl" />

            <Title>
              <h2>
                <FormattedMessage defaultMessage="Ongoing Courses" />
              </h2>
            </Title>

            <HorizontalRule />

            <InMemoryTable
              loading={sessionsQuery.isLoading}
              error={sessionsQuery.error}
              items={sessionsQuery?.data?.data ?? []}
              columns={[
                {
                  field: 'id',
                  name: 'Session ID',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'student.name',
                  name: 'Student',
                  render: (name, { student }) => (
                    <Link to={`/students/${student?.id}`}>{name}</Link>
                  ),
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'testTime',
                  name: 'Testing Time',
                  render: testTime =>
                    testTime ? (
                      <FormattedDate
                        value={moment(testTime, 'YYYY-MM-DD HH:mm:ss').toDate()}
                        year="numeric"
                        month="short"
                        day="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                        hourCycle="h23"
                      />
                    ) : null,
                  width: 180,
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'status',
                  name: <FormattedMessage defaultMessage="Status" />,
                  render: status => {
                    const matchedStatus = STATUS.find(
                      ({ value }) => value === status,
                    );

                    return matchedStatus ? (
                      <Health color={matchedStatus.color}>
                        {intl.formatMessage(matchedStatus.label)}
                      </Health>
                    ) : null;
                  },
                  truncateText: true,
                  textOnly: true,
                  width: 120,
                },
                {
                  field: 'videoUrl',
                  name: 'Video',
                  render: url =>
                    url ? (
                      <a
                        className="euiLink"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {url}
                      </a>
                    ) : null,
                  truncateText: true,
                  textOnly: true,
                },
              ]}
              pagination
            />

            <Spacer size="xxl" />

            <Title>
              <h2>
                <FormattedMessage defaultMessage="Degrees & Certifications" />
              </h2>
            </Title>

            <HorizontalRule />

            <BasicTable
              items={data?.data?.certification ?? []}
              columns={[
                {
                  field: 'name',
                  name: 'Certification',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'uploadTime',
                  name: 'Updated At',
                  render: uploadTime =>
                    uploadTime ? (
                      <FormattedDate
                        value={moment(
                          uploadTime,
                          'YYYY-MM-DD HH:mm:ss',
                        ).toDate()}
                        year="numeric"
                        month="short"
                        day="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                        hourCycle="h23"
                      />
                    ) : null,
                  truncateText: true,
                  textOnly: true,
                },
                {
                  name: 'Actions',
                  actions: [
                    {
                      name: 'View',
                      description: 'View this file',
                      type: 'icon',
                      icon: 'eye',
                      onClick: ({ file }) => {
                        if (file?.url) downloadURI(file.url, file?.name);
                      },
                    },
                  ],
                },
              ]}
            />
            <Spacer />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default TeacherDetail;
