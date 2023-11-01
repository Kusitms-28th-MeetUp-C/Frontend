import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  return (
    <div className="flex h-16 items-center justify-between px-8">
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo/logo.svg" alt="logo" className="h-6" />
        </Link>
        <div className="ml-8 flex w-80 items-center rounded-full bg-[#EBEEF9] px-4 py-1">
          <input type="text" className="flex-1 bg-[#00000000] outline-none" />
          <i>
            <FiSearch />
          </i>
        </div>
      </div>
      <Link
        to="#"
        className="rounded-full bg-indigo-100 px-6 py-1 font-bold text-gray-600"
      >
        홈페이지 바로가기
      </Link>
    </div>
  );
};

export default TopNavBar;
