import { Health } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { SESSION_STATUS } from './constants';

export type SessionStatusProps = {
  status: number;
};

const SessionStatus: React.FC<SessionStatusProps> = props => {
  const status = SESSION_STATUS.find(({ value }) => value === props.status);

  return (
    // <Badge color={status?.background} className="rounded">
    //   <Text size="xs" style={{ color: status?.color }}>
    //     <FormattedMessage {...status?.label} />
    //   </Text>
    // </Badge>
    <Health color={status?.colorName}>
      <FormattedMessage {...status?.label} />
    </Health>
  );
};

export default SessionStatus;
