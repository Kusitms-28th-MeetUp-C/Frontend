import { FiSearch } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import { GoHomeFill } from 'react-icons/go';
import { TbLogout } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  return (
    <div className="flex h-[65px] items-center justify-between bg-white px-8">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo/logo.svg" alt="logo" className="h-6" />
          <img src="/logo/logo-typo.svg" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="mr-1 flex items-center  gap-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full bg-[#DDE1EA]">
            <BsFillPersonFill className="h-[18px] w-[18px] text-[#5A5A5A]" />
          </div>
          <div className="text-lg font-semibold text-[#232326]">김밋플</div>
        </div>

        <div className="flex h-10 w-80 items-center rounded-full bg-[#EBEEF9] px-4">
          <input type="text" className="flex-1 bg-[#00000000] outline-none" />
          <FiSearch />
        </div>

        <Link
          to="#"
          className="flex h-10 items-center rounded-full bg-[#EBEEF9] px-10 text-[14px] font-semibold text-[#495565]"
        >
          밋플에 공유하기
        </Link>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#EBEEF9]">
          <GoHomeFill className="h-6 w-6 text-[#495565]" />
        </div>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#EBEEF9]">
          <TbLogout className="h-6 w-6 text-[#495565]" />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
