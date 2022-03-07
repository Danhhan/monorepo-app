import { EuiInputPopover, EuiInputPopoverProps } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

export type InputPopoverProps = EuiInputPopoverProps & {
  borderRadius?: number;
};

const ReCookInputPopover: React.FC<InputPopoverProps> = ({
  borderRadius,
  ...rest
}) => {
  return <EuiInputPopover {...rest} />;
};
export const InputPopover = styled(ReCookInputPopover)`
  .euiFieldText {
    ${props =>
      props.borderRadius ? `border-radius:${props.borderRadius}px;` : ''}
  }
`;
