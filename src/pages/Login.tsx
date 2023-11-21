import styled from 'styled-components';
import LoginBtn from '../components/Login/LoginBtn';
import Logo from '../components/Login/Logo';

const LoginContainer = styled.div`
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 55px;
  }
`;

const Login = () => {
  return (
    <div className="flex h-[calc(100vh-65px)] items-center justify-center bg-[#606DE9]">
      <LoginContainer className="flex items-center gap-[110px]">
        <Logo />
        <LoginBtn />
      </LoginContainer>
    </div>
  );
};

export default Login;
