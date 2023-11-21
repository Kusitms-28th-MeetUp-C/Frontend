import { SetStateAction, useState } from 'react';

import FilterBar from './FilterBar';
import RoadmapTemplateList from './RoadmapTemplateList';
import styled from 'styled-components';

interface RightSectionProps {
  listType: 'all' | 'roadmap' | 'template';
  setListType: (listType: 'all' | 'roadmap' | 'template') => void;
  listStyle: 'list' | 'grid';
  setListStyle: (listStyle: 'list' | 'grid') => void;
  containerRef: React.RefObject<HTMLDivElement>;
  contentData: any;
  contentText: any;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
  totalPages: number;
  MoveToTop: () => void;
}

const RightSectionBlock = styled.section`
  width: 100%;
  height: calc(100vh - 121px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  background-color: white;
  padding: 2rem;
`;

const SectionHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const RightSection = ({
  listType,
  setListType,
  listStyle,
  setListStyle,
  containerRef,
  contentData,
  contentText,
  page,
  setPage,
  totalPages,
  MoveToTop,
}: RightSectionProps) => {
  return (
    <RightSectionBlock>
      <SectionHeading>내가 공유한 템플릿 / 로드맵</SectionHeading>
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
        containerRef={containerRef}
        contentData={contentData}
        contentText={contentText}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </RightSectionBlock>
  );
};

export default RightSection;
