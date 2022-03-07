/* eslint-disable no-fallthrough */
import { notification, Page, PageBody, PageContent } from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import { useBreadcrumbs, usePagiantion, useRemoveParams } from 'hooks';
import moment from 'moment';
import { useContext, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import {
  getMarketingByEmail,
  getMarketingReports,
  getMarketingTotal,
  MARKETING_REPORTS,
  MARKETING_REPORTS_BY_EMAIL,
  MARKETING_REPORTS_TOTAL,
  updateMarketingReport,
} from 'services/marketingReport';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import { getToken } from '../../helpers/token';
import MarketingReportHeader from './components/MarketingReportHeader';
import MarkingReportFilterDate from './components/MarkingReportFilterDate';
import MarketingCost from './MarketingCost';
import { GlobalContext } from './MarketingGobalProvinder';
import MarketingReportTable from './MarketingReportTable/MarketingReportTable';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Marketing Report" />,
  },
];

const MarketingReport = () => {
  useBreadcrumbs(breadcrumbs);
  const { path } = useRouteMatch();
  const token = getToken();

  return (
    <Switch>
      <Route exact path={path}>
        <MarketingReportPage />
      </Route>
      <Route path={`${path}/price`}>
        <MarketingCost />
      </Route>
    </Switch>
  );
};

const MarketingReportPage = () => {
  const intl = useIntl();

  const [emailUtm, setEmailUtm] = useState('');
  const { path } = useRouteMatch();
  const hanldegetEmail = email => {
    setEmailUtm(email);
  };

  const {
    pageIndex,
    pageSize,
    dateFrom,
    dateTo,
    query,
    active,
    campaign,
    sortType,
    onTableChangeHandler,
    onInputChange,
    onSelect,
  } = usePagiantion({
    dateFrom: StringParam,
    dateTo: StringParam,
    sortType: withDefault(StringParam, 'count_contacts'),
    campaign: withDefault(StringParam, ''),
    active: NumberParam,
  });

  const yest = new Date(Date.now() - 86400000);
  const yesterday = moment(yest).format('YYYY-MM-DD');
  // console.log(yesterday);
  const today = moment().format('YYYY-MM-DD');
  const { data: totalData } = useQuery(
    [MARKETING_REPORTS_TOTAL, dateFrom, dateTo],
    () =>
      getMarketingTotal({
        dateFrom: dateFrom || yesterday,
        dateTo: dateTo || today,
      }),
  );

  const { data: databyEmail } = useQuery(
    [MARKETING_REPORTS_BY_EMAIL, dateFrom, dateTo],
    () =>
      getMarketingByEmail({
        dateFrom: dateFrom || yesterday,
        dateTo: dateTo || today,
      }),
  );
  const { isLoading, isFetching } = useQuery(
    [MARKETING_REPORTS, dateFrom, dateTo, query, sortType],
    () =>
      getMarketingReports({
        dateFrom,
        dateTo,
        pageSize,
        pageIndex,
        campaign,
        active,
        sortType,
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

  const dataOptionifNotNull = databyEmail ? databyEmail.data : [];

  /*  xóa các email trùng lặp để sử dụng cho tính năng combobox, tránh user chọn nhiều nhãn 
  giống nhau :
   before:  [{"abc@antorree"},"abc@antorree","abcd@antorree"]
    after:  ["abc@antorree","abcd@antorree"]
    */
  const dataMaketers = useMemo(() => {
    const resp = dataOptionifNotNull.filter(
      (v, i, a) => a.findIndex(t => t.utmEmail === v.utmEmail) === i,
    );
    return resp;
  }, [dataOptionifNotNull]);

  // console.log(dataMaketers);

  const getMarkter = dataMaketers.map(item => ({
    label: item ? item.utmEmail : '',
    campaignName: item.campaignName,
    countTests: item.countTests,
    active: item.active,
    spend: item.spend,
    countContacts: item.countContacts,
    countTrial: item.countTrial,
    cpc: item.cpc,
    customers: item.customers,
    gmv: item.gmv,
    impressions: item.impressions,
    lrLv2: item.lrLv2,
    roi: item.roi,
    contact_stop: item.contact_stop,
    dataitem: databyEmail.data.filter(i => i.utmEmail === item.utmEmail), // lấy data theo email của utm đó
  }));
  const { onRemoveAll } = useRemoveParams();

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

  const {
    dataMakter,
    addList,
    removeListiTem,
    getList,
    marketerTotal,
  } = useContext(GlobalContext);

  const handleAddNew = dataArray => {
    addList(dataArray);
  };

  const handleRemove = item => {
    // console.log(item);
    removeListiTem(item);
    // dispatch({
    //   type: 'DELETE_LIST',
    //   payload: { item },
    // });
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
    event && onSelect(inputName)(date.format('YYYY-MM-DD HH:mm:ss'));

  // const tableItems = () => {
  //   const allData = [...(items?.data ?? [])];
  //   totalData?.data && allData.unshift(totalData?.data);

  //   return allData;
  // };
  return (
    <Page>
      <PageBody>
        <MarketingReportHeader
          dataTotalItem={data?.pagination?.totalItems}
          isFetching={isFetching}
          isLoading={isLoading}
          onRemoveAll={onRemoveAll}
          onSelect={onSelect}
          active={active}
          path={path}
          query={query}
        />
        <PageContent>
          <MarkingReportFilterDate
            campain={campaign || ''}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onInputChange={onInputChange}
            onSelect={onSelect}
            sortType={sortType}
            onSelectDatePicker={onSelectDatePicker}
            withDebounce={withDebounce}
          />

          <MarketingReportTable
            data={getMarkter || []}
            handleRemove={handleRemove}
            decimalFormat={decimalFormat}
            isLoading={isLoading}
            formatPercentage={formatPercentage}
            currencyFormatter={currencyFormatter}
            // datatable={emailUtm ? dataUtmfilterbyEmail : dataUtm}
            dateFrom={dateFrom}
            dateTo={dateTo}
            getList={getList}
            divideIfNotZero={divideIfNotZero}
            emailUtm={emailUtm}
            hanldegetEmail={hanldegetEmail}
            onUpdateCampaignActive={onUpdateCampaignActive}
            pageIndex={pageIndex}
            pageSize={pageSize}
            onTableChangeHandler={onTableChangeHandler}
          />
        </PageContent>
      </PageBody>
    </Page>
  );
};

export default MarketingReport;
