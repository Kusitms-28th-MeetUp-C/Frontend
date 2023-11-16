import { BsFillPersonFill, BsSend } from 'react-icons/bs';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';

import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';

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

const ChatRoom = ({ isOpenChatRoom, setIsOpenChatRoom }) => {
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const [msgList, setMsgList] = useState([]);
  const [msg, setMsg] = useState('');
  const [isSend, setIsSend] = useState(false);

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
      console.log('chatRoom success');
      subscribe();
      publish('detail');
      isSend && publish('chat');
      isSend && publish('detail');
    },
  });

  const publish = (option) => {
    if (!client.current.connected) {
      console.log('publish 통신 실패');
      return;
    } else {
      console.log('publish 통신 성공');
    }

    if (option === 'detail') {
      client.current.publish({
        destination: `/pub/chat/detail`,
        body: JSON.stringify({
          chatSession: 3,
          fromUserName: '김승훈',
          toUserName: '류관곤',
        }),
      });
      return;
    }

    if (option === 'chat') {
      client.current.publish({
        destination: `/pub/chat`,
        body: JSON.stringify({
          chatSession: 3,
          fromUserName: '김승훈',
          toUserName: '류관곤',
          content: msg,
        }),
      });
      return;
    }
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
        if (response.messageType === 'messageDetail') {
          setMsgList([...response.data.chatMessageList]);
          MoveToBottom();
        }
        if (response.messageType === 'received') {
          console.log('전송완료');
          setIsSend(false);
          setMsg('');
        }
      },
      headers,
    );
  };

  useEffect(() => {
    client.current.activate();
    return () => client.current.deactivate();
  }, [isSend]);

  const onSubmitChat = (e) => {
    e.preventDefault();
    setIsSend(true);
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
      <div className="flex items-center gap-3 ">
        <button className="text-xl" onClick={() => setIsOpenChatRoom(false)}>
          {'<'}
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray6">
          <BsFillPersonFill className="text-3xl text-gray3" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-full bg-blue1 px-1.5 py-[1px] text-center text-[8px] font-semibold text-white">
            대학생
          </div>
          <div className="text-balck text-sm font-semibold ">정예진</div>
        </div>
      </div>
      <div className="h-[1.5px] w-full bg-gray6"></div>

      <BubbleContainer ref={containerRef}>
        {msgList.map((el, idx) => (
          <div
            className={`flex w-full ${
              el.userName === loginState.name ? 'justify-end' : 'justify-start'
            }`}
            key={idx}
          >
            <div
              className={`max-w-[260px] px-4 py-3 text-xs font-medium leading-4 ${
                el.userName === loginState.name
                  ? 'rounded-l-[20px] rounded-tr-[20px] bg-blue1 text-white'
                  : 'rounded-r-[20px] rounded-tl-[20px] bg-gray7 text-black  '
              }`}
            >
              {el.content}
            </div>
          </div>
        ))}
      </BubbleContainer>
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
