import { useState } from 'react';

import FilterBar from './FilterBar';
import RoadmapTemplateList from './RoadmapTemplateList';

const RightSection = () => {
  const [listType, setListType] = useState<'all' | 'roadmap' | 'template'>(
    'all',
  );
  const [listStyle, setListStyle] = useState<'list' | 'grid'>('list');

  return (
    <section className="flex h-[calc(100vh-121px)] w-full flex-col gap-5 rounded-2xl bg-white px-8 py-8">
      <h2 className="text-xl font-bold">내가 공유한 템플릿 / 로드맵</h2>
      <FilterBar
        listStyle={listStyle}
        setListStyle={setListStyle}
        listType={listType}
        setListType={setListType}
      />
      <RoadmapTemplateList
        listStyle={listStyle}
        className="flex-1"
        listType={listType}
      />
    </section>
  );
};

export default RightSection;
