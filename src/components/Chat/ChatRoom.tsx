import { BsFillPersonFill, BsSend } from 'react-icons/bs';
import styled from 'styled-components';

interface ChatRoomProps {
  isOpenChatRoom: boolean;
  setIsOpenChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const BubbleContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 설정 */
    transition-duration: 300ms;
  }

  &:hover::-webkit-scrollbar {
    opacity: 1;
    transition: opacity 0.7s ease-in-out;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #cacef0;
    border-radius: 4px;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    transition-duration: 300ms;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

const ChatRoom = ({ isOpenChatRoom, setIsOpenChatRoom }: ChatRoomProps) => {
  const messages = [
    {
      text: '신민선 PM님 안녕하세요, 올려주신 템플릿 잘 보았습니다. 궁금한 것 이 있어서 연락드려요. 이번에 템플릿 직접 만드신 건가요? 저한테만 알려주세요.',
      isSend: false,
    },
    {
      text: '안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요',
      isSend: true,
    },
    {
      text: '안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요',
      isSend: false,
    },

    {
      text: '안녕하세요 안녕하세요',
      isSend: true,
    },
    {
      text: '신민선 PM님 안녕하세요, 올려주신 템플릿 잘 보았습니다. 궁금한 것 이 있어서 연락드려요. 이번에 템플릿 직접 만드신 건가요? 저한테만 알려주세요.',
      isSend: false,
    },
    {
      text: '신민선 PM님 안녕하세요, 올려주신 템플릿 잘 보았습니다. 궁금한 것 이 있어서 연락드려요. 이번에 템플릿 직접 만드신 건가요? 저한테만 알려주세요.',
      isSend: true,
    },
    {
      text: '신민선 PM님 안녕하세요, 올려주신 템플릿 잘 보았습니다. 궁금한 것 이 있어서 연락드려요. 이번에 템플릿 직접 만드신 건가요? 저한테만 알려주세요.',
      isSend: false,
    },
  ];

  return (
    <div className={`flex h-full w-full flex-col gap-4 p-6 `}>
      <div className="flex items-center gap-3 ">
        <button className="text-xl" onClick={() => setIsOpenChatRoom(false)}>
          {'<'}
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray6">
          <BsFillPersonFill className="text-3xl text-gray3" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-full bg-blue1 px-1.5 py-[1px] text-center text-[8px] font-semibold text-white">
            대학생
          </div>
          <div className="text-balck text-sm font-semibold ">정예진</div>
        </div>
      </div>
      <div className="h-[1.5px] w-full bg-gray6"></div>
      <BubbleContainer>
        {messages.map((el, idx) => (
          <div
            className={`flex w-full ${
              el.isSend ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[260px] px-4 py-3 text-xs font-medium leading-4 ${
                el.isSend
                  ? 'rounded-l-[20px] rounded-tr-[20px] bg-blue1 text-white'
                  : 'rounded-r-[20px] rounded-tl-[20px] bg-gray7 text-black  '
              }`}
            >
              {el.text}
            </div>
          </div>
        ))}
      </BubbleContainer>
      <form className="flex w-full items-center gap-2 rounded-[10px] bg-gray7 p-[10px]">
        <input className="h-6 flex-1 bg-transparent text-xs font-medium text-gray1 outline-none" />
        <button className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-blue3">
          <BsSend className="text-sm text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
