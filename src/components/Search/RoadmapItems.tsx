import { FaPeopleGroup, FaStar } from 'react-icons/fa6';
import { MdNavigateNext } from 'react-icons/md';
import { HiTemplate } from 'react-icons/hi';

import { Link, useLocation } from 'react-router-dom';
import { tagColorFilter, typeFilter } from '../../libs/utils/filter';

interface RoadmapItemsProps {
  data: any[];
}

const RoadmapItems = ({ data }: RoadmapItemsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="mb-14 flex flex-wrap gap-9">
      {data?.map((el, idx) => (
        <Link
          to={`${currentPath}/${el.roadmapId}`}
          key={el.roadmapId}
          id={el.roadmapId.toString()}
          className="flex w-[355px] flex-col gap-5 rounded-[20px] bg-white p-[26px]"
        >
          <div
            className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 bg-${tagColorFilter(
              'background',
              el?.roadmapType?.toLowerCase(),
            )}`}
          >
            <HiTemplate
              className={`text-${tagColorFilter(
                'icon',
                el?.roadmapType?.toLowerCase(),
              )}`}
            />
            <div className="text-xs font-semibold text-gray3">
              {typeFilter(el?.roadmapType?.toLowerCase())}
            </div>
          </div>

          <div className="color-[#393948] text-base font-bold">{el.title}</div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <FaPeopleGroup className="text-[26px] text-tagSkyblue1" />
              <div className="mr-[18px] text-sm font-semibold text-gray3">
                {el.count}팀 사용 중
              </div>

              <img
                src="/icons/stair.svg"
                className="h-5 w-5 text-tagSkyblue1"
              />
              <div className="text-sm font-semibold text-gray3">
                {el.step} steps
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

export default RoadmapItems;
