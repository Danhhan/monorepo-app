import { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Icon } from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import { useQuery } from 'react-query';
import { searchStudents, SEARH_STUDENTS } from 'services/student';
import phoneIcon from 'assets/icons/phone.svg';
import AutoComplete from '../AutoComplete';

const SelectStudentField = ({ onSelect, valueOfSelected, isInvalid }) => {
  const [search, setSearch] = useState();

  const { data, isFetching } = useQuery(
    [SEARH_STUDENTS, { search }],
    () =>
      searchStudents({
        pageIndex: 0,
        search,
      }),
    { enabled: !!search, refetchOnWindowFocus: false, retry: 1 },
  );

  return (
    <AutoComplete
      isInvalid={isInvalid}
      fullWidth
      placeholder="Select student"
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
