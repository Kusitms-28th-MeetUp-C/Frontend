import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import TurndownService from 'turndown';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface RoundedBoxProps {
  color?: string;
  className?: string;
  children: React.ReactNode;
}

interface ActionButtonProps {
  type?: 'button' | 'submit';
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const Dropdown = styled.div`
  box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.05);
`;

const RoundedBoxBlock = styled.div`
  box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.05);
`;

const RoundedBox = ({
  color = 'white',
  className,
  children,
}: RoundedBoxProps) => {
  const backgroundColor: { [key: string]: string } = {
    blue2: ' bg-blue2',
    white: ' bg-white',
  };

  return (
    <RoundedBoxBlock
      className={`rounded-xl px-6 py-3 text-gray-600${backgroundColor[color]}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </RoundedBoxBlock>
  );
};

const ActionButtonBlock = styled.button`
  box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.09);
`;

const ActionButton = ({
  type = 'button',
  color = 'white',
  className,
  children,
}: ActionButtonProps) => {
  const buttonStyle: { [key: string]: string } = {
    blue1: ' bg-blue1 text-white',
    white: ' bg-white text-black',
  };

  return (
    <ActionButtonBlock
      type={type}
      className={`w-36 rounded-xl py-2 font-semibold${buttonStyle[color]}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </ActionButtonBlock>
  );
};

const TemplateEditor = () => {
  const [content, setContent] = useState('');
  const [rawContent, setRawContent] = useState('');

  useEffect(() => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(rawContent);
    setContent(markdown);
    console.log(content);
  }, [rawContent]);

  return (
    <div className="flex flex-col gap-8 px-14 py-12">
      {/* 글 작성 영역 */}
      <div className="flex flex-col space-y-5">
        {/* 제목 */}
        <h1 className="text-2xl font-bold">템플릿 제작하기</h1>
        {/* 카테고리 드롭다운 */}
        <div className="flex justify-start">
          <Dropdown className="flex w-40 cursor-pointer items-center justify-between rounded-xl bg-white px-4 py-2 text-gray-600">
            <span>카테고리</span>
            <i className="text-xl text-blue1">
              <MdOutlineKeyboardArrowDown />
            </i>
          </Dropdown>
        </div>
        {/* 입력 상자 영역 */}
        <div className="flex gap-5">
          {/* 왼쪽 영역 */}
          <div className="flex flex-1 flex-col space-y-5">
            {/* 제목 입력 헤더 */}
            {/* <RoundedBox color="blue2">
              <span className="w-full font-bold text-white">제목</span>
            </RoundedBox> */}
            {/* 제목 입력 상자 */}
            <RoundedBox>
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                className="w-full bg-inherit outline-none"
              />
            </RoundedBox>
            {/* 템플릿 형식 입력 헤더 */}
            {/* <RoundedBox color="blue2">
              <span className="w-full font-bold text-white">템플릿 형식</span>
            </RoundedBox> */}
            {/* 템플릿 형식 입력 상자 */}
            <RoundedBox>
              <ReactQuill
                placeholder="추가하고 싶은 템플릿 형식을 작성해주세요."
                onChange={(value: string) => setRawContent(value)}
              />
            </RoundedBox>
          </div>
          {/* 오른쪽 영역 */}
          <div className="w-72">
            {/* 템플릿 설명 입력 상자 */}
            <RoundedBox>
              <textarea
                placeholder="템플릿의 설명을 입력해주세요."
                className="w-full resize-none bg-inherit outline-none"
                rows={5}
              />
            </RoundedBox>
          </div>
        </div>
      </div>
      {/* 버튼 영역 */}
      <div className="flex justify-center">
        <div className="flex flex-col gap-5">
          <ActionButton color="blue1">작성 완료</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
