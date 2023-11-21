import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import TurndownService from 'turndown';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Axios from '../libs/api';
import DropDown from '../components/Common/DropDown/DropDown';
import { typeReverseFilter } from '../libs/utils/filter';
import { useNavigate } from 'react-router-dom';

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
      className={`rounded-xl px-6 py-3 text-gray-600 ${backgroundColor[color]}${
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
  const navigate = useNavigate();

  const [rawContent, setRawContent] = useState('');
  const [error, setError] = useState(null);
  const [values, setValues] = useState<any>({
    title: '',
    content: '',
    introduction: '',
    templateType: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [templateType, setTemplateType] = useState({
    id: 0,
    title: '카테고리',
  });
  const [estimatedTime, setEstimatedTime] = useState({
    id: 0,
    title: '소요시간',
  });
  const categoryList = [
    {
      id: 1,
      title: 'IT 프로젝트',
    },
    {
      id: 2,
      title: '팀플',
    },
    {
      id: 3,
      title: '동아리/학회',
    },
    {
      id: 4,
      title: '자유주제 PT',
    },

    {
      id: 5,
      title: '마케팅',
    },
    {
      id: 6,
      title: '설문 및 데이터 분석',
    },
    {
      id: 7,
      title: '기업 분석',
    },
    {
      id: 8,
      title: '디자인 프로젝트',
    },
    {
      id: 9,
      title: '영상 프로젝트',
    },
  ];

  const estimatedTimeList = [
    {
      id: 1,
      title: '10m',
    },
    {
      id: 2,
      title: '20m',
    },
    {
      id: 3,
      title: '30m',
    },
    {
      id: 4,
      title: '40m',
    },

    {
      id: 5,
      title: '50m',
    },
    {
      id: 6,
      title: '60m',
    },
  ];

  const handleEditorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      values.title === '' ||
      values.content === '' ||
      values.introduction === '' ||
      values.templateType === 'it'
    ) {
      console.log('모든 항목을 입력해주세요.');
      setErrorMessage('모든 항목을 입력해주세요.');
      return;
    }
    const newData = {
      ...values,
      templateType: typeReverseFilter(templateType.title),
      estimatedTime: Number(estimatedTime.title.slice(0, 2)),
    };

    Axios({
      method: 'POST',
      url: '/manage/template',
      data: newData,
    })
      .then((res) => {
        console.log(res);
        alert('작성이 완료되었습니다');
        navigate('/template');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(rawContent);
    setValues({ ...values, content: markdown });
  }, [rawContent]);

  useEffect(() => {
    setErrorMessage('');
  }, [values]);

  if (error) {
    return (
      <div className="px-14 py-12">
        <div>에러 발생</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleEditorSubmit}
      className="flex flex-col gap-8 px-14 py-12"
    >
      {/* 글 작성 영역 */}
      <div className="flex flex-col space-y-5">
        {/* 제목 */}
        <h1 className="text-2xl font-bold">템플릿 제작하기</h1>

        {/* 카테고리 드롭다운 */}
        <div className="flex items-center gap-6">
          <div className="w-[210px]">
            <DropDown
              selectedItem={templateType}
              setSelectedItem={setTemplateType}
              itemList={categoryList}
              className={'py-[8px]'}
            />
          </div>
          <div className="w-[210px]">
            <DropDown
              selectedItem={estimatedTime}
              setSelectedItem={setEstimatedTime}
              itemList={estimatedTimeList}
              className={'py-[8px]'}
            />
          </div>
        </div>

        {/* 입력 상자 영역 */}
        <div className="flex flex-1 gap-5">
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
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
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
                value={values.introduction}
                onChange={(e) =>
                  setValues({ ...values, introduction: e.target.value })
                }
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
        <div className="flex flex-col items-center gap-5">
          {errorMessage && (
            <span className="font-bold text-red-500">{errorMessage}</span>
          )}
          <ActionButton type="submit" color="blue1">
            작성 완료
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

export default TemplateEditor;
