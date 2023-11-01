import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SectionTitleProps {
  hasPlus?: boolean;
  children: React.ReactNode;
}

interface ListProps {
  children: React.ReactNode;
}

interface ListItemProps {
  children: React.ReactNode;
}

const NavBlock = styled.nav`
  section + section {
    margin-top: 2rem;
  }
`;

const ListBlock = styled.ul`
  li + li {
    margin-top: 1rem;
  }
`;

const SectionTitle = ({ hasPlus, children }: SectionTitleProps) => {
  if (hasPlus) {
    return (
      <h3 className="flex items-center justify-between">
        <span className="text-2xl font-extrabold text-slate-800">
          {children}
        </span>
        <img src="/icons/plus.svg" alt="plus-icon" className="h-4" />
      </h3>
    );
  }
  return <h3 className="text-2xl font-extrabold text-slate-800">{children}</h3>;
};

const Line = () => {
  return <div className="mt-3 h-[5px] w-full rounded-[42px] bg-indigo-100" />;
};

const List = ({ children }: ListProps) => {
  return <ListBlock className="mt-4">{children}</ListBlock>;
};

const ListItem = ({ children }: ListItemProps) => {
  return (
    <li className="text-xl font-medium text-gray-600">
      <Link to="#">{children}</Link>
    </li>
  );
};

const SideNavBar = () => {
  return (
    <NavBlock className="h-full w-64 bg-indigo-500 bg-opacity-40 px-8 py-10">
      <section>
        <SectionTitle>탐색</SectionTitle>
        <Line />
        <List>
          <ListItem>회의록 템플릿</ListItem>
          <ListItem>회의 로드맵</ListItem>
        </List>
      </section>
      <section>
        <SectionTitle>나의 회의 관리</SectionTitle>
        <Line />
      </section>
      <section>
        <SectionTitle hasPlus>팀 스페이스</SectionTitle>
        <Line />
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
