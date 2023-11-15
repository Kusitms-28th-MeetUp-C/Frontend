interface ModalProps {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  children?: React.ReactNode;
  cancel: string;
  submit: string;
  className?: string;
}

const Modal = ({
  title,
  setIsOpen,
  onSubmit,
  children,
  cancel,
  submit,
  className,
}: ModalProps) => {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
      style={{ background: 'rgba(57, 57, 72, 0.60)' }}
    >
      <div
        className={`z-[101] flex flex-col items-center gap-10 rounded-[20px] bg-white px-[34px] py-10 duration-300${
          className ? ` ${className}` : ''
        }`}
      >
        <div
          className={`text-xl font-semibold text-gray1 ${
            children ? '' : 'mb-10 mt-8'
          } `}
        >
          {title}
        </div>
        {children}
        <div className="flex items-center gap-[18px] ">
          <button
            className="flex h-[52px] w-[156px] items-center justify-center rounded-[10px] bg-blue5 text-base font-semibold text-gray2"
            onClick={() => setIsOpen(false)}
          >
            {cancel}
          </button>
          <button
            className="h-[52px] w-[156px] rounded-[10px] bg-blue1 text-base font-bold text-white"
            onClick={onSubmit}
          >
            {submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
