interface MyInfoAvatarProps {
  imageUrl: string;
}

const MyInfoAvatar = ({ imageUrl }: MyInfoAvatarProps) => {
  return (
    <div className="h-20 w-20 overflow-hidden rounded-full bg-zinc-300">
      <img src={imageUrl} alt="프로필 이미지" className="w-full object-cover" />
    </div>
  );
};

export default MyInfoAvatar;
