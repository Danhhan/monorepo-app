import makeRequest, { HTTP_METHOD } from '../core';
import { SELF_BOOKED_REPORT } from './constants';

export const getSelfBookedReport = async ({ fromDate, toDate, ContactFee }) => {
  const utmList = ['mar-web', 'mar-mobile', '[Mobile][AS]', '[WEB][AS]'];
  const params = {
    from: fromDate,
    to: toDate,
    ContactFee: 0,
    'utm-source[]': utmList,
  };

  const result = await makeRequest(SELF_BOOKED_REPORT, HTTP_METHOD.GET, params);

  return result;
};
