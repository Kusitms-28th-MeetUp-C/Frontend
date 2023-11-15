import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { RiPencilFill } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import ChatList from '../Chat/ChatList';
import ChatRoom from '../Chat/ChatRoom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';

const TopNavBar = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenChatRoom, setIsOpenChatRoom] = useState(false);

  const [loginState, setLoginState] = useRecoilState(LoginState);

  return (
    <div className="flex h-[65px] items-center justify-between bg-white px-8">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo/logo.svg" alt="logo" className="h-6" />
          <img src="/logo/logo-typo-black.svg" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/template/create"
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-blue1 px-3 text-white"
        >
          <div className="text-sm font-semibold">템플릿 업로드</div>
          <RiPencilFill className="text-sm" />
        </Link>

        <Link
          to={loginState.isLogin ? '/my-profile' : '/login'}
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#EBEEF9] px-2"
        >
          <div className="flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full bg-white">
            {loginState.profile ? (
              <img src={loginState.profile} />
            ) : (
              <BsFillPersonFill className="text-xl text-gray3" />
            )}
          </div>
          <div className="text-base font-semibold text-gray2">
            {loginState.isLogin ? `${loginState.name || '이름없음'}` : '로그인'}
          </div>
        </Link>

        <button
          className={`flex h-10 w-10 items-center justify-center rounded-[10px] duration-300  ${
            isOpenChat
              ? 'bg-[#606DE9] text-white'
              : 'bg-[#EBEEF9] text-[#495565]'
          }`}
          onClick={() => setIsOpenChat((prev) => !prev)}
        >
          <BsFillChatFill className="text-xl" />
        </button>

        {loginState.isLogin && (
          <Link
            to="#"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#EBEEF9]"
            onClick={() => {
              localStorage.setItem('access-token', '');
              setLoginState({});
              console.log(loginState);
            }}
          >
            <TbLogout className="text-2xl text-gray3" />
          </Link>
        )}
      </div>
      {isOpenChat && (
        <div className="absolute right-10 top-24 z-[100] h-[82%] w-[20%] min-w-[360px] rounded-[20px] bg-white shadow-lg duration-300">
          {!isOpenChatRoom ? (
            <ChatList setIsOpenChatRoom={setIsOpenChatRoom} />
          ) : (
            <ChatRoom
              isOpenChatRoom={isOpenChatRoom}
              setIsOpenChatRoom={setIsOpenChatRoom}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TopNavBar;
