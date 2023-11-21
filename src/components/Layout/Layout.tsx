import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import Footer from './Footer';

import { FaBars } from 'react-icons/fa6';
import { RiPencilFill } from 'react-icons/ri';

import { useRecoilState } from 'recoil';
import { OpenChatState, OpenChatRoomState } from '../../states/ChatState';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  moveToTop: () => void;
}

const ResMiniBtn = styled.button`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    display: flex;
  }
`;

const Layout = ({ children, containerRef, moveToTop }: Props) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 반응형 레이아웃
  const [isOpenSideBar, setIsBarSideBar] = useState(false);

  // navBar 보여지는 페이지 설정
  const includedFooter = ['/', '/login', '/article', '/signUp'];
  const isFullScreen = includedFooter.includes(currentPath);

  // 채팅 데이터 사라지기
  const [openChatState, setOpenChatState] = useRecoilState(OpenChatState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);

  // 페이지 이동시 스크롤 상단으로 이동
  const screenMoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('실행');
  };

  useEffect(() => {
    screenMoveToTop();
    moveToTop();
    setOpenChatState(false);
    setOpenChatRoomState(false);
  }, [currentPath]);

  return (
    <div className="relative flex flex-col overflow-auto bg-[#EEEEFB]">
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
      {/* <ResMiniBtn className="absolute bottom-6 left-6 hidden h-[52px] w-[52px] items-center justify-center rounded-full bg-white">
        <FaBars className="text-[32px] text-gray3" />
      </ResMiniBtn>
      <ResMiniBtn className="absolute bottom-6 right-6 hidden h-[52px] w-[52px] items-center justify-center rounded-full bg-blue1">
        <RiPencilFill className="text-[32px] text-white" />
      </ResMiniBtn> */}
    </div>
  );
};

export default Layout;
