import makeRequest, { HTTP_METHOD } from '../core';
import { GET_REPORTS_DAILY, GET_REPORTS_DAILY_V2 } from './constants';

export const getReportsDaily = async ({
  fromDate,
  toDate,
  ContactFee,
  utmList,
}) => {
  const params = {
    _report_v2: 1,
    from: fromDate,
    to: toDate,
    ContactFee,
    'utm-source[]': utmList,
  };

  const result = await makeRequest(GET_REPORTS_DAILY, HTTP_METHOD.GET, params);

  return result;
};
export const getReportsDailyV2 = async ({
  fromDate,
  toDate,
  ContactFee,
  utmList,
}) => {
  const params = {
    from: fromDate,
    to: toDate,
    ContactFee,
    'utm-source[]': utmList,
  };

  const result = await makeRequest(
    GET_REPORTS_DAILY_V2,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};
