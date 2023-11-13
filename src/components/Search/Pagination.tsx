import { useState } from 'react';
import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
} from 'react-icons/bs';

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  const pageCnt = 5;
  const [startPage, setStartPage] = useState(0);

  const onClickNext = () => {
    if (startPage >= 0) {
      setPage((prev) => prev - 1);
      if (page === startPage) {
        setStartPage((prev) => prev - pageCnt);
      }
    }
  };

  const onClickPrev = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
      if (page === startPage + 4) {
        setStartPage((prev) => prev + pageCnt);
      }
    }
  };

  const onClickFirst = () => {
    setPage(0);
    setStartPage(0);
  };

  const onClickLast = () => {
    setPage(totalPages - 1);
    setStartPage((totalPages / pageCnt - 1) * 5);
  };

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <img src='/icons/firstPage.svg' className={`cursor-pointer text-gray3 h-[20px] w-[20px]`} onClick={onClickFirst} />
      <BsFillCaretLeftFill className={`cursor-pointer text-gray3 h-[20px] w-[20px]`} onClick={onClickNext} />
      {Array.from({ length: totalPages }, (v, i) => i)
        .filter((el, idx) => el >= startPage && el < startPage + pageCnt)
        .map((el, idx) => (
          <button
            key={el}
            id={el.toString()}
            onClick={() => {
              setPage(el);
            }}
            className={`w-7 text-center text-xl font-semibold ${
              page === el ? 'text-gray2' : 'text-gray4'
            }`}
          >
            {el + 1}
          </button>
        ))}
      <BsFillCaretRightFill
        className={`cursor-pointer text-gray3 h-[20px] w-[20px]`}
        onClick={onClickPrev}
      />
      <img src='/icons/lastPage.svg' className={`cursor-pointer text-gray3 h-[20px] w-[20px]`} onClick={onClickLast} />
    </div>
  );
};

export default Pagination;
