import {
  FieldSearch,
  FlexGroup,
  FlexItem,
  Form,
  Health,
  PageContentHeaderSection,
  SuperSelect,
} from '@antoree/ant-ui';
import { withDebounce } from '@antoree/helpers';
import { FormattedMessage, useIntl } from 'react-intl';
import { COURSE_STATUSES } from 'constants/courses';

export type FilterBarProps = {
  status: number;
  onSelect: Function;
  onInputChange: Function;
};

const FilterBar: React.FC<FilterBarProps> = ({
  status,
  onSelect = () => {},
  onInputChange = () => {},
}) => {
  const intl = useIntl();

  return (
    <PageContentHeaderSection className="w-full">
      <Form>
        <FlexGroup>
          <FlexItem grow={false}>
            <SuperSelect
              className="w-full md:w-72 rounded-lg"
              fullWidth
              options={COURSE_STATUSES.map(stt => ({
                value: `${stt.value}`,
                inputDisplay: (
                  <Health color={stt.color} style={{ lineHeight: 'inherit' }}>
                    <FormattedMessage {...stt.label} />
                  </Health>
                ),
              }))}
              valueOfSelected={`${status}`}
              onChange={value => onSelect('status')(value)}
            />
          </FlexItem>
          <FlexItem grow={false}>
            <FieldSearch
              className="w-full md:w-72 rounded-lg"
              fullWidth
              incremental
              placeholder={intl.formatMessage({
                defaultMessage: "Search by student's name",
              })}
              onChange={withDebounce(onInputChange('term'))}
            />
          </FlexItem>
        </FlexGroup>
      </Form>
    </PageContentHeaderSection>
  );
};

export default FilterBar;
