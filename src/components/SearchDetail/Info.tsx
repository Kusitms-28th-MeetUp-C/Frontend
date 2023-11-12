import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { BiSolidTimeFive, BiSolidCommentDetail } from 'react-icons/bi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdNavigateNext, MdExpandMore } from 'react-icons/md';

interface InfoProps {
  isRoadmap?: boolean;
}

interface InfoItemProps {
  children: React.ReactNode;
  category: string;
}

interface ReviewProps {
  children: React.ReactNode;
}

const Review = ({ children }: ReviewProps) => {
  return (
    <div className="rounded-[10px] bg-[#EBEEF9] px-2.5 py-2 text-[9px] font-normal leading-[15px] text-black">
      {children}
    </div>
  );
};

const InfoItem = ({ children, category }: InfoItemProps) => {
  return (
    <div className="w-[48%] rounded-[15px] bg-[#EBEEF9] p-3">
      <div className="mb-[9px] flex items-center gap-1">
        {category === 'rate' ? (
          <FaStar className="text-[#F8D20C]" />
        ) : category === 'time' ? (
          <BiSolidTimeFive className="text-tagPurple1" />
        ) : category === 'step' ? (
          <img src="/icons/stair-purple.svg" className="h-3.5 w-3.5" />
        ) : category === 'team' ? (
          <FaPeopleGroup className="text-tagSkyblue1" />
        ) : (
          <BiSolidCommentDetail className="text-tagGreen1" />
        )}
        <div className="text-gray1 text-xs font-bold">
          {category === 'rate'
            ? '평점'
            : category === 'time'
            ? '예상시간'
            : category === 'step'
            ? '단계'
            : category === 'team'
            ? '사용 팀'
            : '리뷰'}
        </div>
      </div>
      <div className="pl-4">
        <span className="text-gray2 mr-1 text-2xl font-bold">{children}</span>
        <span className="text-gray4 text-xs font-extrabold">
          {category === 'rate'
            ? '/10'
            : category === 'time'
            ? 'm'
            : category === 'step'
            ? '단계'
            : category === 'team'
            ? '팀'
            : '개'}
        </span>
      </div>
    </div>
  );
};

const Info = ({ isRoadmap }: InfoProps) => {
  return (
    <div className="bg-gray9 w-full rounded-[20px] p-6">
      <div className="mb-7 flex items-center justify-between">
        <div className="text-gray1 text-xl font-bold">
          {isRoadmap ? '로드맵 소개' : '템플릿 소개'}
        </div>
        <div className="text-gray3 text-[14px] font-semibold">2023-11-14</div>
      </div>
      <li className="mb-6 flex flex-wrap justify-between gap-2">
        <InfoItem category="rate">8.0</InfoItem>
        {isRoadmap ? (
          <InfoItem category="step">5</InfoItem>
        ) : (
          <InfoItem category="time">80</InfoItem>
        )}
        <InfoItem category="team">72</InfoItem>
        <InfoItem category="review">25</InfoItem>
      </li>

      <div className="mb-5 text-[15px] font-medium leading-6 text-black">
        8년차 PM이 기획-개발-디자인 웹 서비스 제작 프로젝트에서 필수적인 요소를
        놓치지 않고 순차적으로 진행하도록 가이드하기위해 제작하였습니다.
      </div>

      <button className="text-blue1 mb-10 w-full rounded-[10px] bg-[#ECEBFE] py-2.5 text-sm font-semibold">
        사용 예시 보러가기
      </button>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-gray2 text-base font-bold">리뷰 미리보기</div>
        <Link to="/" className="flex items-center">
          <div className="text-[13px] font-medium text-[#4F4949]">더보기</div>
          <MdNavigateNext className="text-[#4F4949]" />
        </Link>
      </div>

      <li className="flex flex-col gap-4">
        <Review>
          웹서비스 기획이 막막했는데 템플릿에 자세히 나와있어서 좋았어요. 제가
          처음진행하는지 아무도 몰랐다고 하네요^^
        </Review>
        <Review>리뷰2</Review>
        <Review>리뷰3</Review>
      </li>
    </div>
  );
};

export default Info;
