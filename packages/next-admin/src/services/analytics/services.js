import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_OVERVIEW,
  GET_OVERVIEW_CHART,
  GET_ANTOREE_CALL_OVERVIEW,
} from './constants';

export const getOverview = async () => {
  const result = await makeRequest(GET_OVERVIEW, HTTP_METHOD.GET);

  return result;
};

export const getOverviewChart = async () => {
  const result = await makeRequest(GET_OVERVIEW_CHART, HTTP_METHOD.GET);

  return result;
};

export const getAntoreeCallOverview = async ({ fromDate, toDate }) => {
  const params = {
    from: fromDate,
    to: toDate,
  };

  const result = await makeRequest(
    GET_ANTOREE_CALL_OVERVIEW,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};
