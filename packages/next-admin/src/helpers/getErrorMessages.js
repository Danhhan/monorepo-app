const getErrorMessages = error => {
  const responseErrorData = error?.response?.data?.errors;

  return responseErrorData?.map?.(({ message }) => message) ?? [];
};

export default getErrorMessages;
