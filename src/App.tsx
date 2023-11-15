import Router from './Router';
import Socket from './components/Chat/Socket.jsx';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';

function App() {
  // const { connect, disconnect } = Socket();

  useEffect(() => {
    // connect();
    // return () => disconnect();
  }, []);

  return (
    <RecoilRoot>
      <Router />
      {/* <Socket /> */}
    </RecoilRoot>
  );
}

export default App;
