import { useLocation } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}

const Layout = ({ children, containerRef }: Props) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const excludedSideBarPaths = ['/login'];
  const includedFooter = ['/login'];

  const showSideBar = !excludedSideBarPaths.includes(currentPath);
  const showFooter = includedFooter.includes(currentPath);

  return (
    <div className="flex flex-col overflow-auto bg-[#EEEEFB]">
      <TopNavBar />
      <div className="flex h-screen max-h-[calc(100vh-65px)] flex-1">
        {showSideBar && <SideNavBar />}
        <div ref={containerRef} className="flex-1 overflow-y-auto bg-[#EEEEFB]">
          {children}
        </div>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
