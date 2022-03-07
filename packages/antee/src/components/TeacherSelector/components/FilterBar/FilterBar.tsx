import { FlexGroup, FlexItem, Spacer } from '@antoree/ant-ui';

import FilterTeacherBox from './FilterTeacherBox';
import FilterTopicBox from './FilterTopicBox';
import FilterTeacherDateRange from './FilterTeacherDateRange';

export type FilterBarProps = {
  handleChangeRegion: Function;
  handleChangeStartTime: Function;
  handleChangeEndTime: Function;
  handleChangeDate: Function;
  dateRange?: string;
  startTimeRange?: string;
  endTimeRange?: string;
  originalRegion?: boolean;
  gender: any;
  nation: any;
  region: any;
  handleApplyTeacher: Function;
  handleApplyTopic: Function;
  topics: any;
  handleApplyCer: Function;
  certificates: any;
};

const FilterBar: React.FC<FilterBarProps> = ({
  handleChangeRegion,
  handleChangeStartTime,
  handleChangeEndTime,
  handleChangeDate,
  dateRange,
  startTimeRange,
  endTimeRange,
  originalRegion,
  gender,
  nation,
  region,
  handleApplyTeacher,
  handleApplyTopic,
  topics,
  handleApplyCer,
  certificates,
}) => {
  return (
    <div>
      <Spacer size="s" />
      <FlexGroup gutterSize="s">
        <FlexItem grow={false}>
          <FlexGroup gutterSize="s">
            {/* <FlexItem>
              <FilterGroup className="rounded-lg">
                <FilterButton
                  className="text-center"
                  style={{
                    background: originalRegion ? '#00C081' : '#fff',
                    color: originalRegion ? '#fff' : '#5A606B',
                  }}
                  onClick={() => handleChangeRegion(true)}
                >
                  <div className="flex flex-row justify-center items-center">
                    <span>
                      <FormattedMessage defaultMessage="VietNam" />
                    </span>
                  </div>
                </FilterButton>
                <FilterButton
                  style={{
                    background: !originalRegion ? '#00C081' : '#fff',
                    color: !originalRegion ? '#fff' : '#5A606B',
                  }}
                  textProps={{
                    style: {
                      textDecoration: 'none',
                    },
                  }}
                  onClick={() => handleChangeRegion(false)}
                >
                  <div className="flex flex-row justify-center items-center">
                    <span>
                      <FormattedMessage defaultMessage="Global" />
                    </span>
                  </div>
                </FilterButton>
              </FilterGroup>
            </FlexItem> */}
            <FlexItem>
              <FilterTeacherDateRange
                handleChangeStartTime={handleChangeStartTime}
                handleChangeEndTime={handleChangeEndTime}
                handleChangeDate={handleChangeDate}
                dateRange={dateRange}
                startTimeRange={startTimeRange}
                endTimeRange={endTimeRange}
              />
            </FlexItem>
          </FlexGroup>
        </FlexItem>
        <FlexItem grow={false}>
          <FlexGroup gutterSize="s" responsive={false} alignItems="center">
            <FlexItem grow={false}>
              <FilterTeacherBox
                gender={gender}
                nation={nation}
                region={region}
                handleChangeApply={handleApplyTeacher}
              />
            </FlexItem>
            <FlexItem grow={false} style={{ minWidth: '180px' }}>
              <FilterTopicBox
                topics={topics}
                handleApplyTopic={handleApplyTopic}
                certificates={certificates}
                handleApplyCer={handleApplyCer}
              />
            </FlexItem>
          </FlexGroup>
        </FlexItem>
      </FlexGroup>
    </div>
  );
};

export default FilterBar;
