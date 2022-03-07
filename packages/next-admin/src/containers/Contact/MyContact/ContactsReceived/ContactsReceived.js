/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  BasicTable,
  Button,
  ButtonEmpty,
  DatePicker,
  FlexGroup,
  FlexItem,
  FormRow,
  HeaderSectionItemButton,
  Health,
  InMemoryTable,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { ContactAvailable, ContactReceivedToday } from 'components';
import UtmPopover from 'containers/Contact/components/UtmPopover';
import { HeaderActionContext } from 'contexts/HeaderActionContext';
import { useBreadcrumbs } from 'hooks';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import {
  withdrawContact,
  reportWithdrawContact,
  getReceivedContacts,
  GET_CONTACT,
  GET_TOTAL_CONTACT,
  WITHDRAW_CONTACT,
} from 'services/contact';
import { CONTACT_STATUS } from '../../constant';
import { TabsHeader } from '../components';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="My contact" />,
  },
];

function ContactsReceived() {
  const intl = useIntl();
  useBreadcrumbs(breadcrumbs);
  const [caredAtFrom, setCaredAtFrom] = useState(
    // eslint-disable-next-line prettier/prettier
    moment().hours(0).minutes(0).seconds(0),
  );
  const [caredAtTo, setCaredAtTo] = useState(
    // eslint-disable-next-line prettier/prettier
    moment().hours(23).minutes(59).seconds(59),
  );
  const [fromDate, setFromDate] = useState(
    // eslint-disable-next-line prettier/prettier
    moment().hours(0).minutes(0).seconds(0),
  );
  const [errorDateTime, setErrorDateTime] = useState();
  const { data, error, isLoading, isFetching, refetch } = useQuery(
    [GET_CONTACT, {}],
    () =>
      getReceivedContacts({
        caredAtFrom,
        caredAtTo,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );
  const withdrawContactMutate = useMutation(withdrawContact, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="WithDraw contact success" />,
      });
      refetch();
      refetchReport();
    },
    onError: err => {
      const message = err?.response?.data?.errors[0]?.message;
      notification.error({
        title: 'Failure',
        text: `Code: ${err?.response?.status} - ${message}`,
      });
    },
  });
  const {
    data: dataReport,
    refetch: refetchReport,
    isFetching: sFetchingReport,
    isLoading: isLoadingReport,
  } = useQuery([WITHDRAW_CONTACT], () => reportWithdrawContact(), {
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const { handleAddAction } = useContext(HeaderActionContext);
  useEffect(() => {
    const localHeaderActions = [
      <ContactAvailable
        total={dataReport?.report?.contactAvailable}
        isFetching={sFetchingReport}
        isLoading={isLoadingReport}
      />,
      <HeaderSectionItemButton>
        <ContactReceivedToday total={data?.pagination?.totalItems} />
      </HeaderSectionItemButton>,
      <HeaderSectionItemButton>
        <ButtonEmpty
          size="s"
          fill
          iconType="refresh"
          onClick={() => {
            refetch();
            refetchReport();
          }}
        >
          Reload page
        </ButtonEmpty>
      </HeaderSectionItemButton>,
      <HeaderSectionItemButton>
        <Button
          size="s"
          fill
          iconType="logstashQueue"
          onClick={() => {
            if (fromDate === null) {
              setErrorDateTime('Required this field');
              return;
            }
            withdrawContactMutate.mutate({
              fromDate: fromDate.format('YYYY-MM-DD HH:mm:ss'),
            });
          }}
          isLoading={withdrawContactMutate.isLoading}
        >
          Withdraw contact
        </Button>
      </HeaderSectionItemButton>,
    ];
    handleAddAction(localHeaderActions);
    return () => {
      handleAddAction([]);
    };
  }, [data, withdrawContactMutate.isLoading, sFetchingReport, fromDate]);
  return (
    <div>
      <TabsHeader report={dataReport?.report} />
      <Page>
        <PageBody component="main">
          <FormRow label="" isInvalid={errorDateTime} error={errorDateTime}>
            <DatePicker
              isInvalid={errorDateTime}
              selected={fromDate}
              onChange={date => {
                setFromDate(date);
              }}
              placeholder="From date"
            />
          </FormRow>

          <Spacer />
          <PageContent>
            <PageContentBody>
              <InMemoryTable
                tableLayout="fixed"
                loading={isFetching}
                error={error?.toString()}
                items={data?.contacts ?? []}
                isSelectable
                hasActions
                columns={[
                  {
                    field: 'id',
                    name: <FormattedMessage defaultMessage="Contact ID" />,
                    render: id => <p>{id}</p>,
                  },
                  {
                    field: 'name',
                    name: <FormattedMessage defaultMessage="Learner" />,
                    render: (name, { phone }) => (
                      <FlexGroup alignItems="center" gutterSize="xs">
                        <FlexItem className="w-28">
                          <strong className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {name}
                          </strong>
                          <Spacer size="xs" />
                          <Text color="#828282" className="text-xs">
                            {phone}
                          </Text>
                        </FlexItem>
                      </FlexGroup>
                    ),
                    width: 200,
                  },
                  {
                    field: 'status',
                    name: <FormattedMessage defaultMessage="Status" />,
                    truncateText: true,
                    textOnly: true,
                    // width: 121,
                    render: stt => {
                      const matchedStatus = CONTACT_STATUS.find(
                        ({ value }) => value === stt,
                      );
                      return matchedStatus ? (
                        <Health color={matchedStatus.color}>
                          {intl.formatMessage(matchedStatus.label)}
                        </Health>
                      ) : null;
                    },
                  },
                  {
                    field: 'createdAt',
                    name: <FormattedMessage defaultMessage="Created at" />,
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
                    // width: 121,
                  },
                  {
                    field: 'creator',
                    name: <FormattedMessage defaultMessage="Creator" />,
                    render: creator => (
                      <FlexGroup alignItems="center" gutterSize="xs">
                        <FlexItem className="w-28">
                          <strong className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {creator?.displayName}
                          </strong>
                          <Spacer size="xs" />
                          <Text color="#828282" className="text-xs">
                            {creator?.email}
                          </Text>
                        </FlexItem>
                      </FlexGroup>
                    ),
                    width: 200,
                  },
                  {
                    field: 'utmSource',
                    name: <FormattedMessage defaultMessage="Source" />,
                    render: (utmSource, { utmCampaign }) => (
                      <UtmPopover
                        utmSource={utmSource}
                        utmCampaign={utmCampaign}
                      />
                    ),
                  },
                ]}
              />
            </PageContentBody>
          </PageContent>
        </PageBody>
      </Page>
    </div>
  );
}

export default ContactsReceived;
