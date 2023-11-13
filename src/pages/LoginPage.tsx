import LoginBtn from '../components/login/LoginBtn';
import Logo from '../components/login/Logo';

const LoginPage = () => {
  return (
    <div className="bg-gray7 py-10 pb-20">
      <div className="m-auto flex flex-col items-center w-10/12 max-w-md">
        <Logo />
        <LoginBtn />
      </div>
    </div>
  );
};

export default LoginPage;
