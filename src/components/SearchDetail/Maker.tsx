import { BsFillChatFill, BsFillPersonFill } from 'react-icons/bs';
import { UserData } from '../../interfaces/TemplateDetail';

interface MakerProps {
  data: UserData | null;
}

const Maker = ({ data }: MakerProps) => {
  return (
    <div className="flex flex-col rounded-[20px] bg-white px-6 py-7">
      <div className="text-gray1 mb-[26px] text-xl font-bold">메이커 소개</div>
      <div className="mb-[22px] flex items-center gap-4">
        <div className="bg-gray6 flex h-[78px] w-[78px] items-center justify-center rounded-full overflow-hidden">
          {data?.profile ? (
            <img src={data?.profile} />
          ) : (
            <BsFillPersonFill className="text-gray3 h-14 w-14" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="bg-blue1 text-gray9 rounded-full px-2 py-1 text-[10px] font-extrabold">
              PM
            </div>
            <div className="text-gray1 text-base font-semibold">
              {data?.name}
            </div>
          </div>
          <div className="text-gray3 text-[11px] font-medium">@min_planner</div>
          <button className="flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#ECEBFE] py-1.5">
            <BsFillChatFill className="text-blue1 h-3 w-3" />
            <div className="text-blue1 text-xs font-semibold">커피챗</div>
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="text-gray2 text-[15px] font-medium">
          회의 템플릿 기여도
        </div>
        <div>
          <span className="text-blue1 text-[15px] font-extrabold">
            {data?.templateNum}
          </span>
          <span className="text-gray2 text-[15px] font-semibold">개</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray2 text-[15px] font-medium">
          회의 로드맵 기여도
        </div>
        <div>
          <span className="text-blue1 text-[15px] font-extrabold">
            {data?.roadmapNum}
          </span>
          <span className="text-gray2 text-[15px] font-semibold">개</span>
        </div>
      </div>
    </div>
  );
};

export default Maker;
