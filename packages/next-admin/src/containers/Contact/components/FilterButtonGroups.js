/* eslint-disable no-param-reassign */
import { FilterButton, FilterGroup } from '@antoree/ant-ui';
import { useCurrentUser, useRemoveParams } from 'hooks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import {
  FILTER_BUTTONS,
  FILTER_CARED_BY_NULL,
  FILTER_CTV_TAB,
  FILTER_LEADER_TAB,
} from '../constant';

function FilterButtonGroups({
  isFetching,
  contacts,
  onSelect,
  handleGetFilterButton,
  pageIndex,
  pageSize,
  search,
  status,
  query,
  createdAtFrom,
  createdAtTo,
  source,
  campaign,
  caredBy,
  leaderTab,
  ctvTab,
}) {
  // const { data, isLoading } = useQuery(
  //   [GET_TOTAL_CONTACT, query],
  //   () =>
  //     getTotalContact({
  //       pageIndex,
  //       pageSize,
  //       status,
  //       term: search.replace(/(^0|^84|^\+84)/g, ''),
  //       createdAtFrom,
  //       createdAtTo,
  //       source,
  //       campaign,
  //       caredBy,
  //       leaderTab,
  //       ctvTab,
  //     }),
  //   {
  //     retry: 1,
  //     refetchOnWindowFocus: false,
  //     cacheTime: 0,
  //   },
  // );
  const location = useLocation();

  const [{ permissions }] = useCurrentUser();
  const isLeader = permissions?.indexOf('contact-care') !== -1;
  const isContactViewAll = permissions?.indexOf('contact-view-all') !== -1;
  const [filterButtons, setFilterButton] = useState(FILTER_BUTTONS);
  useEffect(() => {
    const localFilterButtons = [...filterButtons];
    // check role then show button if user has role
    localFilterButtons.map(item => {
      if (item.value === FILTER_CARED_BY_NULL || item.value === FILTER_CTV_TAB)
        item.isDisplay = isContactViewAll || false;
      if (item.value === FILTER_LEADER_TAB) item.isDisplay = isLeader || false;
      return item;
    });
    setFilterButton(localFilterButtons);
  }, []);

  const { onRemove } = useRemoveParams();
  const handleOnClick = index => {
    const localFilterButtons = [...filterButtons];
    for (let i = 0; i < localFilterButtons.length; i += 1) {
      const element = localFilterButtons[i];
      element.isOn = false;
      onRemove(localFilterButtons[i].paramName);
    }
    onSelect(localFilterButtons[index].paramName)(
      localFilterButtons[index].value,
    );
    localFilterButtons[index].isOn = true;
    handleGetFilterButton(localFilterButtons[index]);
    setFilterButton(localFilterButtons);
  };
  return (
    <FilterGroup size="s" className="rounded-lg">
      {filterButtons
        ?.filter(filter => filter?.isDisplay)
        ?.map((item, index) => (
          <FilterButton
            key={item.id}
            isLoading={isFetching}
            className="w-40"
            hasActiveFilters={item?.isOn}
            onClick={() => handleOnClick(index)}
          >
            {isFetching && <>Loading&hellip;</>}
            {!isFetching && (
              <>
                <span>
                  <FormattedMessage {...item.label} />
                  &nbsp;
                </span>
                {item?.isOn && (
                  <span
                    style={{
                      background: '#00C081',
                      color: 'white',
                      borderRadius: '3px',
                      padding: '0px 4px',
                    }}
                  >
                    {contacts?.pagination?.totalItems ?? 0}
                  </span>
                )}
              </>
            )}
          </FilterButton>
        ))}
    </FilterGroup>
  );
}
FilterButtonGroups.defaultProps = {
  loadingTotal: false,
  isFetching: false,
  isLoading: false,
  dataTotal: {},
  contacts: {},
  onSelect: () => {},
  handleGetFilterButton: () => {},
};
FilterButtonGroups.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  loadingTotal: PropTypes.bool,
  isFetching: PropTypes.bool,
  isLoading: PropTypes.bool,
  dataTotal: PropTypes.object,
  contacts: PropTypes.object,
  onSelect: PropTypes.func,
  handleGetFilterButton: PropTypes.func,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  // typeSearch
  query: PropTypes.any.isRequired,
  createdAtFrom: PropTypes.string.isRequired,
  createdAtTo: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  campaign: PropTypes.string.isRequired,
  caredBy: PropTypes.number.isRequired,
  leaderTab: PropTypes.number.isRequired,
  ctvTab: PropTypes.number.isRequired,
};

export default FilterButtonGroups;
