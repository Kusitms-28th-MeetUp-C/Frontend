import styled from 'styled-components';

import MyInfo from '../Common/MyInfo';
import SectionHeading from './SectionHeading';
import Input from './Input';
import BottomTextButton from './BottomTextButton';

interface ProfileEditScreenProps {
  user: any;
  setIsEditScreen: any;
  values: any;
  setValues: any;
  handleProfileEdit: any;
}

const ProfileArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

const ActionArea = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const SaveButton = styled.button`
  padding: 0.5rem 2rem;
  background-color: #5257d6;
  border-radius: 0.625rem;
  color: white;
  font-weight: 600;
`;

const BottomArea = styled.div`
  margin-top: 2rem;
`;

const BottomSubText = styled.p`
  text-align: center;
  color: #8a929f;
  font-size: 0.75rem;
  margin-top: 0.75rem;
`;

const ProfileEditScreen = ({
  user,
  setIsEditScreen,
  values,
  setValues,
  handleProfileEdit,
}: ProfileEditScreenProps) => {
  return (
    <>
      <SectionHeading textAlign="center">프로필 수정</SectionHeading>
      <ProfileArea>
        <MyInfo.Avatar imageUrl={user?.profile} />
      </ProfileArea>
      <InputArea>
        <Input
          label="이름"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <Input
          label="포지션"
          value={values.userType}
          onChange={(e) => setValues({ ...values, userType: e.target.value })}
        />
        <Input
          label="이메일"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
      </InputArea>
      <ActionArea>
        <SaveButton onClick={handleProfileEdit}>변경사항 저장</SaveButton>
      </ActionArea>
      <BottomArea>
        <BottomTextButton>계정 삭제</BottomTextButton>
        <BottomSubText>
          계정 삭제 시 내가 참여 중인
          <br />
          워크스페이스의 모든 항목이 삭제됩니다.
        </BottomSubText>
      </BottomArea>
    </>
  );
};

export default ProfileEditScreen;
