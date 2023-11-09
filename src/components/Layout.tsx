import SideNavTest from './SideNavTest';
import TopNavBar from './TopNavBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col overflow-auto bg-[#EEEEFB]">
      <TopNavBar />
      <div className="flex max-h-[calc(100vh-65px)] h-screen flex-1">
        <SideNavTest />
        <div className="flex-1 overflow-y-auto bg-[#EEEEFB]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
