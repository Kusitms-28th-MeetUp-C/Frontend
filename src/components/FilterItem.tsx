interface FilterItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  defaultBgColor?: string;
  onClick?: () => void;
}

const FilerItem = ({
  children,
  isActive,
  defaultBgColor = 'white',
  onClick,
}: FilterItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-full px-4 py-1.5 text-[14px] duration-300${
        isActive
          ? ' bg-blue1  font-bold text-white'
          : ` font-medium text-[#8A929F] hover:bg-blue1 hover:text-white ${
              defaultBgColor === 'white' ? ' bg-white' : ' bg-gray7'
            }`
      }`}
    >
      {children}
    </div>
  );
};

export default FilerItem;
