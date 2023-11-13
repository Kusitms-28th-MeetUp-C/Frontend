import FilterItem from './FilterItem';

interface PageHeadingProps {
  title: string;
  previous: string;
  hasFilter?: boolean;
}

const PageHeading = ({ title, previous, hasFilter }: PageHeadingProps) => {
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
          <FilterItem>미팅남녀</FilterItem>
          <FilterItem>경영정보시스템 c팀</FilterItem>
          <FilterItem>팀명</FilterItem>
          <FilterItem>팀명</FilterItem>
          <FilterItem>+</FilterItem>
        </div>
      )}
    </>
  );
};

export default PageHeading;
