import { FaPeopleGroup } from 'react-icons/fa6';
import { BiTimeFive } from 'react-icons/bi';
import { HiTemplate } from 'react-icons/hi';

import { MdNavigateNext } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { tagColorFilter, typeFilter } from '../../libs/utils/filter';

interface ListItemsProps {
  data: any[];
  isRoadmap?: boolean;
}

const ListItems = ({ data, isRoadmap }: ListItemsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="mb-14 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.map((el) => (
        <Link
          to={`${currentPath}/${isRoadmap ? el?.roadmapId : el?.templateId}`}
          key={isRoadmap ? el?.roadmapId : el?.templateId}
          className="flex flex-col gap-10 rounded-[20px] bg-white p-[26px]"
        >
          <div>
            <div
              className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 ${tagColorFilter(
                'background',
                el?.type?.toLowerCase(),
              )}`}
            >
              <HiTemplate
                className={`${tagColorFilter('icon', el?.type?.toLowerCase())}`}
              />
              <div className="text-xs font-semibold text-gray3">
                {typeFilter(el?.type?.toLowerCase())}
              </div>
            </div>
            <div className="mt-3 text-base font-bold text-gray2">
              {el?.title}
            </div>
            {!isRoadmap && (
              <div className="mt-3 flex w-fit items-center gap-1">
                <img src="/icons/roadmap.svg" />
                <div className="text-xs font-semibold text-gray3">
                  {el?.connectedRoadmap}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <FaPeopleGroup className="text-xl text-tagSkyblue1" />
              <div className="mr-[10px] text-[14px] font-semibold text-[#8A929F]">
                {el?.count}팀 사용 중
              </div>

              {isRoadmap ? (
                <>
                  <img
                    src="/icons/stair.svg"
                    className="h-5 w-5 text-tagSkyblue1"
                  />
                  <div className="text-sm font-semibold text-gray3">
                    {el?.step} steps
                  </div>
                </>
              ) : (
                <>
                  <BiTimeFive className="text-tagLightPurple1 text-xl" />
                  <div className="text-[14px] font-semibold text-[#8A929F]">
                    {el?.estimatedTime}m
                  </div>
                </>
              )}
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

export default ListItems;
