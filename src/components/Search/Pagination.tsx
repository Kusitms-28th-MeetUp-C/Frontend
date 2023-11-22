import { useState } from 'react';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  MoveToTop: () => void;
  isMobile?: boolean;
}

const Pagination = ({
  page,
  setPage,
  totalPages,
  MoveToTop,
  isMobile,
}: PaginationProps) => {
  const pageCnt = 5;
  const [startPage, setStartPage] = useState(0);

  const onClickNext = () => {
    if (startPage >= 0) {
      MoveToTop();
      setPage((prev) => prev - 1);
      if (page === startPage) {
        setStartPage((prev) => prev - pageCnt);
      }
    }
  };

  const onClickPrev = () => {
    if (page < totalPages - 1) {
      MoveToTop();
      setPage((prev) => prev + 1);
      if (page === startPage + 4) {
        setStartPage((prev) => prev + pageCnt);
      }
    }
  };

  const onClickFirst = () => {
    if (page > 0) {
      MoveToTop();
      setPage(0);
      setStartPage(0);
    }
  };

  const onClickLast = () => {
    if (page < totalPages - 1) {
      MoveToTop();
      setPage(totalPages - 1);
      setStartPage((totalPages / pageCnt - 1) * 5);
    }
  };

  return (
    <div
      className={`flex w-full items-center justify-center ${
        isMobile ? 'gap-[10px]' : 'gap-4'
      }`}
    >
      <img
        src="/icons/firstPage.svg"
        className={`${
          isMobile ? 'h-[10px] w-[10px]' : 'h-5 w-5'
        } cursor-pointer text-gray3`}
        onClick={onClickFirst}
      />
      <BsFillCaretLeftFill
        className={`${
          isMobile ? 'h-[10px] w-[10px]' : 'h-5 w-5'
        } cursor-pointer text-gray3`}
        onClick={onClickNext}
      />
      {Array.from({ length: totalPages }, (v, i) => i)
        .filter((el, idx) => el >= startPage && el < startPage + pageCnt)
        .map((el, idx) => (
          <button
            key={el}
            id={el.toString()}
            onClick={() => {
              MoveToTop();
              setPage(el);
            }}
            className={`text-center ${
              isMobile ? 'w-3 text-xs' : 'w-7 text-xl'
            } font-semibold ${page === el ? 'text-gray2' : 'text-gray4'}`}
          >
            {el + 1}
          </button>
        ))}
      <BsFillCaretRightFill
        className={`${
          isMobile ? 'h-[10px] w-[10px]' : 'h-5 w-5'
        } cursor-pointer text-gray3`}
        onClick={onClickPrev}
      />
      <img
        src="/icons/lastPage.svg"
        className={`${
          isMobile ? 'h-[10px] w-[10px]' : 'h-5 w-5'
        } cursor-pointer text-gray3`}
        onClick={onClickLast}
      />
    </div>
  );
};

export default Pagination;
