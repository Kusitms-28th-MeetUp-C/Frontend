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
      console.log(accessToken);
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
          navigate(`${data.isFirst ? '/signUp' : '/template'}`);
        })
        .catch((err) => console.error(err));
    }
  }, [isSecondCallback]);

  return <></>;
};

export default GoogleLogin;
