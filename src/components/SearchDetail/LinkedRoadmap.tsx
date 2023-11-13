import { Link } from 'react-router-dom';

interface LinkedRoadmapProps {
  data: any;
}

const LinkedRoadmap = ({ data }: LinkedRoadmapProps) => {
  return (
    <div className="mb-8 flex flex-col gap-[38px] rounded-[20px] bg-white px-6 py-7">
      <div className="text-xl font-bold text-gray1">연결된 로드맵</div>
      <div className="text-sm font-medium text-gray2">
        {data?.connectedRoadmap}
      </div>
      <Link
        to={`/roadmap/${data?.roadmapId}`}
        className="rounded-[10px] bg-[#ECEBFE] py-3 text-center text-sm font-semibold text-[#6268F1]"
      >
        로드맵 보러가기
      </Link>
    </div>
  );
};

export default LinkedRoadmap;
