import * as StompJs from '@stomp/stompjs';
import { useRef, useEffect } from 'react';

const Socket = () => {
  const client = useRef({});
  const myToken = localStorage.getItem('access-token');
  const sessionId = 11;

  const connect = () => {
    console.log('connect 실행');

    client.current = new StompJs.Client({
      brokerURL: 'wss://panpeun.shop/ws',
      connectHeaders: {
        Authorization: `Bearer ${myToken}`,
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      },

      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = ({ option, chat, chatSession, toUserName, fromUserName }) => {
    console.log('publish 실행');
    // if (!client.current.connected) return;
    console.log('ddd');

    const headers = {
      Authorization: `Bearer ${myToken}`,
    };

    if (option === 'list') {
      console.log('list 맞음');
      client.current.publish({
        headers,
        destination: `/pub/chatList`,
        body: JSON.stringify({
          userName: fromUserName,
        }),
      });
    }

    if (option === 'detail') {
      client.current.publish({
        headers,
        destination: `/pub/chat/detail`,
        body: JSON.stringify({
          chatSession,
          fromUserName,
          toUserName,
        }),
      });
    }

    if (option === 'chat') {
      client.current.publish({
        headers,
        destination: `/pub/chatList/${fromUserName}`,
        body: JSON.stringify({
          userName: fromUserName,
        }),
      });
    }
  };

  const subscribe = ({ option, setChatList }) => {
    console.log('subscribe 실행');
    const headers = {
      Authorization: `Bearer ${myToken}`,
    };

    client.current.subscribe(
      `/sub/chat/${sessionId}`,
      (body) => {
        console.log('subscribe 받아와짐');
        console.log(body.body);
      },
      headers,
    );

    // if (option === 'list') {
    //   client.current.subscribe(
    //     `/sub/chat/${sessionId}`,
    //     (body) => {
    //       console.log(body.body);
    //       const json_body = JSON.parse(body.body);
    //       setChatList((list) => [...list, json_body]);
    //     },
    //     headers,
    //   );
    // }
  };

  const disconnect = () => {
    console.log('disconnect 실행');

    client.current.deactivate();
  };

  useEffect(() => {
    connect();
    publish({ option: 'list' });
  }, []);

  // return { publish, connect, subscribe, disconnect };
  return <></>;
};

export default Socket;
