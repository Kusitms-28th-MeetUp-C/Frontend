import { AiOutlineSearch } from 'react-icons/ai';
import Filter from '../components/Search/Filter';
import SearchItems from '../components/Search/SearchItems';
import Axios from '../assets/apis';
import { useState, useEffect } from 'react';
import Search from '../components/Search/Search';

const Roadmap = () => {
  const [templateType, setTemplateType] = useState('ALL');
  const [title, setTitle] = useState('');
  const [data, setData] = useState<any[]>([]);

  const fetchTemplate = async () => {
    await Axios.post(`/roadmap/get`, {
      templateType,
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
  }, [templateType]);

  return (
    <div className="px-[56px] py-[45px]">
      <Search />
      <Filter />
      {/* <SearchItems data={data} /> */}
    </div>
  );
};

export default Roadmap;
