import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import LeftSection from '../components/MyPage/LeftSection';
import RightSection from '../components/MyPage/RightSection';
import Axios from '../libs/api';

const MyPageBlock = styled.div`
  display: flex;
  align-items: start;
  padding-top: 1.75rem;
  padding-bottom: 1.5rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  gap: 2rem;
`;

const MyPage = () => {
  const [listType, setListType] = useState<'all' | 'roadmap' | 'template'>(
    'all',
  );
  const [listStyle, setListStyle] = useState<'list' | 'grid'>('list');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [contentData, setContentData] = useState<any>(null);
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
    const fetchUser = async () => {
      try {
        const res = await Axios.get('/mypage');
        setUser(res.data.data.user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  return (
    <MyPageBlock>
      <LeftSection user={user} />
      <RightSection
        listType={listType}
        setListType={setListType}
        listStyle={listStyle}
        setListStyle={setListStyle}
        containerRef={containerRef}
        contentData={contentData}
        contentText={contentText}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </MyPageBlock>
  );
};

export default MyPage;
