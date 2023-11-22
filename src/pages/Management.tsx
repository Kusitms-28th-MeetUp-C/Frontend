import { SetStateAction, useEffect, useRef, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { FaSchool } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { LuDownload } from 'react-icons/lu';

import PageHeading from '../components/PageHeading';
import Modal from '../components/Modal/Modal';
import Axios from '../libs/api';
import Process from '../components/SearchDetail/Process';
import { typeFilter } from '../libs/utils/filter';
import '../styles/github-markdown-light.css';
import TemplateEditorModal from '../components/Modal/TemplateEditorModal';
import BackBtn from '../components/SearchDetail/BackBtn';
import Title from '../components/Common/Title';
import PurpleButton from '../components/Common/Button/PurpleButton';
import DropDown, { selectedItem } from '../components/Common/DropDown/DropDown';
import TurndownService from 'turndown';


interface HeadingButtonProps {
  children: React.ReactNode;
}

interface ShareIconButtonProps {
  name: string;
  iconUrl: string;
  onClick?: () => void;
}

interface TeamSpaceLinkProps {
  to?: string;
  name: string;
  iconUrl: string;
  iconAlt: string;
  bgColor?: string;
  textColor?: string;
}

interface TeamSpaceLinkBlockProps {
  to?: string;
  bgcolor: string;
}

interface TeamSpaceNameProps {
  textcolor: string;
}

interface RightTitleSectionProps {
  children: React.ReactNode;
}

interface RightSectionListItemProps {
  children: React.ReactNode;
}

interface ReviewModalProps {
  values?: any;
  setValues?: any;
  setIsOpen: () => void;
}

const ShareIconButton = ({ name, iconUrl, onClick }: ShareIconButtonProps) => {
  return (
    <button className="flex items-center gap-2">
      <div className="flex h-7 w-7 justify-end">
        <img src={iconUrl} alt={name} className="h-full" />
      </div>
      <span>{name}</span>
    </button>
  );
};

const TeamSpaceLinkBlock = styled(Link)<TeamSpaceLinkBlockProps>`
  background-color: ${(props) => props.bgcolor};
`;

const TeamSpaceName = styled.span<TeamSpaceNameProps>`
  color: ${(props) => props.textcolor};
`;

const TeamSpaceLink = ({
  to,
  name,
  iconUrl,
  iconAlt,
  bgColor = '#FFFFFF',
  textColor = '#000000',
}: TeamSpaceLinkProps) => {
  return (
    <TeamSpaceLinkBlock
      to={to}
      className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white shadow"
      bgcolor={bgColor}
    >
      <i className="block h-1/2 w-1/2">
        <img src={iconUrl} alt={iconAlt} className="h-full object-cover" />
      </i>
      <TeamSpaceName className="text-xs" textcolor={textColor}>
        {name}
      </TeamSpaceName>
    </TeamSpaceLinkBlock>
  );
};

const RightSectionTitle = ({ children }: RightTitleSectionProps) => {
  return (
    <h2 className="mt-7">
      <span className="font-semibold">{children}</span>
    </h2>
  );
};

const RightSectionListItemBlock = styled.li`
  & + & {
    border-top: 1px solid #e5e5e5;
  }
`;

const RightSectionListItem = ({ children }: RightSectionListItemProps) => {
  return (
    <RightSectionListItemBlock>
      <Link to="#" className="flex items-center justify-between py-3">
        <span className="text-sm">{children}&nbsp;&gt;</span>
        <span className="text-sm text-gray3">연결된 스텝</span>
      </Link>
    </RightSectionListItemBlock>
  );
};

const ReviewModal = ({ values, setValues, setIsOpen }: ReviewModalProps) => {
  const handleOnSubmit = () => {
    Axios({
      method: 'POST',
      url: '/manage/template/review',
      data: {
        ...values,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => setIsOpen());
  };

  return (
    <Modal
      title="리뷰 작성하기"
      onSubmit={handleOnSubmit}
      setIsOpen={setIsOpen}
      cancel="취소"
      submit="작성 완료"
    >
      <form className="w-full">
        <label htmlFor="grow" className="block w-full text-xl font-semibold">
          이 템플릿을 통해 얼마나 성장했나요?
        </label>
        <div>
          <input
            type="range"
            min={0}
            max={100}
            value={values.rating}
            className="w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, rating: parseInt(e.target.value) })
            }
          />
        </div>
        <label
          htmlFor="content"
          className="mt-5 block w-full text-xl font-semibold"
        >
          이 템플릿을 통해 어떻게 성장할 수 있었나요?
        </label>
        <textarea
          id="content"
          rows={10}
          value={values?.content}
          className="mt-3 w-full resize-none rounded-2xl bg-gray7 px-4 py-4 outline-none"
          placeholder="템플릿에 대한 리뷰를 작성해주세요"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValues({ ...values, content: e.target.value })
          }
        ></textarea>
      </form>
    </Modal>
  );
};

const Management = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>({
    teamId: 1,
    content: '',
    rating: 0,
  });
  const [roadmap, setRoadmap] = useState<any>(null);
  const [content, setContent] = useState<string>('');
  const [templateValues, setTemplateValues] = useState<any>({});
  const itemListRef = useRef<selectedItem[]>([
    { id: 1, title: '파일 형식' },
    { id: 2, title: 'markdown' },
    { id: 2, title: 'html' },
  ]);
  const [selectedItem, setSelectedItem] = useState<selectedItem>(
    itemListRef.current[0],
  );

  const turndownService = new TurndownService();
  turndownService.addRule('u', {
    filter: ['u'],
    replacement: function (content) {
      return '<u>' + content + '</u>';
    },
  });

  const spaceLink: any = {
    NOTION: {
      name: 'Notion',
      iconUrl: '/icons/notion-icon.png',
      bgColor: '#FFFFFF',
      textColor: '#000000',
    },
    FIGMA: {
      name: 'Figma',
      iconUrl: '/icons/figma-icon.png',
      bgColor: '#000000',
      textColor: '#FFFFFF',
    },
    JIRA: {
      name: 'Jira',
      iconUrl: '/icons/jira-icon.jpg',
      bgColor: '#FFFFFF',
      textColor: '#1C79F7',
    },
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      if (!searchParams) return;
      if (!params) return;
      const data = {
        templateId: Number(params.templateId),
        roadmapId: Number(params.roadmapId),
        teamTitle: searchParams.get('team'),
      };
      try {
        const res = await Axios('/manage/template/team', {
          params: data,
        });
        setData(res.data.data);
        setProgress(res.data.roadmapInfo.progressingNum);
      } catch (err) {
        console.error(err);
      }
      try {
        const res = await Axios.get(`/team/${params.teamId}`);
        setRoadmap(res.data.data.roadmap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [params, searchParams]);

  useEffect(() => {
    if (data) {
      setValues({ ...values, templateId: data.originalTemplateId });
      setContent(data.content);
    }
  }, [data]);

  const handleDownload = () => {
    if (selectedItem.id === 1) {
      alert('파일 형식을 선택해주세요.');
      return;
    }
    let content = data?.content;
    let fileType;
    let fileFullType;
    if (selectedItem.title === 'html') {
      fileType = 'html';
      fileFullType = 'text/html';
    } else {
      fileType = 'md';
      fileFullType = 'text/markdown';

      content = turndownService.turndown(content);
    }
    const blob = new Blob([content], { type: fileFullType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data?.teamInfo.title}.${fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTemplateEdit = () => {
    const fetchTemplateEdit = async () => {
      const reqData = {
        templateId: Number(params.templateId),
        content: content,
      };
      try {
        await Axios.post('/manage/template/update', reqData);
        setData({ ...data, content: content });
        setIsEditorOpen(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTemplateEdit();
  };

  const handleDownloadTemplate = () => {
    const htmlText = data?.content;

    const blob = new Blob([htmlText], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data?.teamInfo.title}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="px-14 py-12">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* 왼쪽 영역 */}
      <div className="flex-1 flex-col space-y-6 px-14 py-12">
        {/* 페이지 제목 */}

        <BackBtn />
        <Title>{data?.templateName}</Title>
        {/* 헤딩 섹션 */}
        <section className="flex justify-between rounded-2xl bg-white px-6 py-4">
          <div className="flex w-full justify-between">
            <SectionHeadingContent
              title={data?.teamInfo.title}
              subtitle={
                typeFilter(data?.teamInfo?.teamType?.toLowerCase()) || '기타'
              }
            />
            <div className="flex gap-5">
              <PurpleButton>원본 데이터 보기</PurpleButton>
              <PurpleButton>
                <span className="flex items-center gap-1">
                  <span>밋플에 작성하기</span>
                  <i className="h-4 w-4">
                    <img
                      src="/icons/edit-icon-purple.svg"
                      alt="수정 아이콘"
                      className="w-full"
                    />
                  </i>
                </span>
              </PurpleButton>
            </div>
          </div>
        </section>

        {/* 로드맵 섹션 */}
        <section className="rounded-2xl bg-white py-8">
          <h3 className="mb-5 text-center text-2xl font-bold">
            {data?.roadmapInfo.title}
          </h3>
          <Process data={roadmap} />
        </section>
        {/* 템플릿 수정 섹션 */}
        <section className="rounded-2xl bg-white px-8 py-8">
          {/* 템플릿 수정 헤딩 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <PurpleButton
                textSize="0.875rem"
                onClick={() => setIsEditorOpen(true)}
              >
                <span className="flex items-center gap-1">
                  <span>수정하기</span>
                  <i className="h-4 w-4">
                    <img
                      src="/icons/edit-icon-purple.svg"
                      alt="수정 아이콘"
                      className="w-full object-cover"
                    />
                  </i>
                </span>
              </PurpleButton>
              <PurpleButton
                textSize="0.875rem"
                onClick={() => navigate(`/template/${data.originalTemplateId}`)}
              >
                원본 데이터 보기
              </PurpleButton>
            </div>
            <div className="flex items-center gap-2">
              <DropDown
                width={150}
                color="lightBlue"
                itemList={itemListRef.current}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                className="overflow-hidden shadow"
              />
              <PurpleButton textSize="0.875rem" onClick={handleDownload}>
                <span className="flex cursor-pointer items-center gap-2">
                  <span>다운로드</span>
                  <i>
                    <LuDownload />
                  </i>
                </span>
              </PurpleButton>
            </div>
          </div>
          {/* 템플릿 내용 */}
          <div className="mt-6 flex flex-col space-y-6">
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            ></div>
          </div>
        </section>
      </div>
      {/* 오른쪽 영역 */}
      <div className="w-80 bg-gray8 px-8 py-6">
        {/* 진행률 차트 */}
        <div className="flex justify-center">
          <div className="w-2/3">
            <CircularProgressbarWithChildren
              value={100 - progress}
              strokeWidth={20}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: 'butt',
                pathTransitionDuration: 0.5,
                pathColor: '#DDE1EA',
                trailColor: '#5257D6',
              })}
            >
              <span className="translate-y-1 text-sm">진행률</span>
              <span>
                <b className="text-[2.5rem] font-semibold">{progress}</b>%
              </span>
            </CircularProgressbarWithChildren>
          </div>
        </div>
        {/* 팀 이름 */}
        <h1 className="mt-5 flex w-full justify-center">
          <div className="flex items-center gap-1 text-xl font-bold">
            <span>{data?.teamInfo.title}</span>
            <i className="h-7 w-7">
              <img
                src="/icons/edit-icon-black.svg"
                alt="수정 아이콘"
                className="w-full"
              />
            </i>
          </div>
        </h1>
        {/* 팀 카테고리 */}
        <div className="mt-3 flex w-full justify-center">
          <div className="flex items-center gap-2 text-sm">
            <i className="text-tagPurple1">
              <FaSchool />
            </i>
            <span className="text-gray-600">{data?.teamInfo.teamType}</span>
          </div>
        </div>
        {/* 팀 스페이스 링크 */}
        {/* <div className="mt-8 flex justify-center">
          <div className="flex gap-3">
            {data.teamInfo.spaceList.map((teamSpace: any, index: number) => (
              <TeamSpaceLink
                key={index}
                to={teamSpace.url}
                name={spaceLink[teamSpace.spaceType].name}
                iconUrl={spaceLink[teamSpace.spaceType].iconUrl}
                iconAlt={teamSpace.spaceType}
                bgColor={spaceLink[teamSpace.spaceType].bgColor}
                textColor={spaceLink[teamSpace.spaceType].textColor}
              />
            ))}
          </div>
        </div> */}
        {/* 회의록 템플릿 */}
        <section>
          <RightSectionTitle>회의록 리스트</RightSectionTitle>
          <ul className="mt-3 flex w-full flex-col rounded-2xl bg-white px-7 py-2">
            <RightSectionListItem>역할분배 회의</RightSectionListItem>
            <RightSectionListItem>아이데이션 회의</RightSectionListItem>
            <RightSectionListItem>1차 회의</RightSectionListItem>
            <RightSectionListItem>2차 회의</RightSectionListItem>
            <RightSectionListItem>최종 기획서 회의</RightSectionListItem>
          </ul>
        </section>
        {/* 리뷰 작성 버튼 */}
        <div className="mt-5 flex justify-center">
          <button
            className="flex items-center gap-1 rounded-lg bg-blue1 px-6 py-2 font-semibold text-white"
            onClick={() => setIsModalOpen(true)}
          >
            <span>리뷰 남기기</span>
            <i>
              <RiPencilFill />
            </i>
          </button>
        </div>
        {/* 리뷰 작성 모달 */}
        {isModalOpen && (
          <ReviewModal
            values={values}
            setValues={setValues}
            setIsOpen={() => setIsModalOpen(false)}
          />
        )}
        {/* 템플릿 수정 모달 */}
        {isEditorOpen && (
          <TemplateEditorModal
            setIsOpen={setIsEditorOpen}
            onCancel={() => setIsEditorOpen(false)}
            templateValues={templateValues}
            setTemplateValues={setTemplateValues}
            onSubmit={handleTemplateEdit}
            title="템플릿 수정하기"
            submitText="수정"
            cancelText="취소"
            content={content}
            setContent={setContent}
            mode="edit"
          />
        )}
      </div>
    </div>
  );
};

export default Management;
