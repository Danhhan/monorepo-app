import { EuiButtonIcon } from '@elastic/eui';
import styled from 'styled-components';

const ButtonIcon = styled(EuiButtonIcon)`
  ${props =>
    (props.display === 'fill' || undefined) &&
    ['primary', undefined].includes(props.color)
      ? 'color: #fff !important'
      : ''};
`;

export default ButtonIcon;
