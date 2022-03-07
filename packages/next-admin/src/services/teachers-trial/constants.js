export const ROLE_ID_TRIAL =
  process.env.REACT_APP_API_URL === 'https://api-v2.stg.antoree.tech'
    ? 128
    : 127;

export const GET_TRIAL_TEACHERS = '/admin/v2/teachers';

export const UPDATE_TOP_TEACHER_TRIAL = (id, status) =>
  `/admin/v2/teachers-top-trial/${id}?is-top-trial=${status ? 1 : 0}`;
