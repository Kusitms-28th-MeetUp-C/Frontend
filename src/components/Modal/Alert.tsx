interface AlertProps {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: () => void;
  btnTxt: string;
  children?: React.ReactNode;
}

const Alert = ({
  title,
  setIsOpen,
  onSubmit,
  btnTxt,
  children,
}: AlertProps) => {
  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center"
      style={{ background: 'rgba(57, 57, 72, 0.60)' }}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className={`z-[101] flex flex-col items-center gap-4 rounded-[20px] bg-white px-16 pb-10 pt-6 duration-300`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`text-xl font-semibold text-gray1 ${
            children ? '' : 'mb-10 mt-8'
          } `}
        >
          {title}
        </div>
        {children}

        <button
          type="submit"
          className={`m-auto h-[52px] w-[156px] rounded-[10px] bg-blue1 text-base font-bold text-white`}
          onClick={onSubmit || (() => setIsOpen((prev) => !prev))}
        >
          {btnTxt}
        </button>
      </div>
    </div>
  );
};

export default Alert;
