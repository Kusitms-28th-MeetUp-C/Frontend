import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import MyPage from './pages/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
