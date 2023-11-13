import Filter from '../components/Search/Filter';
import Axios from '../assets/api';
import { useState, useEffect } from 'react';
import Search from '../components/Search/Search';
import RoadmapItems from '../components/Search/RoadmapItems';
import Pagination from '../components/Search/Pagination';

const Roadmap = () => {
  const [roadmapType, setRaodmapType] = useState('all');
  const [title, setTitle] = useState('');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRoadmap = async () => {
    await Axios.post(`/roadmap/get?page=${page}`, {
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
      <div className="text-[28px] font-extrabold text-black">
          {'회의 로드맵'}
        </div>
      <Search setTitle={setTitle} />
      <Filter type={roadmapType} setType={setRaodmapType} />
      <RoadmapItems data={listData} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Roadmap;
