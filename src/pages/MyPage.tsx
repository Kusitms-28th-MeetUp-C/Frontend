import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

interface ScoreItemProps {
  children: React.ReactNode;
}

interface ScoreNameProps {
  children: React.ReactNode;
}

interface ScoreCountProps {
  children: React.ReactNode;
}

const ScoreItemBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const ScoreItem = ({ children }: ScoreItemProps) => {
  return (
    <ScoreItemBlock className="mt-8 flex items-center justify-between">
      {children}
    </ScoreItemBlock>
  );
};

const ScoreName = ({ children }: ScoreNameProps) => {
  return <span className="text-xl font-medium text-gray-600">{children}</span>;
};

const ScoreCount = ({ children }: ScoreCountProps) => {
  return (
    <span className="w-20 text-center text-xl leading-normal text-gray-600">
      {children}
    </span>
  );
};

const MyPage = () => {
  return (
    <div className="p-11">
      <div className="w-[441px] rounded-2xl bg-white px-5 py-8 shadow">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-zinc-300" />
          <span className="ml-5 text-3xl font-extrabold">신민선</span>
        </div>
        <div>
          <ScoreItem>
            <ScoreName>회의록 템플릿 기여도</ScoreName>
            <ScoreCount>13개</ScoreCount>
          </ScoreItem>
          <ScoreItem>
            <ScoreName>회의록 로드맵 기여도</ScoreName>
            <ScoreCount>10개</ScoreCount>
          </ScoreItem>
          <ScoreItem>
            <span className="flex items-center">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.1px] border-black">
                P
              </div>
              <ScoreName>나의 포인트</ScoreName>
              <i className="text-xl">
                <IoIosArrowForward />
              </i>
            </span>
            <ScoreCount>150점</ScoreCount>
          </ScoreItem>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
