import { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';
import { typeFilter } from '../../../libs/utils/filter';

// selectedItem 보낼 때에 반드시 객체로 보내주세요. id를 함께 관리해야하는 컴포넌트가 있어서 그래용
// selectedItem의 default값은 {id: 0, title: "박스에 나타내고 싶은 기본멘트"} 로 설정하면 됩니다
export interface selectedItem {
  id: number;
  title: string;
}

interface DropDownProps {
  itemList: selectedItem[];
  selectedItem: selectedItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<selectedItem>>;
  width?: number;
  isCategory?: boolean;
  color?: 'lightBlue' | 'white';
  className?: string;
}

interface DropDownBlockProps {
  width?: number;
  color?: 'lightBlue' | 'white';
}

interface DropDownContentProps {
  color?: 'lightBlue' | 'white';
}

interface DropDownMenuProps {
  color?: 'lightBlue' | 'white';
}

const DropDownBlock = styled.div<DropDownBlockProps>`
  ${(props) => (props.width ? `width: ${props.width}px` : 'width: 100%')};
`;

const DropDownContent = styled.div<DropDownContentProps>`
  ${(props) =>
    props.color === 'lightBlue'
      ? 'background-color: #EBEEF9'
      : props.color === 'white' && 'background-color: white'};
`;

const DropDownMenu = styled.div<DropDownMenuProps>`
  ${(props) =>
    props.color === 'lightBlue'
      ? 'background-color: #EBEEF9'
      : props.color === 'white' && 'background-color: white'};
`;

const DropDown = ({
  itemList,
  selectedItem,
  setSelectedItem,
  width,
  isCategory,
  color = 'white',
  className,
}: DropDownProps) => {
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);

  return (
    <DropDownBlock width={width} color={color} className="relative">
      <DropDownContent
        color={color}
        className={`flex cursor-pointer items-center justify-between px-4 py-2 ${
          isOpenCmbBox ? 'rounded-t-[15px] bg-blue4' : 'rounded-[15px]'
        } ${className}`}
        onClick={() => setIsOpenCmbBox((prev) => !prev)}
      >
        <div className="text-sm text-gray3">
          {isCategory ? typeFilter(selectedItem.title) : selectedItem.title}
        </div>
        <MdExpandMore
          className={`h-8 w-8 text-blue1 duration-300 ${
            isOpenCmbBox && 'rotate-180'
          }`}
        />
      </DropDownContent>
      {isOpenCmbBox && (
        <DropDownMenu
          color={color}
          className="absolute z-50 flex w-full flex-col rounded-b-[15px]"
        >
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
              {isCategory ? typeFilter(el.title) : el.title}
            </div>
          ))}
        </DropDownMenu>
      )}
    </DropDownBlock>
  );
};

export default DropDown;
