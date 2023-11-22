import styled from 'styled-components';

import { Dispatch, SetStateAction } from 'react';

import ProfileScreen from './ProfileScreen';
import ProfileEditScreen from './ProfileEditScreen';
import { selectedItem } from '../Common/DropDown/DropDown';

interface LeftSectionProps {
  user: any;
  isEditScreen: boolean;
  setIsEditScreen: (isEditScreen: boolean) => void;
  values: any;
  setValues: any;
  handleProfileEdit: () => void;
  itemList: selectedItem[];
  selectedItem: selectedItem;
  setSelectedItem: Dispatch<SetStateAction<selectedItem>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LeftSectionBlock = styled.section`
  width: 500px;
  border-radius: 1rem;
  background-color: white;
  padding: 2rem;
  box-shadow: 4px 4px 20px 0px rgba(82, 87, 214, 0.05);
`;

const LeftSection = ({
  user,
  isEditScreen,
  setIsEditScreen,
  values,
  setValues,
  handleProfileEdit,
  itemList,
  selectedItem,
  setSelectedItem,
  handleImageUpload,
}: LeftSectionProps) => {
  return (
    <LeftSectionBlock>
      {!isEditScreen ? (
        <ProfileScreen user={user} setIsEditScreen={setIsEditScreen} />
      ) : (
        <ProfileEditScreen
          user={user}
          values={values}
          setValues={setValues}
          handleProfileEdit={handleProfileEdit}
          itemList={itemList}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          handleImageUpload={handleImageUpload}
        />
      )}
    </LeftSectionBlock>
  );
};

export default LeftSection;
