export const GET_LEARNING_REQUESTS = '/admin/v2/learning-requests';
export const CREATE_LEARNING_REQUEST = '/admin/v2/learning-requests';
export const GET_LEARNING_REQUEST = id => `/admin/v2/learning-requests/${id}`;
export const UPDATE_LEARNING_REQUEST = id =>
  `/admin/v2/learning-requests/${id}`;
export const UPDATE_LEARNING_REQUEST_V1 = id => `/v1/learning-request/${id}`;
export const GET_LR_BY = heldBy =>
  `/admin/v2/contact/${heldBy}/learningRequests`;
export const GET_NOTE_CUSTOMER_REJECT = lrId =>
  `/admin/v2/note-customer-reject/${lrId}`;
export const STORE_ACCOUTING_APPROVAL = id =>
  `/v1/learning-request/${id}/store-accounting-level`;
export const GET_LEARNING_REQUEST_V1 = id => `/v1/learning-request/${id}`;
