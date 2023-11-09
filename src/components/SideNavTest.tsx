import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TbLogout } from 'react-icons/tb';
import { FaCompass } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';

interface SectionTitleProps {
  children: React.ReactNode;
  isSearch?: boolean;
}

interface ListProps {
  children: React.ReactNode;
}

interface ListItemProps {
  to?: string;
  children: React.ReactNode;
}

const NavBlock = styled.nav`
  section + section {
    margin-top: 2rem;
  }
`;

const SectionTitle = ({ children, isSearch }: SectionTitleProps) => {
  return (
    <div className="px-8">
      <div className="flex items-center gap-3">
        {isSearch ? (
          <FaCompass
            style={{ color: 'white', width: '20px', height: '20px' }}
          />
        ) : (
          <img src="/icons/folder.svg" />
        )}
        <h3 className="text-base font-extrabold text-white">{children}</h3>
      </div>
      <div className="my-3 h-[2px] w-full rounded-[42px] bg-[#8689E2]" />
    </div>
  );
};

const List = ({ children }: ListProps) => {
  return <div className="mt-2 flex flex-col gap-2 pl-8">{children}</div>;
};

const ListItem = ({ to, children }: ListItemProps) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (to) {
      const pathname = location.pathname;
      setIsActive(pathname === to);
    }
  }, [to, location, isActive]);

  return (
    <Link
      to={to ? to : '#'}
      className={`block flex w-full cursor-pointer items-center justify-between rounded-l-full py-2 pl-6 pr-1 text-[14px]  duration-300 ${
        isActive
          ? 'bg-[#EEEEFB] font-bold text-[#5257D6]'
          : 'font-semibold text-white hover:bg-[#EEEEFB] hover:text-[#5257D6]'
      }`}
    >
      <div>{children}</div>
      <MdNavigateNext
        style={{
          width: '25px',
          height: '25px',
          visibility: `${isActive ? 'visible' : 'hidden'}`,
        }}
      />
    </Link>
  );
};

const SideNavTest = () => {
  return (
    <NavBlock className="w-54 flex h-[calc(100vh-65px)] flex-col justify-between rounded-tr-[20px] bg-[#5257D6] pb-5 pt-7">
      <div>
        <div className="mb-[50px]">
          <SectionTitle isSearch>탐색</SectionTitle>
          <List>
            <ListItem to="/template">회의록 템플릿</ListItem>
            <ListItem>회의 로드맵</ListItem>
          </List>
        </div>
        <div>
          <SectionTitle>관리</SectionTitle>
          <List>
            <ListItem to="/overview">나의 회의 관리</ListItem>
            <ListItem>내 회의록, 로드맵 관리</ListItem>
          </List>
        </div>
      </div>
      <div className="px-4">
        <Link
          to="/mypage"
          className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white px-4 py-4"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-zinc-300" />
            <span className="ml-3 text-xl font-extrabold text-slate-800">
              신민선
            </span>
          </div>
          <Link
            to="/logout"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-200"
          >
            <i className="translate-x-[0.5px] text-xl text-[#495565]">
              <TbLogout />
            </i>
          </Link>
        </Link>
      </div>
    </NavBlock>
  );
};

export default SideNavTest;
