import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import FilterBar from '../components/OtherUser/FilterBar';
import RoadmapTemplateList from '../components/OtherUser/RoadmapTemplateList';
import UserProfileSection from '../components/OtherUser/UserProfileSection';
import Axios from '../libs/api';

const OtherUser = () => {
  const containerRef: React.RefObject<HTMLDivElement> = useRef(null);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [user, setUser] = useState<any>(null);
  const [contentData, setContentData] = useState<any>(null);
  const [filter, setFilter] = useState<'template' | 'roadmap'>('template');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOtherUser = async () => {
      const url =
        filter === 'template'
          ? '/mypage/another/template'
          : '/mypage/another/roadmap';
      try {
        const res = await Axios.get(url, {
          params: {
            userId: params.userId,
            page,
          },
        });
        setUser(res.data.data.user);
        console.log('res', res.data.data);
        if (filter === 'template') {
          setContentData(res.data.data.templateList.content);
          setTotalPages(res.data.data.templateList.totalPages);
        } else {
          setContentData(res.data.data.roadmapList.content);
          setTotalPages(res.data.data.roadmapList.totalPages);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOtherUser();
  }, [filter, params.userId, page]);

  if (loading) {
    return <div className="space-y-5 pb-4 pl-6 pr-10 pt-8">loading...</div>;
  }

  if (error) {
    return <div className="space-y-5 pb-4 pl-6 pr-10 pt-8">error!</div>;
  }

  return (
    <div className="space-y-5 pb-4 pl-6 pr-10 pt-8" ref={containerRef}>
      <UserProfileSection user={user} />
      <FilterBar user={user} filter={filter} setFilter={setFilter} />
      <RoadmapTemplateList
        contentData={contentData}
        page={page}
        setPage={setPage}
        containerRef={containerRef}
        totalPages={totalPages}
      />
    </div>
  );
};

export default OtherUser;
