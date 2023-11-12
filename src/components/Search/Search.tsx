import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  return (
    <div className="mb-6 flex w-full max-w-[420px] items-center justify-between rounded-full bg-white px-[20px] py-[8px]">
      <input className="w-[90%] border-none text-base outline-none" />
      <AiOutlineSearch
        style={{
          cursor: 'pointer',
          color: '#495565',
          width: '20px',
          height: '20px',
        }}
      />
    </div>
  );
};

export default Search;
