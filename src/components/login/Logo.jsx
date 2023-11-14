const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src="/logo/logo-3d.png" className="h-[165px] w-[190px]" />
      <img src="/logo/logo-typo-white.svg" />
      <div className="text-xs font-medium text-white">
        효율적인 회의 가이드를 안내하는 서비스, 밋플
      </div>
    </div>
  );
};

export default Logo;
