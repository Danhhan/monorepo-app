import React, { FunctionComponent } from 'react';
import { Badge, Text } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { TODAY_SESSION_TYPES } from '../../../constants/session';

export type SessionTypeProps = {
  type: number;
};

const SessionType: FunctionComponent<SessionTypeProps> = ({ type }) => {
  const types = TODAY_SESSION_TYPES.find(({ value }) => value === type);

  return (
    <Badge
      color={types?.background}
      className="rounded"
      style={{ width: 'fit-content' }}
    >
      <Text size="xs" style={{ color: types?.color }}>
        {type ? <FormattedMessage {...types?.label} /> : 'unknown'}
      </Text>
    </Badge>
  );
};

export default SessionType;
