import Router from './Router';
import Socket from './components/Chat/Socket';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router />
      {/* <Socket /> */}
    </RecoilRoot>
  );
}

export default App;
