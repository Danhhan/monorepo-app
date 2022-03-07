import { Spacer, Text } from '@antoree/ant-ui';
import AutoComplete from 'components/AutoComplete';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getCustomerCity, GET_CUSTOMER_CITY } from 'services/homeTown';

const SelectCityField = ({
  onSelect,
  valueOfSelected,
  isInvalid,
  view,
  edit,
}) => {
  const [search, setSearch] = useState('');

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [GET_CUSTOMER_CITY, { search }],
    context =>
      getCustomerCity({
        pageIndex: context.pageParam?.page ?? 0,
        search,
      }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      getNextPageParam: lastPage =>
        lastPage.pagination.hasMore && {
          hasMore: lastPage.pagination.hasMore,
          page: lastPage.pagination.currentPage,
          total: lastPage.pagination.totalItems,
        },
    },
  );
  const dataLength = useMemo(
    () =>
      data?.pages?.reduce(
        (acc, page) => acc + page?.customerCities?.length ?? 0,
        0,
      ) ?? 0,
    [data],
  );

  const dataToRender = data?.pages
    ?.map(page =>
      page?.customerCities?.map(el => {
        return [
          {
            ...el,
          },
        ];
      }),
    )
    .reduce((a, b) => [...a, ...b], [])
    .reduce((a, b) => [...a, ...b], []);
  useEffect(() => {
    if (edit || view) {
      setSearch(valueOfSelected);
    }
  }, [valueOfSelected]);
  return (
    <AutoComplete
      isInvalid={isInvalid}
      fullWidth
      style={{ border: '1px solid #CDCFD1' }}
      valueOfSelected={valueOfSelected}
      isLazyLoad
      hasMore={hasNextPage}
      nextFunc={fetchNextPage}
      dataLength={dataLength}
      borderRadius={8}
      options={dataToRender?.map(el => {
        return {
          ...el,
          value: el?.id,
          label: el?.name,
          dropdownDisplay: (
            <div>
              <div className="flex flex-row justify-items-start items-center">
                <Text size="s">
                  <p>{el?.name}</p>
                </Text>
              </div>
              <Spacer size="xs" />
            </div>
          ),
        };
      })}
      onSelect={onSelect}
      isLoading={isFetching}
      onSearch={withDebounce(searchValue => setSearch(searchValue))}
      disabled={view}
      handleFocus={value => {
        if (value) setSearch('');
      }}
    />
  );
};

SelectCityField.defaultProps = {
  isInvalid: false,
  view: false,
  edit: false,
};

SelectCityField.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};

export default SelectCityField;
