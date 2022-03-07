import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_CUSTOMER_CITY,
  GET_CUSTOMER_DISTRICT,
  GET_CUSTOMER_WARD,
} from './constants';

export const getCustomerCity = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    term: search,
  };
  const result = await makeRequest(GET_CUSTOMER_CITY, HTTP_METHOD.GET, params);
  return result;
};
export const getCustomerDistrict = async id => {
  const result = await makeRequest(GET_CUSTOMER_DISTRICT(id), HTTP_METHOD.GET);
  return result;
};
export const getCustomerWard = async id => {
  const result = await makeRequest(GET_CUSTOMER_WARD(id), HTTP_METHOD.GET);
  return result;
};
