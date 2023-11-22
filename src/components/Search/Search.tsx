import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchProps {
  title?: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  onChange?: (arg0: string) => void;
  isMobile?: boolean;
}

const Search = ({
  title,
  setTitle,
  className,
  setPage,
  onChange,
  isMobile,
}: SearchProps) => {
  const [search, setSearch] = useState('');

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle(search);
    setPage && setPage(0);
  };

  useEffect(() => {
    title && setSearch(title);
  }, []);

  return (
    <form
      className={`${
        isMobile ? 'mb-4' : 'mb-6'
      } flex w-full max-w-[550px] items-center justify-between rounded-[20px] bg-white px-5 py-2 ${
        className && className
      }`}
      onSubmit={onSubmitSearch}
    >
      <input
        className={`w-[90%] border-none outline-none ${
          isMobile ? 'text-sm' : 'text-base'
        }`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange && onChange(e.target.value);
        }}
      />
      <button>
        <FiSearch className="text-lg text-gray3" />
      </button>
    </form>
  );
};

export default Search;
