import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

// selectedItem 보낼 때에 반드시 객체로 보내주세요. id를 함께 관리해야하는 컴포넌트가 있어서 그래용
// selectedItem의 default값은 {id: 0, title: "박스에 나타내고 싶은 기본멘트"} 로 설정하면 됩니다
interface selectedItem {
  id: number;
  title: string;
}

interface DropDownProps {
  itemList: selectedItem[];
  selectedItem: selectedItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<selectedItem>>;
}

const DropDown = ({
  itemList,
  selectedItem,
  setSelectedItem,
}: DropDownProps) => {
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`flex cursor-pointer items-center justify-between bg-white px-4 py-3 ${
          isOpenCmbBox ? 'rounded-t-[15px] bg-blue4' : 'rounded-[15px]'
        }`}
        onClick={() => setIsOpenCmbBox((prev) => !prev)}
      >
        <div className="text-base font-medium text-gray3">
          {selectedItem.title}
        </div>
        <MdExpandMore
          className={`h-8 w-8 text-blue1 duration-300 ${
            isOpenCmbBox && 'rotate-180'
          }`}
        />
      </div>
      {isOpenCmbBox && (
        <div className="absolute flex w-full flex-col rounded-b-[15px] bg-white">
          <div className="m-auto h-[1.5px] w-[95%] bg-gray6" />
          {itemList?.map((el: any, idx: number) => (
            <div
              className={`cursor-pointer overflow-hidden px-7 py-3 text-sm font-medium text-gray3 duration-300 ${
                idx === itemList.length - 1 && 'hover:rounded-b-[15px]'
              } hover:bg-[#ECEEF8]`}
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

export default DropDown;
