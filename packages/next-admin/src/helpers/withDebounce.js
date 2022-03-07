import debounce from 'lodash.debounce';

const WAIT_MS = 550;

const withDebounce = func => debounce(func, WAIT_MS);

export default withDebounce;
