import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import MyInfo from '../Common/MyInfo';
import SectionHeading from './SectionHeading';
import Input from './Input';
import BottomTextButton from './BottomTextButton';
import DropDown, { selectedItem } from '../Common/DropDown/DropDown';

interface ProfileEditScreenProps {
  user: any;
  values: any;
  setValues: any;
  handleProfileEdit: any;
  itemList: selectedItem[];
  selectedItem: selectedItem;
  setSelectedItem: Dispatch<SetStateAction<selectedItem>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  values,
  setValues,
  handleProfileEdit,
  itemList,
  selectedItem,
  setSelectedItem,
  handleImageUpload,
}: ProfileEditScreenProps) => {
  return (
    <>
      <SectionHeading textAlign="center">프로필 수정</SectionHeading>
      <ProfileArea>
        <MyInfo.Avatar
          imageUrl={user?.profile}
          handleImageUpload={handleImageUpload}
          hasPlus
        />
      </ProfileArea>
      <InputArea>
        <Input
          label="이름"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <DropDown
          borderRadius={8}
          color="lightBlue"
          itemList={itemList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
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
