interface FilterItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const FilerItem = ({ children, isActive, onClick }: FilterItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-full px-4  py-1.5 text-[14px] duration-300 ${
        isActive
          ? 'bg-[#5257D6] font-bold text-white'
          : 'bg-white font-medium text-[#8A929F] hover:bg-[#5257D6] hover:text-white'
      }`}
    >
      {children}
    </div>
  );
};

export default FilerItem;
