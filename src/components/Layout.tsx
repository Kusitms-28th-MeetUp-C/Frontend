import SideNavBar from './SideNavBar';
import SideNavTest from './SideNavTest';
import TopNavBar from './TopNavBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <TopNavBar />
      <div className="flex flex-1">
        <SideNavTest />
        <div className="flex-1 bg-[#EEEEFB]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
