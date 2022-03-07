import makeRequest, { HTTP_METHOD } from '../core';
import * as LEARNG_REQUEST_URL from './constants';

export const getLearningRequests = async ({
  pageIndex,
  pageSize,
  name,
  phoneNumber,
  email,
  skype,
}) => {
  const params = {
    page: pageIndex + 1,
    'page-size': pageSize,
    name,
    phone: phoneNumber,
    email,
    skype,
  };

  const result = await makeRequest(
    LEARNG_REQUEST_URL.GET_LEARNING_REQUESTS,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};
export const getLearningRequestsCommon = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    term: search,
    _common: 1,
  };

  const result = await makeRequest(
    LEARNG_REQUEST_URL.GET_LEARNING_REQUESTS,
    HTTP_METHOD.GET,
    params,
  );
  return result;
};
export const getLearningRequestsBy = async heldBy => {
  const result = await makeRequest(
    LEARNG_REQUEST_URL.GET_LR_BY(heldBy),
    HTTP_METHOD.GET,
  );
  return result;
};

export const createLearningRequest = async data => {
  const {
    firstName,
    lastName,
    birthday,
    gender,
    phoneNumber,
    email,
    skype,
    requestFor,
    learnerFirstName,
    learnerLastName,
    learnerGender,
    learnerType,
    school,
    grade,
    company,
    jobTitle,
    university,
    department,
    utmCampaign,
  } = data;

  const params = {
    'first-name': firstName,
    'last-name': lastName,
    'birth-day': birthday?.format?.('YYYY-MM-DD'),
    gender,
    phone: phoneNumber,
    email,
    skype,
    'request-for': requestFor,
    'learner-first-name': learnerFirstName,
    'learner-last-name': learnerLastName,
    'learner-gender': learnerGender,
    'learner-birthday': birthday?.format?.('YYYY-MM-DD'),
    'learner-type': learnerType,
    school,
    grade,
    company,
    'job-title': jobTitle,
    university,
    department,
    'utm-campaign': utmCampaign,
  };

  const result = await makeRequest(
    LEARNG_REQUEST_URL.CREATE_LEARNING_REQUEST,
    HTTP_METHOD.POST,
    params,
  );

  return result;
};

export const updateLearningRequest = async ({
  id,
  firstName,
  lastName,
  birthday,
  gender,
  phoneNumber,
  email,
  skype,
  requestFor,
  learnerFirstName,
  learnerLastName,
  learnerGender,
  learnerType,
  school,
  grade,
  company,
  jobTitle,
  university,
  department,
  utmCampaign,
}) => {
  const body = {
    'first-name': firstName,
    'last-name': lastName,
    'birth-day': birthday?.format?.('YYYY-MM-DD'),
    gender,
    phone: phoneNumber,
    email,
    skype,
    'request-for': requestFor,
    'learner-first-name': learnerFirstName,
    'learner-last-name': learnerLastName,
    'learner-gender': learnerGender,
    'learner-birthday': birthday?.format?.('YYYY-MM-DD'),
    'learner-type': learnerType,
    school,
    grade,
    company,
    'job-title': jobTitle,
    university,
    department,
    'utm-campaign': utmCampaign,
  };

  const result = await makeRequest(
    LEARNG_REQUEST_URL.UPDATE_LEARNING_REQUEST(id),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};
export const updateLearningRequestNote = async ({ id, params }) => {
  const body = { ...params };
  // eslint-disable-next-line no-underscore-dangle
  body._addNoteForLR = 1;
  const result = await makeRequest(
    LEARNG_REQUEST_URL.UPDATE_LEARNING_REQUEST_V1(id),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};
export const getNoteCustomerReject = async id => {
  const result = await makeRequest(
    LEARNG_REQUEST_URL.GET_NOTE_CUSTOMER_REJECT(id),
    HTTP_METHOD.GET,
  );
  return result;
};
export const getLearningRequestUtm = async id => {
  const params = {
    _get_utm: 1,
  };
  const result = await makeRequest(
    LEARNG_REQUEST_URL.GET_LEARNING_REQUEST(id),
    HTTP_METHOD.GET,
    params,
  );
  return result;
};
export const updateLearningRequestUTM = async ({ body, id }) => {
  const result = await makeRequest(
    LEARNG_REQUEST_URL.UPDATE_LEARNING_REQUEST(id),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};
export const storeAccoutingApproval = async ({ formData, requestId }) => {
  const result = await makeRequest(
    LEARNG_REQUEST_URL.STORE_ACCOUTING_APPROVAL(requestId),
    HTTP_METHOD.POST,
    formData,
  );

  return result;
};
export const getLearningRequest = async id => {
  const result = await makeRequest(
    LEARNG_REQUEST_URL.UPDATE_LEARNING_REQUEST(id),
    HTTP_METHOD.GET,
  );

  return result;
};
export const getLearningRequestV1 = async id => {
  const result = await makeRequest(
    LEARNG_REQUEST_URL.GET_LEARNING_REQUEST_V1(id),
    HTTP_METHOD.GET,
  );
  return result;
};
