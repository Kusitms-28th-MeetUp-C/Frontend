import { FaPeopleGroup } from 'react-icons/fa6';
import { BiTimeFive } from 'react-icons/bi';
import { MdNavigateNext } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const SearchItems = () => {
  const data = [
    {
      id: 1,
      category: 'IT프로젝트',
      title: '플로우 설계 회의 템플릿',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      team: '66',
      time: '60',
    },
    {
      id: 2,
      category: '디자인 프로젝트',
      title: '디자인 시안 검토회의 템플릿',
      tag: 'UI 디자인 프로젝트 로드맵',
      team: '126',
      time: '40',
    },
    {
      id: 3,
      category: '설문 및 데이터 분석',
      title: '자료 공유 및 제작 회의 템플릿',
      tag: '대학생을 위한 설문 분석 팀플 로드맵',
      team: '50',
      time: '30',
    },
    {
      id: 4,
      category: 'IT프로젝트',
      title: '플로우 설계 회의 템플릿',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      team: '66',
      time: '60',
    },
    {
      id: 5,
      category: '디자인 프로젝트',
      title: '디자인 시안 검토회의 템플릿',
      tag: 'UI 디자인 프로젝트 로드맵',
      team: '126',
      time: '40',
    },
    {
      id: 6,
      category: '설문 및 데이터 분석',
      title: '자료 공유 및 제작 회의 템플릿',
      tag: '대학생을 위한 설문 분석 팀플 로드맵',
      team: '50',
      time: '30',
    },
    {
      id: 7,
      category: 'IT프로젝트',
      title: '플로우 설계 회의 템플릿',
      tag: '기획-디자인-개발 프로젝트 로드맵',
      team: '66',
      time: '60',
    },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-wrap gap-9">
      {data.map((el, idx) => (
        <Link
          to={`${currentPath}/${el.id}`}
          className="flex w-[355px] flex-col rounded-2xl bg-white p-[26px]"
        >
          <div className="color-[#495565] mb-[10px] text-[12px]">
            {el.category}
          </div>
          <div className="color-[#393948] mb-4 text-base font-bold">
            {el.title}
          </div>
          <div className="mb-6 flex w-fit items-center gap-1 rounded-full bg-[#EEEEFB] px-2.5 py-[3px] text-[12px] font-semibold text-[#495565]">
            <img src="/icons/category.svg" />
            <div>{el.tag}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <FaPeopleGroup
                style={{ width: '20px', height: '20px', color: '#5A5A5A' }}
              />
              <div className="mr-[10px] text-[14px] font-semibold text-[#8A929F]">
                {el.team}팀 사용 중
              </div>
              <BiTimeFive
                style={{ width: '20px', height: '20px', color: '#5A5A5A' }}
              />
              <div className="text-[14px] font-semibold text-[#8A929F]">
                {el.time}m
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
