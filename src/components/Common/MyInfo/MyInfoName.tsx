interface MyInfoNameProps {
  userType: string;
  name: string;
}

const MyInfoName = ({ userType, name }: MyInfoNameProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-blue1 px-3 py-1 text-sm font-bold text-white">
        {userType}
      </span>
      <span className="text-xl font-medium">{name}</span>
    </div>
  );
};

export default MyInfoName;
