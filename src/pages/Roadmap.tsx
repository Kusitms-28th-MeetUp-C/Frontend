import Filter from '../components/Search/Filter';
import Axios from '../assets/api';
import { useState, useEffect } from 'react';
import Search from '../components/Search/Search';
import RoadmapItems from '../components/Search/RoadmapItems';

const Roadmap = () => {
  const [roadmapType, setRaodmapType] = useState('all');
  const [title, setTitle] = useState('');
  const [data, setData] = useState<any[]>([]);

  const fetchTemplate = async () => {
    await Axios.post(`/roadmap/get`, {
      roadmapType,
      title,
    })
      .then((res) => {
        console.log(res);
        setData([...res.data.data.roadmapList]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTemplate();
  }, [roadmapType]);

  return (
    <div className="px-[56px] py-[45px]">
      <Search setTitle={setTitle} />
      <Filter type={roadmapType} setType={setRaodmapType} />
      <RoadmapItems data={data} />
    </div>
  );
};

export default Roadmap;
