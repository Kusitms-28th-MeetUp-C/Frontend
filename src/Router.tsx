import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Overview from './pages/Overview';
import MyPage from './pages/MyPage';
import Template from './pages/Template';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/template" element={<Template />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
