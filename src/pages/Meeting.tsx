import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../libs/api';
import PageHeading from '../components/PageHeading';
import Roadmap from '../components/Roadmap';
import SectionHeadingContent from '../components/SectionHeadingContent';

const Meeting = () => {
  const [teamList, setTeamList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    Axios
      .get('/team')
      .then((res) => {
        setTeamList(res.data.data.teamList);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

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
    <div className="px-14 py-12">
      {/* 제목 섹션 */}
      <PageHeading title="나의 회의 관리" previous="관리" hasFilter />
      {/* 팀 선택 섹션 */}
      {teamList.map((team: any) => (
        <div key={team.teamInfo.teamId}>
          {/* 헤딩 섹션 */}
          <section className="mt-6 rounded-2xl bg-white px-6 py-4">
            <div className="flex justify-between">
              <SectionHeadingContent
                title={team.teamInfo.title}
                subtitle={team.teamInfo.teamType}
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
          </section>
          {/* 로드맵 섹션 */}
          {team.teamRoadmap && (
            <Roadmap
              data={team.teamRoadmap.roadmapDetailList}
              className="mt-6 rounded-2xl bg-white py-8"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Meeting;
