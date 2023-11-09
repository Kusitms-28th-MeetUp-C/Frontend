interface ModalProps {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  children?: React.ReactNode;
  cancel: string;
  submit: string;
}

const Modal = ({
  title,
  setIsOpen,
  onSubmit,
  children,
  cancel,
  submit,
}: ModalProps) => {
  return (
    <div
      className="z-100 fixed left-0 top-0 flex h-full w-full items-center justify-center"
      style={{ background: 'rgba(57, 57, 72, 0.60)' }}
    >
      <div className="z-[101] flex w-[480px] flex-col items-center gap-10 rounded-[20px] bg-white px-[34px] py-10 duration-300">
        <div
          className={`text-gray1 text-xl font-semibold ${
            children ? '' : 'mt-8 mb-10'
          } `}
        >
          {title}
        </div>
        {children}
        <div className="flex items-center gap-[18px] ">
          <button
            className="bg-blue5 text-gray2 flex h-[52px] w-[156px] items-center justify-center rounded-[10px] text-base font-semibold"
            onClick={() => setIsOpen(false)}
          >
            {cancel}
          </button>
          <button
            className="bg-blue1 h-[52px] w-[156px] rounded-[10px] text-base font-bold text-white"
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
