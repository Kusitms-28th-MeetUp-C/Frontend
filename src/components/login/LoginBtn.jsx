const LoginBtn = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const onGoogleHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const onKaKaoHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=login&scope=account_email`;
  };

  return (
    <>
      <button
        className="mb-4 flex w-full items-center justify-center gap-5 rounded-full bg-white px-5 py-2.5"
        onClick={onGoogleHandler}
      >
        <img src="/icons/google.svg" className="h-7" />
        <div className="text-center text-lg font-extrabold">Goolge 로그인</div>
      </button>
      <button
        className="flex w-full items-center justify-center gap-5 rounded-full bg-yellow-300 px-5 py-2.5"
        onClick={onKaKaoHandler}
      >
        <img src="/icons/kakao.svg" className="h-7" />
        <div className="text-center text-lg font-extrabold">Kakao 로그인</div>
      </button>
    </>
  );
};

export default LoginBtn;
