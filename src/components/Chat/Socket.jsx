import * as StompJs from '@stomp/stompjs';
import { useRef, useState } from 'react';

const Socket = () => {
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
      console.log('success');
    },
  });

  const connect = () => {
    console.log('connect 실행');
    client.current.activate();
  };

  const disconnect = () => {
    console.log('disconnect 실행');
    client.current.deactivate();
  };

  return { connect, disconnect };
};

export default Socket;
