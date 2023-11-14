import { useEffect, useState } from 'react';

import Roadmap from '../components/Roadmap';
import PageHeading from '../components/PageHeading';
import Modal from '../components/Modal/Modal';
import axios from '../assets/api';
import { useParams } from 'react-router-dom';
import SectionHeadingContent from '../components/SectionHeadingContent';

interface StepSectionProps {
  roadmapDetail: any;
}

interface InputLabelProps {
  name: string;
  labelId: string;
  labelText: string;
  value?: string;
  placeholder: string;
  className?: string;
  autocomplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TeamEditModalProps {
  teamId: number;
  teamName: string;
  setIsOpen: () => void;
  setValues: any;
  values: any;
}

const StepSection = ({ roadmapDetail }: StepSectionProps) => {
  return (
    <section className="rounded-2xl bg-white px-6 py-4">
      {/* Step 상단 제목 */}
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 justify-between rounded-2xl bg-tagPurple2 px-3 py-2">
          <span className="text-xl font-semibold">
            <b className="font-bold">Step {roadmapDetail.step}.</b>&nbsp;
            {roadmapDetail.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {roadmapDetail.startTime} - {roadmapDetail.endTime}
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
      {/* Step 상세 설명 */}
      <p className="min-h-40 mt-4 px-5 leading-8 text-neutral-600">
        {roadmapDetail.introduction}
      </p>
    </section>
  );
};

const InputLabel = ({
  name,
  labelId,
  labelText,
  placeholder,
  className,
  value = '',
  onChange,
  autocomplete = 'off',
}: InputLabelProps) => {
  return (
    <div className={`flex items-center ${className ? ` ${className}` : ''}`}>
      <label htmlFor={labelId} className="mr-5 font-bold">
        {labelText}
      </label>
      <input
        type="text"
        id={labelId}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 rounded-xl bg-[#EBEEF9] px-5 py-4 text-sm outline-none"
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </div>
  );
};

const TeamEditModal = ({
  teamId,
  teamName,
  setIsOpen,
  values,
  setValues,
}: TeamEditModalProps) => {
  const parseLabelFromUrl = (url: string) => {
    if (url.includes('figma')) {
      return 'figma';
    } else if (url.includes('jira')) {
      return 'jira';
    } else {
      return 'notion';
    }
  };

  const handleEditSubmit = () => {
    axios
      .patch('team', {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
        params: {
          teamId: teamId.toString(),
          title: values.teamName,
          teamType: values.teamCategory,
          introduction: values.teamGoal,
          spaceList: [
            {
              ...(values.teamSpace1 && {
                spaceId: '1',
                spaceType: parseLabelFromUrl(values.teamSpace1),
                url: values.teamSpace1,
              }),
            },
            {
              ...(values.teamSpace2 && {
                spaceId: '2',
                spaceType: parseLabelFromUrl(values.teamSpace2),
                url: values.teamSpace2,
              }),
            },
            {
              ...(values.teamSpace3 && {
                spaceId: '3',
                spaceType: parseLabelFromUrl(values.teamSpace3),
                url: values.teamSpace3,
              }),
            },
          ],
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={`${teamName} 팀 정보 수정`}
      setIsOpen={setIsOpen}
      onSubmit={handleEditSubmit}
      cancel="취소"
      submit="정보 수정"
      className="px-32"
    >
      <form>
        <section>
          <div className="flex gap-10">
            <InputLabel
              name="teamName"
              value={values.teamName}
              onChange={(e) =>
                setValues({ ...values, teamName: e.target.value })
              }
              labelId="team-name"
              labelText="팀 이름"
              placeholder="팀 이름을 입력하세요"
              autocomplete="off"
            />
            <InputLabel
              name="teamCategory"
              value={values.teamCategory}
              onChange={(e) =>
                setValues({ ...values, teamCategory: e.target.value })
              }
              labelId="team-category"
              labelText="팀 카테고리"
              placeholder="팀 카테고리를 입력하세요"
              autocomplete="off"
            />
          </div>
          <div className="mt-5">
            <InputLabel
              name="teamGoal"
              value={values.teamGoal}
              onChange={(e) =>
                setValues({ ...values, teamGoal: e.target.value })
              }
              labelId="team-goal"
              labelText="팀 목표"
              placeholder="한 줄 설명(팀의 목표)을 적어주세요."
              className="w-full"
              autocomplete="off"
            />
          </div>
        </section>
        <section className="mt-10 flex flex-col space-y-5">
          <InputLabel
            name="teamSpace1"
            value={values.teamSpace1}
            onChange={(e) =>
              setValues({ ...values, teamSpace1: e.target.value })
            }
            labelId="team-space-1"
            labelText="회의 스페이스 1"
            placeholder="회의 스페이스 링크를 넣어주세요."
            className="w-full"
            autocomplete="off"
          />
          <InputLabel
            name="teamSpace2"
            value={values.teamSpace2}
            onChange={(e) =>
              setValues({ ...values, teamSpace2: e.target.value })
            }
            labelId="team-space-2"
            labelText="회의 스페이스 2"
            placeholder="회의 스페이스 링크를 넣어주세요."
            className="w-full"
            autocomplete="off"
          />
          <InputLabel
            name="teamSpace3"
            value={values.teamSpace3}
            onChange={(e) =>
              setValues({ ...values, teamSpace3: e.target.value })
            }
            labelId="team-space-3"
            labelText="회의 스페이스 3"
            placeholder="회의 스페이스 링크를 넣어주세요."
            className="w-full"
            autocomplete="off"
          />
        </section>
      </form>
    </Modal>
  );
};

const MeetingDetail = () => {
  const params = useParams<{ meetingId: string }>();
  const [meetingId, setMeetingId] = useState<number>();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    if (params.meetingId) {
      setMeetingId(parseInt(params.meetingId));
    }
  }, [params]);

  useEffect(() => {
    if (!meetingId) return;
    setLoading(true);
    axios
      .get(`/team/${meetingId}`, {
        headers: { Authorization: localStorage.getItem('accessToken') },
      })
      .then((res) => {
        setTeam(res.data.data);
      })
      .catch((err: any) => console.error(err))
      .finally(() => setLoading(false));
  }, [meetingId]);

  useEffect(() => {
    team && console.log(team);
  }, [team]);

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
    }
  }, [team]);

  useEffect(() => {
    console.log(teamEditValues);
  }, [teamEditValues]);

  if (loading) {
    return (
      <div className="px-14 py-12">
        <div>로딩 중...</div>
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
          <section className="rounded-2xl bg-white py-8">
            <h3 className="mb-5 text-center text-2xl font-bold">
              {team.roadmap.title}
            </h3>
            <Roadmap data={team.roadmap.roadmapDetailList} />
          </section>
          {/* Step 섹션 모음 */}
          {team.roadmap.roadmapDetailList.map((roadmapDetail: any) => (
            <StepSection
              key={roadmapDetail.stepId}
              roadmapDetail={roadmapDetail}
            />
          ))}
        </div>
      </div>
      {/* 회의 수정 모달 */}
      {isModalOpen && (
        <TeamEditModal
          teamId={team.teamId}
          values={teamEditValues}
          setValues={setTeamEditValues}
          teamName={team.title}
          setIsOpen={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default MeetingDetail;
