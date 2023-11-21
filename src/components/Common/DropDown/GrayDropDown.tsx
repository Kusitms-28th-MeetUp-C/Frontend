import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

// selectedItem 보낼 때에 반드시 객체로 보내주세요. id를 함께 관리해야하는 컴포넌트가 있어서 그래용
// selectedItem의 default값은 {id: 0, title: "박스에 나타내고 싶은 기본멘트"} 로 설정하면 됩니다
interface selectedItem {
  id: number;
  title: string;
}

interface GrayDropDownProps {
  itemList: selectedItem[];
  selectedItem: selectedItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<selectedItem>>;
  className?: string;
}

const GrayDropDown = ({
  itemList,
  selectedItem,
  setSelectedItem,
  className,
}: GrayDropDownProps) => {
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`flex cursor-pointer items-center justify-between bg-[#ECEEF8] py-2 pl-4 pr-3 ${
          isOpenCmbBox ? 'rounded-t-[10px]' : 'rounded-[10px]'
        } ${className}`}
        onClick={() => setIsOpenCmbBox((prev) => !prev)}
      >
        <div className="text-xs font-medium text-gray2">
          {selectedItem.title}
        </div>
        <FaCaretDown
          className={`text-xl text-gray2 duration-300 ${
            isOpenCmbBox && 'rotate-180'
          }`}
        />
      </div>
      {isOpenCmbBox && (
        <div className="absolute z-[50] flex w-full flex-col rounded-b-[10px] bg-[#ECEEF8]">
          <div className="m-auto h-[1.5px] w-[95%] bg-gray6" />
          {itemList?.map((el: any, idx: number) => (
            <div
              className={`cursor-pointer overflow-hidden px-4 py-2 text-xs font-medium text-gray2 duration-300 ${
                idx === itemList.length - 1 && 'hover:rounded-b-[10px]'
              } hover:bg-blue3 hover:text-white`}
              key={el.id}
              onClick={() => {
                setSelectedItem({ ...el });
                setIsOpenCmbBox((prev) => !prev);
              }}
            >
              {el.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrayDropDown;
