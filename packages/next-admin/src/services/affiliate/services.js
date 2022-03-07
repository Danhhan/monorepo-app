import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_CAMPAIGN,
  CREATE_CAMPAIGN,
  GET_PARTNER,
  GET_CAMPAIGN_REPORT,
  CREATE_CAMPAIGN_LINK,
  GET_PARTNER_BY_ID,
  UPDATE_CAMPAIGN_STATUS,
} from './constants';

export const createCampaign = async ({ formData }) => {
  const result = await makeRequest(CREATE_CAMPAIGN, HTTP_METHOD.POST, formData);

  return result;
};
export const getCampaign = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    campaign: search,
  };
  const result = await makeRequest(GET_CAMPAIGN, HTTP_METHOD.GET, params);
  return result;
};
export const getPartner = async ({
  pageIndex,
  pageSize,
  createdAtFrom,
  createdAtTo,
  term,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    'from-date': createdAtFrom,
    'to-date': createdAtTo,
    term,
  };
  const result = await makeRequest(GET_PARTNER, HTTP_METHOD.GET, params);
  return result;
};
export const getCampaignReport = async ({
  pageIndex,
  pageSize,
  createdAtFrom,
  createdAtTo,
  campaign,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    'from-date': createdAtFrom,
    'to-date': createdAtTo,
    campaign,
  };
  const result = await makeRequest(
    GET_CAMPAIGN_REPORT,
    HTTP_METHOD.GET,
    params,
  );
  return result;
};
export const createCampaignLink = async ({ params }) => {
  const result = await makeRequest(
    CREATE_CAMPAIGN_LINK,
    HTTP_METHOD.POST,
    params,
  );

  return result;
};
export const getPartnerById = async ({ id, pageIndex, pageSize }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
  };
  const result = await makeRequest(
    GET_PARTNER_BY_ID(id),
    HTTP_METHOD.GET,
    params,
  );

  return result;
};
export const updateCampaignStatus = async ({ id, status }) => {
  const result = await makeRequest(
    UPDATE_CAMPAIGN_STATUS(id),
    HTTP_METHOD.PUT,
    { status },
  );

  return result;
};
