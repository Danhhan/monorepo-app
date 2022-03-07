import {
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  PageContentHeaderSection,
  SuperSelect,
  Health,
  FieldSearch,
  CheckboxGroup,
  Checkbox,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { withDebounce } from '@antoree/helpers';

import { COURSE_STATUS, COURSE_TYPE } from '../../constants';
import Carreer from './Carreer';

export type SearchBarProps = {
  status: number;
  idSelected: number;
  type: number;
  cource: any;
  setType?: any;
  onFilterType?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  status,
  onStatusChange,
  cource,
  setType,
  type,
  onFilterType,
  onTermChange = () => {},
  idSelected,
}) => {
  const intl = useIntl();
  // console.log(idSelected);

  return (
    <PageContentHeaderSection className="w-full mb-4">
      <Form>
        <FlexGroup justifyContent="spaceBetween">
          <FlexItem grow={false}>
            <div style={{ display: 'flex', paddingLeft: '5px' }}>
              <FieldSearch
                fullWidth
                compressed
                incremental
                placeholder={intl.formatMessage({
                  defaultMessage: 'Tìm kiếm tên, ID',
                })}
                onChange={withDebounce(onTermChange)}
              />
              <SuperSelect
                style={{ marginLeft: '10px' }}
                fullWidth
                compressed
                options={COURSE_STATUS.map(stt => ({
                  value: `${stt.value}`,
                  inputDisplay: (
                    <Health color={stt.color} style={{ lineHeight: 'inherit' }}>
                      <FormattedMessage {...stt.label} />
                    </Health>
                  ),
                }))}
                valueOfSelected={`${status}`}
                onChange={onStatusChange}
              />
              <SuperSelect
                style={{ marginLeft: '20px' }}
                defaultValue="Trạng thái"
                fullWidth
                compressed
                options={COURSE_TYPE.map(stt => ({
                  value: `${stt.value}`,
                  inputDisplay: <p>{stt.label}</p>,
                }))}
                valueOfSelected={`${type}`}
                onChange={onFilterType}
              />
            </div>
          </FlexItem>

          <FlexItem grow={false}>
            <Carreer cource={cource} idSelected={idSelected} />
          </FlexItem>
        </FlexGroup>
      </Form>
    </PageContentHeaderSection>
  );
};

export default SearchBar;
