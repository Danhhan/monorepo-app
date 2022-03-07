import { useCallback } from 'react';
import {
  useQueryParams,
  withDefault,
  NumberParam,
  StringParam,
} from 'use-query-params';

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 25;

function usePagiantion(
  QueryTypeParams?: { [key: string]: any },
  config?: { [key: string]: any },
) {
  const queryParams: { [key: string]: any } = {
    pageIndex: withDefault(
      NumberParam,
      config?.defaultPageIndex ?? DEFAULT_PAGE_INDEX,
    ),
    pageSize: withDefault(
      NumberParam,
      config?.defaultPageSize ?? DEFAULT_PAGE_SIZE,
    ),
    ...QueryTypeParams,
  };

  if (config?.defaultSortField) {
    queryParams.sortField = withDefault(StringParam, config.defaultSortField);
  }

  if (config?.defaultSortDirection) {
    queryParams.sortDirection = withDefault(
      StringParam,
      config.defaultSortDirection,
    );
  }

  const [query, setQuery] = useQueryParams(queryParams);

  const onTableChangeHandler = useCallback(
    ({ page = {}, sort = {} }) => {
      const { index: pageIndex, size: pageSize } = page;

      const { field: sortField, direction: sortDirection } = sort;

      setQuery({ pageIndex, pageSize, sortField, sortDirection });
    },
    [setQuery],
  );

  const onInputChange = useCallback(
    fieldName => (e: { target: { value: any } }) =>
      setQuery({
        [fieldName]: e.target.value,
        // pageIndex: config?.defaultPageIndex || 1,
      }),
    [setQuery, config],
  );

  const onSelect = useCallback(
    fieldName => (value: any) =>
      setQuery({
        [fieldName]: value,
        // pageIndex: config?.defaultPageIndex || 1,
      }),
    [setQuery, config],
  );

  return { ...query, onTableChangeHandler, onInputChange, onSelect, query };
}

export default usePagiantion;
