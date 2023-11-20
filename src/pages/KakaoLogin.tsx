import { useEffect } from 'react';
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
          navigate('/');
          Axios.post(
            'user/signIn',
            {
              platform: 'kakao',
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: res.data.access_token,
              },
            },
          )
            .then((res) => {
              const data = res.data.data;
              console.log(data);
              localStorage.setItem('access-token', data.accessToken);
              setLoginState({
                isLogin: true,
                userId: data.id,
                profile: data.picture,
                name: data.name,
              });
              Axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${data.accessToken}`;
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return <></>;
};

export default KakaoLogin;
