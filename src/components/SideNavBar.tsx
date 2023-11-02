import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface SectionTitleProps {
  hasPlus?: boolean;
  children: React.ReactNode;
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

const SectionTitle = ({ hasPlus, children }: SectionTitleProps) => {
  if (hasPlus) {
    return (
      <div className="px-8">
        <h3 className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-slate-800">
            {children}
          </span>
          <img src="/icons/plus.svg" alt="plus-icon" className="h-4" />
        </h3>
        <div className="mt-3 h-[5px] w-full rounded-[42px] bg-indigo-100" />
      </div>
    );
  }

  return (
    <div className="px-8">
      <h3 className="text-2xl font-extrabold text-slate-800">{children}</h3>
      <div className="mt-3 h-[5px] w-full rounded-[42px] bg-indigo-100" />
    </div>
  );
};

const List = ({ children }: ListProps) => {
  return <div className="mt-2">{children}</div>;
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
      className={`block w-full cursor-pointer px-8 py-2 text-lg text-gray-600 duration-300 ${
        isActive ? 'bg-[#E2E9FF] font-bold' : 'font-medium hover:bg-[#cbd5fa]'
      }`}
    >
      {children}
    </Link>
  );
};

const SideNavBar = () => {
  return (
    <NavBlock className="h-full w-64 bg-indigo-500 bg-opacity-40 py-10">
      <section>
        <SectionTitle>탐색</SectionTitle>
        <List>
          <ListItem>회의록 템플릿</ListItem>
          <ListItem>회의 로드맵</ListItem>
        </List>
      </section>
      <section>
        <SectionTitle>나의 회의 관리</SectionTitle>
        <List>
          <ListItem to="/overview">Overview</ListItem>
          <ListItem>내 회의록, 로드맵 관리</ListItem>
          <ListItem>원본 데이터 보기</ListItem>
        </List>
      </section>
      <section>
        <SectionTitle hasPlus>팀 스페이스</SectionTitle>
        <List>
          <ListItem>경영 정보 시스템</ListItem>
          <ListItem>미팅 남녀</ListItem>
          <ListItem>대외홍보팀</ListItem>
        </List>
      </section>
    </NavBlock>
  );
};

export default SideNavBar;
