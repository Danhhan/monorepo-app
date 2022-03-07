import {
  Card,
  FlexGroup,
  FlexItem,
  HorizontalRule,
  Skeleton,
} from '@antoree/ant-ui';

const CourseLoading: React.FC<{ renderSessions: boolean }> = ({
  renderSessions,
}) => {
  return (
    <Card
      title=""
      style={{
        border: 'none',
        boxShadow:
          '0px 0.9px 4px -1px rgba(0, 0, 0, 0.08), 0px 2.6px 8px -1px rgba(0, 0, 0, 0.06), 0px 5.7px 12px -1px rgba(0, 0, 0, 0.05), 0px 15px 15px -1px rgba(0, 0, 0, 0.04)',
      }}
      marginTop={1}
    >
      <FlexGroup>
        <FlexItem>
          <Skeleton style={{ height: '24px' }} width="100%" />
        </FlexItem>
      </FlexGroup>
      <HorizontalRule />
      <FlexGroup>
        <FlexItem grow={1}>
          <Skeleton
            style={{ height: '80px', borderRadius: '12px' }}
            width="100%"
          />
        </FlexItem>
        <FlexItem grow={9}>
          <FlexGroup>
            <FlexItem>
              <Skeleton style={{ height: '24px' }} width="100%" />
            </FlexItem>
          </FlexGroup>
          <FlexGroup>
            <FlexItem>
              <Skeleton style={{ height: '24px' }} width="100%" />
            </FlexItem>
          </FlexGroup>
        </FlexItem>
      </FlexGroup>
      {renderSessions && (
        <FlexGroup>
          <FlexItem>
            <Skeleton style={{ height: '73px' }} width="100%" />
          </FlexItem>
        </FlexGroup>
      )}
    </Card>
  );
};

export default CourseLoading;
