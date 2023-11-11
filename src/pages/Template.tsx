import Filter from '../components/Search/Filter';
import Search from '../components/Search/Search';
import TemplateItems from '../components/Search/TemplateItems';
import { useState, useEffect } from 'react';
import Axios from '../assets/apis';

const Template = () => {
  const [templateType, setTemplateType] = useState('ALL');
  const [title, setTitle] = useState('');
  const [data, setData] = useState<any[]>([]);

  const fetchTemplate = async () => {
    await Axios.post(`/template/get`, {
      templateType,
      //   title: '',
    })
      .then((res) => {
        console.log(res);
        setData([...res.data.data.templateList]);
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
      <TemplateItems data={data} />
    </div>
  );
};

export default Template;
