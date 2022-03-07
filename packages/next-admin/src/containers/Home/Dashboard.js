import {
  Page,
  PageBody,
  PageContentBody,
  PageHeader,
  PageHeaderSection,
  FlexGroup,
  FlexItem,
  Title,
  Form,
  FormRow,
  FieldText,
  ButtonIcon,
  notification,
} from '@antoree/ant-ui';

import { useIntl, FormattedMessage } from 'react-intl';
import { useBreadcrumbs } from 'hooks';
import { useRetrieveRoomUrlBySessionId } from 'services/videocall';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import messages from '../SignIn/messages';
import { AntoreeCall } from './components';

const breadcrumbs = [
  {
    text: 'Home',
  },
];

function Dashboard() {
  useBreadcrumbs(breadcrumbs);

  const intl = useIntl();

  // const overviewQuery = useQuery([GET_OVERVIEW], () => getOverview(), {
  //   retry: 1,
  // });

  // const overviewChartQuery = useQuery(
  //   [GET_OVERVIEW_CHART],
  //   () => getOverviewChart(),
  //   {
  //     retry: 1,
  //   },
  // );

  // const { requestData, bookingData } = useMemo(() => {
  //   const request = overviewChartQuery.data?.chart?.map?.(record => [
  //     intl.formatDate(moment(record.date, 'YYYY-MM-DD').toDate(), {
  //       month: 'long',
  //       day: '2-digit',
  //     }),
  //     record.total_request,
  //   ]);

  //   const booking = overviewChartQuery.data?.chart?.map?.(record => [
  //     intl.formatDate(moment(record.date, 'YYYY-MM-DD').toDate(), {
  //       month: 'long',
  //       day: '2-digit',
  //     }),
  //     record.total_success_booking,
  //   ]);

  //   return { requestData: request ?? [], bookingData: booking ?? [] };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [overviewChartQuery.data]);

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { sessionId: '' },
    resolver: yupResolver(
      yup.object().shape({
        sessionId: yup.number().required(
          intl.formatMessage(messages.validate.require, {
            field: 'session id',
          }),
        ),
      }),
    ),
  });

  const { mutate, isLoading } = useRetrieveRoomUrlBySessionId();

  const onSubmit = ({ sessionId }) => {
    // console.log(sessionId);
    mutate(sessionId, {
      onSuccess: data => {
        window.open(data.vcUrl, '_blank');
      },
      onError: err => {
        notification.error({
          title: 'Session not found',
        });
      },
    });
  };

  return (
    <Page
      className="container mx-auto"
      style={{ height: 'calc(100vh - 96px)' }}
    >
      <PageBody component="main">
        <PageHeader>
          <PageHeaderSection>
            <Title>
              <h2>
                <FormattedMessage defaultMessage="Dự thính" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody>
          <Form component="form" onSubmit={handleSubmit(onSubmit)}>
            <FlexGroup gutterSize="s">
              <FlexItem grow={false}>
                <FormRow
                  className="w-96"
                  isInvalid={!!errors.sessionId}
                  error={errors.sessionId?.message}
                >
                  <Controller
                    name="sessionId"
                    control={control}
                    render={({ ref, ...restProps }) => (
                      <FieldText
                        {...restProps}
                        inputRef={ref}
                        isInvalid={!!errors.sessionId}
                        fullWidth
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Session ID (Example: 123765)',
                        })}
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
        <AntoreeCall />
        {/* <PageHeader>
          <PageHeaderSection>
            <Title>
              <h2>
                <FormattedMessage defaultMessage="Overview" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody style={{ height: '100%' }}>
          <FlexGroup>
            <FlexItem>
              <Panel>
                <Stat
                  title={
                    <FormattedNumber
                      value={overviewQuery?.data?.totalLearningRequest}
                    />
                  }
                  description={intl.formatMessage(
                    defineMessage({
                      defaultMessage: 'Total Learning Requests',
                    }),
                  )}
                  titleColor="secondary"
                  textAlign="center"
                  isLoading={overviewQuery.isLoading}
                />
              </Panel>
            </FlexItem>

            <FlexItem>
              <Panel>
                <Stat
                  title={
                    <FormattedNumber
                      value={overviewQuery?.data?.totalSuccessBooking}
                    />
                  }
                  description={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Successfull Bookings' }),
                  )}
                  titleColor="secondary"
                  textAlign="center"
                  isLoading={overviewQuery.isLoading}
                />
              </Panel>
            </FlexItem>

            <FlexItem>
              <Panel>
                <Stat
                  title={
                    <FormattedNumber
                      value={overviewQuery?.data?.totalTestingPassed}
                    />
                  }
                  description={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Testing Passed' }),
                  )}
                  titleColor="secondary"
                  textAlign="center"
                  isLoading={overviewQuery.isLoading}
                />
              </Panel>
            </FlexItem>
          </FlexGroup>

          <Spacer />

          <Panel>
            <Title size="m">
              <h2>
                <FormattedMessage defaultMessage="Number of Booking" />
              </h2>
            </Title>

            <Text size="s" color="subdued">
              <p>
                <FormattedDate
                  value={Date.now()}
                  year="numeric"
                  month="long"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  second="2-digit"
                  hour12
                >
                  {formattedDate => (
                    <FormattedMessage
                      defaultMessage="as of {dateTime}"
                      values={{ dateTime: formattedDate }}
                    />
                  )}
                </FormattedDate>
              </p>
            </Text>

            <Spacer />

            {overviewChartQuery.isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <LoadingChart size="xl" />
              </div>
            ) : (
              <Chart size={{ height: 320 }}>
                <Settings showLegend legendPosition="top" />

                <AreaSeries
                  id="booking"
                  name={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Booking' }),
                  )}
                  xAccessor={0}
                  yAccessors={[1]}
                  curve={CurveType.CURVE_MONOTONE_X}
                  data={bookingData}
                />

                <LineSeries
                  id="request"
                  name={intl.formatMessage(
                    defineMessage({ defaultMessage: 'Request' }),
                  )}
                  xAccessor={0}
                  yAccessors={[1]}
                  curve={CurveType.CURVE_MONOTONE_X}
                  data={requestData}
                />

                <Axis id="bottom-axis" position="bottom" />

                <Axis id="left-axis" position="left" showGridLines />
              </Chart>
            )}
          </Panel>

          <Spacer />

          <Panel>
            <Title size="m">
              <h2>
                <FormattedMessage defaultMessage="Mobile App Status" />
              </h2>
            </Title>

            <Text size="s" color="subdued">
              <p>
                <FormattedDate
                  value={Date.now()}
                  year="numeric"
                  month="long"
                  day="2-digit"
                  hour="2-digit"
                  minute="2-digit"
                  second="2-digit"
                  hour12
                >
                  {formattedDate => (
                    <FormattedMessage
                      defaultMessage="as of {dateTime}"
                      values={{ dateTime: formattedDate }}
                    />
                  )}
                </FormattedDate>
              </p>
            </Text>

            <Spacer />

            {overviewQuery.isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <LoadingChart size="xl" />
              </div>
            ) : (
              <div>
                <Stat
                  title={
                    <FormattedNumber
                      value={
                        overviewQuery?.data?.totalLearningRequestOldData ?? '--'
                      }
                    />
                  }
                  isLoading={overviewQuery.isLoading}
                  description="Total Registered Users"
                  titleColor="secondary"
                />

                <Chart size={{ height: 480 }}>
                  <Settings showLegend />
                  <Partition
                    data={[
                      {
                        status: 'Tested',
                        color: '#FFB800',
                        percent: Number(
                          overviewQuery?.data?.totalTestingPassedOldData,
                        ),
                      },
                      {
                        status: 'Pending Request',
                        color: '#006BB4',
                        percent: Number(
                          overviewQuery?.data?.totalPendingOldData,
                        ),
                      },
                      {
                        status: 'Booking Request',
                        color: '#00C081',
                        percent: Number(
                          overviewQuery?.data?.totalSuccessBookingOldData,
                        ),
                      },
                    ]}
                    valueAccessor={d => Number(d.percent)}
                    layers={[
                      {
                        groupByRollup: d => d.status,
                        shape: {
                          fillColor: d => {
                            const groupedPalette = euiPaletteColorBlind();
                            return groupedPalette[
                              d.parent.sortIndex * 3 + d.sortIndex + 1
                            ];
                          },
                        },
                      },
                    ]}
                    config={{
                      fillLabel: {
                        textInvertible: true,
                      },
                      clockwiseSectors: false,
                    }}
                  />
                </Chart>
              </div>
            )}
          </Panel>
          <Spacer />
        </PageContentBody> */}
      </PageBody>
    </Page>
  );
}

export default Dashboard;
