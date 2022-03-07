import {
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { usePagiantion } from 'hooks';
import moment from 'moment';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useInfinityTeacherList } from 'services/teachers';
import {
  ArrayParam,
  BooleanParam,
  StringParam,
  withDefault,
} from 'use-query-params';
import { FilterBar, TeacherList } from './components';

export type TeacherSelectorProps = {
  successHandle?: () => void;
  isAcceptTrial?: boolean;
  customAvailable?: any;
  role: 2 | 3;
};

const TeacherSelector: React.FC<TeacherSelectorProps> = ({
  successHandle,
  isAcceptTrial,
  customAvailable,
  role,
}) => {
  const {
    query: {
      startTimeRange,
      endTimeRange,
      dateRange,
      originalRegion,
      gender,
      nation,
      region,
      topics,
      certificates,
    },
    onSelect,
  } = usePagiantion({
    startTimeRange: withDefault(
      StringParam,
      // eslint-disable-next-line prettier/prettier
      moment().hours(0).minutes(0).seconds(0).format('HH:mm:ss'),
    ),
    endTimeRange: withDefault(
      StringParam,
      // eslint-disable-next-line prettier/prettier
      moment()
        .hours(23)
        .minutes(59)
        .seconds(0)
        .add(1, 'days')
        .format('HH:mm:ss'),
    ),
    dateRange: withDefault(
      StringParam,
      customAvailable?.format('YYYY-MM-DD') ||
        moment().add(1, 'days').format('YYYY-MM-DD'),
    ),
    // search: withDefault(StringParam, ''),
    originalRegion: withDefault(BooleanParam, false),
    gender: withDefault(ArrayParam, []),
    nation: withDefault(ArrayParam, []),
    region: withDefault(ArrayParam, []),
    topics: withDefault(ArrayParam, []),
    certificates: withDefault(ArrayParam, []),
  });

  // const [originalRegion, setOriginalRegion] = useState(true);

  const handleSetOriginalRegion = (value: boolean) => {
    onSelect('originalRegion')(value);
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfinityTeacherList(
    {
      timeFrom: startTimeRange,
      timeTo: endTimeRange,
      dateRange,
      isOriginalRegion: originalRegion,
      role,
      certificate: certificates,
      voiceType: region,
      topicType: topics,
      gender,
      nation,
    },
    {
      cacheTime: 0,
      retryOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => {
        return acc + page.data?.data?.length ?? 0;
      }, 0) ?? 0,
    [data],
  );

  const handleTeacherApply = (
    genderValue: any,
    nationValue: any,
    regionValue: any,
  ) => {
    onSelect('gender')(genderValue);
    onSelect('nation')(nationValue);
    onSelect('region')(regionValue);
  };

  const handleApplyTopic = (topicsPara: any) => {
    onSelect('topics')(topicsPara);
  };

  const handleApplyCer = (cersPara: any) => {
    onSelect('certificates')(cersPara);
  };

  return (
    <FlexGroup>
      <FlexItem className="w-4/6" grow={false}>
        <FilterBar
          handleChangeRegion={handleSetOriginalRegion}
          handleChangeStartTime={onSelect('startTimeRange')}
          handleChangeEndTime={onSelect('endTimeRange')}
          handleChangeDate={onSelect('dateRange')}
          dateRange={dateRange}
          startTimeRange={startTimeRange}
          endTimeRange={endTimeRange}
          originalRegion={originalRegion}
          gender={gender}
          nation={nation}
          region={region}
          handleApplyTeacher={handleTeacherApply}
          handleApplyTopic={handleApplyTopic}
          topics={topics}
          certificates={certificates}
          handleApplyCer={handleApplyCer}
        />
        <Spacer size="m" />
        <TeacherList
          isLoading={isLoading}
          successHandle={successHandle}
          role={role}
          startTimeRange={startTimeRange}
          endTimeRange={endTimeRange}
          dateRange={dateRange}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? true}
          isAcceptTrial={isAcceptTrial}
          loader={
            <div className="flex flex-col items-center justify-center justify-items-center py-10">
              <LoadingSpinner size="xl" />
              <Text>
                <p>
                  <FormattedMessage defaultMessage="Đang tải ds giáo viên..." />
                </p>
              </Text>
            </div>
          }
          dataLength={dataLength}
          data={data?.pages
            .map(page => page?.data?.data)
            .reduce((a, b) => [...a, ...b], [])}
        />
      </FlexItem>
      <FlexItem />
    </FlexGroup>
  );
};

export default TeacherSelector;
