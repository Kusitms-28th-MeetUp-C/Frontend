import styled from 'styled-components';

import ProfileScreen from './ProfileScreen';
import ProfileEditScreen from './ProfileEditScreen';

interface LeftSectionProps {
  user: any;
  isEditScreen: boolean;
  setIsEditScreen: any;
  values: any;
  setValues: any;
  handleProfileEdit: any;
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
}: LeftSectionProps) => {
  return (
    <LeftSectionBlock>
      {isEditScreen ? (
        <ProfileEditScreen
          user={user}
          setIsEditScreen={setIsEditScreen}
          values={values}
          setValues={setValues}
          handleProfileEdit={handleProfileEdit}
        />
      ) : (
        <ProfileScreen user={user} setIsEditScreen={setIsEditScreen} />
      )}
    </LeftSectionBlock>
  );
};

export default LeftSection;
