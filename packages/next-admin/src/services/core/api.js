import axios from 'axios';
import { stringify } from 'query-string';
import { getToken, removeToken } from 'helpers';
import appConfig from 'configs/app.config';
import {
  PUBLIC_API,
  HTTP_METHOD,
  AUTHENTICATED_ERROR_CODES,
} from './constants';

const { apiUrl } = appConfig;

export class FetchError extends Error {
  constructor(message, error) {
    super(message);
    this.response = {
      name: 'fetchError',
      message: error?.response?.data?.message || message,
      code: error?.response?.data?.code || 'REQUEST_FAILED',
    };

    this.code = error?.response?.data?.code || 'REQUEST_FAILED';
  }
}

const fetchInstance = axios.create({
  baseURL: apiUrl,
  timeout: 120000, // Waiting 2m for request timeout
  headers: {
    'Cache-Control': 'no-cache',
  },
});

fetchInstance.interceptors.request.use(function handleRequest(reqConfig) {
  const configOverride = reqConfig;

  if (!PUBLIC_API.includes(configOverride.url)) {
    const token = getToken();

    configOverride.headers.Authorization = token;
  }

  return configOverride;
});

fetchInstance.interceptors.response.use(
  function handleRespone(response) {
    const { data } = response;
    // Override respone here if needed
    return data;
  },
  function handleError(error) {
    const codeError = error?.response?.data?.code;

    if (AUTHENTICATED_ERROR_CODES.includes(codeError)) {
      removeToken();
    }

    return Promise.reject(error);
  },
);

/**
 * Make XMLHttpRequests with Axios instance.
 *
 * @param {String} url
 * @param {String} method
 * @param {Object} data
 * @param {Object} reqConfig
 *
 * @return
 */
export default async function makeRequest(
  url,
  method,
  data = {},
  requestConfig = {},
) {
  let response;
  const queryString = stringify(data);

  const urlWithQueryString = [url, queryString].join('?');

  try {
    switch (method) {
      case HTTP_METHOD.GET:
        response = await fetchInstance.get(urlWithQueryString, requestConfig);
        break;
      case HTTP_METHOD.POST:
        response = await fetchInstance.post(url, data, requestConfig);
        break;
      case HTTP_METHOD.PUT:
        response = await fetchInstance.put(url, data, requestConfig);
        break;
      case HTTP_METHOD.DELETE:
        response = await fetchInstance.delete(
          urlWithQueryString,
          requestConfig,
        );
        break;
      default:
        throw new Error('HTTP method is required.');
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
