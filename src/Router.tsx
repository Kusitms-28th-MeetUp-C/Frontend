import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Overview from './pages/Overview';
import MyPage from './pages/MyPage';
import Template from './pages/Template';
import TemplateDetail from './pages/TemplateDetail';
import Roadmap from './pages/Roadmap';
import RoadmapDetail from './pages/RoadmapDetail';
import MyItems from './pages/MyItems';
import LoginPage from './pages/LoginPage';
import GoogleLogin from './pages/GoogleLogin';
import KakaoLogin from './pages/KakaoLogin';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/google" element={<GoogleLogin />} />
          <Route path="/oauth/kakao" element={<KakaoLogin />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/template" element={<Template />} />
          <Route path="/template/:templateId" element={<TemplateDetail />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:roadmapId" element={<RoadmapDetail />} />
          <Route path="/my-items" element={<MyItems />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
