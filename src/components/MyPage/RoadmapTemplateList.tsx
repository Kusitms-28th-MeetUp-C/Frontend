import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import ListItem from './ListItem';
import Pagination from '../Search/Pagination';
import styled from 'styled-components';

interface RoadmapTemplateListProps {
  listStyle: 'list' | 'grid';
  className?: string;
  listType: 'all' | 'roadmap' | 'template';
  containerRef: React.RefObject<HTMLDivElement>;
  contentData: any;
  contentText: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  MoveToTop: () => void;
}

const List = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoadmapTemplateList = ({
  listStyle,
  className,
  listType,
  containerRef,
  contentData,
  contentText,
  page,
  setPage,
  totalPages,
  MoveToTop,
}: RoadmapTemplateListProps) => {
  return (
    <>
      <List
        ref={containerRef}
        className={`h-full overflow-y-scroll${
          className ? ` ${className}` : ''
        }${listStyle === 'list' ? ' space-y-5' : ' grid grid-cols-2 gap-5'}`}
      >
        {contentData?.content
          .filter((content: any) => {
            if (listType === 'all') return content;
            return content.sharedType === contentText[listType];
          })
          .map((content: any, index: number) => (
            <ListItem
              key={index}
              type={content.sharedType}
              name={content.title}
              category={content.contentType.toLowerCase()}
              styleMode={listStyle}
            />
          ))}
      </List>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </>
  );
};

export default RoadmapTemplateList;
