import { useState, useEffect } from 'react';

interface ModalProps {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
  onSubmit: (e?: any) => void;
  children?: React.ReactNode;
  cancel: string;
  submit: string;
  className?: string;
  isCreate?: boolean;
  disabledOnClick?: boolean;
  isTemplateSearch?: boolean;
  selectedRoadmap?: string;
}

const Modal = ({
  title,
  setIsOpen,
  onCancel,
  onSubmit,
  children,
  cancel,
  submit,
  className,
  isCreate,
  disabledOnClick,
  isTemplateSearch,
  selectedRoadmap,
}: ModalProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center"
      style={{ background: 'rgba(57, 57, 72, 0.60)' }}
      onClick={() => {
        if (disabledOnClick) return;
        setIsOpen(false);
      }}
    >
      <div
        className={`z-[101] flex flex-col items-center ${
          isMobile ? 'gap-5 py-8' : 'gap-10 py-10'
        } rounded-[20px] bg-white px-[34px] duration-300${
          className ? ` ${className}` : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isTemplateSearch ? (
          <div className="text-center text-xl font-semibold leading-7 text-gray1">
            <span className="text-tagLightPurple1">{`'${selectedRoadmap}'`}</span>
            에서
            <br />
            배정할 스텝을 선택해주세요
          </div>
        ) : (
          <div
            className={`font-semibold text-gray1 ${
              !children && (isMobile ? 'my-3' : 'my-6')
            } ${isMobile ? 'text-sm' : 'text-xl'} `}
          >
            {title}
          </div>
        )}
        {children}
        <div className="flex items-center gap-4 ">
          <button
            className={`flex h-[40px] w-[110px] items-center justify-center rounded-[10px] bg-blue5 text-xs font-semibold text-gray2 duration-300 ${
              isCreate && 'hover:bg-blue1 hover:font-bold hover:text-white'
            }`}
            onClick={isCreate ? onCancel : () => setIsOpen(false)}
          >
            {cancel}
          </button>
          <button
            type="submit"
            className={`h-[40px] w-[110px] rounded-[10px] text-xs duration-300 ${
              isCreate
                ? 'bg-blue5 font-semibold text-gray2 hover:bg-blue1 hover:font-bold hover:text-white'
                : 'bg-blue1 font-bold text-white'
            }`}
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
