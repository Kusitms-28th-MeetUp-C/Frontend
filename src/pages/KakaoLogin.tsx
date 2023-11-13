import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

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
          // navigate('/onBoarding?step=1');
          //   axios
          //     .post('백 api 주소', {
          //       snsId: res.data.id_token,
          //       snsToken: res.data.access_token,
          //     })
          //     .then((response) => {
          //       console.log(response);
          //     })
          //     .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return <></>;
};

export default KakaoLogin;
