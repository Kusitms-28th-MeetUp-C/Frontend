import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SideNavBar from './components/SideNavBar';

const Router = () => {
  return (
    <BrowserRouter>
      <SideNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
