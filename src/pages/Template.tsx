import Filter from '../components/Search/Filter';
import Search from '../components/Search/Search';
import TemplateItems from '../components/Search/TemplateItems';
import { useState, useEffect, useRef } from 'react';
import Axios from '../assets/api';
import Pagination from '../components/Search/Pagination';
import Title from '../components/Common/Title';

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
    <div ref={containerRef} className="px-[56px] py-[45px]">
      <Title>회의록 템플릿</Title>
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
