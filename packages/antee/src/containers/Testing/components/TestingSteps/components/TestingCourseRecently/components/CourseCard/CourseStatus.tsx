import { Badge, Text } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

import { COURSE_STATUS } from 'constants/courses';

export type CourseStatusProps = {
  status: number;
};

const CourseStatus: React.FC<CourseStatusProps> = props => {
  const status = COURSE_STATUS.find(({ value }) => value === props.status);

  return (
    <Badge color={status?.background} className="rounded">
      <Text
        size="s"
        style={{
          color: status?.color,
          minWidth: '100%',
          width: '5vw',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {status ? <FormattedMessage {...status?.label} /> : 'unknown'}
      </Text>
    </Badge>
  );
};

export default CourseStatus;
