import styled from 'styled-components';

interface StepNameBoxProps {
  color?: string;
  children: React.ReactNode;
}

interface StepDetailBoxProps {
  children: React.ReactNode;
}

const StepNameBoxBlock = styled.div`
  box-shadow: 0px 4px 4px 0px #e2e9ff;
`;

const StepNameBox = ({ color = 'blue1', children }: StepNameBoxProps) => {
  const colors: any = {
    blue1: ['bg-[#EBEEF9]', 'text-neutral-800'],
    blue2: ['bg-[#AED1FF]', 'text-neutral-800'],
    blue3: ['bg-[#74B0FF]', 'text-neutral-800'],
    blue4: ['bg-[#3971FE]', 'text-white'],
    blue5: ['bg-[#5257D6]', 'text-white'],
  };

  return (
    <StepNameBoxBlock
      className={`${colors[color][0]} ${colors[color][1]} cursor-pointer rounded-lg px-4 py-2 text-center text-lg font-medium`}
    >
      {children}
    </StepNameBoxBlock>
  );
};

const StepDetailBoxList = styled.ul`
  li + li {
    margin-top: 1rem;
  }
`;

const StepDetailBoxBlock = styled.li`
  box-shadow: 4px 4px 23px 0px rgba(0, 0, 0, 0.25);
`;

const StepDetailBox = ({ children }: StepDetailBoxProps) => {
  return (
    <StepDetailBoxBlock className="cursor-pointer rounded-lg bg-white py-2 text-center">
      {children}
    </StepDetailBoxBlock>
  );
};

const Overview = () => {
  return (
    <div className="px-11 pt-12">
      <div className="flex w-full items-center justify-between rounded-2xl bg-white px-8 py-3">
        <div className="flex items-center">
          <div className="h-11 w-11 rounded-full bg-zinc-300" />
          <span className="ml-3 text-2xl font-bold text-neutral-800">
            경영정보시스템
          </span>
          <span className="ml-4 text-lg font-medium text-neutral-400">
            설문 조사 및 데이터 분석
          </span>
        </div>
        <button className="rounded-xl bg-zinc-200 px-12 py-2 text-lg font-medium text-neutral-800">
          스페이스 바로가기
        </button>
      </div>
      <div className="mt-4 min-h-[416px] w-full rounded-2xl bg-white px-8 py-7">
        <div className="grid grid-cols-5 gap-8">
          <StepNameBox color="blue1">온보딩</StepNameBox>
          <StepNameBox color="blue2">자료수집</StepNameBox>
          <StepNameBox color="blue3">연구설계</StepNameBox>
          <StepNameBox color="blue4">발표준비</StepNameBox>
          <StepNameBox color="blue5">최종</StepNameBox>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-5 gap-8">
            <StepDetailBoxList>
              <StepDetailBox>역할분배</StepDetailBox>
            </StepDetailBoxList>
            <StepDetailBoxList>
              <StepDetailBox>초기설정</StepDetailBox>
              <StepDetailBox>자료분배</StepDetailBox>
            </StepDetailBoxList>
            <StepDetailBoxList>
              <StepDetailBox>설문조사</StepDetailBox>
              <StepDetailBox>자료분석</StepDetailBox>
            </StepDetailBoxList>
            <StepDetailBoxList>
              <StepDetailBox>발표 레이아웃</StepDetailBox>
              <StepDetailBox>발표 PPT 제작</StepDetailBox>
            </StepDetailBoxList>
            <StepDetailBoxList>
              <StepDetailBox>발표 준비</StepDetailBox>
              <StepDetailBox>마무리 회의</StepDetailBox>
            </StepDetailBoxList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
