import {
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  PageContentHeaderSection,
  SuperSelect,
  Health,
  FieldSearch,
} from '@antoree/ant-ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { withDebounce } from '@antoree/helpers';

import { COURSE_STATUS } from '../../constants';

export type SearchBarProps = {
  status: number;
  onStatusChange?: (value: string) => void;
  onTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  status,
  onStatusChange,
  onTermChange = () => {},
}) => {
  const intl = useIntl();

  return (
    <PageContentHeaderSection className="w-full">
      <Form>
        <FlexGroup>
          <FlexItem grow={false}>
            <FormRow
              label={intl.formatMessage({
                defaultMessage: 'Course status',
              })}
              className="w-full md:w-72"
            >
              <SuperSelect
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
            </FormRow>
          </FlexItem>
          <FlexItem grow={false}>
            <FormRow label="&nbsp;" className="w-full md:w-72">
              <FieldSearch
                fullWidth
                compressed
                incremental
                placeholder={intl.formatMessage({
                  defaultMessage: "Search by teacher's name",
                })}
                onChange={withDebounce(onTermChange)}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
      </Form>
    </PageContentHeaderSection>
  );
};

export default SearchBar;
