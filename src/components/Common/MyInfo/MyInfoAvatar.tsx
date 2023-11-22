import { useRef } from 'react';
import styled from 'styled-components';

interface MyInfoAvatarProps {
  imageUrl: string;
  hasPlus?: boolean;
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInfoAvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const MyInfoAvatarBlock = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f2f2f2;
`;

const MyInfoAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlusWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #5257d6;
`;

const Plus = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const MyInfoAvatar = ({
  imageUrl,
  hasPlus,
  handleImageUpload,
}: MyInfoAvatarProps) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  if (hasPlus) {
    return (
      <MyInfoAvatarWrapper
        onClick={() => {
          if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
          }
        }}
      >
        <MyInfoAvatarBlock>
          <MyInfoAvatarImage src={imageUrl} alt="프로필 이미지" />
        </MyInfoAvatarBlock>
        <PlusWrapper>
          <Plus>+</Plus>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </PlusWrapper>
      </MyInfoAvatarWrapper>
    );
  }

  return (
    <MyInfoAvatarBlock>
      <MyInfoAvatarImage src={imageUrl} alt="프로필 이미지" />
    </MyInfoAvatarBlock>
  );
};

export default MyInfoAvatar;
