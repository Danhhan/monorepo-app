import { EuiDatePickerRange, EuiDatePickerRangeProps } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

export type DatePickerRangeProps = EuiDatePickerRangeProps & {
  height?: number;
};

const ReCookDatePickerRange: React.FC<DatePickerRangeProps> = ({
  height,
  ...rest
}) => {
  return <EuiDatePickerRange {...rest} />;
};
export const DatePickerRange = styled(ReCookDatePickerRange)`
  .euiFieldText {
    ${props => (props.height ? `height:${props.height}px;` : '')}
  }
`;
