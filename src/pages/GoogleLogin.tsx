import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Axios from '../assets/api';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      console.log(code);
      // navigate('/onBoarding?step=1');
      // Axios.post('auth/google', {
      //   params: {
      //     code,
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => console.error(err));
    }
  }, []);

  return <></>;
};

export default GoogleLogin;

// http://localhost:3000/oauth/google
// #access_token=ya29.a0AfB_byCS5SSAoE61zYRvFGF5Qa_jynSrUrpRGQL5M1c-RMvDsu75vDeWhrq1g9SjryeBi-fRHm41QQzPQnYMhGdRWcjU0NZC6Zrj7qbuchwEuEaaGUFZs9EYe5K0bNGfQpncViW4cYedHOV7El_JnA_sGBKryt-N6AaCgYKAQESARMSFQHGX2Mi2jxX2OTSFAugrG0nQj5RLw0169
// &token_type=Bearer
// &expires_in=3599
// &scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid
// &authuser=0
// &prompt=consent

// http://localhost:3000/oauth/google?
// code=4%2F0AfJohXnmiByFeMMOKGU11u9ZN_gEpaC3kESiSqlwitkM1D7YC4k80Q4IA3NTcPtk-NhArQ
// &scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid
// &authuser=0&prompt=none