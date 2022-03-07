import { EuiComboBox, EuiComboBoxProps } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

export type ComboBoxProps = EuiComboBoxProps<any> & {
  borderRadius?: number;
};

const ReCookComboBoxProps: React.FC<ComboBoxProps> = ({
  borderRadius,
  ...rest
}) => {
  return <EuiComboBox {...rest} />;
};
export const ComboBox = styled(ReCookComboBoxProps)`
  .euiComboBox__inputWrap {
    ${props =>
      props.borderRadius ? `border-radius:${props.borderRadius}px;` : ''}
  }
`;
