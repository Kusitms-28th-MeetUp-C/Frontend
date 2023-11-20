import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Process from '../components/SearchDetail/Process';
import PageHeading from '../components/PageHeading';
import SectionHeadingContent from '../components/SectionHeadingContent';
import TeamEditorModal from '../components/TeamEditorModal';
import Axios from '../libs/api';

interface StepSectionProps {
  stepData: any;
  team: any;
}

const StepSection = ({ stepData, team }: StepSectionProps) => {
  return (
    <section className="rounded-2xl bg-white px-6 py-4">
      {/* Step 상단 제목 */}
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 justify-between rounded-2xl bg-tagPurple2 px-3 py-2">
          <span className="text-xl font-semibold">
            <b className="font-bold">Step {stepData.step}.</b>&nbsp;
            {stepData.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {stepData.startTime} - {stepData.endTime}
            </span>
            <button>
              <img src="/icons/edit-icon.svg" alt="수정 버튼" />
            </button>
          </div>
        </div>
        <button className="rounded-full bg-indigo-600 px-6 font-semibold text-white">
          완료
        </button>
      </div>
      {/* Step의 템플릿 리스트 */}
      <ul>
        {stepData.templateList.map((template: any) => (
          <li
            key={template.templateId}
            className="ml-6 mt-5 list-disc text-lg text-gray-600 underline"
          >
            <Link
              to={`/meeting/${team.teamId}/template/${template.templateId}?team=${team.title}&roadmap=${team.roadmap.title}`}
            >
              {template.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const MeetingDetail = () => {
  const params = useParams<{ teamId: string }>();
  const [teamId, setTeamId] = useState<number>();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamEditValues, setTeamEditValues] = useState<any>({
    teamName: '',
    teamCategory: '',
    teamGoal: '',
    teamSpace1: '',
    teamSpace2: '',
    teamSpace3: '',
  });

  useEffect(() => {
    if (params.teamId) {
      setTeamId(parseInt(params.teamId));
    }
  }, [params]);

  useEffect(() => {
    if (!teamId) return;
    setLoading(true);
    Axios.get(`/team/${teamId}`)
      .then((res) => {
        console.log(res);
        setTeam(res.data.data);
      })
      .catch((err: any) => setError(err))
      .finally(() => setLoading(false));
  }, [teamId]);

  useEffect(() => {
    if (team) {
      setTeamEditValues({
        teamName: team.title,
        teamCategory: team.teamType,
        teamGoal: team.introduction,
        teamSpace1: team.teamSpaceList[0] ? team.teamSpaceList[0].url : '',
        teamSpace2: team.teamSpaceList[1] ? team.teamSpaceList[1].url : '',
        teamSpace3: team.teamSpaceList[2] ? team.teamSpaceList[2].url : '',
      });
      console.log(team);
    }
  }, [team]);

  if (loading) {
    return (
      <div className="px-14 py-12">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-14 py-12">
        <div>에러 발생</div>
      </div>
    );
  }

  return (
    <>
      {/* 회의 관리 상세 */}
      <div className="px-14 py-12">
        {/* 제목 섹션 */}
        <PageHeading title="나의 회의 관리" previous="관리" hasFilter />
        <div className="flex flex-col space-y-5">
          {/* 헤딩 섹션 */}
          <section className="mt-6 rounded-2xl bg-white px-6 py-4">
            <div className="flex justify-between">
              <SectionHeadingContent
                title={team.title}
                subtitle={team.teamType}
              />
              <button onClick={() => setIsModalOpen(true)}>
                <img src="/icons/edit-icon.svg" alt="수정 버튼" />
              </button>
            </div>
            <div className="mt-4 flex justify-between rounded-md bg-[#E0E1FC] px-4 py-2">
              <span className="font-semibold">
                프로젝트 목표 :&nbsp;
                <span className="font-medium">{team.introduction}</span>
              </span>
              <span>
                {team.roadmap.startTime} - {team.roadmap.endTime}
              </span>
            </div>
          </section>

          {/* 로드맵 섹션 */}
          <Process data={team.roadmap} isShowTitle />

          {/* Step 섹션 모음 */}
          {team.roadmap.roadmapList.map((stepData: any) => (
            <StepSection
              key={stepData.stepId}
              stepData={stepData}
              team={team}
            />
          ))}
        </div>
      </div>
      {/* 팀 수정 모달 */}
      {isModalOpen && (
        <TeamEditorModal
          teamId={team.teamId}
          values={teamEditValues}
          setValues={setTeamEditValues}
          teamName={team.title}
          setIsOpen={() => setIsModalOpen(false)}
          apiMode="edit"
        />
      )}
    </>
  );
};

export default MeetingDetail;
