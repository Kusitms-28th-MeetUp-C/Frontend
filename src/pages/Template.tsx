import { AiOutlineSearch } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BiTimeFive } from 'react-icons/bi';
import { MdNavigateNext } from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
// import { useState } from 'react';

interface ListItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const FilerItem = ({ children, isActive }: ListItemProps) => {
  return (
    <div
      className={`cursor-pointer rounded-full px-4  py-1.5 text-[14px] duration-300 ${
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
    <div className="flex w-[355px] cursor-pointer flex-col rounded-2xl bg-white p-[26px]">
      <div className="color-[#495565] mb-[10px] text-[12px]">IT 프로젝트</div>
      <div className="color-[#393948] mb-4 text-base font-bold">
        플로우 설계 회의 템플릿
      </div>
      <div className="mb-6 flex w-fit items-center gap-1 rounded-full bg-[#EEEEFB] px-2.5 py-[3px] text-[12px] font-semibold text-[#495565]">
        <img src="/icons/category.svg" />
        <div>기획-디자인-개발 프로젝트 로드맵</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <FaPeopleGroup
            style={{ width: '20px', height: '20px', color: '#5A5A5A' }}
          />
          <div className="mr-[10px] text-[14px] font-semibold text-[#8A929F]">
            66팀 사용 중
          </div>
          <BiTimeFive
            style={{ width: '20px', height: '20px', color: '#5A5A5A' }}
          />
          <div className="text-[14px] font-semibold text-[#8A929F]">40m</div>
        </div>
        <div className="flex cursor-pointer items-center gap-0.5">
          <div className="cursor-pointer text-[14px] font-semibold text-[#8A929F]">
            자세히보기
          </div>
          <MdNavigateNext style={{ color: '#8A929F' }} />
        </div>
      </div>
    </div>
  );
};
const Template = () => {
  return (
    <div className="px-[56px] py-[45px]">
      <div className="mb-6 flex w-full max-w-[420px] items-center justify-between rounded-full bg-white px-[20px] py-[8px]">
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
      <div className="mb-10 flex flex-wrap gap-3">
        <FilerItem isActive>전체</FilerItem>
        <FilerItem>IT 프로젝트</FilerItem>
        <FilerItem>설문 및 데이터 분석</FilerItem>
        <FilerItem>기업 분석</FilerItem>
        <FilerItem>자유주제PT</FilerItem>
        <FilerItem>마케팅</FilerItem>
        <FilerItem>디자인 프로젝트</FilerItem>
        <FilerItem>영상 프로젝트</FilerItem>
        <div className="flex cursor-pointer items-center gap-1">
          <div className=" text-[14px] font-semibold text-[#393948]">
            더보기
          </div>
          <MdExpandMore
            style={{ width: '20px', height: '20px', color: '#393948' }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9">
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
