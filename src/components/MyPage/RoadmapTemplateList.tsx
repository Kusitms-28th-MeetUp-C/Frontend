import { useEffect, useRef, useState } from 'react';

import ListItem from './ListItem';
import Axios from '../../libs/api';
import Pagination from '../Search/Pagination';

interface RoadmapTemplateListProps {
  listStyle: 'list' | 'grid';
  className?: string;
  listType: 'all' | 'roadmap' | 'template';
}

const RoadmapTemplateList = ({
  listStyle,
  className,
  listType,
}: RoadmapTemplateListProps) => {
  const [contentData, setContentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const contentText = {
    all: '전체',
    roadmap: '로드맵',
    template: '템플릿',
  };

  const MoveToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await Axios.get('/mypage', {
          params: {
            page,
          },
        });
        setContentData(res.data.data.contentList);
        setTotalPages(res.data.data.contentList.totalPages);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContentData();
  }, [page]);

  useEffect(() => {
    console.log('contentData', contentData);
  }, [contentData]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  return (
    <>
      <div
        ref={containerRef}
        className={`h-full overflow-y-scroll${
          className ? ` ${className}` : ''
        }${listStyle === 'list' ? ' space-y-5' : ' grid grid-cols-2 gap-5'}`}
      >
        {contentData.content
          .filter((content: any) => {
            if (listType === 'all') return content;
            return content.sharedType === contentText[listType];
          })
          .map((content: any) => (
            <ListItem
              key={content.id}
              type={content.sharedType}
              name={content.title}
              category={content.contentType.toLowerCase()}
              styleMode={listStyle}
            />
          ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </>
  );
};

export default RoadmapTemplateList;
