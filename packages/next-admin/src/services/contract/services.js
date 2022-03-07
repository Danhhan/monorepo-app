import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_CONTRACT,
  CREATE_CONTRACT,
  GET_CONTRACT_DETAIL,
} from './constants';

export const getContracts = async ({
  pageIndex,
  pageSize,
  createdAtFrom,
  createdAtTo,
  startTimeFrom,
  startTimeTo,
  teamSale,
  term,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    'team-sale-id': teamSale,
    'created-at-from': createdAtFrom,
    'created-at-to': createdAtTo,
    'time-start-from': startTimeFrom,
    'time-start-to': startTimeTo,
    term,
  };

  const result = await makeRequest(GET_CONTRACT, HTTP_METHOD.GET, params);
  return result;
};
export const createContract = async ({
  formData,
  issuedDate,
  issuedDateServieceUser,
  paymentDate,
  timeStart,
  birthDay,
}) => {
  const body = {
    ...formData,
    issued_date: issuedDate,
    issued_date_serviece_user: issuedDateServieceUser,
    payment_date: paymentDate,
    time_start: timeStart,
    birth_day: birthDay,
  };
  const result = await makeRequest(CREATE_CONTRACT, HTTP_METHOD.POST, body);
  return result;
};
export const updateContract = async ({
  formData,
  issuedDate,
  issuedDateServieceUser,
  paymentDate,
  timeStart,
  birthDay,
  id,
}) => {
  const body = {
    ...formData,
    issued_date: issuedDate,
    issued_date_serviece_user: issuedDateServieceUser,
    payment_date: paymentDate,
    time_start: timeStart,
    birth_day: birthDay,
  };
  const result = await makeRequest(
    GET_CONTRACT_DETAIL(id),
    HTTP_METHOD.PUT,
    body,
  );
  return result;
};

export const getContractDetail = async id => {
  const result = await makeRequest(GET_CONTRACT_DETAIL(id), HTTP_METHOD.GET);
  return result;
};

export const getContractsCommon = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    term: search,
    _common: 1,
  };

  const result = await makeRequest(GET_CONTRACT, HTTP_METHOD.GET, params);
  return result;
};
