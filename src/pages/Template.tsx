import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Axios from '../libs/api';
import Filter from '../components/Search/Filter';
import Search from '../components/Search/Search';
import ListItems from '../components/Search/ListItems';
import Pagination from '../components/Search/Pagination';
import InfoBox from '../components/Search/InfoBox';

import { FaQuestion } from 'react-icons/fa6';

import { tagColorFilter, typeFilter } from '../libs/utils/filter';
import Title from '../components/Common/Title';

interface TemplateProps {
  MoveToTop: () => void;
}


const Template = ({ MoveToTop }: TemplateProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const typeData = searchParams.get('type');
  const searchData = searchParams.get('search');
  const pageData = searchParams.get('page');

  const [templateType, setTemplateType] = useState(typeData || 'all');
  const [title, setTitle] = useState(searchData || '');
  const [listData, setListData] = useState<any[]>([]);
  const [page, setPage] = useState(parseInt(pageData || '0'));
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
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
        setTotalCnt(res.data.data.totalElements);
        navigate(`/template?type=${templateType}&search=${title}&page=${page}`);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTemplate();
  }, [templateType, page, title]);

  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // clean up 이벤트 리스너
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  return (
    <div className={isMobile ? 'px-6 py-4' : 'px-12 py-[45px]'}>
      <div
        className={`${
          isMobile ? 'mb-4' : 'mb-6 h-10 gap-[10px]'
        } flex items-center`}
      >
        <Title isMobile={isMobile}>회의록 템플릿</Title>
        {!isMobile && (
          <div
            className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full bg-white"
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <FaQuestion className="text-[10px] text-blue2" />
          </div>
        )}
        {isHover && (
          <InfoBox>
            유사한 목적의 회의를 먼저 경험한 사용자들이 공유한 회의록
            템플릿입니다. 템플릿을 통해 빠르고 쉽게 회의를 설계하세요!
          </InfoBox>
        )}
      </div>
      <Search
        title={title}
        setTitle={setTitle}
        setPage={setPage}
        isMobile={isMobile}
      />
      <Filter
        isMobile={isMobile}
        type={templateType}
        setType={setTemplateType}
        setPage={setPage}
      />
      {!isMobile && (
        <div className="mb-5 text-sm font-semibold text-gray4">
          {typeFilter(templateType)} {title && `"${title}" 검색결과`} 총{' '}
          {totalCnt}건
        </div>
      )}
      <ListItems isMobile={isMobile} data={listData} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Template;
