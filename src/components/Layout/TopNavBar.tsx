import Axios from '../../libs/api';
import Modal from '../Modal/Modal';
import ChatList from '../Chat/ChatList.jsx';
import ChatRoom from '../Chat/ChatRoom.jsx';

import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { RiPencilFill } from 'react-icons/ri';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MouseEventHandler, useState } from 'react';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';
import { OpenChatState, OpenChatRoomState } from '../../states/ChatState';

const TopNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isClickLogout, setIsClickLogout] = useState(false);
  const [isClickCreate, setIsClickCreate] = useState(false);

  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [openChatState, setOpenChatState] = useRecoilState(OpenChatState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);

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
    <div className="flex h-[65px] items-center justify-between bg-white px-8">
      <div className="flex items-center">
        <Link
          to="/"
          className={`flex items-center gap-4 ${
            currentPath === '/signUp' && 'pointer-events-none'
          }`}
        >
          <img src="/logo/logo.svg" alt="logo" className="h-6" />
          <img src="/logo/logo-typo-black.svg" />
        </Link>
      </div>

      {(currentPath === '/' || currentPath === '/article') && (
        <div className="flex items-center gap-14">
          <Link
            to="/"
            className={`${
              currentPath === '/' && 'border-b-4 border-tagLightPurple1'
            } text-xl font-semibold text-gray3 duration-300`}
          >
            서비스 소개
          </Link>
          <button
            id="template"
            className={`text-xl font-semibold text-gray3 duration-300`}
            onClick={onClickLoginCategory}
          >
            템플릿 탐색
          </button>
          <button
            id="meeting"
            className={`text-xl font-semibold text-gray3 duration-300`}
            onClick={onClickLoginCategory}
          >
            나의 회의 관리
          </button>
          <Link
            to="/article"
            className={`${
              currentPath === '/article' && 'border-b-4 border-tagLightPurple1'
            } text-xl font-semibold text-gray3 duration-300`}
          >
            아티클
          </Link>
        </div>
      )}

      {currentPath !== '/signUp' && (
        <div className="flex items-center gap-3">
          {loginState.isLogin && (
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
            className={`flex h-10 items-center justify-center gap-2 rounded-[10px] ${
              currentPath === '/mypage' ? ' bg-blue4' : ' bg-blue5'
            }  px-2`}
          >
            <div className="flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full bg-white">
              {loginState.profile ? (
                <img src={loginState.profile} />
              ) : (
                <BsFillPersonFill className="text-xl text-gray3" />
              )}
            </div>
            <div className="text-base font-semibold text-gray2">
              {loginState.isLogin
                ? `${loginState.name || '이름없음'}`
                : '로그인'}
            </div>
          </Link>

          {loginState.isLogin && (
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-[10px] duration-300  ${
                openChatState
                  ? 'bg-[#606DE9] text-white'
                  : 'bg-[#EBEEF9] text-[#495565]'
              }`}
              onClick={() => {
                setOpenChatState((prev: boolean) => !prev);
                setOpenChatRoomState(false);
              }}
            >
              <BsFillChatFill className="text-xl" />
            </button>
          )}

          {loginState.isLogin && (
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#EBEEF9]"
              onClick={() => setIsClickLogout((prev) => !prev)}
            >
              <TbLogout className="text-2xl text-gray3" />
            </button>
          )}
        </div>
      )}

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
    </div>
  );
};

export default TopNavBar;
