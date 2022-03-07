/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import {
  Page,
  PageBody,
  PageContentBody,
  PageHeader,
  PageHeaderSection,
  Spacer,
  notification,
  Title,
  Icon,
  FlexItem,
  FlexGroup,
  LoadingSpinner,
  AntoreeCustomizeLoading,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { getReportsDaily, GET_REPORTS_DAILY } from 'services/referralReport';
import { useQuery } from 'react-query';
import { useState } from 'react';
import moment from 'moment';
import { FilterButtonsGroup, OverviewContain } from 'components';

import { TeamPanel } from './components';
import { SUB_TEAM_EXTRACTED, BIG_TEAM_EXTRACTED } from './constants';

const ReferralReport = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const { data, error, isLoading } = useQuery(
    [
      GET_REPORTS_DAILY,
      startDate.format('YYYY-MM-DD 00:00:00'),
      endDate.format('YYYY-MM-DD 23:59:59'),
    ],
    () =>
      getReportsDaily({
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
      cacheTime: 0,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  const handleApply = (fromDate, toDate) => {
    setStartDate(fromDate);
    setEndDate(toDate);
  };

  function handleExport() {
    const bigTeamExtracted = {
      sheetName: `Big Teams`,
      config: BIG_TEAM_EXTRACTED,
      data: [],
    };
    const dataExtracted =
      // eslint-disable-next-line react/prop-types
      data?._data?.reports?.map(team => {
        bigTeamExtracted.data.push(team);
        return {
          sheetName: `TeamOrderID: ${team.order} - ${team.team_name}`,
          config: SUB_TEAM_EXTRACTED,
          data: team.subTeams,
        };
      }) || [];

    return [bigTeamExtracted, ...dataExtracted];
  }

  return (
    <Page
      className="mx-auto"
      style={{ height: 'calc(100vh - 96px)' }}
      paddingSize="l"
    >
      <PageBody component="main">
        <PageHeader>
          <PageHeaderSection>
            <Title size="l">
              <h2>
                <FormattedMessage defaultMessage="Referral Report" />
              </h2>
            </Title>
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
                title: data?._data?.totalContact,
                description: <FormattedMessage defaultMessage="Contacts" />,
              },
              {
                title: data?._data?.totalTested,
                description: <FormattedMessage defaultMessage="Tested" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Tested/Contacts" />
                    ),
                    value: `${data?._data?.totalDivTestedContacts}%`,
                  },
                ],
              },
              {
                title: data?._data?.totalTrialBooked,
                description: (
                  <FormattedMessage defaultMessage="Trials Booked" />
                ),
                data: [
                  {
                    label: <FormattedMessage defaultMessage="Trials/Tested" />,
                    value: `${data?._data?.totalDivTrialTested}%`,
                  },
                ],
              },
              {
                title: data?._data?.totalRegularContract,
                description: (
                  <FormattedMessage defaultMessage="Regular Contracts" />
                ),
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Contract/Tested" />
                    ),
                    value: `${data?._data?.totalDivContractTested}%`,
                  },
                ],
              },
              {
                title: data?._data?.totalCostForContacts,
                description: (
                  <FormattedMessage defaultMessage="Total Cost for Contacts" />
                ),
                data: [
                  {
                    value: 'VND',
                  },
                ],
              },
              {
                title: data?._data?.totalRoi,
                description: <FormattedMessage defaultMessage="ROI" />,
                data: [
                  {
                    // value: `${data?._data?.totalDivContractTested}%`,
                  },
                ],
              },
              {
                title: data?._data?.totalGmv,
                description: <FormattedMessage defaultMessage="GMV" />,
                data: [
                  {
                    label: <FormattedMessage defaultMessage="Trial/Tested" />,
                    value: `${data?._data?.totalDivTrialTested}%`,
                  },
                ],
              },
              {
                title: data?._data?.totalCustomer,
                description: (
                  <FormattedMessage defaultMessage="Fixed Customers" />
                ),
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Customer/Contact" />
                    ),
                    value: `${data?._data?.totalDivCustomerContact}%`,
                  },
                  {
                    label: (
                      <FormattedMessage defaultMessage="Customer/Tested" />
                    ),
                    value: `${data?._data?.totalDivCustomerTested}%`,
                  },
                  {
                    label: (
                      <FormattedMessage defaultMessage="Customer/Contract" />
                    ),
                    value: `${data?._data?.totalDivCustomerContract}%`,
                  },
                ],
              },
            ]}
          />
        </PageContentBody>
        <PageHeader className="mt-20">
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Sales Teams Status" />
              </h2>
            </Title>
          </PageHeaderSection>
          <PageHeaderSection>
            <FilterButtonsGroup
              isAvailable={!isLoading && !error}
              data={data?._data?.reports}
              contactFee={data?._data?.defaultContactFee}
              applyHandle={handleApply}
              handleExtractDataExport={handleExport}
            />
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody
          style={{
            margin: '0 -24px',
          }}
        >
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
              <FlexGroup
                className="w-full pb-4"
                gutterSize="none"
                style={{
                  overflowX: 'auto',
                  overflowY: 'visible',
                }}
                direction="column"
                responsive={false}
              >
                {data?._data.reports.map(team => (
                  <FlexItem style={{ width: 'fit-content' }}>
                    <TeamPanel key={team.order} id={team.order} data={team} />
                  </FlexItem>
                ))}
              </FlexGroup>
            ) : (
              <div className="flex justify-center flex-col items-center py-40">
                {/* <LoadingSpinner size="xl" />
                <p className="mt-4">Loading Please Wait...</p> */}
                <AntoreeCustomizeLoading />
              </div>
            )}
          </div>
          <Spacer />
        </PageContentBody>
      </PageBody>
    </Page>
  );
};

export default ReferralReport;
