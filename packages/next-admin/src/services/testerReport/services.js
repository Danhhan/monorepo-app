import makeRequest, { HTTP_METHOD } from '../core';
import { GET_TESTER_REPORTS } from './constants';

export const getTesterReports = async ({ fromDate, toDate }) => {
  const params = {
    from: fromDate,
    to: toDate,
  };

  const result = await makeRequest(GET_TESTER_REPORTS, HTTP_METHOD.GET, params);

  return result;
};
