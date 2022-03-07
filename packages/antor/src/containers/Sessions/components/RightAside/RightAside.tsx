import {
  Avatar,
  Badge,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Icon,
  Outline,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import testResultIcon from 'assets/icons/course/testResult.svg';
import skype from 'assets/icons/user/skype.svg';
import {
  Course,
  testResult,
  useRetrieveTestResultByCourseId,
} from 'services/course';

export type CourseCardProps = Course;

const RightAside: React.FC<CourseCardProps> = props => {
  const { teacher, carer, id } = props;
  const { DeviceMobileIcon } = Outline;
  const { data } = useRetrieveTestResultByCourseId(
    {
      courseId: id,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  );
  return (
    <>
      {carer && (
        <>
          <FlexGroup style={{ alignItems: 'center' }}>
            <FlexItem grow={false}>
              <Avatar
                className="h-20 w-20"
                name={carer?.name}
                imageUrl={carer?.avatarUrl}
                size="m"
                type="space"
              />
            </FlexItem>
            <FlexItem className="text-left">
              <Text className="font-bold text-2xl">{carer?.name}</Text>
              <span>
                <Badge color="rgba(0, 192, 129, 0.15)">
                  <span className="text-primary">ACS</span>
                </Badge>
              </span>
            </FlexItem>
          </FlexGroup>
          <FlexGroup style={{ alignItems: 'center' }}>
            <FlexItem grow={false}>
              <FlexGroup className="py-1" gutterSize="none">
                <FlexItem className="mt-1" grow={1}>
                  <Icon type="email" />
                </FlexItem>
                <FlexItem grow={10}>
                  <Text className="text-base text-left ml-1">
                    <p>{carer?.email}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
              <FlexGroup className="py-1" gutterSize="none">
                <FlexItem className="mt-1" grow={1}>
                  <Icon size="l" type={skype} color="#000000" />
                </FlexItem>
                <FlexItem grow={10}>
                  <Text className="text-base text-left ml-1">
                    <p>{carer?.skypeId}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
              <FlexGroup className="py-1" gutterSize="none">
                <FlexItem className="mt-1" grow={1}>
                  <DeviceMobileIcon
                    style={{ width: '16px', height: '16px', fill: 'none' }}
                    className="euiIcon euiIcon--medium euiIcon-isLoaded"
                  />
                </FlexItem>
                <FlexItem grow={10}>
                  <Text className="text-base text-left ml-1">
                    <p>{carer?.skypeId}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
          </FlexGroup>
        </>
      )}

      <Spacer />
      {data?.data?.testCourses instanceof Array &&
        data?.data?.testCourses?.length > 0 && (
          <>
            <FlexGroup>
              <FlexItem grow={false}>
                <Title>
                  <span>Other test results</span>
                </Title>
              </FlexItem>
            </FlexGroup>
            {data?.data?.testCourses?.map((item: testResult, index: number) => {
              return (
                item.url && (
                  <FlexGroup
                    key={index}
                    style={{ alignItems: 'center' }}
                    gutterSize="s"
                  >
                    <FlexItem grow={false}>
                      <img
                        style={{ width: '56px', height: '56px' }}
                        src={testResultIcon}
                        className="mr-2"
                        alt="social-logo"
                      />
                    </FlexItem>
                    <FlexItem grow={false}>
                      <ButtonEmpty
                        onClick={() => {
                          window.open(item?.url, '_blank');
                        }}
                      >
                        <Text>
                          <p>test result {item?.createdAt}</p>
                        </Text>
                      </ButtonEmpty>
                    </FlexItem>
                  </FlexGroup>
                )
              );
            })}
          </>
        )}
    </>
  );
};

export default RightAside;
