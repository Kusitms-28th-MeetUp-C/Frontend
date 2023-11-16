import Filter from '../components/Search/Filter';
import Axios from '../libs/api';
import { useState, useEffect } from 'react';
import Search from '../components/Search/Search';
import Pagination from '../components/Search/Pagination';
import { FaQuestion } from 'react-icons/fa6';
import ListItems from '../components/Search/ListItems';
import InfoBox from '../components/Search/InfoBox';

interface RoadmapProps {
  MoveToTop: () => void;
}

const Roadmap = ({ MoveToTop }: RoadmapProps) => {
  const [roadmapType, setRaodmapType] = useState('all');
  const [title, setTitle] = useState('');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRoadmap();
  }, [roadmapType, page, title]);

  useEffect(() => {
    setPage(0);
  }, [roadmapType, title]);

  return (
    <div className="px-[56px] py-[45px]">
      <div className="mb-6 flex h-10 items-center gap-[10px]">
        <div className="text-[28px] font-bold text-gray1">로드맵 템플릿</div>
        <div
          className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-white"
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <FaQuestion className="text-[10px] text-blue2" />
        </div>
        {isHover && (
          <InfoBox>
            로드맵 템플릿 설명입니다. 로드맵 템플릿 설명입니다. 로드맵 템플릿
            설명입니다.로드맵 템플릿 설명입니다.
          </InfoBox>
        )}
      </div>

      <div className="mb-6">
        <Search setTitle={setTitle} />
      </div>
      <Filter type={roadmapType} setType={setRaodmapType} />
      <ListItems isRoadmap data={listData} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </div>
  );
};

export default Roadmap;
