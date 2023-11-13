import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { GoHomeFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import ChatList from '../Chat/ChatList';
import ChatRoom from '../Chat/ChatRoom';
import { useState } from 'react';

const TopNavBar = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenChatRoom, setIsOpenChatRoom] = useState(false);

  return (
    <div className="flex h-[65px] items-center justify-between bg-white px-8">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo/logo.svg" alt="logo" className="h-6" />
          <img src="/logo/logo-typo.svg" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#EBEEF9]"
        >
          <GoHomeFill className="text-2xl text-[#495565]" />
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

        <Link
          to="/"
          className="flex h-10 w-[96px] items-center justify-center gap-2 rounded-[10px] bg-[#EBEEF9]"
        >
          <div className="flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full bg-white">
            <BsFillPersonFill className="h-[18px] w-[18px] text-[#5A5A5A]" />
          </div>
          <div className="text-base font-semibold text-[#232326]">김밋플</div>
        </Link>
      </div>
      {isOpenChat && (
        <div className="absolute right-10 top-24 z-[100] h-[82%] min-w-[360px] w-[20%] rounded-[20px] bg-white shadow-lg duration-300">
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
