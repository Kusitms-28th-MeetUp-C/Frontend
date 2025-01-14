import Router from './Router';
import { RecoilRoot } from 'recoil';
import Socket from './components/Chat/Socket';

function App() {
  return (
    <RecoilRoot>
      <Socket>
        <Router />
      </Socket>
    </RecoilRoot>
  );
}

export default App;
