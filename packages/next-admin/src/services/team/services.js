import makeRequest, { HTTP_METHOD } from '../core';
import { GET_SALE_MEMBERS, GET_TEAM_SALES } from './constants';

export const getSaleMembers = async ({ pageIndex, pageSize, role, term }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    role,
    term,
  };

  const result = await makeRequest(GET_SALE_MEMBERS, HTTP_METHOD.GET, params);

  return result;
};
export const getTeamSales = async () => {
  const result = await makeRequest(GET_TEAM_SALES, HTTP_METHOD.GET, {});

  return result;
};
