import { TbTriangleInvertedFilled } from 'react-icons/tb';
import styled from 'styled-components';

const BubbleText = styled.div`
  @media (max-width: 700px) {
    font-size: 12px;
    line-height: 150%;
  }
`;

const LoginBtns = styled.button`
  @media (max-width: 700px) {
    font-size: 14px;
    padding-top: 11px;
    padding-bottom: 11px;
  }
`;

const LoginBtn = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const onGoogleHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const onKaKaoHandler = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=login&scope=account_email`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-[42px] flex flex-col items-center">
        <BubbleText className="rounded-full bg-white px-[26px] py-3 text-center text-base font-semibold leading-6 text-black">
          <span className="text-[#606DE9]">밋플</span>에서 회의 가이드
          <br />
          3초만에 시작하기
        </BubbleText>
        <TbTriangleInvertedFilled className="absolute bottom-[-12px] text-white" />
      </div>
      <LoginBtns
        className="mb-4 flex min-w-[300px] items-center justify-center gap-2 rounded-full bg-[#F3D149] py-[14px]"
        onClick={onKaKaoHandler}
      >
        <img src="/icons/kakao.svg" className="h-5 w-5" />
        <div className="text-base font-semibold text-gray1">Kakao 로그인</div>
      </LoginBtns>
      <LoginBtns
        className="flex min-w-[300px] items-center justify-center gap-2 rounded-full bg-white py-[14px]"
        onClick={onGoogleHandler}
      >
        <img src="/icons/google.svg" className="h-5 w-5" />
        <div className="text-base font-semibold text-gray1">Goolge 로그인</div>
      </LoginBtns>
    </div>
  );
};

export default LoginBtn;
