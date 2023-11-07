import { AiOutlineSearch } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BiTimeFive } from 'react-icons/bi';
import { MdNavigateNext } from 'react-icons/md';
// import { useState } from 'react';

interface ListItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const FilerItem = ({ children, isActive }: ListItemProps) => {
  return (
    <div
      className={`cursor-pointer rounded-full px-6 py-1.5 text-[16px] duration-300 ${
        isActive
          ? 'bg-[#5257D6] font-bold text-white'
          : 'bg-white font-medium text-[#8A929F] hover:bg-[#5257D6] hover:text-white hover:opacity-70'
      }`}
    >
      {children}
    </div>
  );
};

const Item = () => {
  return (
    <div className="flex w-[360px] cursor-pointer flex-col rounded-2xl bg-white px-6 py-5">
      <div className="color-[#495565] mb-1.5 text-[14px]">자유주제</div>
      <div className="color-[#393948] mb-4 text-[20px] font-bold">
        자유주제 PT 팀플 회의 템플릿
      </div>
      <div className="mb-8 w-fit rounded-full bg-[#EEEEFB] px-3 py-1 text-[12px] font-semibold text-[#495565]">
        연결된 로드맵
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaPeopleGroup style={{ color: '#5A5A5A' }} />
          <div className="mr-2 text-[14px] text-[#8A929F]">66팀 사용 중</div>
          <BiTimeFive style={{ color: '#5A5A5A' }} />
          <div className="text-[14px] text-[#8A929F]">40m</div>
        </div>
        <div className="flex cursor-pointer items-center gap-0.5">
          <div className="text-[14px] text-[#8A929F]">자세히보기</div>
          <MdNavigateNext style={{ color: '#8A929F' }} />
        </div>
      </div>
    </div>
  );
};
const Template = () => {
  return (
    <div className="px-[70px] py-[50px]">
      <div className="mb-8 flex max-w-[400px] items-center justify-between rounded-full bg-white px-[20px] py-[8px]">
        <input className="w-[90%] border-none text-base outline-none" />
        <AiOutlineSearch
          style={{
            cursor: 'pointer',
            color: '#495565',
            width: '20px',
            height: '20px',
          }}
        />
      </div>
      <div className="mb-8 flex flex-wrap gap-3">
        <FilerItem isActive>전체</FilerItem>
        <FilerItem>IT 프로젝트</FilerItem>
        <FilerItem>설문 및 데이터 분석</FilerItem>
        <FilerItem>기업 분석</FilerItem>
        <FilerItem>자유주제PT</FilerItem>
        <FilerItem>마케팅</FilerItem>
      </div>

      <div className="flex flex-wrap gap-4">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default Template;
