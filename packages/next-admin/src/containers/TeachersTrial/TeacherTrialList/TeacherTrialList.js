import {
  Avatar,
  BasicTable,
  FieldSearch,
  FlexGroup,
  FlexItem,
  FormRow,
  Health,
  Link,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  PageHeader,
  SuperSelect,
  Switch,
  Text,
  Title,
} from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import { useBreadcrumbs, usePagiantion } from 'hooks';
import moment from 'moment';
import {
  defineMessage,
  FormattedDate,
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import {
  getTeachersTrial,
  GET_TRIAL_TEACHERS,
  updateTopTeacherTrial,
} from 'services/teachers-trial';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import {
  TEACHERS_EXCELLENT_SELECT_ALL_VALUE,
  TEACHERS_EXCELLENT_SELECT_NON_EXCELLENT_VALUE,
  TEACHERS_EXCELLENT_SELECT_OPTIONS,
  TEACHERS_TOP_NULL,
  TEACHERS_TOP_SELECT_OPTIONS,
  TRIAL_TEACHERS_STATUS,
  TRIAL_TEACHER_ALL_VALUE,
} from './constants';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Teachers Trial Management" />,
  },
];

function TeacherTrialList() {
  const intl = useIntl();

  useBreadcrumbs(breadcrumbs);

  const {
    pageIndex,
    pageSize,
    search,
    query,
    type,
    isExcellent,
    isTop,
    onTableChangeHandler,
    onInputChange,
    onSelect,
  } = usePagiantion(
    {
      type: withDefault(NumberParam, TRIAL_TEACHER_ALL_VALUE),
      isTop: withDefault(NumberParam, TEACHERS_TOP_NULL),
      isExcellent: withDefault(
        NumberParam,
        TEACHERS_EXCELLENT_SELECT_ALL_VALUE,
      ),
      search: withDefault(StringParam, ''),
    },
    {},
  );

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    [GET_TRIAL_TEACHERS, query],
    () =>
      getTeachersTrial({
        pageIndex,
        pageSize,
        search,
        type,
        isExcellent:
          // value = 0 but have to send TEACHERS_EXCELLENT_SELECT_NON_EXCELLENT_VALUE because EuiSuperSelect not render option with value null or undefined or 0
          isExcellent === TEACHERS_EXCELLENT_SELECT_NON_EXCELLENT_VALUE
            ? 0
            : isExcellent,
        isTop,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const updateTopTeacherMutation = useMutation(updateTopTeacherTrial, {
    onSuccess: async (resData, para) => {
      refetch();
      notification.success({
        title: 'Successfully',
        text: (
          <FormattedMessage defaultMessage="Update Teacher successfully!" />
        ),
      });
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: 'Failure',
        text: mesError || (
          <FormattedMessage defaultMessage="Update Teacher failure!" />
        ),
      });
    },
  });

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Title>
                  <h2>
                    <FormattedMessage defaultMessage="Teachers Trial Management" />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
        />

        <PageContent>
          <PageContentHeader>
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup justifyContent="flexEnd">
                <FlexItem grow={false}>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Teacher top options',
                    })}
                    className="w-48"
                  >
                    <SuperSelect
                      options={[...TEACHERS_TOP_SELECT_OPTIONS].map(
                        ({ label, value, color }) => ({
                          value,
                          inputDisplay: (
                            <Health
                              color={color}
                              style={{ lineHeight: 'inherit' }}
                            >
                              {label}
                            </Health>
                          ),
                        }),
                      )}
                      valueOfSelected={isTop}
                      onChange={onSelect('isTop')}
                      fullWidth
                      compressed
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem grow={false}>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Excellent Teacher Options',
                    })}
                    className="w-48"
                  >
                    <SuperSelect
                      options={[...TEACHERS_EXCELLENT_SELECT_OPTIONS].map(
                        ({ label, value, color }) => ({
                          value,
                          inputDisplay: (
                            <Health
                              color={color}
                              style={{ lineHeight: 'inherit' }}
                            >
                              {label}
                            </Health>
                          ),
                        }),
                      )}
                      valueOfSelected={isExcellent}
                      onChange={onSelect('isExcellent')}
                      fullWidth
                      compressed
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem grow={false}>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Status Teacher Options',
                    })}
                    className="w-48"
                  >
                    <SuperSelect
                      options={[...TRIAL_TEACHERS_STATUS].map(
                        ({ label, value, color }) => ({
                          value,
                          inputDisplay: (
                            <Health
                              color={color}
                              style={{ lineHeight: 'inherit' }}
                            >
                              {label}
                            </Health>
                          ),
                        }),
                      )}
                      valueOfSelected={type}
                      onChange={onSelect('type')}
                      fullWidth
                      compressed
                    />
                  </FormRow>
                </FlexItem>

                <FlexItem grow={false}>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Search Input Teacher',
                    })}
                    className="w-64"
                  >
                    <FieldSearch
                      defaultValue={search}
                      onChange={withDebounce(onInputChange('search'))}
                      placeholder={intl.formatMessage(
                        defineMessage({
                          defaultMessage:
                            'Search with Email, Name,Last Name , Phone or Id',
                        }),
                      )}
                      compressed
                      isClearable
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
            </PageContentHeaderSection>
          </PageContentHeader>

          <PageContentBody>
            <BasicTable
              tableLayout="fixed"
              loading={isLoading}
              error={error?.toString()}
              items={data?.data ?? []}
              hasActions
              columns={[
                {
                  field: 'user.id',
                  name: <FormattedMessage defaultMessage="Teacher ID" />,
                  render: id => <Link to={`/teacher-detail/${id}`}>{id}</Link>,
                  truncateText: true,
                  textOnly: true,
                  width: 100,
                },
                {
                  field: 'user',
                  name: <FormattedMessage defaultMessage="Teacher Name" />,
                  truncateText: true,
                  textOnly: true,
                  // eslint-disable-next-line react/prop-types
                  render: ({ name, avatarUrlThumb }) => (
                    <div className="flex items-center justify-items-center">
                      <Avatar
                        name={name ?? 'User Name'}
                        size="s"
                        imageUrl={avatarUrlThumb}
                      />
                      <Text className="ml-2" size="xs">
                        {name}
                      </Text>
                    </div>
                  ),
                },
                {
                  field: 'user.phone',
                  name: <FormattedMessage defaultMessage="Phone Number" />,
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'user.email',
                  name: <FormattedMessage defaultMessage="Email Address" />,
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'lastUpdate',
                  name: <FormattedMessage defaultMessage="Last Update" />,
                  truncateText: true,
                  textOnly: true,
                  render: dateUpdated =>
                    dateUpdated ? (
                      <FormattedDate
                        value={moment(
                          dateUpdated,
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
                },
                {
                  // field: 'lastUpdate',
                  field: 'user',
                  name: <FormattedMessage defaultMessage="Top ShowUp" />,
                  truncateText: true,
                  textOnly: true,
                  // eslint-disable-next-line react/prop-types
                  render: ({ id, isTopTrial }) => (
                    <div className="w-full p-2">
                      <Switch
                        checked={isTopTrial}
                        onChange={e => {
                          const targetSelect = e?.target;
                          // eslint-disable-next-line no-unused-expressions
                          e?.target?.setAttribute('disabled', true);

                          updateTopTeacherMutation.mutate(
                            {
                              idTeacher: id,
                              status: !isTopTrial,
                            },
                            {
                              onSuccess: () => {
                                setTimeout(() => {
                                  targetSelect.removeAttribute('disabled');
                                }, 500);
                              },
                            },
                          );
                        }}
                      />
                    </div>
                  ),
                },
              ]}
              onChange={onTableChangeHandler}
              pagination={{
                pageIndex,
                pageSize,
                totalItemCount: data?.pagination?.totalItems ?? 0,
              }}
            />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default TeacherTrialList;
