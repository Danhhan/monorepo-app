import makeRequest, { HTTP_METHOD } from '../core';
import { GET_TRIAL_REPORTS } from './constants';

export const getTrialReports = async ({ fromDate, toDate }) => {
  const params = {
    from: fromDate,
    to: toDate,
  };

  const result = await makeRequest(GET_TRIAL_REPORTS, HTTP_METHOD.GET, params);

  return result;
};
