import { EuiButton } from '@elastic/eui';
import styled from 'styled-components';

const Button = styled(EuiButton)`
  ${props =>
    props.fill && ['primary', 'warning', undefined].includes(props.color)
      ? 'color: #fff !important'
      : ''};
`;

export default Button;
