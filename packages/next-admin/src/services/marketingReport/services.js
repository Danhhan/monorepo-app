// import { MARKETING_COST, MARKETING_REPORTS_TOTAL } from '.';
import makeRequest, { HTTP_METHOD } from '../core';
import {
  MARKETING_REPORTS,
  MARKETING_REPORTS_BY_EMAIL,
  MARKETING_COST,
  MARKETING_REPORTS_TOTAL,
} from './constants';

/* 
campaign_id: 23845846810410144
campaign_link: ""
campaign_name: "[K] LƯU LOÁT GIAO TIẾP NGAY CHỈ VỚI 60 PHÚT/BUỔI - 3 BUỔI/TUẦN"
clicks: 0
count_contacts: 0
count_tests: 0
count_trial: 0
cpc: 114853.453386
customers: 0
gmv: 0
impressions: 291873
lr_lv2: 0
lr_lv5: 0
marketer: ""
object: "40 tuổi - Tp. HCM"
order: 1
roi: 0
spend: 33522622
*/

export const getMarketingTotal = async ({ dateFrom, dateTo }) => {
  const params = {
    'time-from': dateFrom,
    'time-to': dateTo,
  };

  const result = await makeRequest(
    MARKETING_REPORTS_TOTAL,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const getMarketingByEmail = async ({ dateFrom, dateTo }) => {
  const params = {
    'time-from': dateFrom,
    'time-to': dateTo,
  };

  const result = await makeRequest(
    MARKETING_REPORTS_BY_EMAIL,
    HTTP_METHOD.GET,
    params,
  );
  // console.log(result);
  return result;
};
export const getMarketingReports = async ({
  dateFrom,
  dateTo,
  pageIndex,
  pageSize,
  campaign,
  active,
  sortType,
}) => {
  const params = {
    'time-from': dateFrom,
    'time-to': dateTo,
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    active: active > -1 ? active : undefined,
    'sort-field': sortType,
    campaign,
  };

  const result = await makeRequest(MARKETING_REPORTS, HTTP_METHOD.GET, params);

  return result;
};
export const getMarketingCost = async ({
  dateFrom,
  pageIndex,
  pageSize,
  campaign,
  active,
  sortType,
  editType,
}) => {
  const params = {
    'time-from': dateFrom,
    'page-size': pageSize,
    'sort-field': sortType,
    type: editType,
    page: parseInt(pageIndex + 1, 10),
    active: active > -1 ? active : undefined,
    campaign,
  };

  const result = await makeRequest(MARKETING_COST, HTTP_METHOD.GET, params);

  return result;
};

export const updateMarketingReport = async ({ id, active, marketer }) => {
  const activeValue = (active ? 1 : 0) || undefined;
  // const activeValue = active !== undefined ? (active ? 1 : 0) : undefined;

  try {
    const params = {
      active: activeValue,
      marketer,
    };

    const result = await makeRequest(
      `${MARKETING_REPORTS}/${id}`,
      HTTP_METHOD.PUT,
      params,
    );

    return true;
  } catch (error) {
    return false;
  }
};
export const updateMarketingCost = async ({ id, date, value, type }) => {
  try {
    const params = {
      date,
      [type]: value,
    };
    const result = await makeRequest(
      `${MARKETING_COST}/${id}`,
      HTTP_METHOD.PUT,
      params,
    );

    return true;
  } catch (error) {
    return false;
  }
};
