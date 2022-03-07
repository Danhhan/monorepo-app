import {
  Page,
  PageBody,
  PageContent,
  PageHeader,
  PageContentBody,
  Link,
  FlexGroup,
  FlexItem,
  Button,
  Title,
  ButtonIcon,
  HorizontalRule,
  FormRow,
  FieldText,
  Spacer,
} from '@antoree/ant-ui';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useBreadcrumbs } from 'hooks';
import { useQuery } from 'react-query';
import {
  getTestingResultByCourseId,
  GET_TESTING_RESULT_BY_COURSE_ID,
} from 'services/testingCourse';
import { useMemo } from 'react';
import { GENDER, TYPES } from './constants';
import ResultForm from './ResultForm';
import TeenagerAndAdultScore from './TeenagerAndAdultScore';
import YoungLearnerScore from './YoungLearnerScore';

function TestingResultDetail() {
  const intl = useIntl();

  const { id } = useParams();

  useBreadcrumbs([
    {
      text: <FormattedMessage defaultMessage="Home" />,
      path: '/',
    },
    {
      text: <FormattedMessage defaultMessage="Testing courses" />,
      path: '/testing-courses',
    },
    {
      text: <FormattedMessage defaultMessage="Testing courses detail" />,
      path: `/testing-courses/${id}`,
    },
    {
      text: <FormattedMessage defaultMessage="Result" />,
    },
  ]);

  const { data } = useQuery(
    [GET_TESTING_RESULT_BY_COURSE_ID(id)],
    () => getTestingResultByCourseId(id),
    { suspense: true, retry: 1 },
  );

  const type = useMemo(
    () =>
      TYPES.find(
        ({ value }) =>
          value === parseInt(data?.data?.test_result_meta?.testType, 10),
      ),
    [data.data],
  );

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Link to={`/testing-courses/${id}`}>
                  <ButtonIcon color="text" size="m" iconType="arrowLeft" />
                </Link>
              </FlexItem>

              <FlexItem grow={false}>
                <Title>
                  <h2>
                    <FormattedMessage
                      defaultMessage="Result of Testing Course #{id}"
                      values={{ id }}
                    />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
          rightSideItems={[
            <a
              href={data?.data?.test_result_url?.url}
              download
              target="_blank"
              rel="noreferrer"
            >
              <Button
                disabled={!data?.data?.test_result_url?.url}
                fill
                color="secondary"
                iconType="download"
              >
                <FormattedMessage defaultMessage="Download Result" />
              </Button>
            </a>,
          ]}
        />
        <PageContent>
          <PageContentBody>
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
                              ({ value }) => value === data.data.student.gender,
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
            </FlexGroup>

            <Spacer size="xxl" />

            <Title>
              <h2>
                <FormattedMessage defaultMessage="Sales Information" />
              </h2>
            </Title>

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

            <Title>
              <h2>
                <FormattedMessage defaultMessage="Overview" />
              </h2>
            </Title>

            <HorizontalRule />

            <FlexGroup>
              <FlexItem>
                <FormRow
                  label={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Recorded Video' }),
                  )}
                  fullWidth
                >
                  <FieldText
                    value={data?.data?.video_url}
                    placeholder={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Recorded Video' }),
                    )}
                    readOnly
                    fullWidth
                  />
                </FormRow>
              </FlexItem>

              <FlexItem>
                <FormRow
                  label={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Testing Duration' }),
                  )}
                  fullWidth
                >
                  <FieldText
                    value={
                      data?.data?.duration
                        ? intl.formatMessage(
                            defineMessage({
                              defaultMessage: '{duration} minutes',
                            }),
                            { duration: data.data.duration },
                          )
                        : null
                    }
                    placeholder={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Testing Duration' }),
                    )}
                    readOnly
                    fullWidth
                  />
                </FormRow>
              </FlexItem>

              <FlexItem>
                <FormRow
                  label={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Type' }),
                  )}
                  fullWidth
                >
                  <FieldText
                    value={type?.label ? intl.formatMessage(type.label) : null}
                    placeholder={intl.formatMessage(
                      defineMessage({ defaultMessage: 'Type' }),
                    )}
                    readOnly
                    fullWidth
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>

            <Spacer size="xxl" />

            <Title>
              <h2>
                <FormattedMessage defaultMessage="How to Score?" />
              </h2>
            </Title>
            <HorizontalRule />
            {data?.data?.student?.type === 1 ? (
              <YoungLearnerScore />
            ) : (
              <TeenagerAndAdultScore />
            )}

            <Spacer size="xxl" />

            <ResultForm data={data} courseId={id} />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default TestingResultDetail;
