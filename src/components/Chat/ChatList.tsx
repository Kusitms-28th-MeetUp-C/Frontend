import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import styled from 'styled-components';
import React from 'react';

interface ChatListProps {
  setIsOpenChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  transition-duration: 300ms;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 설정 */
    transition-duration: 300ms;
  }

  &:hover::-webkit-scrollbar {
    opacity: 1;
    transition: opacity 0.7s ease-in-out;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #cacef0;
    border-radius: 4px;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    transition-duration: 300ms;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

const ChatList = ({ setIsOpenChatRoom }: ChatListProps) => {
  const list = [
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 1,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 2,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 0,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 1,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 0,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 1,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 1,
    },
    {
      name: '신민선',
      content: '안녕하세요. IT템플릿 보고 연락드립니다.',
      time: '11:05',
      uncheckedNum: 1,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden py-7 pl-6 pr-3">
      <div className="mb-9 flex items-center gap-2">
        <BsFillChatFill className="text-2xl text-blue1" />
        <div className="text-2xl font-bold text-black">커피챗 목록</div>
      </div>

      <ListContainer>
        {list.map((el, idx) => (
          <button
            className="flex w-full gap-[10px] rounded-[10px] px-2 py-2 hover:bg-blue5"
            onClick={() => setIsOpenChatRoom(true)}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray6">
              <BsFillPersonFill className="text-3xl text-gray3" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-blue1 px-1.5 py-[1px] text-[8px] font-extrabold text-white">
                    PM
                  </div>
                  <div className="text-sm font-semibold text-black">
                    {el.name}
                  </div>
                </div>
                <div className="text-xs font-semibold text-gray4">
                  {el.time}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-gray4">
                  {el.content}
                </div>
                {el.uncheckedNum > 0 && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F14646] text-[9px] font-bold text-white">
                    {el.uncheckedNum}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </ListContainer>
    </div>
  );
};

export default ChatList;
