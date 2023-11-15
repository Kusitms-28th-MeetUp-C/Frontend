import { useState, useEffect, useRef } from 'react';
import axios from '../libs/api';
import { FaQuestion } from 'react-icons/fa6';

import Filter from '../components/Search/Filter';
import Search from '../components/Search/Search';
import TemplateItems from '../components/Search/TemplateItems';
import Pagination from '../components/Search/Pagination';
import { tagColorFilter } from '../libs/utils/filter';

interface TemplateProps {
  MoveToTop: () => void;
}

const Template = ({ MoveToTop }: TemplateProps) => {
  const [templateType, setTemplateType] = useState('all');
  const [title, setTitle] = useState('');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTemplate = () => {
    axios
      .post(`/template/get?page=${page}`, {
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
      <div className="mb-7 flex cursor-pointer items-center gap-[10px]">
        <div
          className="text-[28px] font-bold text-gray1"
          onClick={() => console.log(tagColorFilter('background', 'marketing'))}
        >
          회의록 템플릿
        </div>
        <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white">
          <FaQuestion className="text-[10px] text-blue2" />
        </div>
      </div>

      <Search setTitle={setTitle} />
      <Filter type={templateType} setType={setTemplateType} />
      <TemplateItems data={listData} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </div>
  );
};

export default Template;
