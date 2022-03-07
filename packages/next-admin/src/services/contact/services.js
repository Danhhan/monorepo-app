import makeRequest, { HTTP_METHOD } from '../core';
import {
  DEVIDE_CONTACT,
  REASSIGN_CONTACT,
  GET_CONTACT,
  GET_CONTACT_DETAIL,
  GET_CONTACT_HISTORY,
  GET_TOTAL_CONTACT,
  WITHDRAW_CONTACT,
} from './constants';

export const bulkUpdate = async params => {
  const result = await makeRequest(DEVIDE_CONTACT, HTTP_METHOD.PUT, params);
  return result;
};
export const updateContact = async ({ params, contactId }) => {
  const result = await makeRequest(
    REASSIGN_CONTACT(contactId),
    HTTP_METHOD.PUT,
    params,
  );

  return result;
};
export const getContacts = async ({
  pageIndex,
  pageSize,
  status,
  requestId,
  term,
  createdAtFrom,
  createdAtTo,
  source,
  campaign,
  caredBy,
  leaderTab,
  ctvTab,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    _general_contact: 1,
    status,
    'request-id': requestId,
    term,
    'created-at-from': createdAtFrom,
    'created-at-to': createdAtTo,
    'utm-source': source,
    'utm-campaign': campaign,
    'cared-by': caredBy,
    'tab-leader': leaderTab,
    'tab-ctv': ctvTab,
  };

  const result = await makeRequest(GET_CONTACT, HTTP_METHOD.GET, params);
  return result;
};
export const getTotalContact = async ({
  pageIndex,
  pageSize,
  status,
  requestId,
  term,
  createdAtFrom,
  createdAtTo,
  source,
  campaign,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    status,
    'request-id': requestId,
    term,
    'created-at-from': createdAtFrom,
    'created-at-to': createdAtTo,
    'utm-source': source,
    'utm-campaign': campaign,
  };

  const result = await makeRequest(GET_TOTAL_CONTACT, HTTP_METHOD.GET, params);
  return result;
};
export const getMyContacts = async ({
  pageIndex,
  pageSize,
  status,
  requestId,
  term,
  createdAtFrom,
  createdAtTo,
  source,
  campaign,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    _my_contact: 1,
    status,
    'request-id': requestId,
    term,
    'created-at-from': createdAtFrom,
    'created-at-to': createdAtTo,
    'utm-source': source,
    'utm-campaign': campaign,
  };

  const result = await makeRequest(GET_CONTACT, HTTP_METHOD.GET, params);

  return result;
};
export const getContactDetail = async id => {
  const result = await makeRequest(GET_CONTACT_DETAIL(id), HTTP_METHOD.GET);
  return result;
};
export const getContactHistory = async id => {
  const result = await makeRequest(GET_CONTACT_HISTORY(id), HTTP_METHOD.GET);
  return result;
};
export const getContactAvailable = async () => {
  const result = await makeRequest(GET_TOTAL_CONTACT, HTTP_METHOD.GET, {
    _available_new_contacts: 1,
  });
  return result;
};
export const getReceivedContacts = async ({ caredAtFrom, caredAtTo }) => {
  const params = {
    _received_contact: 1,
    'cared-at-from': caredAtFrom,
    'cared-at-to': caredAtTo,
  };

  const result = await makeRequest(GET_CONTACT, HTTP_METHOD.GET, params);

  return result;
};
export const withdrawContact = async ({ fromDate }) => {
  const params = {
    'from-date': fromDate,
  };
  const result = await makeRequest(WITHDRAW_CONTACT, HTTP_METHOD.PUT, params);
  return result;
};
export const reportWithdrawContact = async () => {
  const result = await makeRequest(WITHDRAW_CONTACT, HTTP_METHOD.GET);
  return result;
};
