import { Client } from '@stomp/stompjs';
import { useRef, useEffect, createContext } from 'react';
import { useRecoilValue } from 'recoil';
import { HeaderState } from '../../states/SocketState';

export const SocketContext = createContext(null);

const Socket = ({ children }) => {
  const headers = useRecoilValue(HeaderState);
  const client = useRef(null);

  const connect = () => {
    client.current = new Client({
      brokerURL: 'ws://3.35.186.14:8080/ws',
      connectHeaders: {
        ...headers,
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      },

      onConnect: () => {
        console.log('socket success');
      },
    });

    client.current.activate();
  };

  useEffect(() => {
    connect();
    return () => {
      if (client) {
        console.log('deactivate');
        client.current.deactivate();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={client}>{children}</SocketContext.Provider>
  );
};

export default Socket;
