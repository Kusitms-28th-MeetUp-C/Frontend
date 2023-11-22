import styled from 'styled-components';
import LoginBtn from '../components/Login/LoginBtn';
import Logo from '../components/Login/Logo';
import { useEffect, useState } from 'react';

const LoginContainer = styled.div`
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 55px;
  }
`;

const Login = () => {
  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // clean up 이벤트 리스너
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  return (
    <div
      className={`flex ${
        isMobile ? 'h-[calc(100vh-40px)]' : 'h-[calc(100vh-65px)]'
      } items-center justify-center bg-[#606DE9]`}
    >
      <LoginContainer className="flex items-center gap-[110px]">
        <Logo />
        <LoginBtn />
      </LoginContainer>
    </div>
  );
};

export default Login;
