import { FaPlus } from 'react-icons/fa';
import { AddButtonProps } from '../interface';

const AddButton = ({
  target = 'template',
  onClick,
  type = 'button',
}: AddButtonProps) => {
  return (
    <button
      type={type}
      className={`mx-auto flex items-center gap-2 rounded-xl px-6 py-2${
        target === 'step' ? ' bg-blue2 text-white' : ' bg-white text-gray3'
      }`}
      onClick={onClick}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full${
          target === 'step' ? ' bg-white' : ' bg-blue2'
        } `}
      >
        <i
          className={`text-xs${
            target === 'step' ? ' text-blue2' : ' text-white'
          }`}
        >
          <FaPlus className="h-full" />
        </i>
      </div>
      <span>스텝 내용 추가</span>
    </button>
  );
};

export default AddButton;
