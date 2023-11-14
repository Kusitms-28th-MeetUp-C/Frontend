import { useState, useEffect, useRef } from 'react';
import axios from '../libs/api';
import { Link } from 'react-router-dom';

import Filter from '../components/Search/Filter';
import Search from '../components/Search/Search';
import TemplateItems from '../components/Search/TemplateItems';
import Pagination from '../components/Search/Pagination';

interface TemplateProps {
  MoveToTop: () => void;
}

const Template = ({ MoveToTop }: TemplateProps) => {
  const [templateType, setTemplateType] = useState('all');
  const [title, setTitle] = useState('');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // const MoveToTop = () => {
  //   containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  //   console.log('실행');
  // };

  useEffect(() => {
    fetchTemplate();
  }, [templateType, page, title]);

  useEffect(() => {
    setPage(0);
  }, [templateType, title]);

  return (
    <div className="px-[56px] py-[45px]">
      <div className="text-[28px] font-extrabold text-black">
        {'회의록 템플릿'}
      </div>
      <div className="mb-6 flex items-center gap-3">
        <Search setTitle={setTitle} />
        <Link
          to="/template/create"
          className="rounded-xl bg-blue1 px-4 py-2 text-sm font-medium text-white"
        >
          템플릿 제작하기
        </Link>
      </div>
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
