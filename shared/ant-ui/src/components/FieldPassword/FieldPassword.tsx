import React from 'react';
import styled from 'styled-components';
import { EuiFieldPassword, EuiFieldPasswordProps } from '@elastic/eui';

export type FieldPasswordProps = {
  borderRaius?: number;
} & EuiFieldPasswordProps;
const FieldPwdStyleWrapper = styled.div<FieldPasswordProps>`
  .euiFormControlLayout--group {
    ${props =>
      props.borderRaius ? `border-radius:${props.borderRaius}px;` : ''}
  }
  .euiFormControlLayout__append {
    ${props =>
      props.borderRaius
        ? `border-top-right-radius:${props.borderRaius}px;`
        : ''}
    ${props =>
      props.borderRaius
        ? `border-bottom-right-radius:${props.borderRaius}px;`
        : ''}
  }
`;
export const FieldPassword: React.FC<FieldPasswordProps> = ({
  borderRaius,
  ...rest
}) => {
  if (borderRaius) {
    return (
      <FieldPwdStyleWrapper borderRaius={borderRaius}>
        <EuiFieldPassword {...rest} />
      </FieldPwdStyleWrapper>
    );
  }
  return <EuiFieldPassword {...rest} />;
};
