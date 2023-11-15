interface UseBtnProps {
  children: React.ReactNode;
  onClickBtn: () => void;
}

const UseBtn = ({ children, onClickBtn }: UseBtnProps) => {
  return (
    <button
      className="mb-7 w-full rounded-[15px] bg-blue1 py-5 text-xl font-semibold text-white"
      onClick={onClickBtn}
    >
      {children}
    </button>
  );
};

export default UseBtn;
