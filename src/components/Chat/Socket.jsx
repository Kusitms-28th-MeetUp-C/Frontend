import * as StompJs from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';

function Socket() {
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([]);
  const client = useRef({});
  const myToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY5OTg5MjU2NCwiZXhwIjoxNzE3ODkyNTY0fQ.Jhj-Ih83gqcVF1cGBs0zCowwAHiyX3nC-sQ_uk3Hu7A';
  const sessionId = 10;

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

  const publish = (chat) => {
    console.log('publish 실행');

    if (!client.current.connected) return;

    const headers = {
      Authorization: `Bearer ${myToken}`,
    };

    client.current.publish({
      headers,
      destination: '/pub/chat',
      body: JSON.stringify({
        meetingId: 1,
        messageType: 'emoji',
        message: chat,
      }),
    });
    setChat('');
  };

  const subscribe = () => {
    console.log('subscribe 실행');
    const headers = {
      Authorization: `Bearer ${myToken}`,
    };

    client.current.subscribe(
      `/sub/chat/${sessionId}`,
      (body) => {
        const json_body = JSON.parse(body.body);
        setChatList((_chat_list) => [..._chat_list, json_body]);
      },
      headers,
    );
  };

  const disconnect = () => {
    console.log('disconnect 실행');

    client.current.deactivate();
  };

  useEffect(() => {
    connect();
  }, []);

  return <></>;
}
export default Socket;
