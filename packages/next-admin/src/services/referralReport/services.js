import makeRequest, { HTTP_METHOD } from '../core';
import { GET_REPORTS_DAILY } from './constants';

export const getReportsDaily = async ({ fromDate, toDate, ContactFee }) => {
  const params = {
    _report_v2: 1,
    from: fromDate,
    to: toDate,
    ContactFee: 0,
    utm_source: '[Mobile-Referral][ASR]',
  };

  const result = await makeRequest(GET_REPORTS_DAILY, HTTP_METHOD.GET, params);

  return result;
};
