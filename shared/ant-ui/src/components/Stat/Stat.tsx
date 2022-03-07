import { EuiStat, EuiStatProps } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

export type StatProps = EuiStatProps & {
  titleFontWeight?: number;
  descriptionFontWeight?: number;
  descriptionColor?: string;
};

const ReCookStat: React.FC<StatProps> = ({
  titleFontWeight,
  descriptionFontWeight,
  descriptionColor,
  ...rest
}) => {
  return <EuiStat {...rest} />;
};

export const Stat = styled(ReCookStat)`
  .euiStat__title {
    ${props =>
      props.titleFontWeight ? `font-weight:${props.titleFontWeight};` : ''}
  }
  .euiStat__description {
    ${props =>
      props.descriptionFontWeight
        ? `font-weight:${props.descriptionFontWeight};`
        : ''}
    ${props =>
      props.descriptionColor ? `color:${props.descriptionColor};` : ''}
  }
`;
