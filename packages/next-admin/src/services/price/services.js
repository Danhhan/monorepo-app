import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_PRICE,
  GET_UNIT_SPECIAL_PRICE,
  CALCULATE_PRICE,
} from './constants';

export const getPrice = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    term: search,
  };
  const result = await makeRequest(GET_PRICE, HTTP_METHOD.GET, params);
  return result;
};
export const getUnitSpecialPrice = async ({ coursePrice, premiumType }) => {
  const params = {
    price_id: coursePrice.id,
    type_pre: premiumType,
    teacher_group_id: coursePrice.teacherGroupId,
    tags: coursePrice.tagId,
  };
  const result = await makeRequest(
    GET_UNIT_SPECIAL_PRICE,
    HTTP_METHOD.GET,
    params,
  );
  return result;
};
export const calulatePrice = async ({ body }) => {
  const result = await makeRequest(CALCULATE_PRICE, HTTP_METHOD.POST, body);
  return result;
};
