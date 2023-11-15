import React, { useState } from 'react';
import { FiSearch  } from 'react-icons/fi';

interface SearchProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ setTitle }: SearchProps) => {
  const [search, setSearch] = useState('');

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle(search);
  };

  return (
    <form
      className="mb-7 flex w-full max-w-[550px] items-center justify-between rounded-[20px] bg-white px-[20px] py-[8px]"
      onSubmit={onSubmitSearch}
    >
      <input
        className="w-[90%] border-none text-base outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <FiSearch  className="text-gray3 text-lg" />
      </button>
    </form>
  );
};

export default Search;
