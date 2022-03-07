import { EuiModal, EuiModalProps } from '@elastic/eui';
import React from 'react';
import styled from 'styled-components';

export type ModalProps = EuiModalProps & {
  maxHeight?: string;
};

const ReCookModal: React.FC<ModalProps> = ({ maxHeight, ...rest }) => {
  return <EuiModal {...rest} />;
};

export const Modal = styled(ReCookModal)`
  ${props => (props.maxHeight ? `margin-top:10vh;` : '')}
  .euiModal__flex {
    ${props => (props.maxHeight ? `max-height:${props.maxHeight};` : '')}
  }
`;
