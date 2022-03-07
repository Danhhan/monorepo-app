import { Badge, Text } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { SESSION_STATUS } from './constants';

export type SessionStatusProps = {
  status: number;
};

const SessionStatus: React.FC<SessionStatusProps> = props => {
  const status = SESSION_STATUS.find(({ value }) => value === props.status);

  return (
    <Badge color={status?.color}>
      <Text size="xs" className="text-white">
        <FormattedMessage {...status?.label} />
      </Text>
    </Badge>
  );
};

export default SessionStatus;
