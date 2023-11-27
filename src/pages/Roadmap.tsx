import Title from '../components/Common/Title';
import InfoBox from '../components/Search/InfoBox';
import Search from '../components/Search/Search';
import Filter from '../components/Search/Filter';
import ListItems from '../components/Search/ListItems';
import Pagination from '../components/Search/Pagination';

import { useState, useEffect } from 'react';
import Axios from '../libs/api';
import { typeFilter } from '../libs/utils/filter';
import { FaQuestion } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface RoadmapProps {
  MoveToTop: () => void;
}

const Roadmap = ({ MoveToTop }: RoadmapProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const typeData = searchParams.get('type');
  const searchData = searchParams.get('search');
  const pageData = searchParams.get('page');

  const [roadmapType, setRaodmapType] = useState(typeData || 'all');
  const [title, setTitle] = useState(searchData || '');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(parseInt(pageData || '0'));
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const fetchRoadmap = async () => {
    await Axios.post(`/roadmap?page=${page}`, {
      roadmapType,
      title,
    })
      .then((res) => {
        console.log(res.data.data);
        setListData([...res.data.data.content]);
        setTotalPages(res.data.data.totalPages);
        setTotalCnt(res.data.data.totalElements);
        // navigate(`/roadmap?type=${roadmapType}&search=${title}&page=${page}`);
        setSearchParams({
          type: roadmapType,
          search: title,
          page: page.toString(),
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRoadmap();
  }, [roadmapType, page, title]);

  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // clean up 이벤트 리스너
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  return (
    <div className={isMobile ? 'px-6 py-4' : 'px-12 py-[45px]'}>
      <div
        className={`${
          isMobile ? 'mb-4' : 'mb-6 h-10 gap-[10px]'
        } flex items-center`}
      >
        <Title isMobile={isMobile}>로드맵 템플릿</Title>
        {!isMobile && (
          <div
            className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-white"
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <FaQuestion className="text-[10px] text-blue2" />
          </div>
        )}
        {isHover && (
          <InfoBox>
            같은 카테고리의 프로젝트를 먼저 경험한 사용자들이 공유한
            로드맵입니다. 로드맵을 통해 전체 타임라인을 확인해보세요!
          </InfoBox>
        )}
      </div>

      <Search
        title={title}
        isMobile={isMobile}
        setTitle={setTitle}
        setPage={setPage}
      />

      <Filter
        isMobile={isMobile}
        type={roadmapType}
        setType={setRaodmapType}
        setPage={setPage}
      />
      {!isMobile && (
        <div className="mb-5 text-sm font-semibold text-gray4">
          {typeFilter(roadmapType)} {title && `"${title}" 검색결과`} 총{' '}
          {totalCnt}건
        </div>
      )}
      <ListItems isMobile={isMobile} isRoadmap data={listData} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Roadmap;
