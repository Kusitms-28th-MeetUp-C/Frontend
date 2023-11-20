import { FaPeopleGroup } from 'react-icons/fa6';
import { BiTimeFive } from 'react-icons/bi';
import { GrNext } from 'react-icons/gr';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface MoreItemsProps {
  isRoadmap?: boolean;
  data: any;
}

const MoreItems = ({ isRoadmap, data }: MoreItemsProps) => {
  return (
    <div className="rounded-[20px] bg-white px-8 py-8">
      <div className="mb-6  text-xl font-bold text-black">
        {isRoadmap
          ? 'IT프로젝트 다른 로드맵 모아보기'
          : 'IT프로젝트 다른 템플릿 모아보기'}
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {data?.map((el: any, idx: number) => (
          <Link
            to={`/${
              isRoadmap
                ? 'roadmap/' + el.roadmapId
                : 'template/' + el.templateId
            }`}
            className="w-[48%] rounded-[20px] bg-[#EBEEF9] p-5"
            key={el.templateId}
          >
            <div className="mb-[14px] flex items-center justify-between">
              <div className="text-sm font-bold text-gray2">{el.title}</div>
              <GrNext className="text-[10px] text-gray4" />
            </div>

            <div
              className={` flex items-center ${
                isRoadmap ? 'gap-7' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-1">
                <FaPeopleGroup className="text-tagSkyblue1" />
                <div className="text-xs font-semibold text-gray3">
                  {el.teamCount}팀 사용 중
                </div>
              </div>

              {!isRoadmap && (
                <div className="flex items-center gap-1">
                  <BiTimeFive className="text-tagLightPurple1" />
                  <div className="text-xs font-semibold text-gray3">
                    {el.estimatedTime}m
                  </div>
                </div>
              )}

              {isRoadmap ? (
                <div className="flex items-center gap-1">
                  <img src="/icons/stair-purple.svg" />
                  <div className="text-xs font-semibold text-gray3">
                    {el.step} steps
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaStar className="text-[#F8D20C]" />
                  <div className="text-xs font-semibold text-gray3">
                    {el.rating}
                  </div>
                </div>
              )}
            </div>

            {!isRoadmap && (
              <div className="mt-5 flex items-center gap-1 rounded-full bg-white px-[11px] py-[3px]">
                <img src="/icons/category-green.svg" />
                <div className="text-[10px] font-semibold text-gray3">
                  {el?.connectedRoadmap}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreItems;
