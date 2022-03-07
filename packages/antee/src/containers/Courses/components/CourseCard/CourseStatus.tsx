import { Badge, Text } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import {
  CANCEL_STATUS,
  DELAY_STATUS,
  COMPLETED_STATUS,
  COURSE_STATUS,
  STATUS_OPEN,
} from 'constants/courses';

export type CourseStatusProps = {
  status: number;
  item?: any;
};

const CourseStatus: React.FC<CourseStatusProps> = ({ status, item }) => {
  const stt = COURSE_STATUS.find(({ value }) => value === status);
  return (
    <Badge
      color={stt?.background}
      className="rounded"
      style={{ width: 'fit-content' }}
    >
      <Text
        size="xs"
        style={{
          color: stt?.color,
        }}
      >
        {[CANCEL_STATUS, DELAY_STATUS, COMPLETED_STATUS, STATUS_OPEN].includes(
          // eslint-disable-next-line react/destructuring-assignment
          status,
        ) ? (
          <FormattedMessage {...stt?.label} />
        ) : (
          'false'
        )}
      </Text>
    </Badge>
  );
};

export default CourseStatus;
