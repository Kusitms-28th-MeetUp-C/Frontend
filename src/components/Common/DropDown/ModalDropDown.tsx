import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

interface selectedItem {
  id: number;
  title: string;
}

interface ModalDropDownProps {
  itemList: selectedItem[];
  selectedItem: selectedItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<selectedItem>>;
  className?: string;
}

const ModalDropDown = ({
  itemList,
  selectedItem,
  setSelectedItem,
  className,
}: ModalDropDownProps) => {
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`flex cursor-pointer items-center justify-between bg-[#ECEBFE] py-2 pl-5 pr-3 ${
          isOpenCmbBox ? 'rounded-t-[10px]' : 'rounded-[10px]'
        } ${className}`}
        onClick={() => setIsOpenCmbBox((prev) => !prev)}
      >
        <div className="text-base font-bold text-gray2">
          {selectedItem.title}
        </div>
        <MdExpandMore
          className={`h-8 w-8 text-blue1 duration-300 ${
            isOpenCmbBox && 'rotate-180'
          }`}
        />
      </div>
      {isOpenCmbBox && (
        <div className="absolute flex w-full flex-col rounded-b-[10px] bg-white shadow-md">
          {/* <div className="m-auto h-[1.5px] w-[95%] bg-gray5" /> */}
          {itemList?.map((el: any, idx: number) => (
            <div
              className={`cursor-pointer overflow-hidden px-7 py-3 text-base font-medium text-gray2 duration-300 ${
                idx === itemList.length - 1 && 'hover:rounded-b-[10px]'
              } hover:bg-blue4`}
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

export default ModalDropDown;
