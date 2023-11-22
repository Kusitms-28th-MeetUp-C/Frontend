import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import Footer from './Footer';
import Modal from '../Modal/Modal';

import { FaBars } from 'react-icons/fa6';
import { RiPencilFill } from 'react-icons/ri';
import { MdNavigateNext } from 'react-icons/md';
import { FaCompass } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import { useRecoilState } from 'recoil';
import { OpenChatState, OpenChatRoomState } from '../../states/ChatState';
import { LoginState } from '../../states/LoginState';

interface Props {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  moveToTop: () => void;
}

interface SectionTitleProps {
  children: React.ReactNode;
  isSearch?: boolean;
}

interface ListItemProps {
  to: string;
  children: React.ReactNode;
}

const SectionTitle = ({ children, isSearch }: SectionTitleProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        {isSearch ? (
          <FaCompass className="text-base text-white" />
        ) : (
          <img src="/icons/folder.svg" className="h-4 w-4" />
        )}
        <div className="text-xs font-bold text-white">{children}</div>
      </div>
      <div className="my-[8.5px] h-[1px] w-full rounded-[42px] bg-blue2" />
    </div>
  );
};

const ListItem = ({ to, children }: ListItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(LoginState);

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
      className={`flex w-full items-center justify-between rounded-full py-[6px] pl-[15px] pr-2 duration-300 ${
        location.pathname.startsWith(to)
          ? 'bg-[#EEEEFB] font-bold text-[#5257D6]'
          : 'font-semibold text-white hover:bg-[#EEEEFB] hover:text-[#5257D6]'
      }`}
    >
      <div className="text-[10px]">{children}</div>
      <MdNavigateNext
        style={{
          fontSize: '16px',
          visibility: `${
            location.pathname.startsWith(to) ? 'visible' : 'hidden'
          }`,
        }}
      />
    </button>
  );
};

const Layout = ({ children, containerRef, moveToTop }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // 반응형 레이아웃
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isClickCreate, setIsClickCreate] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

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
    setIsOpenSideBar(false);
  }, [currentPath]);

  return (
    <div className="relative flex flex-col overflow-auto bg-[#EEEEFB]">
      <TopNavBar />
      {isFullScreen ? (
        <div className="w-fll bg-white">
          {children}
          <Footer isMobile={isMobile} />
        </div>
      ) : (
        <div
          className={`flex h-screen ${
            isMobile ? 'max-h-[calc(100vh-40px)]' : 'max-h-[calc(100vh-65px)]'
          } flex-1`}
        >
          {!isMobile && <SideNavBar />}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto bg-[#EEEEFB]"
          >
            {children}
          </div>
        </div>
      )}

      {!isFullScreen && isMobile && (
        <button
          className="fixed bottom-6 left-6 z-[70] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-md"
          onClick={() => setIsOpenSideBar(true)}
        >
          <FaBars className="text-[32px] text-gray3" />
        </button>
      )}

      {!isFullScreen && isMobile && (
        <button
          className="fixed bottom-6 right-6 z-[70] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-blue1 shadow-md"
          onClick={() => setIsClickCreate(true)}
        >
          <RiPencilFill className="text-[32px] text-white" />
        </button>
      )}

      {isClickCreate && (
        <Modal
          isCreate
          title="어떤 템플릿을 업로드 할까요?"
          cancel="회의록 템플릿"
          submit="로드맵 템플릿"
          setIsOpen={setIsClickCreate}
          onCancel={() => {
            navigate('/template/create');
            setIsClickCreate(false);
          }}
          onSubmit={() => {
            navigate('/roadmap/create');
            setIsClickCreate(false);
          }}
        />
      )}

      {isOpenSideBar && isMobile && (
        <div className="fixed bottom-6 left-6 z-[70] flex w-[148px] flex-col gap-[14px] rounded-[20px] bg-blue1 px-4 py-4 duration-300">
          <div className="mb-2">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaCompass className="text-base text-white" />
                  <div className="text-xs font-bold text-white">탐색</div>
                </div>
                <IoClose
                  className="cursor-pointer text-white"
                  onClick={() => setIsOpenSideBar(false)}
                />
              </div>
              <div className="my-[8.5px] h-[1px] w-full rounded-[42px] bg-blue2" />
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <ListItem to="/template">회의록 템플릿</ListItem>
              <ListItem to="/roadmap">로드맵 템플릿</ListItem>
            </div>
          </div>

          <div>
            <div>
              <div className="flex items-center gap-2">
                <img src="/icons/folder.svg" className="h-4 w-4" />
                <div className="text-xs font-bold text-white">관리</div>
              </div>
              <div className="my-[8.5px] h-[1px] w-full rounded-[42px] bg-blue2" />
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <ListItem to="/meeting">로드맵 관리</ListItem>
              <ListItem to="/search-template">회의록 관리</ListItem>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
