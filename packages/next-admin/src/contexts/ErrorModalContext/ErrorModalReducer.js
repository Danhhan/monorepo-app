const initState = {
  isVisiable: false,
  error: undefined,
};

function errorModalReducer(state, action) {
  switch (action.type) {
    case 'SHOW_ERROR_MODAL':
      return {
        ...state,
        isVisiable: true,
        error: action?.err,
      };
    case 'CLOSE_ERROR_MODAL':
      return {
        ...state,
        isVisiable: false,
        error: undefined,
      };
    default:
      throw new Error('Invalid action');
  }
}
export { initState };
export default errorModalReducer;
