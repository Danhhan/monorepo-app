import React from 'react';
import { HorizontalRule, HorizontalRuleProps } from '../HorizontalRule';
import { Text } from '../Text';
import './Divider.style.scss';

export type DividerProps = HorizontalRuleProps & {
  text: string | number;
};

const Divider: React.FC<DividerProps> = ({ text, ...rest }) => {
  return (
    <div className="divider" role="separator">
      <div className="divider-x">
        <HorizontalRule {...rest} />
      </div>
      <Text className="divider-text">
        <p>{text}</p>
      </Text>
      <div className="divider-x">
        <HorizontalRule {...rest} />
      </div>
    </div>
  );
};

export default Divider;
