import React, { SetStateAction, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

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
      className="mb-6 flex w-full max-w-[420px] items-center justify-between rounded-full bg-white px-[20px] py-[8px]"
      onSubmit={onSubmitSearch}
    >
      <input
        className="w-[90%] border-none text-base outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <AiOutlineSearch
          style={{
            cursor: 'pointer',
            color: '#495565',
            width: '20px',
            height: '20px',
          }}
        />
      </button>
    </form>
  );
};

export default Search;
