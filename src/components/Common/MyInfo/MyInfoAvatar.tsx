import { BsFillPersonFill } from 'react-icons/bs';

interface MyInfoAvatarProps {
  imageUrl: string;
}

const MyInfoAvatar = ({ imageUrl }: MyInfoAvatarProps) => {
  return (
    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-zinc-300">
      {imageUrl && imageUrl !== 'Unknown' ? (
        <img
          src={imageUrl}
          alt="프로필 이미지"
          className="w-full object-cover"
        />
      ) : (
        <BsFillPersonFill className="text-[50px] text-gray3" />
      )}
    </div>
  );
};

export default MyInfoAvatar;
