import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <TopNavBar />
      <div className="flex flex-1">
        <SideNavBar />
        <div className="flex-1 bg-indigo-100">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
