import ListItems from '../Search/ListItems';
import Pagination from '../Search/Pagination';

interface RoadmapTemplateListProps {
  contentData: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const RoadmapTemplateList = ({
  contentData,
  page,
  setPage,
  totalPages,
  containerRef,
}: RoadmapTemplateListProps) => {
  const MoveToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <ListItems data={contentData} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </div>
  );
};

export default RoadmapTemplateList;
