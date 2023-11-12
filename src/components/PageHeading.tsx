import FilterItem from './FilterItem';

const PageHeading = () => {
  return (
    <>
      {/* 제목 섹션 */}
      <section>
        {/* 이전으로 돌아가기 */}
        <div className="cursor-pointer">
          <span className="font-medium">관리 &gt;</span>
        </div>
        {/* 페이지 제목 */}
        <div className="pt-5 text-3xl font-bold">나의 회의 관리</div>
      </section>
      {/* 필터 섹션 */}
      <div className="flex gap-3 pt-7">
        <FilterItem isActive>전체</FilterItem>
        <FilterItem>미팅남녀</FilterItem>
        <FilterItem>경영정보시스템 c팀</FilterItem>
        <FilterItem>팀명</FilterItem>
        <FilterItem>팀명</FilterItem>
        <FilterItem>+</FilterItem>
      </div>
    </>
  );
};

export default PageHeading;
