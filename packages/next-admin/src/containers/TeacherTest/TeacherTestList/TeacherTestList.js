import {
  Avatar,
  BasicTable,
  Button,
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
import { useBreadcrumbs, useFormModal, usePagiantion } from 'hooks';
import moment from 'moment';
import { useState } from 'react';
import {
  defineMessage,
  FormattedDate,
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import {
  getTeachersTest,
  GET_TEST_TEACHERS,
  updateTopTeacher,
} from 'services/teachers-test';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import CreateTesterForm from '../CreateTesterForm';
import DisplayRatingTeacher from '../Rating';
import {
  TEACHERS_EXCELLENT_SELECT_ALL_VALUE,
  TEACHERS_EXCELLENT_SELECT_NON_EXCELLENT_VALUE,
  TEACHERS_EXCELLENT_SELECT_OPTIONS,
  TEACHERS_RATING,
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
    text: <FormattedMessage defaultMessage="Teacher Test Management" />,
  },
];

function TeacherTestList() {
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
  } = usePagiantion({
    search: withDefault(StringParam, ''),
    type: withDefault(NumberParam, TRIAL_TEACHER_ALL_VALUE),
    isExcellent: withDefault(NumberParam, TEACHERS_EXCELLENT_SELECT_ALL_VALUE),
    isTop: withDefault(NumberParam, TEACHERS_TOP_NULL),
  });

  const { data, error, isLoading, refetch } = useQuery(
    [GET_TEST_TEACHERS, query],
    () =>
      getTeachersTest({
        pageIndex,
        pageSize,
        search,
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
  const { isVisible, show, close } = useFormModal();

  const [open, setModal] = useState(false);
  const [datarating, setDataRating] = useState([]);

  const openRating = () => {
    // eslint-disable-next-line no-shadow
    setModal(open => !open);
  };

  // updateTopTeacher

  const updateTopTeacherMutation = useMutation(updateTopTeacher, {
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
                    <FormattedMessage defaultMessage="Teacher Test Management" />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
          rightSideItems={[
            <Button fill color="primary" iconType="indexOpen" onClick={show}>
              <FormattedMessage defaultMessage="Create New Tester" />
            </Button>,
          ]}
        />

        <CreateTesterForm isVisible={isVisible} closeModal={close} />
        <DisplayRatingTeacher
          isVisible={open}
          dataRating={datarating}
          openRating={openRating}
        />
        <PageContent>
          <PageContentHeader>
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup justifyContent="flexEnd">
                <FlexItem grow={false}>
                  <FormRow
                    label={intl.formatMessage({
                      defaultMessage: 'Đánh giá',
                    })}
                    className="w-48"
                    placeholder="Đánh giá"
                  >
                    <SuperSelect
                      placeholder="sksk"
                      options={[...TEACHERS_RATING].map(
                        ({ label, value, color }) => ({
                          value,
                          inputDisplay: (
                            <div style={{ textDecoration: 'none' }}>
                              <span> {label}</span>{' '}
                              <span style={{ color: '#fc8803' }}>★ </span>
                            </div>
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
                      defaultMessage: 'Teacher top Options',
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
                  field: 'user',
                  name: <FormattedMessage defaultMessage="Đánh giá" />,
                  truncateText: true,
                  textOnly: true,
                  // eslint-disable-next-line react/prop-types
                  render: ({ rating, email, avatarUrlThumb, id, name }) => (
                    <div className="flex items-center justify-items-center">
                      <Text
                        onClick={e => {
                          setDataRating({
                            id,
                            email,
                            rating,
                            avatarUrlThumb,
                            name,
                          });
                          openRating();
                        }}
                        className="ml-2"
                        size="xs"
                        style={{ cursor: 'pointer' }}
                      >
                        {`${rating}`}
                        <span style={{ color: '#fc8803', fontSize: '15px' }}>
                          ★
                        </span>
                      </Text>
                    </div>
                  ),
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
                  render: ({ id, isTop: isTeacherTop }) => (
                    <div className="w-full p-2">
                      <Switch
                        checked={isTeacherTop}
                        onChange={e => {
                          const targetSelect = e?.target;
                          // eslint-disable-next-line no-unused-expressions
                          e?.target?.setAttribute('disabled', true);

                          updateTopTeacherMutation.mutate(
                            {
                              idTeacher: id,
                              status: !isTeacherTop,
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

export default TeacherTestList;
