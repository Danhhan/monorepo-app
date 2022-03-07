import { Badge, Text } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

import { COURSE_TYPES } from 'constants/courses';

export type CourseTypeProps = {
  type: number;
};

const CourseType: React.FC<CourseTypeProps> = props => {
  const type = COURSE_TYPES.find(({ value }) => value === props.type);

  return (
    <Badge color={type?.background} className="rounded">
      <Text
        size="s"
        style={{
          color: type?.color,
          minWidth: '100%',
          width: '5vw',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {type ? <FormattedMessage {...type?.label} /> : 'unknown'}
      </Text>
    </Badge>
  );
};

export default CourseType;
