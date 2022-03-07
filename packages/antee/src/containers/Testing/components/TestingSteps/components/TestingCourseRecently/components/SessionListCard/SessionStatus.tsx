import { Health, Text } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { SESSION_STATUS } from './constants';

export type SessionStatusProps = {
  status: number;
};

const SessionStatus: React.FC<SessionStatusProps> = props => {
  const status = SESSION_STATUS.find(({ value }) => value === props.status);

  return (
    <Health color={status?.background}>
      <Text size="xs" style={{ color: status?.color }}>
        <span>
          <FormattedMessage {...status?.label} />
        </span>
      </Text>
    </Health>
    // <Health color={status?.background} className="rounded">
    //   <Text size="xs" style={{ color: status?.color }}>
    //     <FormattedMessage {...status?.label} />
    //   </Text>
    // </Health>
  );
};

export default SessionStatus;
