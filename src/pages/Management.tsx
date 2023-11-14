import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { FaSchool } from 'react-icons/fa';
import { HiTemplate } from 'react-icons/hi';

import PageHeading from '../components/PageHeading';
import Roadmap from '../components/Roadmap';
import SectionHeadingContent from '../components/SectionHeadingContent';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../assets/api';

interface HeadingButtonProps {
  children: React.ReactNode;
}

interface ShareIconButtonProps {
  name: string;
  iconUrl: string;
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

interface IconTextProps {
  text: string;
  iconUrl: string;
  iconAlt: string;
}

interface RightTitleSectionProps {
  children: React.ReactNode;
}

interface RightSectionListItemProps {
  children: React.ReactNode;
}

const PurpleButton = ({ children }: HeadingButtonProps) => {
  return (
    <button className="rounded-xl bg-tagPurple2 px-4 py-3 font-semibold text-blue1">
      {children}
    </button>
  );
};

const ShareIconButton = ({ name, iconUrl }: ShareIconButtonProps) => {
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

const IconText = ({ text, iconUrl, iconAlt }: IconTextProps) => {
  return (
    <div className="flex items-center gap-2">
      <i className="h-4 w-4">
        <img src={iconUrl} alt={iconAlt} className="w-full" />
      </i>
      <span className="text-xs font-medium text-gray3">{text}</span>
    </div>
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

const Management = () => {
  const [progress] = useState(50);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);
    axios
      .get('/manage/template/team', {
        params: {
          templateId: 1,
          roadmapTitle: '홍민서 로드맵',
          teamTitle: '미팅남녀',
        },
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
        <PageHeading title={data.templateName} previous="관리" />
        {/* 헤딩 섹션 */}
        <section className="flex justify-between rounded-2xl bg-white px-6 py-4">
          <div className="flex w-full justify-between">
            <SectionHeadingContent
              title={data.teamInfo.title}
              subtitle={data.teamInfo.teamType}
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
            {data.roadmapInfo.title}
          </h3>
          <Roadmap data={data.roadmapInfo.roadmapDetailList} />
        </section>
        {/* 템플릿 수정 섹션 */}
        <section className="rounded-2xl bg-white px-8 py-8">
          {/* 템플릿 수정 헤딩 */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">공유하기</h3>
            <div className="flex gap-5">
              <ShareIconButton name="Notion" iconUrl="/icons/notion-icon.png" />
              <ShareIconButton
                name="Google Docs"
                iconUrl="/icons/google-docs-icon.png"
              />
              <PurpleButton>
                <span className="flex items-center gap-1">
                  <span>복사하기</span>
                  <i className="h-4 w-4">
                    <img
                      src="/icons/copy-icon-purple.svg"
                      alt="복사 아이콘"
                      className="w-full"
                    />
                  </i>
                </span>
              </PurpleButton>
            </div>
          </div>
          {/* 템플릿 내용 */}
          <div className="mt-6 flex flex-col space-y-6">
            <div className="flex flex-col space-y-6">
              <div className="rounded-2xl bg-tagPurple2 px-6 py-4 text-xl font-medium shadow-lg">
                <span className="font-bold">템플릿 내용</span>
              </div>
              <div className="w-full rounded-2xl px-6 py-4 leading-6 shadow-lg">
                {data.content}
              </div>
            </div>
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
            <span>{data.teamInfo.title}</span>
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
            <span className="text-gray-600">{data.teamInfo.teamType}</span>
          </div>
        </div>
        {/* 팀 스페이스 링크 */}
        <div className="mt-8 flex justify-center">
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
        </div>
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
      </div>
    </div>
  );
};

export default Management;
