import styled from 'styled-components';

import MyInfo from '../Common/MyInfo';
import SectionHeading from './SectionHeading';
import BottomTextButton from './BottomTextButton';

interface ProfileScreenProps {
  user: any;
  setIsEditScreen: any;
}

const ProfileInfo = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  margin-top: 1rem;
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
  margin-top: 1rem;
`;

const BottomArea = styled.div`
  margin-top: 2rem;
`;

const ProfileScreen = ({ user, setIsEditScreen }: ProfileScreenProps) => {
  return (
    <>
      <SectionHeading>내 프로필</SectionHeading>
      <ProfileInfo>
        <MyInfo.Avatar imageUrl={user?.profile} />
        <ProfileDetailInfo>
          <MyInfo.Name userType={user?.userType} name={user?.name} />
          <MyInfo.Email email={user?.email} />
          <MyInfo.ChatButton isMyPage />
        </ProfileDetailInfo>
      </ProfileInfo>
      <ScoreArea>
        <MyInfo.ScoreItem
          label="공유한 회의록 수"
          count={user?.templateNum}
          countLabel="개"
        />
        <MyInfo.ScoreItem
          label="공유한 로드맵 수"
          count={user?.roadmapNum}
          countLabel="개"
        />
        <MyInfo.ScoreItem
          label="나의 포인트"
          count={user?.point}
          countLabel="점"
          isPoint
        />
      </ScoreArea>
      <BottomArea>
        <BottomTextButton onClick={() => setIsEditScreen(true)}>
          프로필 수정
        </BottomTextButton>
      </BottomArea>
    </>
  );
};

export default ProfileScreen;
