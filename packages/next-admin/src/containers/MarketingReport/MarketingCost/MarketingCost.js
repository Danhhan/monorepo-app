import {
  BasicTable,
  ButtonIcon,
  ComboBox,
  DatePicker,
  FieldSearch,
  FlexGroup,
  FlexItem,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  PageHeader,
  Title,
} from '@antoree/ant-ui';
import EditableText from 'components/EditableText';
import FilterTab from 'components/FilterTab';
import { LoadingableSwitch } from 'components/Switch';
import { withDebounce } from 'helpers';
import { useBreadcrumbs, usePagiantion, useRemoveParams } from 'hooks';
import moment from 'moment';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  getMarketingCost,
  MARKETING_COST,
  updateMarketingCost,
  updateMarketingReport,
} from 'services/marketingReport';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import { EDIT_VALUES, FILTER_TABS, SORT_VALUES } from '../constants';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Marketing Report" />,
  },
  {
    text: <FormattedMessage defaultMessage="Input MKT Data" />,
  },
];

const MarketingCost = () => {
  useBreadcrumbs(breadcrumbs);

  const intl = useIntl();

  const {
    pageIndex,
    pageSize,
    dateFrom,
    query,
    active,
    campaign,
    sortType,
    editType,
    onTableChangeHandler,
    onInputChange,
    onSelect,
  } = usePagiantion({
    dateFrom: withDefault(StringParam, moment().format('YYYY-MM-DD')),
    sortType: withDefault(StringParam, 'count_contacts'),
    campaign: withDefault(StringParam, ''),
    active: NumberParam,
    editType: withDefault(StringParam, EDIT_VALUES[0].value),
  });

  const { isLoading, isFetching } = useQuery(
    [MARKETING_COST, dateFrom, query, sortType],
    () =>
      getMarketingCost({
        dateFrom,
        pageSize,
        pageIndex,
        campaign,
        active,
        sortType,
        editType,
      }),
    {
      onSuccess: data => setData(data),
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

  const { onRemoveAll } = useRemoveParams();

  const history = useHistory();

  const [data, setData] = useState(undefined);

  const onUpdateCampaignActive = async (campaignId, campaignActive) => {
    const updated = await updateMarketingReport({
      id: campaignId,
      active: !campaignActive,
    });

    if (updated) {
      // update value
      const newData = {
        ...data,
        data: data.data.map(report => {
          if (report.campaign_id === campaignId) {
            // return report with new value
            return {
              ...report,
              active: !campaignActive,
            };
          }
          return report;
        }),
      };

      setData(newData);
    }
  };

  const divideIfNotZero = (num, dem) => {
    if (dem === 0 || isNaN(dem)) {
      return 0;
    }
    return num / dem;
  };

  const currencyFormatter = Intl.NumberFormat('en-US');
  const decimalFormat = Intl.NumberFormat({
    maximumSignificantDigits: 3,
  });

  const formatPercentage = number => `${Math.round(number * 100)}%`;

  const onSelectDatePicker = inputName => (date, event) =>
    // event is not undefined if user click to the date, not the month navigation
    event && onSelect(inputName)(date.format('YYYY-MM-DD'));

  const datesInWeek = stringDate => {
    const dates = [];
    for (let index = 0; index < 7; index += 1) {
      const firstDate = moment(stringDate, 'YYYY-MM-DD', true).startOf('week');
      const nextDate = firstDate.add(index, 'days');

      dates.push(nextDate);
    }

    return dates;
  };

  const onUpdateMarketingCost = async (id, date, value) => {
    const updated = await updateMarketingCost({
      id,
      date,
      value,
      type: editType,
    });

    if (updated) {
      // update value
      const newData = {
        ...data,
        data: data.data.map(report => {
          if (report.campaign_id === id) {
            // return report with new value
            return {
              ...report,
              [date]: value,
            };
          }
          return report;
        }),
      };

      setData(newData);
    }
  };

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <ButtonIcon
                  color="subdued"
                  display="base"
                  iconType="arrowLeft"
                  size="m"
                  aria-label="Prev"
                  onClick={() => history.push('/marketing-report/')}
                />
              </FlexItem>
              <FlexItem grow={false} className="w-64">
                <Title>
                  <h2>
                    <FormattedMessage defaultMessage="Input MKT Data" />
                  </h2>
                </Title>
              </FlexItem>
              <FlexItem grow={false}>
                <FilterTab
                  count={data?.pagination?.totalItems}
                  items={FILTER_TABS}
                  selectedValue={active}
                  loading={isLoading || isFetching}
                  onSelect={async (key, value) => {
                    await onRemoveAll(query);
                    await onSelect(key)(value);
                  }}
                />
              </FlexItem>
            </FlexGroup>
          }
        />

        <PageContent>
          <PageContentHeader>
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup
                justifyContent="flexEnd"
                alignItems="center"
                gutterSize="s"
              >
                <FlexItem grow={false} className="w-72">
                  <ComboBox
                    async
                    isClearable={false}
                    singleSelection={{ asPlainText: true }}
                    prepend={intl.formatMessage({
                      defaultMessage: 'Loại dữ liệu nhập',
                    })}
                    options={EDIT_VALUES}
                    onChange={selectedOptions =>
                      onSelect('editType')(selectedOptions[0].value)
                    }
                    selectedOptions={EDIT_VALUES.filter(
                      editValue => editType === editValue.value,
                    )}
                  />
                </FlexItem>
                <FlexItem />
                <FlexItem grow={false} className="w-72">
                  <FieldSearch
                    defaultValue={campaign}
                    onChange={withDebounce(onInputChange('campaign'))}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Tìm chiến dịch quảng cáo',
                    })}
                    isClearable
                    fullWidth
                  />
                </FlexItem>
                <FlexItem grow={false}>
                  <DatePicker
                    selected={dateFrom && moment(dateFrom)}
                    onChange={(date, event) => {
                      onSelectDatePicker('dateFrom')(date, event);
                    }}
                    filterDate={date => date.day() === 0}
                    onClear={() => {
                      onSelect('dateFrom')(undefined);
                    }}
                    aria-label="Date From"
                  />
                </FlexItem>
                <FlexItem grow={false} className="w-72">
                  <ComboBox
                    async
                    isClearable={false}
                    singleSelection={{ asPlainText: true }}
                    prepend={intl.formatMessage({
                      defaultMessage: 'Sắp xếp theo: ',
                    })}
                    options={SORT_VALUES}
                    onChange={selectedOptions => {
                      return onSelect('sortType')(selectedOptions[0].value);
                    }}
                    selectedOptions={SORT_VALUES.filter(
                      option => option.value === sortType,
                    )}
                  />
                </FlexItem>
              </FlexGroup>
            </PageContentHeaderSection>
          </PageContentHeader>

          <PageContentBody>
            <div
              style={{
                maxWidth: '100vw',
                height: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
              }}
            >
              <BasicTable
                tableLayout="auto"
                loading={isLoading}
                items={data?.data ?? []}
                style={{ margin: '0 12px', width: 'fit-content' }}
                columns={[
                  {
                    field: 'campaign_name',
                    name: <FormattedMessage defaultMessage="Campaign name" />,
                    textOnly: true,
                    width: 300,
                  },
                  {
                    field: 'active',
                    name: <FormattedMessage defaultMessage="Operating" />,
                    render: (campaignActive, { campaign_id: campaignId }) => (
                      <LoadingableSwitch
                        checked={campaignActive}
                        onChange={() =>
                          onUpdateCampaignActive(campaignId, campaignActive)
                        }
                      />
                    ),
                    width: 90,
                  },
                  ...datesInWeek(dateFrom).map(date => ({
                    field: date.format('YYYY-MM-DD'),
                    name: date.format('MM/DD'),
                    render: (cost, { campaign_id: campaignId }) => (
                      <EditableText
                        isNumber
                        value={cost}
                        onEditCompleted={async value =>
                          onUpdateMarketingCost(
                            campaignId,
                            date.format('YYYY-MM-DD'),
                            value,
                          )
                        }
                        append="đ"
                        render={() =>
                          cost ? (
                            <span>&nbsp;{currencyFormatter.format(cost)}đ</span>
                          ) : (
                            <></>
                          )
                        }
                      />
                    ),
                    width: '180',
                  })),
                ]}
                onChange={onTableChangeHandler}
                pagination={{
                  pageIndex,
                  pageSize,
                  totalItemCount: data?.pagination?.totalItems ?? 0,
                }}
              />
            </div>
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
};

export default MarketingCost;
