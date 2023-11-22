import Axios from '../../libs/api';
import Modal from '../Modal/Modal';
import ChatList from '../Chat/ChatList.jsx';
import ChatRoom from '../Chat/ChatRoom.jsx';

import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { RiPencilFill } from 'react-icons/ri';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';
import { OpenChatState, OpenChatRoomState } from '../../states/ChatState';

const TopNavBar = () => {
  // ==================== 변수 =============================
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isClickLogout, setIsClickLogout] = useState(false);
  const [isClickCreate, setIsClickCreate] = useState(false);

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [openChatState, setOpenChatState] = useRecoilState(OpenChatState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);

  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // clean up 이벤트 리스너
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  // ======================= 함수 =======================
  const onClickLogout = async () => {
    await Axios.patch('user/signout')
      .then((res) => {
        console.log(res);
        localStorage.setItem('access-token', '');
        setLoginState({});
        delete Axios.defaults.headers.common['Authorization'];
        setIsClickLogout(false);
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  const onClickTemplate = () => {
    navigate('/template/create');
    setIsClickCreate(false);
  };

  const onClickRoadmap = () => {
    navigate('/roadmap/create');
    setIsClickCreate(false);
  };

  const onClickLoginCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loginState.isLogin) {
      navigate(`/${e.currentTarget.id}`);
    } else {
      alert('로그인이 필요한 서비스입니다');
      navigate('/login');
    }
    return;
  };

  return (
    <>
      <div className={`${isMobile && 'flex flex-col items-center'}`}>
        <div
          className={`flex ${
            isMobile ? 'h-[40px] px-3' : 'h-[65px] px-8'
          } w-full items-center justify-between bg-white `}
        >
          <div className="flex items-center">
            <Link
              to="/"
              className={`flex items-center ${
                currentPath === '/signUp' && 'pointer-events-none'
              } ${isMobile ? 'gap-[6px]' : 'gap-4'}`}
            >
              <img
                src="/logo/logo.svg"
                alt="logo"
                className={isMobile ? 'h-4' : 'h-6'}
              />
              <img
                src="/logo/logo-typo-black.svg"
                className={isMobile ? 'h-3' : ''}
              />
            </Link>
          </div>

          {(currentPath === '/' || currentPath === '/article') && !isMobile && (
            <div className="flex items-center gap-14">
              <Link
                to="/"
                className={`${
                  currentPath === '/' &&
                  'border-b-[3px] border-tagLightPurple1 font-bold text-gray1'
                } py-2 text-xl font-semibold text-gray3 duration-300`}
              >
                서비스 소개
              </Link>
              <Link
                to="/template"
                className={`py-2 text-xl font-semibold text-gray3 duration-300`}
              >
                템플릿 탐색
              </Link>
              <button
                id="meeting"
                className={`py-2 text-xl font-semibold text-gray3 duration-300`}
                onClick={onClickLoginCategory}
              >
                나의 회의 관리
              </button>
              <Link
                to="/article"
                className={`${
                  currentPath === '/article' &&
                  'border-b-[3px] border-tagLightPurple1 font-bold text-gray1'
                } py-2 text-xl font-semibold text-gray3 duration-300`}
              >
                아티클
              </Link>
            </div>
          )}

          {currentPath !== '/signUp' && (
            <div
              className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}
            >
              {loginState.isLogin && !isMobile && (
                <button
                  className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-blue1 px-3 py-2 text-white"
                  onClick={() => setIsClickCreate(true)}
                >
                  <div className="text-sm font-semibold">템플릿 업로드</div>
                  <RiPencilFill className="text-sm" />
                </button>
              )}

              <Link
                to={loginState.isLogin ? '/mypage' : '/login'}
                className={`flex items-center justify-center ${
                  isMobile
                    ? 'h-6 gap-[4.4px] rounded-[5px] px-[4.8px]'
                    : 'h-10 gap-2 rounded-[10px] px-2'
                }  ${currentPath === '/mypage' ? ' bg-blue4' : ' bg-blue5'}  `}
              >
                <div
                  className={`flex ${
                    isMobile ? 'h-[16.8px] w-[16.8px]' : 'h-7 w-7'
                  } items-center justify-center overflow-hidden rounded-full bg-white`}
                >
                  {loginState.profile ? (
                    <img
                      src={loginState.profile}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BsFillPersonFill
                      className={`${
                        isMobile ? 'text-[10.8px]' : 'text-xl'
                      } text-gray3`}
                    />
                  )}
                </div>
                <div
                  className={`text-gray2 ${
                    isMobile
                      ? 'text-[10px] font-medium'
                      : 'text-base font-semibold'
                  }`}
                >
                  {loginState.isLogin
                    ? `${loginState.name || '이름없음'}`
                    : '로그인'}
                </div>
              </Link>

              {loginState.isLogin && (
                <button
                  className={`flex items-center justify-center duration-300 ${
                    isMobile
                      ? 'h-6 w-6 rounded-[5px]'
                      : ' h-10 w-10 rounded-[10px]'
                  } ${
                    openChatState
                      ? 'bg-[#606DE9] text-white'
                      : 'bg-[#EBEEF9] text-[#495565]'
                  }`}
                  onClick={() => {
                    setOpenChatState((prev: boolean) => !prev);
                    setOpenChatRoomState(false);
                  }}
                >
                  <BsFillChatFill
                    className={
                      isMobile ? 'text-sm  text-gray3' : 'text-xl text-gray3'
                    }
                  />
                </button>
              )}

              {loginState.isLogin && (
                <button
                  className={`flex items-center justify-center bg-[#EBEEF9] ${
                    isMobile
                      ? 'h-6 w-6 rounded-[5px]'
                      : ' h-10 w-10 rounded-[10px]'
                  }`}
                  onClick={() => setIsClickLogout((prev) => !prev)}
                >
                  <TbLogout
                    className={
                      isMobile ? 'text-lg  text-gray3' : 'text-2xl text-gray3'
                    }
                  />
                </button>
              )}
            </div>
          )}
        </div>

        {(currentPath === '/' || currentPath === '/article') && isMobile && (
          <div className="flex w-full items-center justify-center gap-6 bg-white">
            <Link
              to="/"
              className={`${
                currentPath === '/' &&
                'gray1 border-b-2 border-tagLightPurple1 font-bold text-gray1'
              } py-1 text-[10px] font-semibold text-gray3  duration-300`}
            >
              서비스 소개
            </Link>
            <Link
              to="/template"
              className={`py-1 text-[10px] font-semibold text-gray3 duration-300`}
            >
              템플릿 탐색
            </Link>
            <button
              id="meeting"
              className={`py-1 text-[10px] font-semibold text-gray3 duration-300`}
              onClick={onClickLoginCategory}
            >
              나의 회의 관리
            </button>
            <Link
              to="/article"
              className={`${
                currentPath === '/article' &&
                'gray1 border-b-2 border-tagLightPurple1 font-bold text-gray1'
              } py-1 text-[10px] font-semibold text-gray3 duration-300`}
            >
              아티클
            </Link>
          </div>
        )}
      </div>

      {openChatState && (
        <div className="absolute right-10 top-24 z-[100] h-[82%] w-[20%] min-w-[360px] rounded-[20px] bg-white shadow-lg duration-300">
          {!openChatRoomState ? <ChatList /> : <ChatRoom />}
        </div>
      )}

      {isClickLogout && (
        <Modal
          title="정말 로그아웃 하시겠습니까?"
          setIsOpen={setIsClickLogout}
          onSubmit={onClickLogout}
          cancel="취소"
          submit="확인"
        />
      )}

      {isClickCreate && (
        <Modal
          isCreate
          title="어떤 템플릿을 업로드 할까요?"
          cancel="회의록 템플릿"
          submit="로드맵 템플릿"
          setIsOpen={setIsClickCreate}
          onCancel={onClickTemplate}
          onSubmit={onClickRoadmap}
        />
      )}
    </>
  );
};

export default TopNavBar;
