import {
  Avatar,
  Badge,
  FlexGroup,
  FlexItem,
  Icon,
  Skeleton,
  Stat,
  Text,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useRetrieveTeacherInfo } from 'services';

const RightAside: React.FC<{}> = () => {
  const { data, isLoading } = useRetrieveTeacherInfo();

  const statistics = [
    {
      icon: 'users',
      title: <p style={{ fontSize: '27px' }}>{data?.data?.studentCount}</p>,
      text: <FormattedMessage defaultMessage="TOTAL STUDENTS" />,
    },
    {
      icon: 'clock',
      title: (
        <p style={{ fontSize: '27px' }}>
          {data?.data?.teachingHour?.totalHours}
        </p>
      ),
      text: <FormattedMessage defaultMessage="TEACHING HOURS" />,
    },
    {
      icon: 'calendar',
      title: (
        <div style={{ fontSize: '27px' }}>
          <FlexGroup gutterSize="s">
            <FlexItem grow={false}>
              {data?.data?.performance?.attendanceRate}%
            </FlexItem>
            <FlexItem style={{ justifyContent: 'center' }} grow={false}>
              <span className="text-base">{`(${data?.data?.performance?.fromThisMonth} - ${data?.data?.performance?.toThisMonth})`}</span>
            </FlexItem>
          </FlexGroup>
          <FlexGroup gutterSize="s">
            <FlexItem grow={false}>
              {data?.data?.performance?.attendanceRateCurrentMonth}%
            </FlexItem>
            <FlexItem style={{ justifyContent: 'center' }} grow={false}>
              <span className="text-base">{`(${data?.data?.performance?.fromCurrentMonth} - ${data?.data?.performance?.toCurrentMonth})`}</span>
            </FlexItem>
          </FlexGroup>
          <FlexGroup gutterSize="s">
            <FlexItem grow={false}>
              {data?.data?.performance?.attendanceRatePreviousCurrentMonth}%
            </FlexItem>
            <FlexItem style={{ justifyContent: 'center' }} grow={false}>
              <span className="text-base">{`(${data?.data?.performance?.fromPreviousCurrentMonth} - ${data?.data?.performance?.toPreviousCurrentMonth})`}</span>
            </FlexItem>
          </FlexGroup>
        </div>
      ),
      text: <FormattedMessage defaultMessage="ATTENDANCE RATE" />,
    },
  ];
  return (
    <>
      {isLoading ? (
        <FlexGroup style={{ alignItems: 'center' }}>
          <FlexItem grow={4}>
            <Skeleton
              style={{ height: '80px', borderRadius: '80x' }}
              width="100%"
            />
          </FlexItem>
          <FlexItem className="text-left" grow={6}>
            <Skeleton style={{ height: '24px' }} width="100%" />
            <span>
              <Badge
                color="rgba(0, 192, 129, 0.15)"
                style={{ borderRadius: 4 }}
              >
                <span className="text-primary">Teacher</span>
              </Badge>
            </span>
          </FlexItem>
        </FlexGroup>
      ) : (
        <FlexGroup style={{ alignItems: 'center' }}>
          <FlexItem grow={false}>
            <Avatar
              className="h-20 w-20"
              name={data?.data?.displayName || ''}
              imageUrl={data?.data?.avatar || ''}
              size="m"
              type="space"
            />
          </FlexItem>
          <FlexItem className="text-left">
            <Text className="font-bold text-2xl">
              {data?.data?.displayName}
            </Text>
            <span>
              <Badge
                color="rgba(0, 192, 129, 0.15)"
                style={{ borderRadius: 4 }}
              >
                <span className="text-primary">Teacher</span>
              </Badge>
            </span>
          </FlexItem>
        </FlexGroup>
      )}

      {statistics.map((statistic, index) => (
        <FlexGroup style={{ alignItems: 'center' }} key={index}>
          <FlexItem>
            <Stat
              titleColor="#69707D"
              title={statistic.title}
              description={
                <Text size="s" color="subdued">
                  <>
                    <Icon type={statistic.icon} className="mr-2" />
                    {statistic.text}
                  </>
                </Text>
              }
              isLoading={isLoading}
            />
          </FlexItem>
        </FlexGroup>
      ))}
    </>
  );
};

export default RightAside;
