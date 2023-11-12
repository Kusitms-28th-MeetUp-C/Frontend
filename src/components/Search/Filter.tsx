import FilerItem from '../FilterItem';

import { MdExpandMore } from 'react-icons/md';

const Filter = () => {
  return (
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
        <div className=" text-[14px] font-semibold text-[#393948]">더보기</div>
        <MdExpandMore
          style={{ width: '20px', height: '20px', color: '#393948' }}
        />
      </div>
    </div>
  );
};

export default Filter;
