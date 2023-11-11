interface UseBtnProps {
  children: React.ReactNode;
  onClickBtn: () => void;
}

const UseBtn = ({ children, onClickBtn }: UseBtnProps) => {
  return (
    <button
      className="bg-blue1 mb-7 w-full rounded-[15px] py-5 text-xl font-semibold text-white"
      onClick={onClickBtn}
    >
      {children}
    </button>
  );
};

export default UseBtn;
