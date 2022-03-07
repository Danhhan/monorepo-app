import {
  DatePicker,
  DatePickerRange,
  notification,
  PageContentBody,
  PageHeader,
  PageHeaderSection,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { useState } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { OverviewContain } from 'components';
import { useQuery } from 'react-query';
import { getAntoreeCallOverview } from 'services/analytics';
import { GET_ANTOREE_CALL_OVERVIEW } from 'services/analytics/constants';

function AntoreeCall() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const { data, isLoading } = useQuery(
    [
      GET_ANTOREE_CALL_OVERVIEW,
      startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate.format('YYYY-MM-DD HH:mm:ss'),
    ],
    () =>
      getAntoreeCallOverview({
        fromDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
        toDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
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
  return (
    <>
      <PageHeader
        className="mt-3"
        pageTitle={<FormattedMessage defaultMessage="Antoree Call Overview" />}
        rightSideItems={[
          <DatePickerRange
            startDateControl={
              <DatePicker
                dateFormat="DD/MM/YYYY h:mm a"
                showTimeSelect
                popoverPlacement="bottom-start"
                placeholder="Select time"
                selected={startDate}
                onChange={setStartDate}
                startDate={startDate}
                maxDate={endDate}
                endDate={endDate}
              />
            }
            endDateControl={
              <DatePicker
                dateFormat="DD/MM/YYYY h:mm a"
                showTimeSelect
                popoverPlacement="bottom-start"
                placeholder="Select time"
                startDate={startDate}
                endDate={endDate}
                // maxDate={moment()}
                selected={endDate}
                onChange={setEndDate}
              />
            }
          />,
        ]}
      />
      <PageContentBody>
        <PageHeader>
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Total" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody>
          <OverviewContain
            isLoading={isLoading}
            dataOverview={[
              {
                title: data?.data?.testCallTotal,
                description: <FormattedMessage defaultMessage="Testing Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Testing Call/Booking" />
                    ),
                    value: `${data?.data?.divTestTotalTestCourse}%`,
                  },
                ],
              },
              {
                title: data?.data?.trialCallTotal,
                description: <FormattedMessage defaultMessage="Trials Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Trials Call/Tested" />
                    ),
                    value: `${data?.data?.divTrialTotalTrialCourse}%`,
                  },
                ],
              },
              {
                title: data?.data?.mainCallTotal,
                description: <FormattedMessage defaultMessage="Course Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Course Call/Main Course" />
                    ),
                    value: `${data?.data?.divMainTotalMainCourse}%`,
                  },
                ],
              },
            ]}
          />
        </PageContentBody>
        <Spacer size="m" />
        <PageHeader>
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Mobile" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody>
          <OverviewContain
            isLoading={isLoading}
            dataOverview={[
              {
                title: data?.data?.testCallMobile,
                description: <FormattedMessage defaultMessage="Testing Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Testing Call/Booking" />
                    ),
                    value: `${data?.data?.divTestMobileTestCourse}%`,
                  },
                ],
              },
              {
                title: data?.data?.trialCallMobile,
                description: <FormattedMessage defaultMessage="Trials Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Trials Call/Tested" />
                    ),
                    value: `${data?.data?.divTrialMobileTrialCourse}%`,
                  },
                ],
              },
              {
                title: data?.data?.mainCallMobile,
                description: <FormattedMessage defaultMessage="Course Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Course Call/Main Course" />
                    ),
                    value: `${data?.data?.divMainMobileMainCourse}%`,
                  },
                ],
              },
            ]}
          />
        </PageContentBody>
        <Spacer size="m" />
        <PageHeader>
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Web" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody>
          <OverviewContain
            isLoading={isLoading}
            dataOverview={[
              {
                title: data?.data?.testCallWeb,
                description: <FormattedMessage defaultMessage="Testing Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Testing Call/Booking" />
                    ),
                    value: `${data?.data?.divTestWebTestCourse}%`,
                  },
                ],
              },
              {
                title: data?.data?.trialCallWeb,
                description: <FormattedMessage defaultMessage="Trials Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Trials Call/Tested" />
                    ),
                    value: `${data?.data?.divTrialWebTrialCourse}%`,
                  },
                ],
              },
              {
                title: data?.data?.mainCallWeb,
                description: <FormattedMessage defaultMessage="Course Call" />,
                data: [
                  {
                    label: (
                      <FormattedMessage defaultMessage="Course Call/Main Course" />
                    ),
                    value: `${data?.data?.divMainWebMainCourse}%`,
                  },
                ],
              },
            ]}
          />
        </PageContentBody>
        <Spacer size="m" />
        <PageHeader>
          <PageHeaderSection>
            <Title size="s">
              <h2>
                <FormattedMessage defaultMessage="Fail Call" />
              </h2>
            </Title>
          </PageHeaderSection>
        </PageHeader>
        <PageContentBody>
          <OverviewContain
            isLoading={isLoading}
            dataOverview={[
              {
                title: data?.data?.testCallFail,
                description: <FormattedMessage defaultMessage="Testing Call" />,
              },
              {
                title: data?.data?.trialCallFail,
                description: <FormattedMessage defaultMessage="Trials Call" />,
              },
              {
                title: data?.data?.mainCallFail,
                description: <FormattedMessage defaultMessage="Course Call" />,
              },
            ]}
          />
        </PageContentBody>
      </PageContentBody>
    </>
  );
}

export default AntoreeCall;
