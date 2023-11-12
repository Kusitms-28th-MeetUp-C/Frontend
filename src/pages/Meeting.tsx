import PageHeading from '../components/PageHeading';
import SectionHeading from '../components/SectionHeading';
import Roadmap from '../components/Roadmap';

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

const Meeting = () => {
  return (
    <div className="px-14 py-12">
      {/* 제목 섹션 */}
      <PageHeading />
      {/* 로드맵 1 */}
      <div>
        {/* 헤딩 섹션 */}
        <SectionHeading
          title="경영정보시스템"
          subtitle="설문 조사 및 데이터 분석"
          type="list"
        />
        {/* 로드맵 섹션 */}
        <Roadmap data={data} className="mt-6 rounded-2xl bg-white py-8" />
      </div>
      {/* 로드맵 2 */}
      <div>
        {/* 헤딩 섹션 */}
        <SectionHeading
          title="미팅남녀"
          subtitle="설문 조사 및 데이터 분석"
          type="list"
        />
        {/* 로드맵 섹션 */}
        <Roadmap
          data={data}
          className="mt-6 justify-center rounded-2xl bg-white py-8"
        />
      </div>
    </div>
  );
};

export default Meeting;
