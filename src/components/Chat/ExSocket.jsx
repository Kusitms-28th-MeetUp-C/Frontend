import React from 'react';
import './App.css';

import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';

function CreateReadChat() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState('');

  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: 'wss://panpeun.shop/ws',
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjk5ODkzMDkyLCJleHAiOjE3MTc4OTMwOTJ9.xePx7lnb3t7nPPbG4antTDEZO9uWO2bEUPMR_5C4OQE',
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
    if (!client.current.connected) return;
    const headers = {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjk5ODkzMDkyLCJleHAiOjE3MTc4OTMwOTJ9.xePx7lnb3t7nPPbG4antTDEZO9uWO2bEUPMR_5C4OQE', // 액세스 토큰을 여기에 추가
    };
    client.current.publish({
      headers,
      destination: '/pub/chatList',
      body: JSON.stringify({
        userName: '받는 사람',
      }),
    });
  };

  // const publish = (chat) => {
  //   if (!client.current.connected) return;
  //   const headers = {
  //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjk5ODkzMDkyLCJleHAiOjE3MTc4OTMwOTJ9.xePx7lnb3t7nPPbG4antTDEZO9uWO2bEUPMR_5C4OQE', // 액세스 토큰을 여기에 추가
  //   };
  //   client.current.publish({
  //     headers,
  //     destination: '/pub/chatList',
  //     body: JSON.stringify({
  //       chatSession: 12,
  //     }),
  //   });
  // };

  const subscribe = () => {
    const headers = {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjk5ODkzMDkyLCJleHAiOjE3MTc4OTMwOTJ9.xePx7lnb3t7nPPbG4antTDEZO9uWO2bEUPMR_5C4OQE', // 액세스 토큰을 여기에 추가
    };
    client.current.subscribe(
      '/sub/chat/3',
      (body) => {
        console.log(body.body);
      },
      headers,
    );
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    publish(chat);
  };
  
  useEffect(() => {
    connect();
    // return ()=>disconnect()
  }, []);

  return (
    <div>
      <div className={'chat-list'}>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input
            type={'text'}
            name={'chatInput'}
            onChange={handleChange}
            value={chat}
          />
        </div>
        <div onClick={() => publish()}>보내기</div>
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <CreateReadChat />
    </div>
  );
}

export default App;
