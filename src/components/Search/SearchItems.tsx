import { FaPeopleGroup } from 'react-icons/fa6';
import { BiTimeFive } from 'react-icons/bi';
import { MdNavigateNext } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

interface ConnectedRoadmap {
  title: string;
}

interface Template {
  templateId: number;
  title: string;
  templateType: string;
  count: number;
  estimatedTime: number;
  connectedRoadmap: ConnectedRoadmap[];
}

interface Roadmap {
  roadmapId: number;
  roadmapType: string;
  title: string;
  count: number;
  step: number;
}

interface SearchItemsProps {
  data?: Template[];
}

const SearchItems = ({ data }: SearchItemsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const typeFilter = (type: string) => {
    switch (type) {
      case 'ALL':
        return '전체';
      case 'IT':
        return 'IT프로젝트';
      case 'ANALYSIS':
        return '설문 및 데이터 분석';
      case 'CORPORATE_ANALYSIS':
        return '기업 분석';
      case 'PT':
        return '자유주제PT';
      case 'MARKETING':
        return '마케팅';
      case 'DESIGN':
        return '디자인 프로젝트';
    }
  };

  return (
    <div className="flex flex-wrap gap-9">
      {data?.map((el, idx) => (
        <Link
          to={`${currentPath}/${el.templateId}`}
          key={el.templateId}
          id={el.templateId.toString()}
          className="flex w-[355px] flex-col rounded-2xl bg-white p-[26px]"
        >
          <div className="color-[#495565] mb-[10px] text-[12px]">
            {typeFilter(el.templateType)}
          </div>
          <div className="color-[#393948] mb-4 text-base font-bold">
            {el.title}
          </div>
          <div className="mb-6 flex w-fit items-center gap-1 rounded-full bg-[#EEEEFB] px-2.5 py-[3px] text-[12px] font-semibold text-[#495565]">
            <img src="/icons/category.svg" />
            <div>{el?.connectedRoadmap[0]?.title}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <FaPeopleGroup
                style={{ width: '20px', height: '20px', color: '#5A5A5A' }}
              />
              <div className="mr-[10px] text-[14px] font-semibold text-[#8A929F]">
                {el.count}팀 사용 중
              </div>
              <BiTimeFive
                style={{ width: '20px', height: '20px', color: '#5A5A5A' }}
              />
              <div className="text-[14px] font-semibold text-[#8A929F]">
                {el.estimatedTime}m
              </div>
            </div>
            <div className="flex cursor-pointer items-center gap-0.5">
              <div className="cursor-pointer text-[14px] font-semibold text-[#8A929F]">
                자세히보기
              </div>
              <MdNavigateNext style={{ color: '#8A929F' }} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchItems;
