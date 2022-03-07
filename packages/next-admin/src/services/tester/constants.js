export const GET_TESTERS = '/admin/v2/tester-user';

export const CREATE_TESTER = '/admin/v2/tester-create';

export const GET_AVAIALBLETIME_TESTER = '/admin/v2/tester-availabletime';

export const GET_TESTER_BY_ID = id => `/admin/v2/tester-user/${id}`;

export const GET_SESSIONS_BY_TESTER_ID = testerId =>
  `/admin/v2/tester-session/${testerId}`;

export const GET_AVAILABLE_TIME_BY_TESTER_ID = testerId =>
  `/admin/v2/tester-availabletime/${testerId}`;

export const SEARCH_TESTERS = '/admin/v2/team/get-tester-member';

export const UPDATE_TESTER = id => `/admin/v2/testers/${id}`;
