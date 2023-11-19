import { HiMiniChatBubbleOvalLeft } from 'react-icons/hi2';

const MyInfoChatButton = () => {
  return (
    <button className="flex w-40 justify-center rounded-xl bg-[#ECEBFE] px-4 py-2 text-blue1">
      <div className="flex items-center gap-1">
        <i>
          <HiMiniChatBubbleOvalLeft />
        </i>
        <span className="font-medium">커피챗 목록</span>
      </div>
    </button>
  );
};

export default MyInfoChatButton;
