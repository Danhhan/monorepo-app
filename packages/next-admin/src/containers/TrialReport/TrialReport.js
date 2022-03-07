/* eslint-disable no-nested-ternary */
import {
  Page,
  PageBody,
  PageContentBody,
  PageHeader,
  PageHeaderSection,
  Title,
  Icon,
  notification,
  AntoreeCustomizeLoading,
  LoadingSpinner,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import moment from 'moment';
import { getTrialReports, GET_TRIAL_REPORTS } from 'services/trialReport';
import { useQuery } from 'react-query';
import { FilterButtonsGroup, OverviewContain } from 'components';

import { TeamPanel } from './components';

const TrialReport = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const { data, error, isLoading } = useQuery(
    [
      GET_TRIAL_REPORTS,
      startDate.format('YYYY-MM-DD 00:00:00'),
      endDate.format('YYYY-MM-DD 23:59:59'),
    ],
    () =>
      getTrialReports({
        fromDate: startDate.format('YYYY-MM-DD 00:00:00'),
        toDate: endDate.format('YYYY-MM-DD 23:59:59'),
      }),
    {
      onError: err => {
        notification.error({
          title: err?.message ?? (
            <FormattedMessage defaultMessage="Error occured!" />
          ),
        });
      },
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  const handleApply = (fromDate, toDate) => {
    setStartDate(fromDate);
    setEndDate(toDate);
  };

  return (
    <Page
      className="mx-auto"
      style={{ height: 'calc(100vh - 96px)' }}
      paddingSize="l"
    >
      <PageBody component="main">
        <PageHeader>
          <PageHeaderSection>
            <Title size="m">
              <h2>
                <FormattedMessage defaultMessage="Trial Report" />
              </h2>
            </Title>
          </PageHeaderSection>
          <PageHeaderSection>
            <FilterButtonsGroup
              applyHandle={handleApply}
              isAvailable={!isLoading && !error}
            />
          </PageHeaderSection>
        </PageHeader>
        <PageHeader>
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Antoree Overview" />
              </h2>
            </Title>
          </PageHeaderSection>
          {/* <PageHeaderSection>
            <ButtonsGroup />
          </PageHeaderSection> */}
        </PageHeader>
        <PageContentBody>
          <OverviewContain
            isLoading={isLoading}
            dataOverview={[
              {
                title: data?.reports?.totalBookedSlot,
                description: <FormattedMessage defaultMessage="Booked" />,
                data: [
                  {
                    value: `${data?.reports?.totalDivBookedOpenSlot}%`,
                  },
                ],
              },
              {
                title: data?.reports?.totalTrial,
                description: <FormattedMessage defaultMessage="Trial" />,
                data: [
                  {
                    label: <FormattedMessage defaultMessage="Trial/Booked" />,
                    value: `${data?.reports?.totalDivTrialBooked}%`,
                  },
                ],
              },
              {
                title: data?.reports?.totalDelay,
                description: <FormattedMessage defaultMessage="Delayed" />,
                data: [
                  {
                    label: <FormattedMessage defaultMessage="Delayed/Booked" />,
                    value: `${data?.reports?.totalDelay}%`,
                  },
                ],
              },
              {
                title: data?.reports?.totalMissByTeacher,
                description: (
                  <FormattedMessage defaultMessage="Missed By Teacher" />
                ),
                data: [
                  {
                    label: <FormattedMessage defaultMessage="Missed/Booked" />,
                    value: `${data?.reports?.totalDivMissBooked}%`,
                  },
                ],
              },
            ]}
            totalBooked={data?.reports?.totalBookedSlot}
            totalTrial={data?.reports?.totalTrial}
            totalDelayed={data?.reports?.totalDelay}
            totalMissedByTeacher={data?.reports?.totalMissByTeacher}
            totalDivBooked={0}
            totalDivTrialBooked={data?.reports?.totalDivTrialBooked}
            totalDivDelayed={data?.reports?.totalDivDelayBooked}
            totalDivMissedByTeacher={data?.reports?.totalDivMissBooked}
          />
        </PageContentBody>
        <PageHeader className="mt-20">
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Detailed Status" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody>
          <div
            className="max-w-full pb-4"
            style={{
              overflowX: 'auto',
              overflowY: 'visible',
            }}
          >
            {error ? (
              <div className="flex justify-center flex-col items-center py-40">
                <Icon size="xxl" className="text-red-600" type="alert" />
                <p className="text-red-600 text-lg	">
                  <FormattedMessage defaultMessage="Error occured!" />
                </p>
                <p className="mt-4  text-lg">{error.message}</p>
              </div>
            ) : !isLoading ? (
              data?.reports?.Team.map((teamData, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TeamPanel key={index} id={index} data={teamData} />
              ))
            ) : (
              <div className="flex justify-center flex-col items-center py-40">
                {/* <LoadingSpinner size="xl" />
                <p className="mt-4">Loading Please Wait...</p> */}
                <AntoreeCustomizeLoading />
              </div>
            )}
          </div>
        </PageContentBody>
      </PageBody>
    </Page>
  );
};

export default TrialReport;
