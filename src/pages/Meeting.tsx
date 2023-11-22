import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../libs/api';
import PageHeading from '../components/PageHeading';
import Roadmap from '../components/Roadmap';
import SectionHeadingContent from '../components/SectionHeadingContent';
import Process from '../components/SearchDetail/Process';
import { typeFilter } from '../libs/utils/filter';
import FilterItem from '../components/FilterItem';
import TeamEditorModal from '../components/TeamEditorModal';
import Title from '../components/Common/Title';

const Meeting = () => {
  const [teamList, setTeamList] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [teamEditValues, setTeamEditValues] = useState<any>({
    teamName: '',
    teamCategory: '',
    teamGoal: '',
    teamSpace1: '',
    teamSpace2: '',
    teamSpace3: '',
  });

  const fetchData = async () => {
    await Axios.get('/team')
      .then((res) => {
        setTeamList(res.data.data.teamList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-12 py-[45px]">
      <div className="flex items-center justify-between">
        <Title>나의 회의 관리</Title>
        <button
          className="rounded-[10px] bg-blue1 px-12 py-2.5 text-lg font-semibold text-white"
          onClick={() => setIsModalOpen(true)}
        >
          팀 생성
        </button>
      </div>

      {/* 팀 선택 섹션 */}
      {teamList?.map((team: any) => (
        <div key={team.teamInfo.teamId}>
          {/* 헤딩 섹션 */}
          <div className="mb-6 mt-10 rounded-2xl bg-white px-6 py-4">
            <div className="flex justify-between">
              <SectionHeadingContent
                title={team.teamInfo.title}
                subtitle={
                  typeFilter(team?.teamInfo?.teamType?.toLowerCase()) || '기타'
                }
              />
              {team.teamRoadmap && (
                <Link
                  to={`/meeting/${team.teamInfo.teamId}`}
                  className="rounded-full bg-indigo-600 px-5 py-2 font-bold text-white"
                >
                  스페이스 바로가기
                </Link>
              )}
            </div>
          </div>

          {/* 로드맵 섹션 */}
          {team.teamRoadmap && <Process data={team.teamRoadmap} />}
        </div>
      ))}

      {/* 모달 */}
      {isModalOpen && (
        <TeamEditorModal
          teamName="새로운"
          setIsOpen={() => setIsModalOpen(false)}
          values={teamEditValues}
          setValues={setTeamEditValues}
        />
      )}
    </div>
  );
};

export default Meeting;
