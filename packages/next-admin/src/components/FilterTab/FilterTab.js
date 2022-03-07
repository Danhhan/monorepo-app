/* eslint-disable react/forbid-prop-types */
import { FilterButton, FilterGroup } from '@antoree/ant-ui';
import PropTypes from 'prop-types';

const FilterTab = ({
  items,
  onSelect,
  selectedValue: assignedValue,
  count,
  loading,
}) => {
  const selectedValue = assignedValue ?? items[0].value;

  return (
    <FilterGroup size="s" className="rounded-lg">
      {items?.map(item => {
        const isLoading = loading && selectedValue === item.value;
        return (
          <FilterButton
            key={item.id}
            isLoading={isLoading}
            className="w-40"
            hasActiveFilters={selectedValue === item.value}
            onClick={() => onSelect(item.key, item.value)}
          >
            {isLoading && <>Loading&hellip;</>}
            {!isLoading && (
              <>
                <span>
                  {item.label}
                  &nbsp;
                </span>
                {selectedValue === item.value && (
                  <span
                    style={{
                      background: '#00C081',
                      color: 'white',
                      borderRadius: '3px',
                      padding: '0px 4px',
                    }}
                  >
                    {count ?? 0}
                  </span>
                )}
              </>
            )}
          </FilterButton>
        );
      })}
    </FilterGroup>
  );
};
FilterTab.defaultProps = {
  items: [],
  onSelect: () => {},
  selectedValue: undefined,
  count: 0,
  loading: false,
};
FilterTab.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ),
  count: PropTypes.number,
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
  selectedValue: PropTypes.any,
};

export default FilterTab;
