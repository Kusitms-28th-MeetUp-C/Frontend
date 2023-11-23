import { HiMiniChatBubbleOvalLeft } from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import {
  ChatUserState,
  OpenChatRoomState,
  OpenChatState,
} from '../../../states/ChatState';

interface MyInfoChatButtonProps {
  isMyPage?: boolean;
  name?: string;
  sessionId?: string;
}

const MyInfoChatButton = ({
  isMyPage,
  name,
  sessionId,
}: MyInfoChatButtonProps) => {
  const [openChatState, setOpenChatState] = useRecoilState(OpenChatState);
  const [openChatRoomState, setOpenChatRoomState] =
    useRecoilState(OpenChatRoomState);
  const [chatUserState, setChatUserState] = useRecoilState(ChatUserState);

  const onClickBtn = () => {
    if (isMyPage) {
      setOpenChatState((prev) => !prev);
    } else {
      name && sessionId && setChatUserState({ name, sessionId });
      setOpenChatState(true);
      setOpenChatRoomState(true);
    }
  };

  return (
    <button
      className="flex w-40 justify-center rounded-xl bg-[#ECEBFE] px-4 py-2 text-blue1"
      onClick={onClickBtn}
    >
      <div className="flex items-center gap-1">
        <i>
          <HiMiniChatBubbleOvalLeft />
        </i>
        <span className="font-medium">
          {isMyPage ? '커피챗 목록' : '커피챗 요청'}
        </span>
      </div>
    </button>
  );
};

export default MyInfoChatButton;
