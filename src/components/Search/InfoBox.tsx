interface InfoBox {
  children: React.ReactNode;
}

const InfoBox = ({ children }: InfoBox) => {
  return (
    <div className="left-20 rounded-[20px] bg-white px-5 py-3 text-xs font-medium text-gray2">
      {children}
    </div>
  );
};

export default InfoBox;
