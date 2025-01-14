import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { SocketContext } from './Socket';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';
import { chatDateFilter } from '../../libs/utils/filter';
import { OpenChatRoomState, ChatUserState } from '../../states/ChatState';
import { HeaderState } from '../../states/SocketState';

const ChatList = () => {
  const headers = useRecoilValue(HeaderState);
  const client = useContext(SocketContext);

  const loginState = useRecoilValue(LoginState);
  const setOpenChatRoomState = useSetRecoilState(OpenChatRoomState);
  const setChatUserState = useSetRecoilState(ChatUserState);

  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNothing, setIsNothing] = useState(true);

  const publish = () => {
    if (!client.current.connected) {
      console.log('publish 통신 실패');
      return;
    } else {
      console.log('publish 통신 성공');
    }

    client.current.publish({
      headers,
      destination: `/pub/chat/all`,
      body: JSON.stringify({
        userName: loginState.name,
      }),
    });
  };

  const subscribe = () => {
    console.log('subscribe 실행');

    client.current.subscribe(
      '/sub/chat/1',
      (body) => {
        const response = JSON.parse(body.body);
        console.log(response);
        setChatList([...response.data.chatList]);
        setIsLoading(false);
        if (response.data.chatList.length !== 0) setIsNothing(false);
      },
      headers,
    );
  };

  useEffect(() => {
    publish();
    subscribe();

    return () => {
      console.log('unmount chatlist');
      client.current.unsubscribe('/sub/chat/1');
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden py-7 pl-6 pr-3">
      <div
        className="mb-9 flex items-center gap-2"
        onClick={() => {
          console.log(client.current);
          setOpenChatRoomState(true);
          setChatUserState({
            name: '관곤짱',
            sessionId: 2,
          });
        }}
      >
        <BsFillChatFill className="text-2xl text-blue1" />
        <div className="text-2xl font-bold text-black">커피챗 목록</div>
      </div>

      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[10px]">
          <img src="/icons/loading.svg" />
          <div className="text-xs font-semibold text-black">Loading...</div>
        </div>
      ) : isNothing ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="text-xs font-semibold text-gray1">
            진행중인 채팅이 없어요
          </div>
        </div>
      ) : (
        <ListContainer>
          {chatList.map((el, idx) => (
            <button
              className="flex w-full gap-[10px] rounded-[10px] px-2 py-2 hover:bg-blue5"
              key={idx}
              onClick={() => {
                setOpenChatRoomState(true);
                setChatUserState({
                  name: el.userName,
                  sessionId: el.sessionId,
                });
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray6">
                {el?.profile && el?.profile !== 'Unknown' ? (
                  <img src={el.profile} className="object-cover" />
                ) : (
                  <BsFillPersonFill className="text-3xl text-gray3" />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-blue1 px-1.5 py-[1px] text-[8px] font-extrabold text-white">
                      {el.userType}
                    </div>
                    <div className="text-sm font-semibold text-black">
                      {el.userName}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-gray4">
                    {chatDateFilter(el.time)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-gray4">
                    {el.content}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </ListContainer>
      )}
    </div>
  );
};

export default ChatList;

// 스크롤 커스텀
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
