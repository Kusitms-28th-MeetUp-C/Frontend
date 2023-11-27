import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../libs/api';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.hash.substr(1));
  const accessToken = urlSearchParams.get('access_token');

  const [isSecondCallback, setIsSecondCallback] = useState(false);

  // 로그인 상태 설정
  const setLoginState = useSetRecoilState(LoginState);

  useEffect(() => {
    if (accessToken) {
      setIsSecondCallback(true);
    }
  }, []);

  useEffect(() => {
    if (isSecondCallback) {
      Axios.post(
        'user/signin',
        {
          platform: 'google',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        },
      )
        .then((res) => {
          const data = res.data.data;
          localStorage.setItem('access-token', data.accessToken);
          setLoginState({
            isLogin: true,
            userId: data.userId,
            sessionId: data.sessionId,
            profile: data.picture,
            name: data.name,
          });
          Axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.accessToken}`;
          console.log(urlSearchParams);
          navigate(`${data.isFirst ? '/signUp' : '/template'}`);
        })
        .catch((err) => console.error(err));
    }
  }, [isSecondCallback]);

  return <></>;
};

export default GoogleLogin;

// http://localhost:3000/oauth/google#access_token=ya29.a0AfB_byBck61_nmzEth8xp5UhPOhJw-9OPaG1BasaZ1c1w09egijxUMZt-TTbHef5h8-rP211glD3JGYhYe-I7HxK9Qa0hnxrKHRG1UWHqAwCRACitf1cL8clhvxCLSiiaqEUuGKn6CC7WY8gqckWg21WOy0-9NfUViQaCgYKAYgSARMSFQHGX2Mi75ZWGpUGPBShlfxWWrTyIQ0170&token_type=Bearer&expires_in=3599&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&authuser=0&prompt=none
