import { EuiCard, EuiCardProps } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

export type CardProps = EuiCardProps & {
  marginTop?: number;
};

const ReCookCard: React.FC<CardProps> = ({ marginTop, ...rest }) => {
  return <EuiCard {...rest} />;
};

export const Card = styled(ReCookCard)`
  .euiCard__content {
    ${props => (props.marginTop ? `margin-top:${props.marginTop}px;` : '')}
  }
`;
