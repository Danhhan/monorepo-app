import {
  FormControlLayout,
  FieldText,
  InputPopover,
  ContextMenuItem,
  Text,
  LoadingSpinner,
  InfiniteScroll,
} from '@antoree/ant-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function AutoComplete(props) {
  const {
    valueOfSelected,
    onSelect,
    onSearch,
    placeholder,
    options,
    isLoading,
    isInvalid,
    fullWidth,
    isLazyLoad,
    hasMore,
    nextFunc,
    dataLength,
    borderRadius,
    disabled,
    compressed,
    handleFocus,
    // refetch,
  } = props;

  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hasFocus, setHasFocus] = useState(false);

  const onFocus = e => {
    setHasFocus(true);
    setIsOptionListOpen(true);
    handleFocus(true);
  };

  const onBlur = () => {
    setSearchValue('');
  };

  const onSearchChange = e => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const closeOptionListHandler = () => {
    setIsOptionListOpen(false);
    setHasFocus(false);
  };

  const onItemClick = selectedOption => () => {
    onSelect(selectedOption);
    closeOptionListHandler();
  };
  return (
    <InputPopover
      className="rounded-lg"
      isOpen={isOptionListOpen}
      closePopover={closeOptionListHandler}
      panelPaddingSize="none"
      disableFocusTrap
      fullWidth={fullWidth}
      borderRadius={borderRadius || undefined}
      input={
        <FormControlLayout
          isLoading={isLoading}
          fullWidth={fullWidth}
          icon={{ type: 'arrowDown', side: 'right' }}
        >
          <FieldText
            fullWidth={fullWidth}
            isInvalid={isInvalid}
            onBlur={onBlur}
            onFocus={onFocus}
            onClick={onFocus}
            placeholder={placeholder}
            value={
              hasFocus
                ? searchValue
                : options?.find(
                    ({ value, id }) =>
                      valueOfSelected === value || valueOfSelected === id,
                  )?.label
            }
            onChange={onSearchChange}
            disabled={disabled}
            compressed={compressed}
          />
        </FormControlLayout>
      }
    >
      {isLazyLoad ? (
        <InfiniteScroll
          height={150}
          hasMore={hasMore}
          next={nextFunc}
          dataLength={dataLength}
          loader={
            <div className="flex flex-col items-center justify-center justify-items-center py-2">
              <LoadingSpinner size="l" />
              <Text size="s" color="subdued">
                <p>Loadding...</p>
              </Text>
            </div>
          }
        >
          {options?.length > 0 ? (
            options.map((opt, index) => (
              <ContextMenuItem
                size="s"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                role="option"
                onClick={onItemClick(opt)}
                icon={valueOfSelected === opt?.value ? 'check' : 'empty'}
              >
                {opt?.dropdownDisplay ?? opt?.label}
              </ContextMenuItem>
            ))
          ) : (
            <>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center justify-items-center py-2">
                  <LoadingSpinner size="m" />
                  <Text size="s" color="subdued">
                    <p>Searching...</p>
                  </Text>
                </div>
              ) : (
                <Text className="p-2" size="s" color="subdued">
                  <p>
                    <FormattedMessage defaultMessage="Not found any option" />
                  </p>
                </Text>
              )}
            </>
          )}
        </InfiniteScroll>
      ) : (
        <div className="euiSuperSelect__listbox" role="listbox" tabIndex={0}>
          {options?.length > 0 ? (
            options.map((opt, index) => (
              <ContextMenuItem
                size="s"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                role="option"
                onClick={onItemClick(opt)}
                icon={valueOfSelected === opt?.value ? 'check' : 'empty'}
              >
                {opt.dropdownDisplay ?? opt.label}
              </ContextMenuItem>
            ))
          ) : (
            <>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center justify-items-center py-2">
                  <LoadingSpinner size="m" />
                  <Text size="s" color="subdued">
                    <p>Searching...</p>
                  </Text>
                </div>
              ) : (
                <Text className="p-2" size="s" color="subdued">
                  <p>
                    <FormattedMessage defaultMessage="Not found any option" />
                  </p>
                </Text>
              )}
            </>
          )}
        </div>
      )}
    </InputPopover>
  );
}

AutoComplete.defaultProps = {
  valueOfSelected: null,
  onSelect: () => {},
  onSearch: () => {},
  placeholder: '',
  options: null,
  isLoading: false,
  isInvalid: false,
  fullWidth: false,
  isLazyLoad: false,
  hasMore: false,
  borderRadius: undefined,
  nextFunc: () => {},
  handleFocus: () => {},
  // refetch: () => {},
  dataLength: 0,
  disabled: false,
  compressed: false,
};

AutoComplete.propTypes = {
  valueOfSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      dropdownDisplay: PropTypes.element,
    }),
  ),
  // hasMore: PropTypes.func,
  hasMore: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  nextFunc: PropTypes.func,
  handleFocus: PropTypes.func,
  dataLength: PropTypes.number,
  isLazyLoad: PropTypes.bool,
  isLoading: PropTypes.bool,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  borderRadius: PropTypes.number,
  compressed: PropTypes.bool,
  // refetch: PropTypes.func,
};

export default AutoComplete;
