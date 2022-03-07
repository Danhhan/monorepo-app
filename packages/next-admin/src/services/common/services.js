import makeRequest, { HTTP_METHOD } from '../core';
import * as COMMON_URL from './constants';

export const getCertificates = async localePara => {
  const params = { locale: localePara };

  const result = await makeRequest(
    COMMON_URL.GET_CERTIFICATES,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const getNationsList = async localePara => {
  return makeRequest(COMMON_URL.GET_NATION, HTTP_METHOD.GET, {
    locale: localePara,
  });
};

export const getLearningTopics = async localePara => {
  const params = { locale: localePara };

  const result = await makeRequest(
    COMMON_URL.GET_LEARNING_TOPICS,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const getSalemans = async () => {
  const result = await makeRequest(COMMON_URL.GET_SALEMANS, HTTP_METHOD.GET);

  return result?.teams?.map?.(({ name, members }) => ({
    label: name,
    options:
      members?.length > 0
        ? members.map(({ shownName, id }) => ({
            label: shownName,
            id,
            key: id,
          }))
        : [],
  }));
};
