import { BsFillChatFill, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
  OpenChatState,
  ChatUserState,
  OpenChatRoomState,
} from '../../states/ChatState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { LoginState } from '../../states/LoginState';

interface MakerProps {
  data: any;
  isMobile?: boolean;
}

const EmailContainer = styled.div`
  @media (max-width: 1536px) {
    width: 125px;
  }
`;

const Maker = ({ data, isMobile }: MakerProps) => {
  const [openChatState, setOpenChatState] = useRecoilState(OpenChatState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);
  const [chatUserState, setChatUserState] = useRecoilState(ChatUserState);
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const onClickChat = () => {
    if (loginState.userId === data?.id) {
      setOpenChatState(true);
    } else {
      setChatUserState({ name: data.name, sessionId: data.sessionId });
      setOpenChatState(true);
      setOpenChatRoomState(true);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-[20px] bg-white px-6 py-7 ${
        isMobile && 'mb-4'
      }`}
    >
      <div
        className={`${
          isMobile ? 'mb-5 text-lg' : 'mb-[26px] text-xl'
        } font-bold text-gray1`}
      >
        메이커 소개
      </div>
      <div className="mb-[22px] flex items-center gap-4">
        <div
          className={`flex ${
            isMobile ? 'h-[70px] w-[70px]' : 'h-[78px] w-[78px]'
          } shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray6`}
        >
          {data?.profile ? (
            <img src={data?.profile} className="h-full w-full object-cover" />
          ) : (
            <BsFillPersonFill className="h-14 w-14 text-gray3" />
          )}
        </div>
        <div
          className={`flex flex-1 flex-col ${isMobile ? 'gap-1.5' : 'gap-2'}`}
        >
          <div className="flex items-center gap-1">
            <div
              className={`rounded-full bg-blue1 ${
                isMobile ? 'px-2 py-0.5 text-[8px]' : 'px-2 py-1 text-[10px]'
              } font-extrabold text-gray9`}
            >
              {data?.userType}
            </div>
            <Link
              to={
                loginState.userId === data?.id ? '/mypage' : `/user/${data?.id}`
              }
              className={`cursor-pointer ${
                isMobile ? 'text-sm' : 'text-base'
              } font-semibold text-gray1 hover:underline`}
            >
              {data?.name}
              {loginState.userId === data?.id && '(me)'}
            </Link>
          </div>
          <EmailContainer
            className={`break-words ${
              isMobile ? 'text-[8px]' : 'text-[11px]'
            } font-medium text-gray3`}
          >
            {data?.email}
          </EmailContainer>
          <button
            className={`flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#ECEBFE] ${
              isMobile ? 'py-1' : 'py-1.5'
            }`}
            onClick={onClickChat}
          >
            <BsFillChatFill
              className={`${isMobile ? 'h-2 w-2' : 'h-3 w-3'} text-blue1`}
            />
            <div
              className={`${
                isMobile ? 'text-[10px]' : 'text-xs'
              } font-semibold text-blue1`}
            >
              {loginState.userId === data?.id ? '커피챗 목록' : '커피챗 요청'}
            </div>
          </button>
        </div>
      </div>

      <div
        className={`mb-2 flex items-center justify-between ${
          isMobile ? 'text-sm' : 'text-[15px]'
        }`}
      >
        <div className="font-medium text-gray2">회의 템플릿 기여도</div>
        <div>
          <span className="font-extrabold text-blue1">{data?.templateNum}</span>
          <span className="font-semibold text-gray2">개</span>
        </div>
      </div>

      <div
        className={`mb-2 flex items-center justify-between ${
          isMobile ? 'text-sm' : 'text-[15px]'
        }`}
      >
        <div className="font-medium text-gray2">회의 로드맵 기여도</div>
        <div>
          <span className="font-extrabold text-blue1">{data?.roadmapNum}</span>
          <span className="font-semibold text-gray2">개</span>
        </div>
      </div>
    </div>
  );
};

export default Maker;
