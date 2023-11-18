import * as StompJs from '@stomp/stompjs';
import { useRef, useState } from 'react';

const Socket = () => {
  const client = useRef({});
  const myToken = localStorage.getItem('access-token');
  const sessionId = 11;

  // const [chatList, setChatList] = useState('');
  // const [msgList, setMsgList] = useState([]);

  client.current = new StompJs.Client({
    brokerURL: 'wss://panpeun.shop/ws',
    connectHeaders: {
      Authorization: `Bearer ${myToken}`,
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
    },

    onConnect: () => {
      console.log('success');
      // subscribe();
      // publish('list');
    },
  });

  const connect = () => {
    console.log('connect 실행');
    client.current.activate();
  };

  // const publish = (option) => {
  //   if (!client.current.connected) {
  //     console.log('publish 통신 실패');
  //     return;
  //   } else {
  //     console.log('publish 통신 성공');
  //   }

  //   if (option === 'list') {
  //     client.current.publish({
  //       destination: `/pub/chatList`,
  //       body: JSON.stringify({
  //         userName: '김승훈',
  //       }),
  //     });
  //   }

  //   if (option === 'detail') {
  //     client.current.publish({
  //       destination: `/pub/chat/detail`,
  //       body: JSON.stringify({
  //         chatSession: 3,
  //         fromUserName: '김승훈',
  //         toUserName: '류관곤',
  //       }),
  //     });
  //   }

  //   if (option === 'chat') {
  //     client.current.publish({
  //       destination: `/pub/chat`,
  //       body: JSON.stringify({
  //         chatSession: 3,
  //         fromUserName: '김승훈',
  //         toUserName: '류관곤',
  //         content: '아 제발 성공해라',
  //       }),
  //     });
  //   }
  // };

  // const subscribe = () => {
  //   console.log('subscribe 실행');
  //   const headers = {
  //     Authorization: `Bearer ${myToken}`,
  //   };

  //   client.current.subscribe(
  //     `/sub/chat/${sessionId}`,
  //     (body) => {
  //       const response = JSON.parse(body.body);
  //       console.log(response);

  //       if (response.messageType === 'chatList') {
  //         setChatList(response.messageType);
  //         console.log(chatList);
  //         console.log(
  //           response.messageType,
  //           response.data,
  //           response.data.chatList,
  //         );
  //       } else if (response.messageType === 'messageDetail')
  //         setMsgList([...response.data.chatMessageList]);
  //       else if (response.messageType === 'received') console.log('전송완료');
  //       else console.log('messageType이 올바르지 않음');
  //     },
  //     headers,
  //   );
  // };

  const disconnect = () => {
    console.log('disconnect 실행');
    client.current.deactivate();
  };

  return { connect, disconnect };
};

export default Socket;