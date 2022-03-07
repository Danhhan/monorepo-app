import { Spacer, Text } from '@antoree/ant-ui';
import AutoComplete from 'components/AutoComplete';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPrice, GET_PRICE } from 'services/price';
import { formatMoney } from 'utils';

const SelectPriceField = ({
  onSelect,
  valueOfSelected,
  isInvalid,
  view,
  edit,
}) => {
  const [search, setSearch] = useState('');
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [GET_PRICE, { search }],
    context =>
      getPrice({
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
      data?.pages?.reduce((acc, page) => acc + page?.prices?.length ?? 0, 0) ??
      0,
    [data],
  );

  const dataToRender = data?.pages
    ?.map(page =>
      page?.prices?.map(el => {
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
      placeholder="Tìm với ID, tên khóa"
      valueOfSelected={valueOfSelected}
      isLazyLoad
      hasMore={hasNextPage}
      nextFunc={fetchNextPage}
      dataLength={dataLength}
      borderRadius={8}
      style={{ border: '1px solid #CDCFD1' }}
      options={dataToRender?.map(el => {
        return {
          ...el,
          value: el?.id,
          label: el?.title,
          dropdownDisplay: (
            <div>
              <div className="flex flex-row justify-items-start items-center">
                <Text size="s">
                  <p>
                    <strong>{el?.title} | </strong>
                    <span>Giá: {formatMoney(el?.price)} | </span>
                    <span>Giờ: {el?.duration}</span>
                  </p>
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

SelectPriceField.defaultProps = {
  isInvalid: false,
  view: false,
  edit: false,
};

SelectPriceField.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};

export default SelectPriceField;
