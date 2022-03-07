import { EuiButtonGroup } from '@elastic/eui';
import styled from 'styled-components';

const ButtonGroup = styled(EuiButtonGroup)`
  ${props =>
    props.color === 'primary'
      ? `label.euiButtonGroupButton.euiButtonGroupButton--primary:not([class*='isDisabled']).euiButtonGroupButton-isSelected { color:#fff }`
      : ''};
`;

export default ButtonGroup;
