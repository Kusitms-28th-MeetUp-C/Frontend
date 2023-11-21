import { useState } from 'react';

import FilterItem from './FilterItem';
import TeamEditorModal from './TeamEditorModal';

interface PageHeadingProps {
  title: string;
  previous: string;
  hasFilter?: boolean;
  teamList?: any;
}

const PageHeading = ({
  title,
  previous,
  hasFilter,
  teamList,
}: PageHeadingProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [teamEditValues, setTeamEditValues] = useState<any>({
    teamName: '',
    teamCategory: '',
    teamGoal: '',
    teamSpace1: '',
    teamSpace2: '',
    teamSpace3: '',
  });

  return (
    <>
      {/* 제목 섹션 */}
      <section>
        {/* 이전으로 돌아가기 */}
        <div className="cursor-pointer">
          <span className="font-medium">{previous} &gt;</span>
        </div>
        {/* 페이지 제목 */}
        <div className="pt-5 text-3xl font-bold">{title}</div>
      </section>
      {/* 필터 섹션 */}
      {hasFilter && (
        <div className="flex gap-3 pt-7">
          <FilterItem isActive>전체</FilterItem>
          {teamList?.map((team: any) => (
            <FilterItem>{team.teamInfo.title}</FilterItem>
          ))}
          <FilterItem onClick={() => setIsModalOpen(true)}>+</FilterItem>
        </div>
      )}
      {/* 팀 생성 모달 */}
      {isModalOpen && (
        <TeamEditorModal
          teamName="새로운"
          setIsOpen={() => setIsModalOpen(false)}
          values={teamEditValues}
          setValues={setTeamEditValues}
        />
      )}
    </>
  );
};

export default PageHeading;
