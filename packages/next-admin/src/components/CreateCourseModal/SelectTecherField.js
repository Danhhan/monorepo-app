import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import { useQuery } from 'react-query';
import { searchTesters, SEARCH_TESTERS } from 'services/tester';
import phoneIcon from 'assets/icons/phone.svg';
import AutoComplete from '../AutoComplete';

const SelectTeacherField = ({ onSelect, valueOfSelected, isInvalid }) => {
  const [search, setSearch] = useState();

  const { data, isFetching } = useQuery(
    [SEARCH_TESTERS, { search }],
    () =>
      searchTesters({
        pageIndex: 0,
        search,
      }),
    { enabled: !!search, refetchOnWindowFocus: false, retry: 1 },
  );

  return (
    <AutoComplete
      isInvalid={isInvalid}
      fullWidth
      placeholder="Select teacher"
      valueOfSelected={valueOfSelected}
      options={data?.data?.map?.(el => ({
        ...el,
        value: el.id,
        label: el.shownName,
        dropdownDisplay: (
          <div>
            <Text>
              <p>{el.shownName}</p>
            </Text>
            {el.phone ? (
              <div className="flex flex-row justify-items-start items-center">
                <Icon className="mr-1" type={phoneIcon} size="s" />
                <Text size="s" color="subdued">
                  <p>{el.phone}</p>
                </Text>
              </div>
            ) : null}
            {el.email ? (
              <div className="flex flex-row justify-items-start items-center">
                <Icon className="mr-1" type="email" size="s" />
                <Text size="s" color="subdued">
                  <p>{el.email}</p>
                </Text>
              </div>
            ) : null}
          </div>
        ),
      }))}
      onSelect={onSelect}
      isLoading={isFetching}
      onSearch={withDebounce(searchValue => setSearch(searchValue))}
    />
  );
};

SelectTeacherField.defaultProps = {
  isInvalid: false,
};

SelectTeacherField.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool,
};

export default SelectTeacherField;
