import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Axios from '../libs/api';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [isSecondCallback, setIsSecondCallback] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  // 로그인 상태 설정
  const setLoginState = useSetRecoilState(LoginState);

  useEffect(() => {
    if (code) {
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}&client_secret=${KAKAO_CLIENT_SECRET}`,

          {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
        )
        .then((res) => {
          console.log(res);
          setAccessToken(res.data.access_token);
          setIsSecondCallback(true);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (isSecondCallback) {
      Axios.post(
        'user/signin',
        {
          platform: 'kakao',
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

export default KakaoLogin;
