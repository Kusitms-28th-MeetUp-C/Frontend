import { BsFillChatFill, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
  OpenChatState,
  ChatUserState,
  OpenChatRoomState,
} from '../../states/ChatState';
import { useRecoilState } from 'recoil';

interface MakerProps {
  data: any;
}

const Maker = ({ data }: MakerProps) => {
  const [openChatState, setOpenChatState] = useRecoilState(OpenChatState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);
  const [chatUserState, setChatUserState] = useRecoilState(ChatUserState);

  const onClickChat = () => {
    setChatUserState({ name: data.name, sessionId: data.sessionId });
    setOpenChatState(true);
    setOpenChatRoomState(true);
  };

  return (
    <div className="flex flex-col rounded-[20px] bg-white px-6 py-7">
      <div className="mb-[26px] text-xl font-bold text-gray1">메이커 소개</div>
      <div className="mb-[22px] flex items-center gap-4">
        <div className="flex h-[78px] w-[78px] items-center justify-center overflow-hidden rounded-full bg-gray6">
          {data?.profile ? (
            <img src={data?.profile} />
          ) : (
            <BsFillPersonFill className="h-14 w-14 text-gray3" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-blue1 px-2 py-1 text-[10px] font-extrabold text-gray9">
              {data?.userType}
            </div>
            <Link
              to="#"
              className="cursor-pointer text-base font-semibold text-gray1 hover:underline"
            >
              {data?.name}
            </Link>
          </div>
          <div className="text-[11px] font-medium text-gray3">
            {data?.email}
          </div>
          <button
            className="flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#ECEBFE] py-1.5"
            onClick={onClickChat}
          >
            <BsFillChatFill className="h-3 w-3 text-blue1" />
            <div className="text-xs font-semibold text-blue1">커피챗</div>
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="text-[15px] font-medium text-gray2">
          회의 템플릿 기여도
        </div>
        <div>
          <span className="text-[15px] font-extrabold text-blue1">
            {data?.templateNum}
          </span>
          <span className="text-[15px] font-semibold text-gray2">개</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[15px] font-medium text-gray2">
          회의 로드맵 기여도
        </div>
        <div>
          <span className="text-[15px] font-extrabold text-blue1">
            {data?.roadmapNum}
          </span>
          <span className="text-[15px] font-semibold text-gray2">개</span>
        </div>
      </div>
    </div>
  );
};

export default Maker;
