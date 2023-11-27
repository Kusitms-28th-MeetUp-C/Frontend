import { useLocation, useNavigate } from 'react-router-dom';
import { FaCompass } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';

interface SectionTitleProps {
  children: React.ReactNode;
  isSearch?: boolean;
}

interface ListProps {
  children: React.ReactNode;
}

interface ListItemProps {
  to: string;
  children: React.ReactNode;
}

const SectionTitle = ({ children, isSearch }: SectionTitleProps) => {
  return (
    <div className="px-6">
      <div className="flex items-center gap-3">
        {isSearch ? (
          <FaCompass
            style={{ color: 'white', width: '20px', height: '20px' }}
          />
        ) : (
          <img src="/icons/folder.svg" alt='folder'/>
        )}
        <h3 className="text-base font-extrabold text-white">{children}</h3>
      </div>
      <div className="my-3 h-[2px] w-full rounded-[42px] bg-[#8689E2]" />
    </div>
  );
};

const List = ({ children }: ListProps) => {
  return <div className="mt-2 flex flex-col gap-2 pl-6">{children}</div>;
};

const ListItem = ({ to, children }: ListItemProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate();
  const [loginState] = useRecoilState(LoginState);

  const onClickCategory = (to: string) => {
    if (
      !loginState.isLogin &&
      (to === '/meeting' || to === '/search-template')
    ) {
      alert('로그인이 필요한 서비스입니다');
      navigate('/login');
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={() => onClickCategory(to)}
      className={`flex w-full cursor-pointer items-center justify-between rounded-l-full py-2 pl-5 pr-2 text-[14px]  duration-300 ${
        pathname.startsWith(to)
          ? 'bg-[#EEEEFB] font-bold text-[#5257D6]'
          : 'font-semibold text-white hover:bg-[#EEEEFB] hover:text-[#5257D6]'
      }`}
    >
      <div>{children}</div>
      <MdNavigateNext
        style={{
          width: '25px',
          height: '25px',
          visibility: `${pathname.startsWith(to) ? 'visible' : 'hidden'}`,
        }}
      />
    </button>
  );
};

const SideNavBar = () => {
  return (
    <div className="flex h-[calc(100vh-65px)] w-[216px] flex-col rounded-tr-[20px] bg-blue1 pb-5 pt-[30px]">
      <div className="mb-[50px]">
        <SectionTitle isSearch>탐색</SectionTitle>
        <List>
          <ListItem to="/template">회의록 템플릿</ListItem>
          <ListItem to="/roadmap">로드맵 템플릿</ListItem>
        </List>
      </div>
      <div>
        <SectionTitle>관리</SectionTitle>
        <List>
          <ListItem to="/meeting">로드맵 관리</ListItem>
          <ListItem to="/search-template">회의록 관리</ListItem>
        </List>
      </div>
    </div>
  );
};

export default SideNavBar;
