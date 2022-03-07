const isArray = data => {
  if (Array.isArray(data) && data.length > 0) return true;
  return false;
};
export default isArray;
