import LoginBtn from '../components/Login/LoginBtn';
import Logo from '../components/Login/Logo';

const Login = () => {
  return (
    <div className="h-[calc(100vh-65px)] flex items-center justify-center bg-[#606DE9]">
      <div className="flex gap-[110px] items-center">
        <Logo />
        <LoginBtn />
      </div>
    </div>
  );
};

export default Login;
