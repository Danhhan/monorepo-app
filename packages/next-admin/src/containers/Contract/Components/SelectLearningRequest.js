import { Spacer, Text } from '@antoree/ant-ui';
import AutoComplete from 'components/AutoComplete';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import {
  getLearningRequestsCommon,
  GET_LEARNING_REQUESTS,
} from 'services/learningRequest';

const SelectLearningRequest = ({
  onSelect,
  valueOfSelected,
  isInvalid,
  view,
  edit,
}) => {
  const [search, setSearch] = useState('');
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [GET_LEARNING_REQUESTS, { search }],
    context =>
      getLearningRequestsCommon({
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
        (acc, page) => acc + page?.learningRequests?.length ?? 0,
        0,
      ) ?? 0,
    [data],
  );
  const dataToRender = data?.pages
    ?.map(page =>
      page?.learningRequests?.map(el => {
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
      placeholder="Tìm với ID, SDT"
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
          label: `${el?.id} - ${el?.name} - ${el?.phone}`,
          dropdownDisplay: (
            <div>
              <div className="flex flex-row justify-items-start items-center">
                <Text key={el?.id} size="s">
                  <p key={el?.id}>
                    <span>{el?.id} - </span>
                    <span>{el?.name} - </span>
                    <span>{el?.phone}</span>
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

SelectLearningRequest.defaultProps = {
  isInvalid: false,
  view: undefined,
  edit: undefined,
};

SelectLearningRequest.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};

export default SelectLearningRequest;
