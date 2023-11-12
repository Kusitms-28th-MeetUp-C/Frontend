interface FilterItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const FilerItem = ({ children, isActive }: FilterItemProps) => {
  return (
    <div
      className={`cursor-pointer rounded-full px-4  py-1.5 text-[14px] duration-300 ${
        isActive
          ? 'bg-[#5257D6] font-bold text-white'
          : 'bg-white font-medium text-[#8A929F] hover:bg-[#5257D6] hover:text-white hover:opacity-70'
      }`}
    >
      {children}
    </div>
  );
};

export default FilerItem;
