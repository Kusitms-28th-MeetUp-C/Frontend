import Filter from '../components/search/Filter';
import Search from '../components/search/Search';
import TemplateItems from '../components/search/TemplateItems';
import { useState, useEffect } from 'react';
import Axios from '../assets/api';
import Pagination from '../components/search/Pagination';

const Template = () => {
  const [templateType, setTemplateType] = useState('all');
  const [title, setTitle] = useState('');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTemplate = async () => {
    await Axios.post(`/template/get?page=${page}`, {
      templateType,
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
    fetchTemplate();
  }, [templateType, page, title]);

  useEffect(() => {
    setPage(0);
  }, [templateType, title]);

  return (
    <div className="px-[56px] py-[45px]">
      <div className="mb-7 flex w-[74.5%] items-center justify-between">
        <div className="text-[28px] font-extrabold text-black">
          {'회의 템플릿'}
        </div>
      </div>
      <Search setTitle={setTitle} />
      <Filter type={templateType} setType={setTemplateType} />
      <TemplateItems data={listData} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Template;
