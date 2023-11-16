import { useState, useEffect, useRef } from 'react';
import Axios from '../libs/api';
import { FaQuestion } from 'react-icons/fa6';

import Filter from '../components/Search/Filter';
import Search from '../components/Search/Search';
import ListItems from '../components/Search/ListItems';
import Pagination from '../components/Search/Pagination';
import { tagColorFilter } from '../libs/utils/filter';
import InfoBox from '../components/Search/InfoBox';

interface TemplateProps {
  MoveToTop: () => void;
}

const Template = ({ MoveToTop }: TemplateProps) => {
  const [templateType, setTemplateType] = useState('all');
  const [title, setTitle] = useState('');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const fetchTemplate = () => {
    Axios.post(`/template?page=${page}`, {
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
      <div className="mb-6 flex h-10 items-center gap-[10px]">
        <div
          className="text-[28px] font-bold text-gray1"
          onClick={() => console.log(tagColorFilter('background', 'marketing'))}
        >
          회의록 템플릿
        </div>
        <div
          className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-white"
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <FaQuestion className="text-[10px] text-blue2" />
        </div>
        {isHover && (
          <InfoBox>
            회의록 템플릿 설명입니다. 회의록 템플릿 설명입니다. 회의록 템플릿
            설명입니다.회의록 템플릿 설명입니다.
          </InfoBox>
        )}
      </div>

      <Search setTitle={setTitle} />
      <Filter type={templateType} setType={setTemplateType} />
      <ListItems data={listData} />
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
