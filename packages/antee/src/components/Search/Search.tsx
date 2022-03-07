import { FieldSearch, FlexGroup, FlexItem, Popover } from '@antoree/ant-ui';
import { FC } from 'react';
import FilterBar from '../FilterBar';
import styles from './Search.module.scss';

interface SearchProps {
  toggle: () => void;
  isVisiable: boolean;
  close: () => void;
}

const Search: FC<SearchProps> = ({
  toggle,
  isVisiable,
  close,
}: SearchProps) => {
  return (
    <>
      <Popover
        isOpen={isVisiable}
        closePopover={close}
        button={
          <FlexGroup onClick={toggle} gutterSize="s" responsive>
            <FlexItem>
              <FieldSearch
                placeholder="Lọc theo chủ đề, giáo viên..."
                disabled
                fullWidth
                // value={value}
                // onChange={e => onChange(e)}
                // isClearable={isClearable}
                className={styles.antoreeSearch}
                aria-label="Use aria labels when no actual label is in use"
              />
            </FlexItem>
          </FlexGroup>
        }
      >
        <FilterBar mobileView />
      </Popover>
    </>
  );
};

export default Search;
