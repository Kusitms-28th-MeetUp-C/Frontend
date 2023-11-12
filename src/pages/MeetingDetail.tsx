import { useState } from 'react';
import Roadmap from '../components/Roadmap';
import PageHeading from '../components/PageHeading';
import SectionHeading from '../components/SectionHeading';
import Modal from '../components/Modal/Modal';

interface StepSectionProps {
  stepNum: number;
  name: string;
  description: string;
}

interface InputLabelProps {
  labelId: string;
  labelText: string;
  placeholder: string;
  className?: string;
}

const data = [
  {
    num: 1,
    title: '온보딩',
    contents: ['역할분배'],
  },
  {
    num: 2,
    title: '자료수집',
    contents: ['초기 설정', '자료 제작', '기능 기획'],
  },
  { num: 3, title: '연구설계', contents: ['설문 조사', '자료 분석'] },
  {
    num: 4,
    title: '발표준비',
    contents: ['발표 레이아웃', '발표 PPT 제작'],
  },
  { num: 5, title: '최종 마무리', contents: ['발표 제작'] },
];

const StepSection = ({ stepNum, name, description }: StepSectionProps) => {
  return (
    <section className="rounded-2xl bg-white px-6 py-4">
      {/* Step 상단 제목 */}
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 justify-between rounded-2xl bg-tagPurple2 px-3 py-2">
          <span className="text-xl font-semibold">
            <b className="font-bold">Step {stepNum}.</b>&nbsp;{name}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">23.10.11 - 12.28</span>
            <button>
              <img src="/icons/edit-icon.svg" alt="수정 버튼" />
            </button>
          </div>
        </div>
        <button className="rounded-full bg-indigo-600 px-6 font-semibold text-white">
          완료
        </button>
      </div>
      {/* Step 상세 설명 */}
      <p className="min-h-40 mt-4 px-5 leading-8 text-neutral-600">
        {description}
      </p>
    </section>
  );
};

const InputLabel = ({
  labelId,
  labelText,
  placeholder,
  className,
}: InputLabelProps) => {
  return (
    <div className={`flex items-center ${className ? ` ${className}` : ''}`}>
      <label htmlFor={labelId} className="mr-5 font-bold">
        {labelText}
      </label>
      <input
        type="text"
        id="team-name"
        className="flex-1 rounded-xl bg-[#EBEEF9] px-5 py-4 text-sm outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

const MeetingDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 회의 관리 상세 */}
      <div className="px-14 py-12">
        {/* 제목 섹션 */}
        <PageHeading />
        <div className="flex flex-col space-y-5">
          {/* 헤딩 섹션 */}
          <SectionHeading
            title="미팅남녀"
            subtitle="IT 프로젝트 팀"
            type="detail"
            onEdit={() => setIsModalOpen(true)}
          />
          {/* 로드맵 섹션 */}
          <section className="rounded-2xl bg-white py-8">
            <h3 className="mb-5 text-center text-2xl font-bold">
              IT 프로젝트(로드맵 이름)
            </h3>
            <Roadmap data={data} />
          </section>
          {/* Step 1 섹션 */}
          <StepSection
            stepNum={1}
            name="팀 온보딩"
            description="팀 온보딩 설명입니다. 팀 온보딩이란 팀 프로젝트 시작전 준비단계로써...
        팀 온보딩 설명입니다. 팀 온보딩이란 팀 프로젝트 시작전 준비단계로써...
        팀 온보딩 설명입니다. 팀 온보딩이란 팀 프로젝트 시작전 준비단계로써...
        팀 온보딩 설명입니다. 팀 온보딩이란 팀 프로젝트 시작전 준비단계로써...
        팀 온보딩 설명입니다. 팀 온보딩이란 팀 프로젝트 시작전 준비단계로써..."
          />
          {/* Step 2 섹션 */}
          <StepSection
            stepNum={2}
            name="서비스 기획"
            description="서비스 기획 설명입니다. 서비스 기획이란 서비스를 기획하는 단계로써...
          서비스 기획 설명입니다. 서비스 기획이란 서비스를 기획하는 단계로써...
          서비스 기획 설명입니다. 서비스 기획이란 서비스를 기획하는 단계로써...
          서비스 기획 설명입니다. 서비스 기획이란 서비스를 기획하는 단계로써...
          서비스 기획 설명입니다. 서비스 기획이란 서비스를 기획하는 단계로써..."
          />
        </div>
      </div>
      {/* 회의 수정 모달 */}
      {isModalOpen && (
        <Modal
          title="미팅남녀 회의록 수정"
          setIsOpen={() => setIsModalOpen(false)}
          onSubmit={() => alert('수정되었습니다.')}
          cancel="취소"
          submit="정보 수정"
          className="px-32"
        >
          <form>
            <section>
              <div className="flex gap-10">
                <InputLabel
                  labelId="team-name"
                  labelText="팀 이름"
                  placeholder="팀 이름을 입력하세요"
                />
                <InputLabel
                  labelId="team-category"
                  labelText="팀 카테고리"
                  placeholder="팀 카테고리를 입력하세요"
                />
              </div>
              <div className="mt-5">
                <InputLabel
                  labelId="team-goal"
                  labelText="팀 목표"
                  placeholder="한 줄 설명(팀의 목표)을 적어주세요."
                  className="w-full"
                />
              </div>
            </section>
            <section className="mt-10 flex flex-col space-y-5">
              <InputLabel
                labelId="meeting-space-1"
                labelText="회의 스페이스 1"
                placeholder="회의 스페이스 링크를 넣어주세요."
                className="w-full"
              />
              <InputLabel
                labelId="meeting-space-2"
                labelText="회의 스페이스 2"
                placeholder="회의 스페이스 링크를 넣어주세요."
                className="w-full"
              />
              <InputLabel
                labelId="meeting-space-3"
                labelText="회의 스페이스 3"
                placeholder="회의 스페이스 링크를 넣어주세요."
                className="w-full"
              />
            </section>
          </form>
        </Modal>
      )}
    </>
  );
};

export default MeetingDetail;
