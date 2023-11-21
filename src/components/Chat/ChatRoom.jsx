import { BsFillPersonFill, BsSend } from 'react-icons/bs';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { chatDateFilter } from '../../libs/utils/filter';

import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';
import { OpenChatRoomState, ChatUserState } from '../../states/ChatState';

const BubbleContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 4px;

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

const ChatBubble = ({ el, idx, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex w-full items-end gap-2 ${
        el.userName === name ? 'justify-end' : 'justify-start'
      }`}
      key={idx}
    >
      {el.userName === name && isHovered && (
        <div className="text-[10px] font-semibold text-gray4">
          {chatDateFilter(el.time)}
        </div>
      )}
      <div
        className={`max-w-[260px] px-4 py-3 text-xs font-medium leading-4 ${
          el.userName === name
            ? 'rounded-l-[20px] rounded-tr-[20px] bg-blue1 text-white'
            : 'rounded-r-[20px] rounded-tl-[20px] bg-gray7 text-black  '
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {el.content}
      </div>
      {el.userName !== name && isHovered && (
        <div className="text-[10px] font-semibold text-gray4">
          {chatDateFilter(el.time)}
        </div>
      )}
    </div>
  );
};

const ChatRoom = () => {
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);
  const [chatUserState, setChatUserState] = useRecoilState(ChatUserState);

  const [msgList, setMsgList] = useState([]);
  const [userData, setUserData] = useState([]);

  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isNothing, setIsNothing] = useState(false);

  // Socket
  const client = useRef({});
  const myToken = localStorage.getItem('access-token');
  const headers = {
    Authorization: `Bearer ${myToken}`,
    sessionId: loginState.sessionId,
  };

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'wss://panpeun.shop/ws',
      connectHeaders: {
        Authorization: `Bearer ${myToken}`,
        sessionId: loginState.sessionId,
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      },

      onConnect: () => {
        console.log('chatRoom success');
        subscribe();
        publish('detail');
      },
    });

    client.current.activate();
  };

  const publish = (option) => {
    if (!client.current.connected) {
      console.log('publish 통신 실패');
      return;
    } else {
      console.log('publish 통신 성공');
    }

    if (option === 'detail') {
      client.current.publish({
        headers,
        destination: `/pub/chat/detail`,
        body: JSON.stringify({
          chatSession: chatUserState.sessionId,
          fromUserName: loginState.name,
          toUserName: chatUserState.name,
        }),
      });
    }

    if (option === 'chat') {
      client.current.publish({
        headers,
        destination: `/pub/chat`,
        body: JSON.stringify({
          chatSession: chatUserState.sessionId,
          fromUserName: loginState.name,
          toUserName: chatUserState.name,
          content: msg,
        }),
      });
    }
  };

  const subscribe = () => {
    console.log('subscribe 실행');

    client.current.subscribe(
      `/sub/chat/${loginState.sessionId}`,
      (body) => {
        const response = JSON.parse(body.body);
        console.log(response);

        if (response.messageType === 'messageDetail') {
          setMsgList([...response.data.chatMessageList]);
          setUserData({ ...response.data.user });
          setIsLoading(false);
          if (response.data.chatMessageList.length === 0) setIsNothing(true);
        }
        if (response.messageType === 'received') {
          console.log('전송완료');
          setMsgList((prev) => [...prev, response.data.message]);
          setMsg('');
        }
      },
      headers,
    );
  };

  useEffect(() => {
    console.log(chatUserState);
    connect();
    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    MoveToBottom();
  }, [msgList]);

  const onSubmitChat = (e) => {
    e.preventDefault();
    publish('chat');
  };

  // 스크롤 이벤트
  const containerRef = useRef();

  const MoveToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
    console.log('실행');
  };

  return (
    <div className={`flex h-full w-full flex-col gap-4 p-6 `}>
      <div
        className="flex items-center gap-3 "
        onClick={() => publish('detail')}
      >
        <button className="text-xl" onClick={() => setOpenChatRoomState(false)}>
          {'<'}
        </button>
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray6">
          {userData.profile ? (
            <img src={userData.profile} />
          ) : (
            <BsFillPersonFill className="text-3xl text-gray3" />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`rounded-full ${
              isLoading ? 'bg-transparent' : 'bg-blue1'
            } px-1.5 py-[1px] text-center text-[8px] font-semibold text-white`}
          >
            {userData.type}
          </div>
          <div className="text-balck text-sm font-semibold ">
            {userData.name}
          </div>
        </div>
      </div>
      <div className="h-[1.5px] w-full bg-gray6"></div>

      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[10px]">
          <img src="/icons/loading.svg" />
          <div className="text-xs font-semibold text-black">Loading...</div>
        </div>
      ) : isNothing ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="text-xs font-semibold text-gray1">
            {userData.name}님한테 커피챗을 보내보세요!
          </div>
        </div>
      ) : (
        <BubbleContainer ref={containerRef}>
          {msgList.map((el, idx) => (
            <ChatBubble el={el} idx={idx} name={loginState.name} />
          ))}
        </BubbleContainer>
      )}

      <form
        className="flex w-full items-center gap-2 rounded-[10px] bg-gray7 p-[10px]"
        onSubmit={onSubmitChat}
      >
        <input
          className="h-6 flex-1 bg-transparent text-xs font-medium text-gray1 outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-blue3">
          <BsSend className="text-sm text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
