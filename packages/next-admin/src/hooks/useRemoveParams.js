import { useHistory, useLocation } from 'react-router';

function useRemoveParams() {
  const location = useLocation();
  const history = useHistory();

  const onRemove = fieldName => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(fieldName)) {
      queryParams.delete(fieldName);
      history.replace({
        search: queryParams.toString(),
      });
    }
  };
  const onRemoveAll = searchParams => {
    const queryParams = new URLSearchParams(location.search);
    for (const key in searchParams) {
      if (queryParams.has(key)) {
        queryParams.delete(key);
        history.replace({
          search: queryParams.toString(),
        });
      }
    }
  };
  return { onRemoveAll, onRemove };
}

export default useRemoveParams;
