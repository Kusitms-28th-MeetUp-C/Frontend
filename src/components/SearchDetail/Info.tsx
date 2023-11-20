import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { BiSolidTimeFive, BiSolidCommentDetail } from 'react-icons/bi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdNavigateNext } from 'react-icons/md';

interface InfoProps {
  isRoadmap?: boolean;
  data: any;
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
          <BiSolidTimeFive className="text-tagLightPurple1" />
        ) : category === 'step' ? (
          <img src="/icons/stair-purple.svg" className="h-3.5 w-3.5" />
        ) : category === 'team' ? (
          <FaPeopleGroup className="text-tagSkyblue1" />
        ) : (
          <BiSolidCommentDetail className="text-tagGreen1" />
        )}
        <div className="text-xs font-bold text-gray1">
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
        <span className="mr-1 text-2xl font-bold text-gray2">{children}</span>
        <span className="text-xs font-extrabold text-gray4">
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

const Info = ({ isRoadmap, data }: InfoProps) => {
  return (
    <div className="w-full rounded-[20px] bg-gray9 p-6">
      <div className="mb-7 flex items-center justify-between">
        <div className="text-xl font-bold text-gray1">
          {isRoadmap ? '로드맵 소개' : '템플릿 소개'}
        </div>
        <div className="text-[14px] font-semibold text-gray3">{data.date}</div>
      </div>
      <li className="mb-6 flex flex-wrap justify-between gap-2">
        {!isRoadmap && (
          <InfoItem category="rate">{data?.simpleInfo?.rating}</InfoItem>
        )}
        {isRoadmap ? (
          <InfoItem category="step">{data?.simpleInfo?.step}</InfoItem>
        ) : (
          <InfoItem category="time">{data?.simpleInfo?.estimatedTime}</InfoItem>
        )}
        <InfoItem category="team">{data?.simpleInfo?.teamCount}</InfoItem>
        {!isRoadmap && (
          <InfoItem category="review">{data?.simpleInfo?.reviewCount}</InfoItem>
        )}
      </li>

      <div className="mb-5 text-[15px] font-medium leading-6 text-black">
        {data.introduction}
      </div>

      {!isRoadmap && (
        <>
          <div className="mb-4 mt-10 text-base font-bold text-gray2">
            리뷰 미리보기
          </div>
          <li className="flex flex-col gap-4">
            {data?.reviews?.map((el: any, idx: number) => (
              <Review key={idx}>{el.content}</Review>
            ))}
          </li>
        </>
      )}
    </div>
  );
};

export default Info;
