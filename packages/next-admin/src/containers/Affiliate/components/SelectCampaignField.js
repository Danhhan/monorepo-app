import { Avatar, FlexGroup, FlexItem, Spacer, Text } from '@antoree/ant-ui';
import AutoComplete from 'components/AutoComplete';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getCampaign, GET_CAMPAIGN } from 'services/affiliate';

const SelectCampaignField = ({
  onSelect,
  valueOfSelected,
  isInvalid,
  view,
  edit,
}) => {
  const [search, setSearch] = useState('');

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [GET_CAMPAIGN],
    context =>
      getCampaign({
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
      data?.pages?.reduce((acc, page) => acc + page?.data?.length ?? 0, 0) ?? 0,
    [data],
  );

  const dataToRender = data?.pages
    ?.map(page =>
      page?.data?.map(el => {
        return [
          {
            ...el,
          },
        ];
      }),
    )
    .reduce((a, b) => [...a, ...b], [])
    .reduce((a, b) => [...a, ...b], []);

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
          label: el?.utmCampaign,
          dropdownDisplay: (
            <FlexGroup>
              <FlexItem grow={false}>
                <Avatar
                  size="l"
                  name={el?.utmCampaign ?? ''}
                  imageUrl={el?.imageUrl ?? ''}
                  type="space"
                />
              </FlexItem>
              <FlexItem grow={false}>
                <Text>
                  <p>{el.utmCampaign}</p>
                </Text>
              </FlexItem>
            </FlexGroup>
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

SelectCampaignField.defaultProps = {
  isInvalid: false,
  view: false,
  edit: false,
};

SelectCampaignField.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};

export default SelectCampaignField;
