import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Process from '../components/SearchDetail/Process';
import PageHeading from '../components/PageHeading';
import SectionHeadingContent from '../components/SectionHeadingContent';
import TeamEditorModal from '../components/TeamEditorModal';
import Axios from '../libs/api';
import { typeFilter } from '../libs/utils/filter';
import Title from '../components/Common/Title';
import BackBtn from '../components/SearchDetail/BackBtn';

interface StepSectionProps {
  stepData: any;
  team: any;
  onClickComplete: (stepId: number, isCompleted: boolean) => Promise<void>;
  processingNum: number;
}

const StepSection = ({
  stepData,
  team,
  onClickComplete,
  processingNum,
}: StepSectionProps) => {
  return (
    <section className="rounded-[20px] bg-white px-6 py-4">
      {/* Step 상단 제목 */}
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 justify-between rounded-[15px] bg-[#E0E1FC] px-3 py-2">
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
        <button
          className={`rounded-[10px] px-6 text-base font-bold ${
            processingNum > stepData?.step
              ? 'pointer-events-none bg-gray7 text-gray3'
              : 'bg-blue1 text-white'
          }`}
          onClick={() => {
            onClickComplete(stepData?.stepId, processingNum === stepData?.step);
          }}
        >
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
              to={`/meeting/${team.teamId}/roadmap/${team.roadmap.roadmapId}/template/${template.templateId}?team=${team.title}`}
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
  const [teamData, setTeamData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamEditValues, setTeamEditValues] = useState<any>({
    teamName: '',
    teamCategory: '',
    teamGoal: '',
    teamSpace1: '',
    teamSpace2: '',
    teamSpace3: '',
  });
  const [teamList, setTeamList] = useState<any>([]);

  const onClickComplete = async (stepId: number, isCompleted: boolean) => {
    await Axios.patch(
      `/custom/roadmap/space?stepId=${stepId}&isCompleted=${isCompleted}`,
    )
      .then((res) => {
        console.log(res);
        alert('완료되었습니다');
        fetchData();
      })
      .catch((err) => {
        console.error(err);
        alert('현재 진행중인 스텝만 완료가 가능합니다');
      });
  };

  const fetchData = () => {
    Axios.get(`/team/${params.teamId}`)
      .then((res) => {
        console.log(res);
        setTeamData(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  // useEffect(() => {
  //   Axios.get('/team')
  //     .then((res) => {
  //       setTeamList(res.data.data.teamList);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (teamData) {
      setTeamEditValues({
        teamName: teamData.title,
        teamCategory: teamData.teamType,
        teamGoal: teamData.introduction,
        teamSpace1: teamData.teamSpaceList[0]
          ? teamData.teamSpaceList[0].url
          : '',
        teamSpace2: teamData.teamSpaceList[1]
          ? teamData.teamSpaceList[1].url
          : '',
        teamSpace3: teamData.teamSpaceList[2]
          ? teamData.teamSpaceList[2].url
          : '',
      });
      // console.log(teamData);
    }
  }, [teamData]);

  return (
    <>
      {/* 회의 관리 상세 */}
      <div className="px-12 py-[45px]">
        {/* 제목 섹션 */}
        <BackBtn />
        <Title>팀 회의관리</Title>
        {/* <PageHeading
          title="나의 회의 관리"
          previous="관리"
          teamList={teamList}
          hasFilter
        /> */}
        <div className="flex flex-col space-y-5">
          {/* 헤딩 섹션 */}
          <section className="mt-6 rounded-2xl bg-white px-6 py-4">
            <div className="flex justify-between">
              <SectionHeadingContent
                title={teamData?.title}
                subtitle={
                  typeFilter(teamData?.teamType?.toLowerCase()) || '기타'
                }
              />
              <button onClick={() => setIsModalOpen(true)}>
                <img src="/icons/edit-icon.svg" alt="수정 버튼" />
              </button>
            </div>
            <div className="mt-4 flex justify-between rounded-md bg-[#E0E1FC] px-4 py-2">
              <span className="font-semibold">
                프로젝트 목표 :&nbsp;
                <span className="font-medium">{teamData?.introduction}</span>
              </span>
              <span>
                {teamData?.roadmap.startTime} - {teamData?.roadmap.endTime}
              </span>
            </div>
          </section>
          {/* 로드맵 섹션 */}
          <Process data={teamData?.roadmap} isShowTitle />

          {/* Step 섹션 모음 */}
          {teamData?.roadmap.roadmapList.map((stepData: any) => (
            <StepSection
              key={stepData.stepId}
              stepData={stepData}
              team={teamData}
              onClickComplete={onClickComplete}
              processingNum={teamData?.roadmap?.processingNum}
            />
          ))}
        </div>
      </div>

      {/* 팀 수정 모달 */}
      {isModalOpen && (
        <TeamEditorModal
          teamId={teamData?.teamId}
          values={teamEditValues}
          setValues={setTeamEditValues}
          setIsOpen={() => setIsModalOpen(false)}
          apiMode="edit"
          initialTeamCategory={team?.teamType?.toLowerCase()}
          title="팀 수정하기"
          submitText="수정 완료"
          cancelText="취소"

        />
      )}
    </>
  );
};

export default MeetingDetail;
