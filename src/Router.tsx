import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Meeting from './pages/Meeting';
import MeetingDetail from './pages/MeetingDetail';
import MyPage from './pages/MyPage';
import Template from './pages/Template';
import TemplateDetail from './pages/TemplateDetail';
import Roadmap from './pages/Roadmap';
import RoadmapDetail from './pages/RoadmapDetail';
import Management from './pages/Management';
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
          <Route path="/oauth">
            <Route path="google" element={<GoogleLogin />} />
            <Route path="kakao" element={<KakaoLogin />} />
          </Route>
          <Route path="/meeting">
            <Route path="" element={<Meeting />} />
            <Route path=":meetingId" element={<MeetingDetail />} />
          </Route>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/template">
            <Route path="" element={<Template />} />
            <Route path=":templateId" element={<TemplateDetail />} />
          </Route>
          <Route path="roadmap">
            <Route path="" element={<Roadmap />} />
            <Route path=":roadmapId" element={<RoadmapDetail />} />
          </Route>
          <Route path="/management" element={<Management />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
