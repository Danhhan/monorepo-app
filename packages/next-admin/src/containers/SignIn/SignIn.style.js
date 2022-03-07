import styled from 'styled-components';
import bgImage from 'assets/images/signin-background.png';

const SignInStyleWrapper = styled.div.attrs({
  className: 'flex justify-center items-center h-screen w-screen bg-gray-100',
})`
  background: url(${bgImage}) no-repeat top left;
  background-size: cover;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 1;
    top: 0;
  }
`;

export default SignInStyleWrapper;
