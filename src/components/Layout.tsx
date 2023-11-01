import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <TopNavBar />
      <div className="flex flex-1 bg-[#F5F6FE]">
        <SideNavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
