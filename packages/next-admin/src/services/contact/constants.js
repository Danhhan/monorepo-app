export const DEVIDE_CONTACT = `/v1/contact`;
export const REASSIGN_CONTACT = lrId => `${DEVIDE_CONTACT}/${lrId}`;
export const GET_CONTACT = `admin/v2/contacts`;
export const GET_TOTAL_CONTACT = `admin/v2/total-contact`;
export const GET_CONTACT_DETAIL = id => `v1/contact/${id}`;
export const GET_CONTACT_HISTORY = id => `v1/contact/${id}/history`;
export const WITHDRAW_CONTACT = 'admin/v2/withdraw-contact';
