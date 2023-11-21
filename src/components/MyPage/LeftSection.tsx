import MyInfo from '../Common/MyInfo';
import styled from 'styled-components';

interface LeftSectionProps {
  user: any;
}

const LeftSectionBlock = styled.section`
  width: 400px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
`;

const SectionHeading = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
`;

const ProfileDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ScoreArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProfileEditButton = styled.button`
  width: 100%;
  text-align: center;
  color: #393948;
`;

const LeftSection = ({ user }: LeftSectionProps) => {
  return (
    <LeftSectionBlock className="shadow">
      <SectionHeading>내 프로필</SectionHeading>
      <ProfileInfo>
        <MyInfo.Avatar imageUrl={user.profile} />
        <ProfileDetailInfo>
          <MyInfo.Name userType={user.userType} name={user.name} />
          <MyInfo.Email email={user.email} />
          <MyInfo.ChatButton />
        </ProfileDetailInfo>
      </ProfileInfo>
      <ScoreArea>
        <MyInfo.ScoreItem
          label="회의록 로드맵 가이드"
          count={user.templateNum}
          countLabel="개"
        />
        <MyInfo.ScoreItem
          label="로드맵 템플릿 기여도"
          count={user.roadmapNum}
          countLabel="개"
        />
        <MyInfo.ScoreItem
          label="나의 포인트"
          count={user.point}
          countLabel="점"
          isPoint
        />
      </ScoreArea>
      <ProfileEditButton>프로필 수정</ProfileEditButton>
    </LeftSectionBlock>
  );
};

export default LeftSection;
