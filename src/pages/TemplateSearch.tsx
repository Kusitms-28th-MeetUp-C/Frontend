import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import Search from '../components/Search/Search';
import Axios from '../libs/api';

interface ListItemProps {
  badge: string;
  name: string;
  team: string;
}

const ListItem = ({ badge, name, team }: ListItemProps) => {
  return (
    <li className="group flex cursor-pointer justify-between rounded-xl bg-white px-4 py-3 shadow-md duration-300 hover:bg-blue2">
      <span className="flex items-center justify-center rounded-full bg-[#FFE5D2] px-2 py-1 text-xs font-semibold text-[#FF7D1F]">
        {badge}
      </span>
      <span className="font-semibold duration-300 group-hover:text-white">
        {name}
      </span>
      <span className="font-semibold text-neutral-500 duration-300 group-hover:text-white">
        {team}
      </span>
    </li>
  );
};

const TemplateSearch = () => {
  const [search, setSearch] = useState('');
  const [templateId, setTemplateId] = useState<number>(5);
  const [template, setTemplate] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!templateId) return;
    setLoading(true);
    Axios.get(`/manage/template/${templateId}`, {
      params: {
        isOpened: false,
      },
    })
      .then((res) => {
        setTemplate(res.data.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [templateId]);

  if (loading) {
    return (
      <div className="px-14 py-12">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-14 py-12">
        <div>에러 발생</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-14 py-12">
      {/* 검색 창 */}
      <Search setTitle={setSearch} />
      <div className="flex w-full flex-1 gap-5">
        {/* 왼쪽 영역 */}
        <div className="flex-1">
          {/* 템플릿 리스트 */}
          <ul className="space-y-5">
            <ListItem
              badge="자유주제"
              name="자유주제PT 팀플 회의 템플릿"
              team="경영정보시스템"
            />
            <ListItem
              badge="자유주제"
              name="자유주제PT 팀플 회의 템플릿"
              team="경영정보시스템"
            />
            <ListItem
              badge="자유주제"
              name="자유주제PT 팀플 회의 템플릿"
              team="경영정보시스템"
            />
            <ListItem
              badge="자유주제"
              name="자유주제PT 팀플 회의 템플릿"
              team="경영정보시스템"
            />
            <ListItem
              badge="자유주제"
              name="자유주제PT 팀플 회의 템플릿"
              team="경영정보시스템"
            />
          </ul>
        </div>
        {/* 오른쪽 영역 */}
        {templateId ? (
          <div className="flex-1">
            {/* 템플릿 미리보기 */}
            <div className="h-full rounded-2xl bg-white px-6 py-6 shadow-md">
              <header className="flex justify-between">
                <button className="rounded-xl bg-blue4 px-6 py-2 font-semibold text-blue1">
                  자세히 보기
                </button>
                <div className="flex w-44 items-center justify-between rounded-xl bg-blue5 px-4 py-2">
                  <span>팀 배정하기</span>
                  <i>
                    <IoIosArrowDown />
                  </i>
                </div>
              </header>
              <main className="mt-3">{template.content}</main>
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
};

export default TemplateSearch;
