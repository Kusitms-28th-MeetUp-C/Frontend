import { AiOutlineSearch } from 'react-icons/ai';
import Filter from '../components/Search/Filter';
import SearchItems from '../components/Search/SearchItems';

const Roadmap = () => {
  return (
    <div className="px-[56px] py-[45px]">
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
      <Filter />
      <SearchItems />
    </div>
  );
};

export default Roadmap;
