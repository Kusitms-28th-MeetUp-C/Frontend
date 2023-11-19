import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  moveToTop: () => void;
}

const Layout = ({ children, containerRef, moveToTop }: Props) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const includedFooter = ['/login', '/'];
  const isFullScreen = includedFooter.includes(currentPath);

  useEffect(() => {
    moveToTop();
  }, [currentPath]);

  return (
    <div className="flex flex-col overflow-auto bg-[#EEEEFB]">
      <TopNavBar />
      {isFullScreen ? (
        <div className="w-fll bg-white">
          {children}
          <Footer />
        </div>
      ) : (
        <div className="flex h-screen max-h-[calc(100vh-65px)] flex-1">
          <SideNavBar />
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto bg-[#EEEEFB]"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
