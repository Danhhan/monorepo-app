import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Text, Spacer, notification } from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import { useInfiniteQuery } from 'react-query';
import { searchStudents, SEARH_STUDENTS } from 'services/student';
import AutoComplete from 'components/AutoComplete';
import { FormattedMessage } from 'react-intl';

const SelectStudentField = ({ onSelect, valueOfSelected, isInvalid }) => {
  const [search, setSearch] = useState('');

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [SEARH_STUDENTS, { search }],
    context =>
      searchStudents({
        pageIndex: context.pageParam?.page ?? 0,
        search: search ? search.replace(/(^0|^84|^\+84)/g, '') : search,
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
      onError: error => {
        notification.error({
          title: <FormattedMessage defaultMessage="Error Occured!" />,
        });
      },
    },
  );

  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => acc + page.data.length ?? 0, 0) ?? 0,
    [data],
  );

  const dataToRender = data?.pages
    ?.map(page =>
      page?.data?.map(el => {
        return [
          {
            ...el,
            isChild: false,
          },
          ...(el?.subuser
            ? el?.subuser?.map(item => ({
                ...item,
                id: item?.studentId,
                shownName:
                  item?.name ||
                  `${item?.firstName || ''} ${
                    // eslint-disable-next-line prettier/prettier
                    item?.lastName || ''
                  }`,
                isChild: true,
              }))
            : []),
        ];
      }),
    )
    .reduce((a, b) => [...a, ...b], [])
    .reduce((a, b) => [...a, ...b], []);

  return (
    <AutoComplete
      isInvalid={isInvalid}
      fullWidth
      placeholder="Select student"
      valueOfSelected={valueOfSelected}
      isLazyLoad
      hasMore={hasNextPage}
      nextFunc={fetchNextPage}
      dataLength={dataLength}
      options={dataToRender?.map(el => {
        return {
          ...el,
          value: el.id,
          label: el.shownName,
          dropdownDisplay: (
            <div>
              <div className="flex flex-row justify-items-start items-center">
                <Text size="s">
                  <p>
                    {`${el?.shownName} - LR: #${
                      // eslint-disable-next-line prettier/prettier
                      el?.learningRequestId || 'None'
                    }`}
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
    />
  );
};

SelectStudentField.defaultProps = {
  isInvalid: false,
};

SelectStudentField.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
};

export default SelectStudentField;
