interface UseBtnProps {
  children: React.ReactNode;
  onClickBtn: () => void;
  isMobile?: boolean;
}

const UseBtn = ({ children, onClickBtn, isMobile }: UseBtnProps) => {
  return (
    <button
      className={`w-full rounded-[15px] bg-blue1 ${
        isMobile ? 'mb-4 py-3 text-base' : 'mb-7 py-5 text-xl'
      } font-semibold text-white `}
      onClick={onClickBtn}
    >
      {children}
    </button>
  );
};

export default UseBtn;
