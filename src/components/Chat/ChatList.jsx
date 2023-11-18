import { BsFillPersonFill, BsFillChatFill } from 'react-icons/bs';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import * as StompJs from '@stomp/stompjs';

import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';

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

const ChatList = ({ setIsOpenChatRoom, setSessionId }) => {
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Socket
  const client = useRef({});
  const myToken = localStorage.getItem('access-token');
  const sessionId = 11;

  client.current = new StompJs.Client({
    brokerURL: 'wss://panpeun.shop/ws',
    connectHeaders: {
      Authorization: `Bearer ${myToken}`,
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
    },

    onConnect: () => {
      console.log('chatList success');
      subscribe();
      publish();
    },
  });

  const publish = () => {
    if (!client.current.connected) {
      console.log('publish 통신 실패');
      return;
    } else {
      console.log('publish 통신 성공');
    }

    client.current.publish({
      destination: `/pub/chatList`,
      body: JSON.stringify({
        userName: '김승훈',
      }),
    });
  };

  const subscribe = () => {
    console.log('subscribe 실행');
    const headers = {
      Authorization: `Bearer ${myToken}`,
    };

    client.current.subscribe(
      `/sub/chat/${sessionId}`,
      (body) => {
        const response = JSON.parse(body.body);
        console.log(response);
        setChatList([...response.data.chatList]);
        setIsLoading(false);
      },
      headers,
    );
  };

  useEffect(() => {
    client.current.activate();
    return () => client.current.deactivate();
  }, []);

  const onClickList = () => {
    console.log(chatList);
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const now = new Date();

    // 오늘인지 확인하는 경우
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      // 오늘인 경우 시간만 표시
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // 오늘이 아닌 경우 날짜만 표시
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${month}월 ${day}일`;
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden py-7 pl-6 pr-3">
      <div className="mb-9 flex items-center gap-2" onClick={onClickList}>
        <BsFillChatFill className="text-2xl text-blue1" />
        <div className="text-2xl font-bold text-black">커피챗 목록</div>
      </div>

      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[10px]">
          <img src="/icons/loading.svg" />
          <div className="text-xs font-semibold text-black">Loading...</div>
        </div>
      ) : (
        <ListContainer>
          {chatList.map((el, idx) => (
            <button
              className="flex w-full gap-[10px] rounded-[10px] px-2 py-2 hover:bg-blue5"
              key={idx}
              onClick={() => {
                setIsOpenChatRoom(true);
                setSessionId(el.sessionId);
              }}
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
                      {el.userName}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-gray4">
                    {formatDate(el.time)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-gray4">
                    {el.content}
                  </div>
                  {1 > 0 && (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F14646] text-[9px] font-bold text-white">
                      1
                    </div>
                  )}
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
