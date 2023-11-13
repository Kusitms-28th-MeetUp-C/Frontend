const Logo = () => {
  return (
    <>
      <div className="bg-gray-300 text-center w-full h-56 flex justify-center items-center mb-5">
        일러스트 공간
      </div>
      <div className="mb-4 font-bold text-xl">
        회의에 솔루션을 더하다, <span className="font-extrabold">밋플</span>
      </div>
      <img src="/logo/logo.svg" className="mb-12" />
    </>
  );
};

export default Logo;
